# Future Blink: AI Flow Builder

A visual prompt engineering platform built with React, Node.js, and ReactFlow. This application allows users to interact with AI models through a visual node-based interface and save conversations to a database.

## 🚀 Features

- **Visual Workflow**: Interactive node-based interface using `reactflow`.
- **AI Integration**: Powered by Google Gemini 2.0 Flash (via OpenRouter).
- **Persistent Storage**: Save your prompts and AI responses to MongoDB.
- **Real-time Feedback**: Modern toast notifications for status updates.
- **Responsive Design**: Styled with Tailwind CSS v4.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Flow Engine**: ReactFlow
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express v5
- **Database**: MongoDB (Mongoose)
- **AI API**: OpenRouter (Gemini 2.0 Flash)
- **Environment**: Dotenv

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- OpenRouter API Key

### 1. Clone the repository
```bash
git clone <repo-url>
cd future-blink
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory (optional for dev):
```env
VITE_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📖 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/ai/ask-ai` | Send prompt to Gemini and get response |
| POST | `/api/ai/save` | Save prompt/response pair to MongoDB |
