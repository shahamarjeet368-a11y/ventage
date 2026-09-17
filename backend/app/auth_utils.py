import os
from fastapi import Header, HTTPException, status

ADMIN_SESSION_TOKEN = os.getenv("ADMIN_SESSION_TOKEN", "vintage-admin-session-token-2026")


def require_admin(authorization: str = Header(None)):
    """Guards admin-only routes. Frontend must send `Authorization: Bearer <token>`."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing admin session token",
        )
    token = authorization.split(" ", 1)[1].strip()
    if token != ADMIN_SESSION_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired admin session",
        )
    return True
