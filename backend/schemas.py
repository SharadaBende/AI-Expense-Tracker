from pydantic import BaseModel

# ---------- USER ----------
class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ---------- EXPENSE ----------
class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: str


class ExpenseResponse(ExpenseCreate):
    id: int

    class Config:
        orm_mode = True