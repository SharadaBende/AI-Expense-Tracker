from sqlalchemy.orm import Session
import models
import schemas

def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense

def get_expenses(db: Session):
    return db.query(models.Expense).all()

def delete_expense(db: Session, expense_id: int):
    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id
    ).first()

    if expense:
        db.delete(expense)
        db.commit()

    return expense
