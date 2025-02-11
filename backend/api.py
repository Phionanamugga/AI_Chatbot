from flask import Flask, request, jsonify
from chatbot.model import ChatbotModel  # Import chatbot model

app = Flask(__name__)

# Load the chatbot model
chatbot = ChatbotModel()

@app.route('/chat', methods=['POST'])
def chat():
    """
    API endpoint to handle chat messages from the frontend.
    """
    data = request.get_json()
    user_message = data.get("message", "")

    # Generate chatbot response
    bot_reply = chatbot.get_response(user_message)

    return jsonify({"response": bot_reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run backend on port 5000
