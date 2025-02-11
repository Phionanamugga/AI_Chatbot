from flask import Flask, request, jsonify
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import json
from datetime import datetime

app = Flask(__name__)

# Load model & tokenizer
MODEL_NAME = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

# Function to log conversations
def log_conversation(user_input, bot_response):
    with open("data/conversations.txt", "a") as file:
        timestamp = datetime.now().strftime("[%Y-%m-%d %H:%M]")
        file.write(f"{timestamp} User: {user_input}\n")
        file.write(f"{timestamp} Bot: {bot_response}\n\n")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    
    inputs = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
    response_ids = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
    bot_response = tokenizer.decode(response_ids[:, inputs.shape[-1]:][0], skip_special_tokens=True)
    
    log_conversation(user_input, bot_response)  # Log chat

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(port=5000)
