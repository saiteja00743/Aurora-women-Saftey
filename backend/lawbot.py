from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/lawbot", tags=["LawBot"])

api_key = os.getenv("OPENROUTER_API_KEY")
print("[KEY] Loaded API key:", api_key[:10] + "..." if api_key else "[ERROR] Not found")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

# 🟣 Schema for incoming chat messages
class Query(BaseModel):
    question: str


# 🧠 POST: dynamic Q&A (no storage)
@router.post("/ask")
def ask_lawbot(query: Query):
    if not api_key:
        print("[ERROR] API key is missing!")
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")
    
    try:
        print(f"[INFO] Received question: {query.question}")
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a calm, accurate, and empathetic legal assistant specializing in Indian women's rights."},
                {"role": "user", "content": query.question}
            ],
            max_tokens=250
        )
        
        answer = response.choices[0].message.content.strip()
        print("[LAWBOT]", answer)
        return {"response": answer}

    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] Error in LawBot: {error_msg}")
        
        # Provide more specific error messages
        if "api_key" in error_msg.lower():
            raise HTTPException(status_code=500, detail="Invalid API key")
        elif "rate" in error_msg.lower():
            raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
        elif "timeout" in error_msg.lower():
            raise HTTPException(status_code=504, detail="Request timeout. Please try again.")
        else:
            raise HTTPException(status_code=500, detail=f"LawBot error: {error_msg}")
