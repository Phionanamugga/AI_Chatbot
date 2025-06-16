# /chat endpoint

%pip install fastapi
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chatbot import get_chat_response, get_intent_label
from app.services.voice import transcribe_audio

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
async def chat_with_bot(payload: ChatRequest):
    """
    Handle incoming user messages and return chatbot responses.
    """
    try:
        response = await get_chat_response(payload.message, user_id=payload.user_id)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/intent", response_model=dict)
async def classify_intent(payload: ChatRequest):
    """
    Return the predicted intent for a given user input.
    """
    try:
        intent = get_intent_label(payload.message)
        return {"intent": intent}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/voice", response_model=ChatResponse)
async def chat_via_voice(file: UploadFile = File(...)):
    """
    Accept a voice file and return a chatbot response.
    """
    try:
        text = await transcribe_audio(file)
        response = await get_chat_response(text)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
