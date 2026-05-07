# Gorilla AI 

> Help developers learn and solve problems faster — without the fluff.

Gorilla AI is a developer-focused AI learning assistant built for software engineers who want to debug faster, learn faster, and ship faster. It's not a general-purpose chatbot. It's a high-signal technical tool with a focused UX built around real developer workflows.

---

## Features

- **Streaming AI responses** — real-time output via SSE, no waiting for full completions
- **Persistent conversations** — chat history saved and synced with Supabase
- **Markdown + syntax highlighting** — clean rendering for code-heavy responses
- **Mermaid diagram support** — render flowcharts and architecture diagrams inline
- **Secure authentication** — Clerk-powered auth with session management
- **Conversation management** — create, select, and delete chats from a persistent sidebar
- **Rate limiting** — Upstash-backed request throttling to prevent abuse
- **Responsive dashboard** — optimized layout for focused developer use

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Clerk |
| Database | Supabase |
| AI Provider | OpenRouter API |
| Rate Limiting | Upstash |

---

## Architecture

Gorilla AI uses a `useReducer` + custom `useChat` hook architecture for predictable state management across conversations. The reducer handles the following actions:

- `NEW_CHAT` — creates a new conversation with an empty message store
- `SELECT_CHAT` — switches the active conversation
- `DELETE_CHAT` — removes a conversation from state and Supabase
- `ADD_USER_MESSAGE` — appends a user message to the active conversation
- `STREAM_MESSAGE` — handles streaming assistant response chunks
- `LOAD_CONVERSATIONS` — tracks loading state of the conversations created
- `LOAD_MESSAGES` — tracks loading state of the messages in the conversations created

Chat history is persisted to Supabase on completion and loaded on session restore.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Clerk application
- An OpenRouter API key
- An Upstash Redis instance

### Installation

```bash
git clone https://github.com/yourusername/gorilla-ai.git
cd gorilla-ai
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# OpenRouter
OPENROUTER_API_KEY=

# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
gorilla-ai/
├── app/
│   ├── api/          # API routes (chat, conversations)
│   └── dashboard/    # Main chat dashboard
├── components/
│   ├── dashboard-components/
│   └── ui/           # shadcn/ui components
├── hooks/
│   └── useChat.ts    # Core chat state and dispatch logic
├── reducers/
│   └── chatReducer.ts
└── types/
    └── chatTypes.ts
```

---

## Roadmap

- [ ] Intelligent model routing via classifier
- [ ] User diagram library (save Mermaid diagrams)
- [ ] Skill-level adaptive responses
- [ ] Mobile-optimized layout
- [ ] Open to feature ideas as well
---

## License

MIT