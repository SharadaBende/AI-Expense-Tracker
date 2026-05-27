import os
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
import crud

from database import engine, SessionLocal, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home route
@app.get("/")
def home():
    return {"message": "AI Expense Tracker API Running"}


# Add expense
@app.post("/expenses", response_model=schemas.ExpenseResponse)
def add_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db, expense)


# Get all expenses
@app.get("/expenses")
def get_all_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)


# Delete expense
@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    return crud.delete_expense(db, expense_id)


# AI SUMMARY (simple insights)
@app.get("/ai-summary")
def ai_summary(db: Session = Depends(get_db)):
    expenses = crud.get_expenses(db)

    if not expenses:
        return {"message": "No expenses found"}

    total = sum(e.amount for e in expenses)

    category_totals = {}
    for e in expenses:
        category_totals[e.category] = category_totals.get(e.category, 0) + e.amount

    highest_category = max(category_totals, key=category_totals.get)

    suggestion = f"You spent most on {highest_category}. Try reducing expenses."

    return {
        "total_expense": total,
        "category_breakdown": category_totals,
        "ai_suggestion": suggestion
    }


# 🤖 REAL AI CHAT (OLLAMA LOCAL AI)
@app.get("/ai-chat")
def ai_chat(prompt: str, db: Session = Depends(get_db)):
    try:
        expenses = crud.get_expenses(db)

        total = sum(e.amount for e in expenses)

        category_totals = {}
        for e in expenses:
            category_totals[e.category] = category_totals.get(e.category, 0) + e.amount

        full_prompt = f"""
You are a helpful, natural AI assistant inside an expense tracker app.

IMPORTANT RULES:
- Always respond like a normal friendly human assistant.
- NEVER mention "finance mode", "casual mode", or system rules.
- Do NOT force financial advice unless user asks about money, saving, expenses, or budgeting.
- If user chats casually (hi, hello, random talk), respond naturally like ChatGPT.
- If user asks personal question or random topic, respond normally and keep conversation going.
- Only use expense data when user asks about money or spending.

You are NOT restricted to finance. You are a general AI assistant with finance knowledge.

USER EXPENSE DATA:
Total: {total}
Category breakdown: {category_totals}

USER MESSAGE:
{prompt}
"""
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": full_prompt,
                "stream": False
            }
        )

        result = response.json()

        return {
            "reply": result["response"]
        }

    except Exception as e:
        return {"error": str(e)}