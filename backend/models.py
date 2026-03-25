from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Integer, default=0, nullable=False)  # 0 = regular user, 1 = admin
    created_at = Column(DateTime, default=datetime.utcnow)

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    victim_name = Column(String, nullable=False)
    complaint_title = Column(String, nullable=False)
    culprit_name = Column(String, nullable=True)
    incident_description = Column(Text, nullable=False)
    status = Column(String, default="Pending", nullable=False)  # Pending / Reviewed
    created_at = Column(DateTime, default=datetime.utcnow)