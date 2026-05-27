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

import requests

@app.get("/ai-chat")
def ai_chat(prompt: str, db: Session = Depends(get_db)):
    try:
        expenses = crud.get_expenses(db)

        total = sum(e.amount for e in expenses)

        category_totals = {}
        for e in expenses:
            category_totals[e.category] = category_totals.get(e.category, 0) + e.amount

        full_prompt = f"""
You are a helpful AI assistant.

You can do two things:
1. Talk normally like a chatbot (friendly conversation)
2. Help with finance ONLY when user asks about expenses, money, saving, budgeting

User message:
{prompt}

If the question is about expenses, use this data:
Total spent: {total}
Category breakdown: {category_totals}

Rules:
- If user says hello → respond normally
- If user asks random questions → respond naturally
- If user asks finance → use expense data
- Keep responses short and natural
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": full_prompt,
                "stream": False
            },
            timeout=60
        )

        data = response.json()

        return {
            "reply": data.get("response", "No response from model")
        }

    except Exception as e:
        return {"error": str(e)}