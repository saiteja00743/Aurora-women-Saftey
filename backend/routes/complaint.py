from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Complaint
from schemas import ComplaintCreate, ComplaintUpdate
from typing import List

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

@router.post("/create")
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    new_complaint = Complaint(
        victim_name=complaint.victim_name,
        complaint_title=complaint.complaint_title,
        culprit_name=complaint.culprit_name,
        incident_description=complaint.incident_description
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint submitted successfully",
        "complaint_id": new_complaint.id
    }

@router.get("/admin/all")
def get_all_complaints(db: Session = Depends(get_db)):
    """Admin endpoint to fetch all complaints"""
    complaints = db.query(Complaint).order_by(Complaint.created_at.desc()).all()
    
    return {
        "complaints": [
            {
                "id": c.id,
                "victim_name": c.victim_name,
                "complaint_title": c.complaint_title,
                "culprit_name": c.culprit_name,
                "incident_description": c.incident_description,
                "status": c.status,
                "created_at": c.created_at.isoformat() if c.created_at else None
            }
            for c in complaints
        ]
    }

@router.patch("/admin/{complaint_id}/status")
def update_complaint_status(
    complaint_id: int,
    update: ComplaintUpdate,
    db: Session = Depends(get_db)
):
    """Admin endpoint to update complaint status"""
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    complaint.status = update.status
    db.commit()
    db.refresh(complaint)
    
    return {
        "message": "Status updated successfully",
        "complaint_id": complaint.id,
        "new_status": complaint.status
    }

@router.get("/track/{complaint_id}")
def track_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    """Public endpoint to track complaint status"""
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint Tracking ID not found")
    
    return {
        "id": complaint.id,
        "status": complaint.status,
        "created_at": complaint.created_at.isoformat() if complaint.created_at else None
    }
