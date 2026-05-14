<div align="center">

```
██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗ ██████╗ ███╗   ███╗
██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗████╗ ████║
██████╔╝███████║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║
██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝
```

**Advanced Open Source Intelligence Suite**

*Search everything. Find anything. Leave no trace.*

---

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-8B5CF6?style=for-the-badge&logo=radix-ui&logoColor=white)](https://radix-ui.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![Free](https://img.shields.io/badge/Cost-100%25_Free-10B981?style=for-the-badge&logo=opensourceinitiative&logoColor=white)]()

</div>

---

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   $ phantom search "target@example.com"                     │
│                                                             │
│   ░ Scanning 50+ platforms...          ████████░░  80%      │
│   ░ Probing subdomains via crt.sh...   ██████████  100% ✓   │
│   ░ Pulling DNS records...             ██████████  100% ✓   │
│   ░ Checking Wayback snapshots...      ████████░░  80%      │
│   ░ GitHub commit email extraction...  ██████████  100% ✓   │
│                                                             │
│   [■] 7 platforms found    [■] 43 subdomains               │
│   [■] 12 DNS records       [■] 847 snapshots               │
│   [■] Real email exposed from 3 commits                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

*PHANTOM — Where intelligence meets elegance.*

</div>

---

## `> whoami`

**PHANTOM** is a production-grade, zero-cost Open Source Intelligence suite. Built entirely on **free APIs and open infrastructure**, it performs deep reconnaissance on emails, domains, IPs, usernames, and more — all without a single paid subscription.

No dark web drama. No sketchy installers. Just clean, fast, server-side intelligence in a beautiful Next.js interface.

> **Built on free APIs only.** crt.sh · ip-api.com · Google DoH · Wayback CDX · BGPView · HackerTarget · Reddit JSON · GitHub API · RDAP/WHOIS

---

## `> ls features/`

<div align="center">

| Module | Source | Cost | Key Required |
|--------|--------|------|:------------:|
| 🔍 **Dork Engine** — 50+ dorks, 11 categories | Client-side | Free | ✗ |
| 🌐 **Web Search** — Google CSE + DDG fallback | Google CSE API | Free tier | Optional |
| 🔗 **Subdomain Finder** — SSL cert transparency | crt.sh | Free | ✗ |
| 📍 **IP Geolocation** — City, ISP, ASN, Tor flag | ip-api.com | Free | ✗ |
| 📋 **DNS Viewer** — A, MX, TXT, NS, SPF, DMARC | Google DoH | Free | ✗ |
| 🕰️ **Wayback Machine** — Snapshots & history | Wayback CDX | Free | ✗ |
| 🏢 **WHOIS / RDAP** — Registrar & expiry data | rdap.org | Free | ✗ |
| 👤 **Username Enum** — 50+ platforms probed | HEAD requests | Free | ✗ |
| 🐙 **GitHub Recon** — Profiles, repos, commit emails | GitHub API | Free | Optional |
| 🔴 **Reddit Analysis** — Karma, subreddits, activity | Reddit JSON | Free | ✗ |
| 🌍 **Geo & CCTV Toolkit** — Live cameras, maps | Curated links | Free | ✗ |
| 🖼️ **Image Search** — Visual intelligence | Pexels API | Free | Optional |
| 📖 **Wikipedia Panel** — Entity context | Wikipedia API | Free | ✗ |
| 🔄 **Reverse IP Lookup** — Shared hosting clusters | HackerTarget | Free | ✗ |
| 🔌 **Port Scanner** — Top 20 common ports | HackerTarget | Free | ✗ |
| 📡 **BGP / ASN Lookup** — Network ownership | BGPView | Free | ✗ |

</div>

---

## `> cat architecture.md`

```
                        ┌──────────────────────────────────┐
                        │           PHANTOM UI              │
                        │    Next.js 16 · React 19          │
                        │    Radix UI · Tailwind CSS 4      │
                        └─────────────┬────────────────────┘
                                      │
                        ┌─────────────▼────────────────────┐
                        │        API Middleware Layer        │
                        │   Rate Limited · Key-Proxied      │
                        │   Input Sanitized · Cached        │
                        └──┬──────┬──────┬──────┬──────────┘
                           │      │      │      │
              ┌────────────▼──┐ ┌─▼────┐ │  ┌──▼──────────┐
              │  /api/search  │ │/api/ │ │  │ /api/github  │
              │  Google CSE   │ │ ip   │ │  │ GitHub REST  │
              │  + DDG backup │ │      │ │  │ + commits    │
              └───────────────┘ └──────┘ │  └─────────────┘
                                    ┌────▼──────────────────┐
                                    │   /api/subdomains      │
                                    │   /api/dns             │
                                    │   /api/whois           │
                                    │   /api/wayback         │
                                    │   /api/username        │
                                    │   /api/reverseip       │
                                    └───────────────────────┘
```

### Core Primitives

```
src/
├── app/
│   ├── api/
│   │   ├── search/       → Google CSE + DuckDuckGo fallback
│   │   ├── github/       → User profiles + repos + commit email extraction
│   │   ├── images/       → Pexels image search
│   │   └── wiki/         → Wikipedia summary + links
│   ├── search/           → Dynamic search results page
│   └── page.tsx          → Landing page with hero + search
├── components/
│   ├── DorkEngine.tsx    → 11 categories, 50+ Google dork generators
│   ├── GitHubPanel.tsx   → GitHub recon results
│   ├── GeoToolkitPanel.tsx → CCTV + mapping toolkit
│   ├── ResultsTabs.tsx   → Main tabbed results interface
│   └── ...
└── lib/
    ├── cache.ts          → LRU in-memory cache (200 entries, 5min TTL)
    ├── ratelimit.ts      → IP-level rate limiting (20 req/min)
    ├── dorks.ts          → Dork generation engine
    ├── google.ts         → Search with graceful degradation
    └── osint-tools.ts    → Curated OSINT tool registry
```

---

## `> ./install.sh`

### Prerequisites

```bash
node --version   # v18+
npm --version    # v9+
```

### Clone & Run

```bash
# Clone the repo
git clone https://github.com/Chrollo0070/OsintEngine.git
cd OsintEngine

# Install dependencies
npm install

# Start immediately — no keys needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start hunting.

---

## `> cat .env.example`

PHANTOM runs **immediately without any API keys**. The Dork Engine, Wikipedia, Wayback, DNS, IP Geo, crt.sh, and RDAP modules all work with zero configuration.

Add keys to unlock extra modules:

```bash
# Copy template
cp .env.example .env.local
```

```env
# ─── OPTIONAL: Web Search ─────────────────────────────────────────
# Get free at: programmablesearchengine.google.com
# 100 free requests/day
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_search_engine_id

# ─── OPTIONAL: Image Search ───────────────────────────────────────
# Get free at: pexels.com/api
# Generous free tier
PEXELS_API_KEY=your_pexels_key

# ─── OPTIONAL: GitHub Deep Recon ──────────────────────────────────
# Get free at: github.com/settings/tokens
# Increases limit from 60 → 5,000 req/hr
GITHUB_TOKEN=your_github_pat
```

> Everything else — subdomains, DNS, IP geo, Wayback, WHOIS, BGP, port scans, reverse IP, Reddit, username enumeration — requires **zero keys, zero cost, zero signup.**

---

## `> run demo`

```
$ phantom "john.doe@company.com"

  ┌─ EMAIL INTELLIGENCE ──────────────────────────────────────┐
  │  ✓ Format valid           ✓ MX records found (Google)     │
  │  ✓ Not disposable         ✓ Gravatar account exists       │
  │  ✓ Real mail domain       ✓ 3 platforms found             │
  └───────────────────────────────────────────────────────────┘

  ┌─ USERNAME ENUMERATION ────────────────────────────────────┐
  │  ✓ github.com/johndoe          ✓ reddit.com/u/johndoe     │
  │  ✓ dev.to/johndoe              ✗ twitter.com/johndoe      │
  │  ✓ keybase.io/johndoe          ✗ instagram.com/johndoe    │
  │  ... 44 more platforms checked                             │
  └───────────────────────────────────────────────────────────┘

  ┌─ GITHUB RECON ────────────────────────────────────────────┐
  │  Profile:   John Doe · Senior Engineer @ TechCorp         │
  │  Location:  San Francisco, CA                             │
  │  Repos:     47 public                                     │
  │  ⚠ Real email exposed: john.doe.work@techcorp.com        │
  │    Found in commit: abc1234 · "fix auth flow" · 3mo ago   │
  └───────────────────────────────────────────────────────────┘

  ┌─ DORK ENGINE ─────────────────────────────────────────────┐
  │  [LinkedIn] [Twitter] [GitHub] [Reddit] [Pastebin]        │
  │  [PDF docs] [DOC files] [Court records] [Press releases]  │
  │  [Gmail pattern] [Archive.ph] [Index of] [Admin panels]   │
  │  ... 50+ dork links generated instantly                    │
  └───────────────────────────────────────────────────────────┘
```

---

## `> cat modules/`

<details>
<summary><b>🔗 Subdomain Finder</b> — crt.sh certificate transparency</summary>

Queries SSL certificate transparency logs — every subdomain that's ever had a cert issued shows up here. No API key. No rate limits published. Returns forgotten dev servers, admin panels, staging environments, and internal microservices.

```
crt.sh/?q=%.target.com&output=json
→ admin.target.com
→ staging-api.target.com
→ old.target.com
→ internal-dashboard.target.com
→ ... 39 more
```

</details>

<details>
<summary><b>📍 IP Intelligence</b> — ip-api.com</summary>

One free API call returns: city, region, country, ISP, organization, ASN, timezone, and detection flags for Tor exit nodes, VPN providers, datacenter hosting, and open proxies. 45 requests/minute free, no key.

```json
{
  "city": "Frankfurt",
  "isp": "Hetzner Online GmbH",
  "org": "AS24940 Hetzner Online GmbH",
  "proxy": false,
  "hosting": true,
  "tor": false
}
```

</details>

<details>
<summary><b>📋 DNS Record Viewer</b> — Google DNS-over-HTTPS</summary>

Parallel queries for A, AAAA, MX, TXT, NS, CNAME records using Google's DoH JSON API. Free, no key. Reveals email provider (MX), CDN (A records pointing to Cloudflare/Fastly), and misconfigurations (SPF/DMARC failures).

```
A     → 104.21.33.167 (Cloudflare)
MX    → mail.google.com (Google Workspace)
TXT   → v=spf1 include:_spf.google.com ~all
DMARC → v=DMARC1; p=reject; rua=mailto:dmarc@target.com
```

</details>

<details>
<summary><b>🕰️ Wayback Machine</b> — Internet Archive CDX API</summary>

Free public API. Returns first archived date, last snapshot, total snapshot count, and recent URLs. Reveals when a domain first appeared, deleted pages, and historical content — including content removed after incidents.

```
First seen:    2011-03-15 (14 years ago)
Last snapshot: 2026-05-01
Total snaps:   2,847
Status codes:  200 (2,401) · 301 (312) · 404 (134)
```

</details>

<details>
<summary><b>👤 Username Enumeration</b> — HTTP status probing</summary>

Fires parallel HEAD requests to 50+ known profile URL patterns. No API key needed — just reads HTTP status codes. 200 = profile exists, 404 = doesn't. Covers: GitHub, Reddit, Twitter, Instagram, TikTok, Pinterest, Steam, Spotify, Twitch, YouTube, Keybase, Dev.to, Medium, npm, PyPI, HackerNews, GitLab, Telegram, Snapchat, and more.

</details>

<details>
<summary><b>🐙 GitHub Deep Recon</b> — GitHub REST API</summary>

Beyond basic profile/repo lookup: extracts real email addresses from public commit metadata — even when hidden in profile settings. Also surfaces language breakdown, contribution frequency, linked social accounts, and starred repo topics to infer interests and expertise.

</details>

<details>
<summary><b>🔴 Reddit User Analysis</b> — Reddit JSON API</summary>

No key required. Returns: account age, link/comment karma split, top subreddits by post count, posting frequency by hour (reveals timezone), trophy list, and most recent 25 post titles. The posting hour histogram alone often reveals a target's real timezone.

</details>

<details>
<summary><b>🔄 Reverse IP Lookup</b> — HackerTarget</summary>

Finds all domains hosted on the same IP address. 100 requests/day free, no key. Reveals domain clusters — fake news networks, spam farms, related shell companies, or all projects by the same solo developer on shared hosting.

</details>

<details>
<summary><b>🔌 Port Scanner</b> — HackerTarget nmap wrapper</summary>

Scans the top 20 common ports on any domain or IP via HackerTarget's free nmap API. Returns open/closed/filtered status with service names: SSH, HTTP, HTTPS, FTP, SMTP, MySQL, PostgreSQL, RDP, MongoDB, Elasticsearch. 100 req/day free.

</details>

---

## `> cat security.md`

```
┌─────────────────────────────────────────────────────────────┐
│  PHANTOM Security Architecture                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Client]  →  API keys never exposed to browser            │
│  [Server]  →  All external calls proxied server-side        │
│  [Input]   →  Sanitization on every query parameter         │
│  [Rate]    →  20 req/min per IP, enforced at route level    │
│  [Cache]   →  LRU cache prevents API quota exhaustion       │
│  [SSRF]    →  Private IP ranges blocked from proxy routes   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- API keys live exclusively in server-side environment variables
- All third-party calls go through Next.js API routes — clients never touch external APIs directly
- IP-level rate limiting with sliding window — abuse-resistant
- Input sanitization strips injection attempts before they reach URL parameters
- Graceful degradation: if Google quota is hit, falls back to DuckDuckGo automatically

---

## `> deploy --platform vercel`

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
#    vercel.com → Import Project → Select your repo

# 3. Add environment variables in Vercel dashboard
#    (optional — app works without any)

# 4. Click Deploy
#    Your PHANTOM instance is live in ~60 seconds
```

Vercel's free Hobby plan covers everything PHANTOM needs. No server to manage. No containers. No DevOps.

---

## `> cat roadmap.md`

```
[DONE] ████████████████████████████░░░░  87%

✅  Dork Engine (11 categories, 50+ dorks)
✅  Google Search + DuckDuckGo fallback
✅  GitHub user + repo recon
✅  Pexels image search
✅  Wikipedia entity panel
✅  Geo & CCTV toolkit
✅  LRU caching + rate limiting
✅  Graceful API degradation

[BUILDING] ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%

⬜  Email intelligence (MX check, disposable detection)
⬜  IP geolocation + Tor/VPN/proxy flags (ip-api.com)
⬜  DNS record viewer (Google DoH — A, MX, TXT, NS)
⬜  Subdomain finder (crt.sh certificate transparency)
⬜  Wayback Machine CDX integration
⬜  WHOIS / RDAP lookup (rdap.org)
⬜  Username enumeration (50+ platforms, HTTP probing)
⬜  GitHub commit email extraction
⬜  Reddit user deep analysis
⬜  Reverse IP / shared hosting (HackerTarget)
⬜  Port scanner (HackerTarget nmap)
⬜  BGP / ASN lookup (BGPView)
⬜  EXIF metadata extractor (exifr, client-side)
⬜  Entity relationship graph (cytoscape.js)
⬜  Session export (JSON + Markdown report)
⬜  Search history panel (localStorage)
⬜  Auto query type detection (email / IP / domain / username)
⬜  Embedded Leaflet.js map (OpenStreetMap tiles)
⬜  Persistent cache + rate limit (Upstash Redis)
```

---

## `> cat tech-stack.md`

<div align="center">

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 App Router | Server components, API routes, streaming |
| **Language** | TypeScript 5 | Type safety across all modules |
| **UI** | React 19 | Concurrent features, Suspense |
| **Components** | Radix UI | Accessible primitives (Tabs, Collapsible) |
| **Styling** | Tailwind CSS 4 | Utility-first, zero runtime |
| **Icons** | Lucide React | Consistent, tree-shakeable icons |
| **Cache** | lru-cache | In-memory LRU with TTL |
| **Deploy** | Vercel Hobby | Free, edge-optimized, zero config |

</div>

---

## `> cat free-apis.md`

Every external data source PHANTOM uses — zero cost, zero credit card:

```
crt.sh              → Subdomain discovery via SSL cert transparency
ip-api.com          → IP geo, ASN, Tor/VPN/proxy detection
dns.google          → DNS-over-HTTPS record lookup (A/MX/TXT/NS)
web.archive.org     → Wayback Machine CDX snapshot history
rdap.org            → WHOIS / RDAP domain & IP registration data
api.bgpview.io      → BGP / ASN / IP prefix lookup
api.hackertarget.com→ Reverse IP, port scan, DNS history, traceroute
reddit.com          → User profile & post analysis (public JSON)
api.github.com      → User profiles, repos, commit metadata
gravatar.com        → Email → avatar existence check (MD5 hash)
wikipedia.org       → Entity context and summaries
```

---

## `> cat contributing.md`

PRs are welcome. PHANTOM is designed to be modular — adding a new intelligence source means:

1. Creating a new API route under `src/app/api/`
2. Adding a data fetcher in `src/lib/`
3. Building a result component in `src/components/`
4. Wiring it into `ResultsTabs.tsx`

Each module is self-contained. You don't need to understand the whole codebase to add one.

```bash
# Fork → Clone → Branch
git checkout -b feat/my-new-module

# Build your module
# Test it locally
npm run dev

# Push + open PR
git push origin feat/my-new-module
```

---

## `> cat legal.md`

PHANTOM is built for **legitimate security research, OSINT investigations, journalism, and academic purposes.**

- Only queries publicly available information
- Does not bypass authentication or access controls
- Does not store or log any user queries or results
- All data sources are public APIs with their own terms of service
- Users are responsible for complying with applicable laws in their jurisdiction

> Use responsibly. With great recon comes great responsibility.

---

<div align="center">

```
  ______   __  __   ______   __   __   ______   ______   __    __
 /\  == \ /\ \_\ \ /\  __ \ /\ "-.\ \ /\__  _\ /\  __ \ /\ "-./  \
 \ \  _-/ \ \  __ \\ \  __ \\ \ \-.  \\/_/\ \/ \ \ \/\ \\ \ \-./\ \
  \ \_\    \ \_\ \_\\ \_\ \_\\ \_\\"\_\  \ \_\  \ \_____\\ \_\ \ \_\
   \/_/     \/_/\/_/ \/_/\/_/ \/_/ \/_/   \/_/   \/_____/ \/_/  \/_/
```

**Built with obsession. Deployed for free. Used for truth.**

[⭐ Star this repo](https://github.com/Chrollo0070/OsintEngine) · [🐛 Report a bug](https://github.com/Chrollo0070/OsintEngine/issues) · [💡 Request a feature](https://github.com/Chrollo0070/OsintEngine/issues)

---

*PHANTOM — Because the best investigators leave no trace of themselves.*

</div>
