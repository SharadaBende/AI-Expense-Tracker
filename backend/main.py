import os
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
import crud

from database import engine, SessionLocal, Base


load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

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
def add_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db)
):
    return crud.create_expense(db, expense)

# Get all expenses
@app.get("/expenses")
def get_all_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)

# Delete expense
@app.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_expense(db, expense_id)




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

    suggestion = f"You spent most on {highest_category}. Try reducing expenses in this category."

    return {
        "total_expense": total,
        "category_breakdown": category_totals,
        "ai_suggestion": suggestion
    }