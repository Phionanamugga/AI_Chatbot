from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from chatbot.config import MODEL_NAME, DEVICE

class ChatbotModel:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.model = AutoModelForCausalLM.from_pretrained(MODEL_NAME).to(DEVICE)
        self.responses = {
            "Hello": "Hi there! How can I help you today?",
            "What is your name?": "I am a chatbot created to assist you.",
            "How does machine learning work?": "Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns, and make decisions with minimal human intervention.",
            "Can you tell me a joke?": "Why don't scientists trust atoms? Because they make up everything!",
            "What is the weather like today?": "I'm sorry, I don't have access to real-time weather data. Please check your local weather service.",
            "How do I create a Python virtual environment?": "You can create a Python virtual environment by running the command `python -m venv myenv` in your terminal. Replace `myenv` with the name you want to give to your virtual environment.",
            "What is the capital of France?": "The capital of France is Paris.",
            "How can I learn data science?": "You can learn data science by taking online courses, reading books, and practicing with real datasets. Some popular online platforms for learning data science include Coursera, edX, and DataCamp.",
            "What is the meaning of life?": "The meaning of life is a philosophical question that has been debated for centuries. Different people and cultures have different interpretations and beliefs about the meaning of life.",
            "Goodbye!": "Goodbye! Have a great day!"
        }

    def generate_response(self, user_input):
        if user_input in self.responses:
            return self.responses[user_input]
        else:
            input_ids = self.tokenizer.encode(user_input, return_tensors="pt").to(DEVICE)
            output = self.model.generate(input_ids, max_length=100, pad_token_id=self.tokenizer.eos_token_id)
            return self.tokenizer.decode(output[:, input_ids.shape[-1]:][0], skip_special_tokens=True)