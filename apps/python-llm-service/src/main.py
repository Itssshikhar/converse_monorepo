from fastapi import FastAPI, UploadFile, File
from whisper_service import transcribe_audio
from feedback_service import generate_feedback

app = FastAPI()

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    transcript = await transcribe_audio(file)
    return {"transcript": transcript}

@app.post("/feedback")
async def feedback(text: str):
    result = generate_feedback(text)
    return {"feedback": result}
