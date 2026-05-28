from sqlalchemy.orm import Session
from models import Expense


def create_expense(db: Session, expense, user_id):

    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        user_id=user_id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


def get_expenses(db: Session, user_id):

    return db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()


def delete_expense(db: Session, expense_id, user_id):

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user_id
    ).first()

    if expense:
        db.delete(expense)
        db.commit()

    return {"message": "Expense deleted"}