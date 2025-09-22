# AI Agent Frontend (Vite + React + Tailwind)

A modern, responsive AI agent demo frontend. No backend required by default (uses mock/localStorage). Ready to integrate with a Spring Boot backend later.

## Quick Start

Prerequisites:
- Node.js 18+ and npm

Install and run:
```bash
npm install
npm run dev
```
Open: http://localhost:5173/login

## Flow
- Login: enter a username → Continue
- Upload: drag & drop or click to upload a file (required)
- Features: available only after at least one file is uploaded
  - Flashcards: click card to reveal, add “New Card”
  - 10-question Test: “Finish and Score”, then “Reset” and “New Test”
  - Chat: chat about the active document (mocked)

## Tech Stack
- React 18, Vite, Tailwind CSS
- React Router, Framer Motion, React Dropzone, Lucide React
- Mock/localStorage utilities: `src/utils/storage.js`

## Project Scripts
```bash
npm run dev      # start dev server
npm run build    # build for production
npm run preview  # preview production build
```

## Repository Usage
To run this project locally:
```bash
git clone https://github.com/kaanunidev/frontend2.git
cd frontend2/ai-agent-app
npm install
npm run dev
```

## Backend Integration (Spring Boot)
When connecting to your backend ([sprinai](https://github.com/buraktaskin-zmx/sprinai.git)) consider endpoints:
- Auth: POST /api/v1/auth/login
- Files: POST /api/v1/files (multipart), GET /api/v1/files
- Analysis:
  - Tests: POST /api/v1/analysis/{fileId}/test → {jobId}, then GET /api/v1/tests/{fileId}
  - Cards: POST /api/v1/analysis/{fileId}/cards, GET /api/v1/cards/{fileId}
- Chat: SSE/WS stream per file

Frontend config idea:
- .env.development: VITE_API_URL=http://localhost:8080/api/v1
- Gradually replace `storage.js` mocks with API calls (upload → tests/cards → chat).

## License
Add a LICENSE (e.g., MIT) if public.

## Türkçe Kısa Bilgi
- Çalıştırma: `npm install` → `npm run dev` → `http://localhost:5173/login`
- Dosya yüklenmeden Features görünmez/erişilemez.
- Flashcards: karta tıkla, “New Card” ile kart ekle.
- Test: bitirince skor, “Reset” ve “New Test” tuşları.
- Chat: aktif doküman adı gösterilir, mock yanıt üretir.
