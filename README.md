# SuburbScout 🇦🇺

**Free, independent suburb profiles for every postcode in Australia.**

> Site name: SuburbScout.com.au
> Built with: Astro (static), Claude Code (AI research), GitHub Pages (free hosting), Google AdSense (income)

---

## Quick start (do this once)

### 1. Prerequisites
- Node.js 18 or higher
- A GitHub account
- An Anthropic account (for Claude Code)

### 2. Set up the project
```bash
git clone https://github.com/YOUR_USERNAME/suburbscout.git
cd suburbscout
npm install
npm run dev        # Preview at http://localhost:4321
```

### 3. Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
claude              # Opens Claude Code in your terminal
```

### 4. Generate your first suburb pages
Inside Claude Code, paste this prompt:
```
Read the file scripts/research-suburbs.js carefully, then generate suburb content files
for the first 10 suburbs in the SUBURB_LIST. Follow the template exactly.
Write each file to src/content/suburbs/[slug].md before moving to the next.
```

Claude Code will search the web for each suburb and write all the files automatically.

### 5. Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial suburb content"
git push
```
Then go to your GitHub repo → Settings → Pages → Source: GitHub Actions.
The site will auto-build and publish on every push.

---

## Project structure

```
suburbscout/
├── src/
│   ├── layouts/
│   │   └── SuburbLayout.astro      ← Main page layout with ads
│   ├── pages/
│   │   ├── [state]/[suburb].astro  ← Dynamic suburb pages
│   │   ├── compare.astro           ← Side-by-side suburb comparison
│   │   ├── quiz.astro              ← "Find My Suburb" quiz
│   │   └── index.astro             ← Homepage
│   ├── content/
│   │   └── suburbs/
│   │       ├── surry-hills-nsw.md  ← Example suburb file
│   │       └── ...                 ← Claude Code writes these
│   └── styles/
│       └── global.css
├── scripts/
│   └── research-suburbs.js         ← Claude Code research prompt + suburb list
├── .github/
│   └── workflows/
│       └── monthly-refresh.yml     ← Auto-updates suburb data monthly
├── astro.config.mjs
└── package.json
```

---

## Adding AdSense

1. Go to [google.com/adsense](https://adsense.google.com) and apply with your site
2. Once approved, get your publisher ID (looks like `ca-pub-1234567890123456`)
3. Find-and-replace `ca-pub-XXXXXXXXXXXXXXXX` in all `.astro` files with your real ID
4. Replace ad slot numbers (e.g. `1234567890`) with your actual ad unit IDs from AdSense

**Ad placements already built in:**
- Leaderboard (728×90) — below the header, every page
- Rectangle (300×250) — sidebar, every suburb page (×2)
- In-content responsive — between sections on suburb pages (×2)
- Comparison page ad
- Quiz mid-point ad

---

## Scaling content with Claude Code

### Generating 50 suburbs at once
Open Claude Code and run:
```
Read scripts/research-suburbs.js. Generate suburb files for items 11 through 60 in the
SUBURB_LIST. Use web search for current data. Write each file and confirm before next.
```

### Monthly data refresh (automated)
Add your Anthropic API key to GitHub Secrets as `ANTHROPIC_API_KEY`.
The `.github/workflows/monthly-refresh.yml` will automatically:
- Update the 50 oldest suburb files on the 1st of every month
- Commit the changes
- Rebuild and redeploy the site

---

## SEO strategy

### Page titles to target
Every suburb page automatically targets:
- `[suburb name] suburb review`
- `[suburb name] [state] suburb profile`
- `what is [suburb name] like to live in`
- `[suburb name] [postcode] population crime transport`

### High-value content to add first
1. **Top 10 listicles** — e.g. "10 best suburbs in Sydney under $1m" (see SuburbsGuide for format)
2. **Compare pages** — e.g. "Newtown vs Surry Hills" (huge search volume, zero competition)
3. **Commute finder** — "suburbs 30 min from [CBD] by train"
4. **State index pages** — /nsw, /vic, /qld with suburb grid

### Content collection config
Add this to `src/content/config.ts` so Astro validates your suburb files:
```typescript
import { defineCollection, z } from 'astro:content';

const suburbs = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    state: z.string(),
    postcode: z.string(),
    lga: z.string(),
    region: z.string(),
    scout_score: z.number().min(0).max(10),
    scout_verdict: z.string(),
    rating_affordability_buy: z.number(),
    rating_affordability_rent: z.number(),
    rating_family: z.number(),
    rating_nature: z.number(),
    rating_safety: z.number(),
    rating_transport: z.number(),
    rating_things_to_do: z.number(),
    rating_noise: z.number(),
    population: z.number(),
    median_house_price: z.number(),
    median_rent_pw: z.number(),
    price_growth_5yr: z.number(),
    median_age: z.number(),
    commute_train_mins: z.number(),
    commute_drive_mins: z.number(),
    nearest_station: z.string(),
    flood_risk: z.enum(['low', 'medium', 'high']),
    bushfire_risk: z.enum(['low', 'medium', 'high']),
    crime_rank: z.number(),
    summary: z.string().max(160),
    last_updated: z.string(),
    schools: z.array(z.object({
      name: z.string(),
      type: z.string(),
      naplan_band: z.number().min(1).max(10),
    })).optional(),
    ideal_for: z.array(z.string()).optional(),
    ethnic_breakdown: z.array(z.string()).optional(),
  })
});

export const collections = { suburbs };
```

---

## Revenue streams

| Stream | When | Est. monthly (50k visits/mo) |
|--------|------|------------------------------|
| Google AdSense | From launch | $400–$800 |
| REA/Domain affiliate | Once 100+ pages live | $200–$500 |
| Sponsored suburb features | 6+ months in | $300–$1,000+ |
| Premium PDF reports | Optional add-on | $50–$200 |
| Email newsletter | Build list from day 1 | $100–$400 |

---

## Data sources (all free and legitimate)

- **ABS** (abs.gov.au) — population, demographics, census data
- **data.gov.au** — federal open data portal
- **State government open data portals** — crime stats (NSW Police, Crime Statistics Agency VIC, etc.)
- **My School** (myschool.edu.au) — school NAPLAN data
- **OpenStreetMap** — points of interest
- **State planning portals** — flood and bushfire mapping

---

## License
Content generated by Claude Code is for use on SuburbScout only. Suburb data is sourced from public government datasets under Creative Commons licences. See data.gov.au for terms.
