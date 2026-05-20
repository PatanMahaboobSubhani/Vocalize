# Vocalize AI - AI Voice Assistant Web App (React)

An ambient intelligence voice assistant built using React, Tailwind CSS, and Supabase. Vocalize AI orchestrates real-time audio and textual conversations with models from OpenAI, Anthropic, and Google Gemini.

## Features
- **Dynamic Model Selection**: Dynamically fetches supported models using Google AI Studio API key and saves active choices per user.
- **Voice Recognition**: Integrates standard Speech Recognition (Web Speech API) to transcribe user speech on the fly and trigger automated conversation flows.
- **Real-time History**: Stores full transcripts in Supabase, dynamic grouping by conversation session, and a built-in Transcript Viewer.
- **API Management**: Secure panel to save, edit, and encrypt API tokens for OpenAI, Anthropic, Gemini, and ElevenLabs.
- **Premium UI/UX**: Dark glassmorphic design system using Material Symbols, tailwind aesthetics, and responsive layout.

---

## Folder Structure
- `myapp/`: The main React application workspace.
- `landing_page_vocalize_ai/`, `dashboard_vocalize_ai/`, etc.: Static HTML design prototypes.

---

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Supabase Setup
This application requires a Supabase backend for authentication and database services.

Create the following tables in your Supabase SQL Editor:

#### `messages` Table (Chat History)
```sql
create table public.messages (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null, -- 'user' or 'ai'
  content text not null,
  model text,
  latency text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Policy: Users can manage their own messages
create policy "Users can manage their own messages" 
on public.messages for all 
using (auth.uid() = user_id);
```

#### `api_keys` Table (Orchestration Keys)
```sql
create table public.api_keys (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  provider text not null, -- 'OpenAI', 'Anthropic', 'Google Gemini', 'ElevenLabs'
  key_name text,
  secret_key text not null,
  status text default 'Verified'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.api_keys enable row level security;

-- Policy: Users can manage their own keys
create policy "Users can manage their own keys" 
on public.api_keys for all 
using (auth.uid() = user_id);
```

#### `user_settings` Table (Preferences)
```sql
create table public.user_settings (
  user_id uuid references auth.users(id) on delete cascade primary key,
  active_model text not null default 'gemini-1.5-flash',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_settings enable row level security;

-- Policy: Users can manage their own settings
create policy "Users can manage their own settings" 
on public.user_settings for all 
using (auth.uid() = user_id);
```

### 3. Installation & Run
1. Navigate to the app directory:
   ```bash
   cd myapp
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `myapp/` directory based on `.env.example`:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

## Production Build
To build the application for production:
```bash
npm run build
```
This compiles the assets into a production-ready `build` directory inside `myapp/`.
