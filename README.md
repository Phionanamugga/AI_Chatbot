# 🧠 Multi-Utility AI Chatbot 
A production-ready AI-powered chatbot designed for **multi-utility companies** providing **electricity**, **water**, and **ferry services**. Built using **FastAPI**, **Langchain**, **OpenAI GPT-4**, **PostgreSQL**, and deployed on **Google Cloud Platform (GCP)**, this project showcases cutting-edge AI engineering tailored to smart infrastructure and public service operations.

## 🚀 Goal: To build a smart, responsive chatbot that can be extended with AI and deployed on the web.

## 🔧 Features
- 💬 Natural Language Chat (GPT-powered)
- 🧾 Billing & Account Inquiries (Electricity, Water, Ferry)
- ⚡ Report Power Outages & Get Status Updates
- 💧 Water Supply Disruption Alerts & Ticketing
- ⛴️ Ferry Schedules, Ticket Bookings, and Disruptions
- 📑 FAQ Retrieval from Policy Documents
- 📊 Usage Analytics Dashboard (Simulated or Real)
- 🗣️ Voice Input (via Whisper API)
- 🌍 Multilingual Support (i18next integration ready)
- 🧠 Intent Classification Model (Fallback & Custom Actions)

## 🏗️ Tech Stack
| Layer            | Tools                                           |
|------------------|--------------------------------------------------|
| **Frontend**     | React.js, Tailwind CSS, TypeScript (planned)     |
| **Backend**      | FastAPI, Python 3.10+                            |
| **AI/NLP**       | Langchain, OpenAI GPT-4, Whisper, SpaCy, FAISS   |
| **Database**     | PostgreSQL, Redis                                |
| **Vector Store** | Pinecone (optional), FAISS                      |
| **DevOps**       | Docker, GitHub Actions, GCP Cloud Run           |

## 🚀 Getting Started
📥 1. Clone the Repository
git clone https://github.com/Phionanamugga/AIchatbot.git
cd AIchatbot

## 🛠️ 2. Install Dependencies
Create a virtual environment (recommended):
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv/Scripts/activate  # Windows

## Install required libraries:
pip install -r requirements.txt

## Create `.env` File
```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379
```

## Build and Run with Docker Compose
```bash
docker-compose up --build
```

## Run Tests
```bash
pytest tests/

## ⚙️ Project Structure
```bash
multi_utility_chatbot/
├── app/
│   ├── api/              # FastAPI route handlers
│   ├── core/             # App config, logging
│   ├── models/           # SQLAlchemy ORM models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Chatbot logic and Langchain interface
│   └── db/               # DB session and CRUD utils
├── vectorstore/          # FAISS or Pinecone document embedding
├── scripts/              # Intent model training script
├── tests/                # Unit tests
├── Dockerfile            # Docker config
├── docker-compose.yml    # Local dev stack
├── .env                  # Environment variables
├── requirements.txt      # Dependencies
└── README.md             # Project documentation
```
🚀 Running the App

## 1️⃣ Start the Backend
cd backend
python api.py
## 2️⃣ Start the Frontend
cd frontend
python app.py
3️⃣ Access the App
Open your browser and go to:
🔗 http://127.0.0.1:5001

## 🔄 How It Works
1️⃣ User sends a message via the frontend UI.
2️⃣ The message is sent to the Flask API (/chat).
3️⃣ The Chatbot model processes the message and returns a response.
4️⃣ The frontend displays the chatbot's reply in real-time.

## 🌍 Deployment
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

## 📦 API Endpoints
Visit FastAPI docs at `/docs` for interactive Swagger UI.

- `POST /chat`: Send a user message and get a bot response
- `GET /health`: Health check
- `POST /report-issue`: Utility outage or ticket submissions


## 🧪 Demo & Examples
> Coming soon: Screenshots, hosted chatbot URL, and walkthrough video.


## 🎯 Future Enhancements
🚀 AI-Powered Chatbot – Integrate with GPT or Rasa for smarter responses.
📊 User Data Storage – Store chat history in a database (MongoDB/PostgreSQL).
💬 Multi-Language Support – Extend chatbot to support multiple languages.

## 🤝 Contributing
Got ideas to improve this chatbot? Feel free to contribute!
Fork the repository.
Create a new branch (feature-branch).
Commit your changes.
Push and create a Pull Request.

## 🛠 Troubleshooting
Issue	Solution
Flask app not running	Ensure Flask is installed (pip install flask)
API not responding	Check if the backend is running on port 5000
UI not loading	Ensure the frontend Flask app is running
JSON decode error	Check intents.json syntax

## 📚 Credits & Acknowledgements
- [OpenAI](https://openai.com)
- [Langchain](https://github.com/langchain-ai/langchain)
- [FastAPI](https://fastapi.tiangolo.com)
- [Google Cloud Platform](https://cloud.google.com)


## 📜 License
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

