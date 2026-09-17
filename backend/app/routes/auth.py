from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import os

from app.auth_utils import ADMIN_SESSION_TOKEN

router = APIRouter(prefix="/api/auth", tags=["Auth"])

ADMIN_USER = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "vintage2026")

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(payload: LoginRequest):
    if payload.username == ADMIN_USER and payload.password == ADMIN_PASS:
        return {
            "success": True,
            "message": "Authentication successful",
            "token": ADMIN_SESSION_TOKEN,
            "user": {
                "username": ADMIN_USER,
                "role": "salon_owner"
            }
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid Admin ID or Password. Please check credentials."
    )

@router.get("/verify")
def verify_token(token: str):
    if token == ADMIN_SESSION_TOKEN:
        return {"valid": True, "username": ADMIN_USER}
    return {"valid": False}
