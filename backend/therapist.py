from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/therapist", tags=["Therapist"])

_client = None

def get_client():
    global _client
    if _client is None:
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="OpenRouter API key not configured on server")
        _client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=api_key)
    return _client

class Message(BaseModel):
    role: str
    content: str

class TherapistQuery(BaseModel):
    message: str
    history: list[Message] = []

@router.post("/chat")
def therapist_chat(query: TherapistQuery):
    client = get_client()  # raises HTTPException if key missing
    try:
        # Construct the context for the model including history
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a calm, empathetic AI therapist designed to emotionally support women. "
                    "You listen carefully, validate feelings, respond gently, and encourage healthy coping. "
                    "You do NOT give medical diagnoses."
                )
            }
        ]
        
        # Add historical messages (limit to last 10 to save tokens/context)
        for msg in query.history[-10:]:
            messages.append({"role": msg.role, "content": msg.content})
            
        # Add the current user message
        messages.append({"role": "user", "content": query.message})

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=300
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
