from fastapi import APIRouter, Depends
from app.schemas.models import OfferCreate
from app.database import read_db, write_db
from app.auth_utils import require_admin

router = APIRouter(prefix="/api/offers", tags=["Offers"])

@router.get("")
def list_offers():
    db = read_db()
    return {"offers": db.get("offers", [])}

@router.post("", dependencies=[Depends(require_admin)])
def add_offer(payload: OfferCreate):
    db = read_db()
    new_off = {
        "id": f"off-{len(db.get('offers', []))+1}",
        "title": payload.title,
        "description": payload.description,
        "discount": payload.discount,
        "valid_until": payload.valid_until,
        "is_active": payload.is_active
    }
    db["offers"].append(new_off)
    write_db(db)
    return {"success": True, "offer": new_off}
