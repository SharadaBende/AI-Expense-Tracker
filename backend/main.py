import os
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
import crud

from database import engine, SessionLocal, Base

# CREATE DATABASE TABLES
Base.metadata.create_all(bind=engine)

# FASTAPI APP
app = FastAPI()

# CHAT MEMORY
chat_history = []

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DATABASE CONNECTION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# HOME ROUTE
@app.get("/")
def home():
    return {
        "message": "AI Expense Tracker API Running"
    }


# ADD EXPENSE
@app.post("/expenses", response_model=schemas.ExpenseResponse)
def add_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db)
):
    return crud.create_expense(db, expense)


# GET ALL EXPENSES
@app.get("/expenses")
def get_all_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)


# DELETE EXPENSE
@app.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_expense(db, expense_id)


# AI SUMMARY
@app.get("/ai-summary")
def ai_summary(db: Session = Depends(get_db)):
    expenses = crud.get_expenses(db)

    if not expenses:
        return {
            "message": "No expenses found"
        }

    total = sum(e.amount for e in expenses)

    category_totals = {}

    for e in expenses:
        category_totals[e.category] = (
            category_totals.get(e.category, 0) + e.amount
        )

    highest_category = max(
        category_totals,
        key=category_totals.get
    )

    suggestion = (
        f"You spent most on {highest_category}. "
        f"Try reducing expenses in this category."
    )

    return {
        "total_expense": total,
        "category_breakdown": category_totals,
        "ai_suggestion": suggestion
    }


# AI CHAT
@app.get("/ai-chat")
def ai_chat(
    prompt: str,
    db: Session = Depends(get_db)
):
    try:
        global chat_history

        # GET EXPENSES
        expenses = crud.get_expenses(db)

        total = sum(e.amount for e in expenses)

        category_totals = {}

        for e in expenses:
            category_totals[e.category] = (
                category_totals.get(e.category, 0) + e.amount
            )

        # SYSTEM PROMPT
        system_prompt = f"""
You are a smart and natural AI assistant.

RULES:
- Keep responses concise and natural.
- Talk naturally like ChatGPT.
- Reply to casual conversations normally.
- Reply to random questions naturally.
- Keep answers short unless user asks deeply.
- NEVER ignore user messages.
- Avoid repetitive answers.
- Do NOT constantly discuss finance.
- Only discuss money if user asks.
- Be friendly and human-like.

Expense Data:
Total Expense = {total}
Category Totals = {category_totals}
"""

        # SAVE USER MESSAGE
        chat_history.append({
            "role": "user",
            "content": prompt
        })

        # KEEP ONLY LAST 10 MESSAGES
        chat_history = chat_history[-10:]

        # BUILD MESSAGE LIST
        messages = [
            {
                "role": "system",
                "content": system_prompt
            }
        ] + chat_history

        # OLLAMA API CALL
        response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "qwen2.5-coder:3b",

        "messages": messages[-6:],

        "stream": False,

        "options": {
            "temperature": 0.7,
            "num_predict": 80,
            "num_ctx": 1024
        }
    },
    timeout=40
)

        data = response.json()

        # SAFE RESPONSE EXTRACTION
        ai_reply = (
            data.get("message", {})
            .get("content", "")
            .strip()
        )

        # EMPTY RESPONSE PROTECTION
        if not ai_reply:
            ai_reply = (
                "Sorry, I couldn't understand that. "
                "Please try again."
            )

        # SAVE AI RESPONSE
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
            "reply": "AI server issue. Please try again."
        }