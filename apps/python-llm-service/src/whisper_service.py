from faster_whisper import WhisperModel

model = WhisperModel("medium")

async def transcribe_audio(audio_file):
    audio_path = f"/tmp/{audio_file.filename}"
    with open(audio_path, "wb") as f:
        f.write(await audio_file.read())

    segments, _ = model.transcribe(audio_path)
    transcript = " ".join([segment.text for segment in segments])
    return transcript
