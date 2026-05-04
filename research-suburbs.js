#!/usr/bin/env node
/**
 * SuburbScout — Claude Code Research Script
 * ==========================================
 * HOW TO USE:
 *   1. Open your terminal in the suburbscout project folder
 *   2. Run: claude
 *   3. Paste this entire file's contents as your prompt, then say:
 *      "Run this script and generate suburb files for the first 20 suburbs in the list"
 *
 * Claude Code will:
 *   - Search the web for each suburb's data
 *   - Write a properly formatted .md file to src/content/suburbs/
 *   - Continue to the next suburb automatically
 *
 * PROMPT TO PASTE INTO CLAUDE CODE:
 * -----------------------------------
 * You are building SuburbScout, an Australian suburb guide website.
 * For each suburb in the SUBURB_LIST below, do the following:
 *
 * 1. Search the web for: "[suburb name] [state] suburb profile population ABS census"
 * 2. Search the web for: "[suburb name] [state] median house price 2024"
 * 3. Search the web for: "[suburb name] [state] crime rate safety"
 * 4. Search the web for: "[suburb name] [state] schools NAPLAN"
 * 5. Search the web for: "[suburb name] [state] flood risk bushfire risk"
 *
 * Then write a file to src/content/suburbs/[slug].md using the TEMPLATE below.
 * The slug format is: [suburb-name-lowercase-hyphens]-[state-lowercase]
 * Example: "Surry Hills, NSW" → "surry-hills-nsw"
 *
 * For the Scout Score, calculate it as:
 * (rating_safety * 0.2) + (rating_transport * 0.15) + (rating_affordability_buy * 0.15) +
 * (rating_family * 0.1) + (rating_things_to_do * 0.1) + (rating_nature * 0.1) +
 * (rating_noise * 0.1) + (rating_affordability_rent * 0.1)
 *
 * For the description body (below the frontmatter ---), write 3-4 paragraphs
 * covering: character/vibe, housing and affordability, transport, and lifestyle trade-offs.
 * Write in a clear, balanced tone. Be honest about downsides.
 *
 * Confirm each file after writing it before moving to the next suburb.
 */

const SUBURB_LIST = [
  // ===== NSW — Start with high-search-volume suburbs =====
  { name: "Surry Hills",       state: "NSW", postcode: "2010" },
  { name: "Newtown",           state: "NSW", postcode: "2042" },
  { name: "Glebe",             state: "NSW", postcode: "2037" },
  { name: "Paddington",        state: "NSW", postcode: "2021" },
  { name: "Manly",             state: "NSW", postcode: "2095" },
  { name: "Bondi",             state: "NSW", postcode: "2026" },
  { name: "Balmain",           state: "NSW", postcode: "2041" },
  { name: "Pyrmont",           state: "NSW", postcode: "2009" },
  { name: "Mosman",            state: "NSW", postcode: "2088" },
  { name: "Crows Nest",        state: "NSW", postcode: "2065" },
  { name: "Leichhardt",        state: "NSW", postcode: "2040" },
  { name: "Chatswood",         state: "NSW", postcode: "2067" },
  { name: "Parramatta",        state: "NSW", postcode: "2150" },
  { name: "Penrith",           state: "NSW", postcode: "2750" },
  { name: "Liverpool",         state: "NSW", postcode: "2170" },

  // ===== VIC =====
  { name: "Fitzroy",           state: "VIC", postcode: "3065" },
  { name: "Collingwood",       state: "VIC", postcode: "3066" },
  { name: "Richmond",          state: "VIC", postcode: "3121" },
  { name: "South Yarra",       state: "VIC", postcode: "3141" },
  { name: "St Kilda",          state: "VIC", postcode: "3182" },
  { name: "Footscray",         state: "VIC", postcode: "3011" },
  { name: "Brunswick",         state: "VIC", postcode: "3056" },
  { name: "Hawthorn",          state: "VIC", postcode: "3122" },
  { name: "Prahran",           state: "VIC", postcode: "3181" },
  { name: "Docklands",         state: "VIC", postcode: "3008" },

  // ===== QLD =====
  { name: "Fortitude Valley",  state: "QLD", postcode: "4006" },
  { name: "New Farm",          state: "QLD", postcode: "4005" },
  { name: "West End",          state: "QLD", postcode: "4101" },
  { name: "Paddington",        state: "QLD", postcode: "4064" },
  { name: "Teneriffe",         state: "QLD", postcode: "4005" },
  { name: "Surfers Paradise",  state: "QLD", postcode: "4217" },
  { name: "Noosa Heads",       state: "QLD", postcode: "4567" },

  // ===== WA =====
  { name: "Fremantle",         state: "WA",  postcode: "6160" },
  { name: "Subiaco",           state: "WA",  postcode: "6008" },
  { name: "Cottesloe",         state: "WA",  postcode: "6011" },
  { name: "Leederville",       state: "WA",  postcode: "6007" },

  // ===== SA =====
  { name: "Norwood",           state: "SA",  postcode: "5067" },
  { name: "Prospect",          state: "SA",  postcode: "5082" },
  { name: "Glenelg",           state: "SA",  postcode: "5045" },

  // ===== ACT =====
  { name: "Braddon",           state: "ACT", postcode: "2612" },
  { name: "Kingston",          state: "ACT", postcode: "2604" },

  // ===== TAS =====
  { name: "Battery Point",     state: "TAS", postcode: "7004" },
  { name: "Sandy Bay",         state: "TAS", postcode: "7005" },
];

/**
 * CONTENT FRONTMATTER TEMPLATE
 * ============================
 * Copy this structure exactly when writing each suburb file.
 * Replace ALL values in [BRACKETS] with researched data.
 *
---
name: "[SUBURB NAME]"
state: "[STATE]"
postcode: "[POSTCODE]"
lga: "[LOCAL GOVERNMENT AREA]"
region: "[REGION e.g. Inner Sydney, Northern Suburbs]"

scout_score: [CALCULATED WEIGHTED SCORE]
scout_verdict: "[ONE LINE VERDICT — honest and specific]"

rating_affordability_buy: [1-10]
rating_affordability_rent: [1-10]
rating_family: [1-10]
rating_nature: [1-10]
rating_safety: [1-10]
rating_transport: [1-10]
rating_things_to_do: [1-10]
rating_noise: [1-10]

population: [NUMBER]
population_density: [PEOPLE PER SQ KM]
median_house_price: [NUMBER]
median_apartment_price: [NUMBER]
median_rent_pw: [NUMBER]
price_growth_5yr: [PERCENTAGE AS INTEGER]
median_age: [NUMBER]
housing_commission_pct: [PERCENTAGE]

commute_train_mins: [NUMBER OR 0 IF NO TRAIN]
commute_drive_mins: [NUMBER]
nearest_station: "[STATION NAME OR 'Bus only']"

flood_risk: "[low|medium|high]"
bushfire_risk: "[low|medium|high]"
crime_rank: [1-100, LOWER IS SAFER]

ethnic_breakdown:
  - "[ETHNICITY (PERCENTAGE%)]"
  - "[ETHNICITY (PERCENTAGE%)]"
  - "[ETHNICITY (PERCENTAGE%)]"

ideal_for:
  - "[DEMOGRAPHIC 1]"
  - "[DEMOGRAPHIC 2]"

schools:
  - name: "[SCHOOL NAME]"
    type: "[Public primary|Public secondary|Private primary|Private secondary|Catholic primary|Catholic secondary]"
    naplan_band: [1-10]

highlights:
  - "[KEY ATTRACTION OR FEATURE]"
  - "[KEY ATTRACTION OR FEATURE]"

summary: "[1-2 sentence meta description, max 155 chars]"

last_updated: "2025-05"
---

[3-4 PARAGRAPHS OF SUBURB DESCRIPTION]
*/

console.log(`SuburbScout research script loaded.`);
console.log(`Suburb list contains ${SUBURB_LIST.length} suburbs.`);
console.log(`Run this via Claude Code — see instructions at top of file.`);
