from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from auth import router as auth_router
from lawbot import router as lawbot_router  # ✅ Using real AI version with new API key
# from lawbot_mock import router as lawbot_router  # Mock version (not needed anymore)
from routes.complaint import router as complaint_router
from therapist import router as therapist_router


app = FastAPI(title="Aurora Backend")

# ✅ CREATE ALL TABLES (VERY IMPORTANT)
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(lawbot_router)
app.include_router(complaint_router)
app.include_router(therapist_router)
