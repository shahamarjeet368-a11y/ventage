from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional, List
from datetime import datetime
import uuid

from app.schemas.models import AppointmentCreate, AppointmentUpdate
from app.database import read_db, write_db
from app.auth_utils import require_admin

router = APIRouter(prefix="/api/appointments", tags=["Appointments"])

@router.post("")
def create_appointment(payload: AppointmentCreate):
    db = read_db()
    
    # Resolve service name if missing
    service_name = payload.service_name
    if not service_name:
        for s in db.get("services", []):
            if s["id"] == payload.service_id:
                service_name = s["name"]
                break
        if not service_name:
            service_name = "Selected Salon Service"

    new_apt = {
        "id": f"apt-{uuid.uuid4().hex[:6]}",
        "customer_name": payload.customer_name,
        "customer_phone": payload.customer_phone,
        "customer_email": payload.customer_email or "",
        "service_id": payload.service_id,
        "service_name": service_name,
        "appointment_date": payload.appointment_date,
        "appointment_time": payload.appointment_time,
        "status": "pending",
        "notes": payload.notes or "",
        "created_at": datetime.utcnow().isoformat() + "Z"
    }

    db["appointments"].insert(0, new_apt)
    write_db(db)

    return {
        "success": True,
        "message": "Appointment request received successfully.",
        "appointment": new_apt
    }

@router.get("", dependencies=[Depends(require_admin)])
def list_appointments(status: Optional[str] = None):
    db = read_db()
    appointments = db.get("appointments", [])
    if status and status != "all":
        appointments = [a for a in appointments if a.get("status") == status]
    return {"appointments": appointments, "total": len(appointments)}

@router.get("/{apt_id}", dependencies=[Depends(require_admin)])
def get_appointment(apt_id: str):
    db = read_db()
    for apt in db.get("appointments", []):
        if apt["id"] == apt_id:
            return apt
    raise HTTPException(status_code=404, detail="Appointment not found")

@router.patch("/{apt_id}", dependencies=[Depends(require_admin)])
def update_appointment(apt_id: str, payload: AppointmentUpdate):
    db = read_db()
    appointments = db.get("appointments", [])
    for apt in appointments:
        if apt["id"] == apt_id:
            if payload.status:
                apt["status"] = payload.status
            if payload.notes is not None:
                apt["notes"] = payload.notes
            write_db(db)
            return {"success": True, "appointment": apt}
    raise HTTPException(status_code=404, detail="Appointment not found")

@router.delete("/{apt_id}", dependencies=[Depends(require_admin)])
def delete_appointment(apt_id: str):
    db = read_db()
    appointments = db.get("appointments", [])
    updated = [a for a in appointments if a["id"] != apt_id]
    if len(updated) == len(appointments):
        raise HTTPException(status_code=404, detail="Appointment not found")
    db["appointments"] = updated
    write_db(db)
    return {"success": True, "message": "Appointment deleted successfully"}
