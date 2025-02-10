from flask import Flask, request, jsonify
from chatbot.model import ChatbotModel

app = Flask(__name__)
chatbot = ChatbotModel()

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = chatbot.generate_response(user_input)
    return jsonify({'response': response})

@app.route('/')
def index():
    return '''
   <form action="/chat" method="post" id="chat-form">
        <input type="text" name="message" id="message">
        <input type="submit">
    </form>
    <div id="response"></div>
    <script>
        document.getElementById('chat-form').onsubmit = async function(event) {
            event.preventDefault();
            const message = document.getElementById('message').value;
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            document.getElementById('response').innerText = data.response;
        }
    </script>
    '''

if __name__ == '__main__':
    app.run(port=5000)