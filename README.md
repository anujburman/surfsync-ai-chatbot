# SurfSync AI Business Chatbot

A deployable Next.js chatbot grounded in the supplied SurfSync knowledge base, with consent-based lead capture to Supabase.

## Architecture

1. `app/page.tsx` renders the responsive chat UI and enquiry form.
2. `POST /api/chat` validates the last 12 messages, rate-limits requests, adds verified company knowledge, and calls the OpenAI Responses API from the server.
3. The model receives strict rules against unsupported claims and prompt injection.
4. `POST /api/leads` validates enquiry fields and writes them from the server to Supabase.
5. The Supabase service-role key never reaches the browser. RLS is enabled and no public table policy is created.

## Prerequisites

- Node.js 22 or newer
- Git and a GitHub account
- OpenAI API key with billing/usage enabled
- Supabase project
- Vercel account

## Local setup, line by line

```bash
# 1. Enter the unzipped project
cd surfsync-ai-chatbot

# 2. Install exact dependencies resolved by npm
npm install

# 3. Create your private local environment file
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open `http://localhost:3000`. Edit `.env.local` and replace every placeholder. Never commit `.env.local`.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**, paste the complete contents of `supabase.sql`, and run it once.
3. Open **Project Settings > API**.
4. Copy the project URL into `SUPABASE_URL`.
5. Copy the server-only service-role key into `SUPABASE_SERVICE_ROLE_KEY`. Never prefix it with `NEXT_PUBLIC_`.
6. Test the form, then inspect **Table Editor > leads**.

## OpenAI setup

1. Create an API key in the OpenAI platform.
2. Put it in `OPENAI_API_KEY`.
3. Set `OPENAI_MODEL` to a model available to your account. The included default is `gpt-5-mini`.
4. Keep both values server-side. If the API reports an unavailable model, choose one shown in your account and redeploy.

## Build test before deployment

```bash
npm run build
npm run start
```

Visit `/api/health`. Both configuration flags should be `true`. Then test chat, follow-ups, unknown questions, pricing refusal, form validation, consent and database insertion.

## GitHub upload

```bash
git init
git add .
git commit -m "Complete SurfSync AI chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/surfsync-ai-chatbot.git
git push -u origin main
```

## Vercel deployment

1. Sign in to Vercel and select **Add New > Project**.
2. Import the GitHub repository. Vercel should detect Next.js.
3. In **Environment Variables**, add `OPENAI_API_KEY`, `OPENAI_MODEL`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` for Production. Add them to Preview too if previews must work.
4. Select **Deploy**.
5. Open the generated `*.vercel.app` URL and `/api/health`.
6. If you change an environment variable, redeploy because old deployments do not receive the new value.
7. Optional custom domain: **Project > Settings > Domains**, add the domain, then apply the requested DNS record.

## What every important file does

- `app/page.tsx`: browser UI, conversation state, loading state, restart, shortcuts and modal lead form.
- `app/globals.css`: responsive SurfSync-style theme.
- `app/api/chat/route.ts`: protected server-side AI call, schema validation and basic per-instance rate limit.
- `app/api/leads/route.ts`: consent and field validation plus database insert.
- `lib/knowledge.ts`: production grounding text used on every model call.
- `knowledge-base.json`: deliverable-friendly structured knowledge sample.
- `supabase.sql`: lead table, constraints, index and RLS.
- `.env.example`: names of required secrets without real credentials.
- `TESTING_REPORT.md`: acceptance test checklist.

## Production hardening after MVP

- Replace in-memory rate limiting with Upstash Redis or another shared store because serverless instances do not share memory.
- Add CAPTCHA and a privacy-policy link before public marketing campaigns.
- Configure retention/deletion rules for personal data and restrict Supabase dashboard access.
- Add authenticated CRM/email delivery through a server-side integration.
- Add monitoring, alerting and automated end-to-end tests.
- Re-verify the official company website periodically and update the knowledge verification date.

## Known limitations

The chatbot uses a compact structured knowledge prompt, not vector RAG. Leads are stored in Supabase but are not emailed. Conversation state is browser-session only. The basic rate limiter is instance-local. Company-specific privacy wording, SMTP/CRM credentials, domain and production API keys must be supplied by the owner.
