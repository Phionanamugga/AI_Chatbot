🧠 AI Chatbot

📌 Overview

This is a Flask-based chatbot application that integrates Machine Learning (ML) and Natural Language Processing (NLP) to provide human-like responses. The project consists of:
✅ Backend: Flask API that processes user messages using an ML chatbot.
✅ Frontend: A user-friendly web interface built with Flask's Jinja templates.

🚀 Goal: To build a smart, responsive chatbot that can be extended with AI and deployed on the web.

🔧 Features
✅ Real-time communication – The chatbot responds instantly.
✅ Rule-based & AI-ready – Uses predefined intents but can be upgraded with AI models.
✅ REST API – Backend serves chatbot responses via a RESTful API.
✅ Scalable – Easily expandable with more intents and deep learning models.

🏗️ Tech Stack
Backend: Python, Flask, REST API
Frontend: HTML, CSS, JavaScript (Jinja templates)
Machine Learning: NLP with JSON-based intents (AI-ready)
Database: JSON-based intents (can be switched to a real DB)

🚀 Getting Started
📥 1. Clone the Repository
git clone https://github.com/Phionanamuggae/AIchatbot.git
cd AIchatbot

🛠️ 2. Install Dependencies
Create a virtual environment (recommended):
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv/Scripts/activate  # Windows

Install required libraries:
pip install -r requirements.txt

⚙️ Project Structure
chatbot-app/
│── chatbot/                    # Chatbot logic and intents
│   ├── model.py                 # Chatbot logic (NLP processing)
│   ├── intents.json              # Chatbot responses & patterns
│
│── backend/                     # Flask API backend
│   ├── api.py                    # Main API handling chat requests
│
│── frontend/                    # Flask-based UI
│   ├── app.py                     # Runs the Flask frontend
│   ├── templates/                 # HTML templates
│   │   ├── index.html               # Chatbot UI
│   ├── static/                     # Static assets (CSS & JS)
│   │   ├── style.css                # UI styling
│   │   ├── script.js                # Handles chat interactions
│
│── requirements.txt              # Required dependencies
│── README.md                     # Project documentation
│── .gitignore                     # Files to ignore in version control
🚀 Running the App

1️⃣ Start the Backend
cd backend
python api.py
2️⃣ Start the Frontend
cd frontend

python app.py
3️⃣ Access the App
Open your browser and go to:
🔗 http://127.0.0.1:5001

🔄 How It Works
1️⃣ User sends a message via the frontend UI.
2️⃣ The message is sent to the Flask API (/chat).
3️⃣ The Chatbot model processes the message and returns a response.
4️⃣ The frontend displays the chatbot's reply in real-time.

🌍 Deploymen
🚀 Deploying on Heroku
Install the Heroku CLI:
npm install -g heroku

Login to Heroku:
heroku login
Create a new Heroku app:
heroku create chatbot-app
Deploy the application:
git add .
git commit -m "Deploy chatbot app"
git push heroku main
Open the deployed app:
heroku open
🎯 Future Enhancements

🚀 AI-Powered Chatbot – Integrate with GPT or Rasa for smarter responses.
📊 User Data Storage – Store chat history in a database (MongoDB/PostgreSQL).
💬 Multi-Language Support – Extend chatbot to support multiple languages.

🤝 Contributing
Got ideas to improve this chatbot? Feel free to contribute!

Fork the repository.
Create a new branch (feature-branch).
Commit your changes.
Push and create a Pull Request.
🛠 Troubleshooting

Issue	Solution
Flask app not running	Ensure Flask is installed (pip install flask)
API not responding	Check if the backend is running on port 5000
UI not loading	Ensure the frontend Flask app is running
JSON decode error	Check intents.json syntax
💡 Acknowledgments

💙 Built with Flask, Python, and Machine Learning.
🌟 Inspired by chatbot models like GPT, Rasa, and Dialogflow.

📜 License
MIT License
![License: MIT](https://img.shields.io/badge/License-MIT-green)

Copyright (c) 2025 Phiona Namugga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.