# PHANTOM — Advanced OSINT Intelligence Suite.

PHANTOM is a production-grade, highly-optimized Open Source Intelligence (OSINT) suite designed for speed and reliability. Built entirely on free-tier APIs, it offers a zero-cost solution for extensive reconnaissance. 

If API quotas are hit or keys are missing, PHANTOM degrades gracefully to free fallbacks (e.g., DuckDuckGo) and its fully standalone built-in Dork Engine.

## Features

- **Built-in Dork Engine**: Zero-configuration localized generation of actionable Google dork links.
- **Aggressive Caching**: Fast In-memory LRU cache reducing API calls for repetitive queries.
- **Graceful API Degradation**: DuckDuckGo fallback if Google quota is reached.
- **Parallel Fetching**: Results are retrieved asynchronously for lightning speed.
- **Fully Responsive UI**: Modern Next.js App Router with Radix + Tailwind CSS.

## Getting Started.

### 1. Installation.

Clone and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup (Optional but Recommended)

Copy the `.env.example` file to create your own configuration:

```bash.
cp .env.example .env.local
```

You can run the application immediately *without* adding API keys, and the **Dork Engine and Wikipedia integration will still work out-of-the-box**.

To fully enable image searching, GitHub analytics, and Google indexing:

1. **Google CSE API** (Required for the `All` results tab)
   - Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/) and configure a new whole-web engine.
   - Get the Search Engine ID (CX) and get an API key from Google Cloud.
   - 100 free requests per day.

2. **Pexels API** (Required for the `Images` results tab)
   - Go to [Pexels API](https://www.pexels.com/api/) and sign up for a key.
   - Completely free with generous limits.

3. **GitHub API Token** (Optional but recommended for the `GitHub` tab)
   - Generate a fine-grained PAT via Developer Settings on GitHub.
   - Increases the search rate limit from 60 req/hr to 5,000 req/hr.

### 3. Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment ##

Deploying PHANTOM is seamless with Vercel using their free Hobby plan.

1. Create a GitHub repository and push your project.
2. Sign up on [Vercel](https://vercel.com/) and authorize GitHub.
3. Import your PHANTOM repository.
4. Add the contents of your `.env.local` to the explicitly requested Environment Variables input.
5. Click **Deploy**.

## Architecture Roadmap

- `app/` - Next.js routing and server-side components.
- `app/api/` - Rate-limited serverless API middleware layer separating client from sensitive keys.
- `components/` - Radix powered accessible UI components.
- `lib/` - Internal intelligence gathering modules.

## Security

PHANTOM includes multiple security primitives including server-side secret obfuscation, request sanitization, and IP-level route rate limiting directly integrated in the core routing components.
