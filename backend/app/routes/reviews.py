from fastapi import APIRouter
import uuid
from app.schemas.models import ReviewCreate
from app.database import read_db, write_db

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.get("")
def list_reviews():
    db = read_db()
    return {"reviews": db.get("reviews", []), "rating": 4.9, "total_reviews": 362}

@router.post("")
def add_review(payload: ReviewCreate):
    db = read_db()
    new_rev = {
        "id": f"rev-{uuid.uuid4().hex[:6]}",
        "customer_name": payload.customer_name,
        "rating": payload.rating,
        "review": payload.review,
        "source": payload.source,
        "is_featured": payload.is_featured,
        "created_at": "2026-09-17T10:00:00Z"
    }
    db["reviews"].insert(0, new_rev)
    write_db(db)
    return {"success": True, "review": new_rev}
