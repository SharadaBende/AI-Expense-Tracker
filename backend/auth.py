from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext

SECRET_KEY = "super-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# HASH PASSWORD
def hash_password(password: str):
    return pwd_context.hash(password)


# VERIFY PASSWORD
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# CREATE JWT TOKEN
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# DECODE JWT TOKEN
def decode_token(token: str):

    try:

        # REMOVE "Bearer "
        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError as e:
        print("JWT ERROR:", e)
        return None