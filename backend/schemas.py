from pydantic import BaseModel, EmailStr
from pydantic import BaseModel

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class ComplaintCreate(BaseModel):
    victim_name: str
    complaint_title: str
    culprit_name: str | None = None
    incident_description: str

class ComplaintUpdate(BaseModel):
    status: str  # "Pending" or "Reviewed"