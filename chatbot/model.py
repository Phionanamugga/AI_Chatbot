from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import random
import json
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
        with open("chatbot/intents.json", "r") as file:
            self.intents = json.load(file)

    def generate_response(self, user_input):
        # Check predefined responses
        if user_input in self.responses:
            return self.responses[user_input]
        
        # Check intent-based responses
        for intent in self.intents["intents"]:
            if user_input.lower() in intent["patterns"]:
                return random.choice(intent["responses"])
        
        # Use transformer model for other responses
        input_ids = self.tokenizer.encode(user_input, return_tensors="pt").to(DEVICE)
        output = self.model.generate(input_ids, max_length=100, pad_token_id=self.tokenizer.eos_token_id)
        return self.tokenizer.decode(output[:, input_ids.shape[-1]:][0], skip_special_tokens=True)

# Example usage (for debugging)
if __name__ == "__main__":
    bot = ChatbotModel()
    print(bot.generate_response("hello"))