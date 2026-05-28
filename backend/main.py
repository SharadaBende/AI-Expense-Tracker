import requests

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session

import models
import schemas
import crud

from database import engine, SessionLocal, Base

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token
)

# ---------------- APP ----------------
app = FastAPI()

# ---------------- SECURITY ----------------
security = HTTPBearer()

# ---------------- DATABASE ----------------
Base.metadata.create_all(bind=engine)

# ---------------- CHAT MEMORY ----------------
chat_history = []

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DB SESSION ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- AUTH USER ----------------
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    print("TOKEN:", token)

    payload = decode_token(token)

    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload

# ---------------- HOME ----------------
@app.get("/")
def home():
    return {"message": "AI Expense Tracker API Running"}

# ---------------- REGISTER ----------------
@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user = models.User(
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "user_id": db_user.id,
        "email": db_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ---------------- ADD EXPENSE ----------------
@app.post("/expenses", response_model=schemas.ExpenseResponse)
def add_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    return crud.create_expense(
        db,
        expense,
        user["user_id"]
    )

# ---------------- GET EXPENSES ----------------
@app.get("/expenses")
def get_expenses(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    return crud.get_expenses(
        db,
        user["user_id"]
    )

# ---------------- DELETE EXPENSE ----------------
@app.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    return crud.delete_expense(
        db,
        expense_id,
        user["user_id"]
    )

# ---------------- AI SUMMARY ----------------
@app.get("/ai-summary")
def ai_summary(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    expenses = crud.get_expenses(
        db,
        user["user_id"]
    )

    if not expenses:
        return {
            "message": "No expenses found"
        }

    total = sum(e.amount for e in expenses)

    category_totals = {}

    for e in expenses:
        category_totals[e.category] = (
            category_totals.get(e.category, 0)
            + e.amount
        )

    highest = max(category_totals, key=category_totals.get)

    return {
        "total_expense": total,
        "category_breakdown": category_totals,
        "ai_suggestion":
        f"You spent most on {highest}. Try reducing this category."
    }

# ---------------- AI CHAT ----------------
@app.get("/ai-chat")
def ai_chat(
    prompt: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    global chat_history

    try:

        expenses = crud.get_expenses(
            db,
            user["user_id"]
        )

        total = sum(e.amount for e in expenses)

        category_totals = {}

        for e in expenses:
            category_totals[e.category] = (
                category_totals.get(e.category, 0)
                + e.amount
            )

        system_prompt = f"""
You are a smart AI assistant.

Expense Data:
Total Expense = {total}
Category Totals = {category_totals}

Talk naturally and helpfully.
"""

        chat_history.append({
            "role": "user",
            "content": prompt
        })

        chat_history = chat_history[-10:]

        messages = [
            {
                "role": "system",
                "content": system_prompt
            }
        ] + chat_history

        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "llama3",
                "messages": messages,
                "stream": False
            },
            timeout=40
        )

        data = response.json()

        ai_reply = data.get(
            "message",
            {}
        ).get(
            "content",
            ""
        ).strip()

        if not ai_reply:
            ai_reply = "No response from AI"

        chat_history.append({
            "role": "assistant",
            "content": ai_reply
        })

        return {
            "reply": ai_reply
        }

    except Exception as e:
        print("AI ERROR:", e)

        return {
            "reply": "AI server error"
        }