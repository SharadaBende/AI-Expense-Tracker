from pydantic import BaseModel

class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: str

class ExpenseResponse(ExpenseCreate):
    id: int

    class Config:
        orm_mode = True
        