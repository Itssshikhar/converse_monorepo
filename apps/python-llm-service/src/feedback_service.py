from transformers import pipeline

feedback_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased")

def generate_feedback(text):
    results = feedback_pipeline(text)
    return results
