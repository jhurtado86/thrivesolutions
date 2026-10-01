# CLAUDE.md — Thrive IV Solutions

This is the **Thrive IV Solutions** website: a lean, bilingual (EN + `/es/`), 6-page site
for a physician-supervised IV hydration and wellness clinic in Edinburg, TX. It is built
from the **clean `nexor-template` base**. It is NOT a clone of the STVI repo, and no STVI
content, copy, colors, or assets may appear in this repo. The STVI **design patterns**
listed below are rebuilt from this spec.

Anything marked `[NEEDS INPUT]` is unconfirmed. Do not invent it. `[VERIFY]` means a draft
value that needs a human check before launch.

---

## Resolved token reference

| Token | Value |
|---|---|
| Business name | Thrive IV Solutions (short brand: Thrive IV) |
| Trade | Physician-supervised IV hydration and wellness clinic |
| Physician | Dr. R. Brookshire, board-certified vascular surgeon |
| Address | 2511 Cornerstone Blvd, Ste 2511, Edinburg, TX 78539 `[VERIFY — suite number matches street number; confirm with client]` |
| Phone (site) | (956) 322-7662 → `tel:+19563227662`. **Single swappable token** (see Phone rule). |
| Hours | Mon–Fri 9:00 AM–5:00 PM. Sat–Sun closed. The same hours apply to clinic and mobile visits (confirmed 2026-09-30). |
| Service model | In-clinic at 2511 Cornerstone Blvd **and** mobile IV (homes, offices, and events across the Rio Grande Valley). Both available. Confirmed 2026-09-30. |
| Mobile travel fee | **$20 within 30 miles** of the Edinburg office. Beyond 30 miles: "call for details." No other mobile pricing. Mobile visits use the same menu and prices as the clinic. |
| Events / groups | Event and group bookings route to a call. The events-only flyer menu (the shooting-event flyer) does NOT go on the site. Minimum group size `[NEEDS INPUT]`. |
| Email | `[NEEDS INPUT]`. Omit from site and schema until provided. |
| Domain | `thriveivsolution.com`. Build every absolute URL on the canonical host `https://www.thriveivsolution.com`. |
| Canonical host | `https://www.thriveivsolution.com` (Vercel Primary; the bare domain redirects to www). Set as Vercel Primary on day one. |
| Region | Rio Grande Valley, South Texas |
| Booking | **Call to Book** (primary, phone token) + GHL form **"Website Form"** (secondary; form id `mUgMTmM7gOJPfxkxDgTe`, submit button "Request My Appointment") embedded at `/contact/#request`. GHL chat widget (id `6ab54a47228e01cbcee955b1`) site-wide. ES form: `[NEEDS INPUT — Spanish duplicate pending; the EN form is used on /es/contact/ meanwhile]`. Text only if confirmed (see Phone rule). |

**Phone rule.** (956) 322-7662 is shared with STVI for now. Define it ONCE as a constant
(display string + E.164) and reference it everywhere, so a future dedicated Thrive line
(possibly (956) 935-0109 `[NEEDS INPUT]`) is a one-line swap. Do NOT publish 935-0109 until
confirmed. Do NOT ship an `sms:` link or "Text us" CTA until the client confirms the
number receives texts. Until then, the primary CTA is **Call to Book**.

---

## Brand color system — navy base + logo blue + mint

Derived from the official logo (`brand_assets/logo-white.png`). The logo itself is an
electric-blue gradient drop + a mint-green IV bag and "IV" letters, with a WHITE wordmark.
The logo contains no navy: navy is the chosen dark base because the white wordmark needs
a dark background. **This is NOT STVI's palette.** No red, no gold, no `#0A1F5C`,
no `#C8102E`, no `#C79A3B` anywhere in this repo.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--color-primary` / `--color-dark` | `#0B1B3A` | Header, footer, dark sections, hero overlay tint. THE one dark token. | 17.0:1 vs white |
| `--color-primary-mid` | `#13295A` | Hover on dark, secondary dark panels, dividers on dark | — |
| `--color-blue` | `#0056FC` | Logo drop (deep end). Primary buttons, links on white. | 5.6:1 on white |
| `--color-blue-bright` | `#00AEFF` | Logo drop (bright end). Gradients and accents on dark only. | 6.9:1 on navy · 2.5:1 on white (fill only) |
| `--color-accent` (mint) | `#0FF9B0` | Logo mint. Eyebrows, prices, highlights ON DARK only. | 12.3:1 on navy · 1.4:1 on white (never text on white) |
| `--color-accent-mid` | `#03BA89` | Logo mint (shadow end). Icons, fills, borders. | 2.5:1 on white (non-text only) |
| `--color-accent-deep` | `#047857` | Mint as small text / dividers on WHITE | 5.5:1 on white |
| `--color-accent-wash` | `#E9FDF6` | Soft mint section backgrounds (the "wellness" feel) | — |
| `--color-ink` | `#0B1B3A` | Headings and body text on white | 17.0:1 |
| `--color-muted` | `#4A5873` | Secondary text on white | 7.2:1 on white · 6.8:1 on accent-wash |
| `--color-bg` | `#FFFFFF` | Page background | — |

Rules:
- Define once as CSS custom properties + Tailwind `theme.extend.colors`. Never hardcode hexes on a page.
- Bright mint and bright blue are for dark backgrounds and non-text fills. On white, text uses `--color-blue`, `--color-accent-deep`, or `--color-ink`.
- The signature gradient is the logo drop: `#00AEFF → #0056FC`. Use it sparingly (primary button fill, one accent line), never as a full-section background.
- Never use default Tailwind blue/indigo/sky/cyan/teal/emerald classes. Every color comes from the tokens.
- The wellness feel comes from generous white space, `--color-accent-wash` sections, and softer radii. It does NOT come from pastel gradients or spa clichés.

**Logo files (official, cleaned from the client's source PNG):**
- `brand_assets/logo-white.png` — white wordmark, for the navy header, footer, and dark sections. **Default site logo.**
- `brand_assets/logo-dark.png` — same logo with the wordmark recolored to `#0B1B3A`, for any white/light surface.
- `brand_assets/logo-icon.png` — drop + IV bag mark only, for favicon, apple-touch-icon, and tight mobile spots.
- Never place `logo-white.png` on a light background (the wordmark disappears).
- Header height ~40px desktop / ~34px mobile; footer ~36px. Never upscale past the source.
- Known artifact: small smudge where the "R" leg meets the bowl. Invisible at header size; don't use the logo larger than ~320px wide until a vector/clean file is supplied `[NEEDS INPUT — SVG or high-res file]`.

---

## Typography

- Display: **Fraunces** (soft optical serif; use weights 500–600, tight tracking on large headings).
- Body: **DM Sans**.
- Deliberately different from STVI's Playfair Display + Inter so the two brands never read as the same site.
- Body text minimum **18px**, line-height ~1.65. Tap targets minimum **48px**.

---

## Layout — shared container (FROZEN)

- One container for everything: header row, hero text, every section, footer.
  `--container: 80rem` (**1280px** max-width, side padding included) with
  `--gutter: clamp(20px, 4vw, 40px)` side padding, on ALL pages. At 1440 the content edge
  sits at 120px; the header logo and the hero text share that one left edge.
- Hero text block max-width **620px**, left-anchored on the container edge. The right ~half
  of the hero frame is reserved for the photo subject.
- **Menu preview (Home).** Desktop: left ~40% = one tall 4:5 image, `position: sticky`
  with a top offset below the header; right ~60% = eyebrow, H2, intro, then the ledger.
  Ledger rows: name + type label on top, description below, price right-aligned on the name
  line. Mobile: intro → full-width image → ledger. No floating image boxes.
- Photo sections are true 50/50 splits with the image filling its full column width
  (see Hero & asset patterns).

---

## Positioning — the one idea every page carries

**Physician-supervised IV therapy, overseen by a board-certified vascular surgeon.**
This is the differentiator against med-spa drip bars. It leads the homepage hero, the
homepage meta description, the About page, and the schema description.

Locked wording (EN):
- "Physician-supervised IV therapy in Edinburg."
- "Overseen by Dr. R. Brookshire, a board-certified vascular surgeon."

Locked wording (ES):
- "Terapia IV supervisada por un médico en Edinburg."
- "Bajo la supervisión del Dr. R. Brookshire, cirujano vascular certificado."
  `[VERIFY — native read]`

Do NOT claim (standing rule, clinic and mobile alike; this is a closed decision, not an
open question):
- Who administers the IV (RN / NP / other), in the clinic or on a mobile visit.
- That Dr. Brookshire is on-site during sessions or personally places IVs.
- That there is a pre-drip health screening or consultation.
- Any STVI credential line ("first board-certified…", "only one in Edinburg"). That wording belongs to STVI only.

Copy says "physician-supervised" and stops there.

**Owner-name override.** The skeleton restricts the owner name to the About page. For
Thrive, Dr. Brookshire's name and credential MAY appear in the hero, meta, and schema,
because the physician is the differentiator. Never in CTA button labels.

**Taglines (confirmed).** "Feel Better." · "Hydration. Recovery. Wellness." ·
"Hydration That Works. So You Can Thrive." Use "Hydration That Works. So You Can Thrive."
as the homepage final-CTA line; "Hydration. Recovery. Wellness." as the hero eyebrow.
ES `[VERIFY — native read]`: "Siéntete mejor." · "Hidratación. Recuperación. Bienestar." ·
"Hidratación que funciona. Para que prosperes."

**Trust badges (confirmed).** Premium Ingredients · Safe & Professional · Personalized Care.
Render as ONE understated row of three (text + small line icon), not a pill row, not
invented seals or certifications. ES: Ingredientes de primera · Seguro y profesional ·
Atención personalizada `[VERIFY]`.

---

## Menu — SINGLE SOURCE OF TRUTH for names and prices

Pricing is **displayed** on this site (overrides the skeleton's no-price rule). Every
price in EN copy, ES copy, and JSON-LD must come from this table. If a price changes,
change it here first, then grep every page.

| ID / anchor | Name (EN) | Name (ES) `[VERIFY]` | Type | Price | EN description (confirmed) | Best for (EN, page line) |
|---|---|---|---|---|---|---|
| `recovery-pack` | Recovery Pack | Paquete de Recuperación | IV drip | $165 | Replenish, restore, recharge. For athletes, busy lifestyles, and post-workout recovery. | Athletes, busy lifestyles, and post-workout recovery. |
| `basic-hydration` | Basic Hydration | Hidratación Básica | IV drip | $100 | Stay hydrated, feel refreshed. For everyday wellness and routine hydration. | Everyday wellness and routine hydration. |
| `hangover-help` | Hangover Help | Alivio para la Cruda | IV drip | $185 | Feel better fast. Rehydrate, replenish, and bounce back sooner. | The morning after a late night. `[VERIFY]` |
| `nad-plus` | NAD+ Injection | Inyección de NAD+ | **Intramuscular injection (NOT an IV)** | $65 | Supports cellular energy and mental clarity. For healthy aging, focus, and overall wellness. | Healthy aging, focus, and overall wellness. |
| `extra-liter` | Extra Liter | Litro adicional `[VERIFY]` | **Add-on to IV drips only (NOT with NAD+)** | $65 | Add an additional liter of IV fluid to your IV treatment. | No "best for" line (none confirmed). Render Type ("Add-on to any IV drip") + Pairs-with (the three drips, not NAD+) rows instead. |

Rules:
- Page and nav label: **"IV & Wellness Menu"** (ES: "Menú de IV y Bienestar"). URL stays `/iv-menu/`.
- NAD+ is always labeled as an injection ("quick injection, no IV line"). Never call it a drip or an IV.
- Order on the page: Recovery Pack, Basic Hydration, Hangover Help, then the add-on group
  (visually set apart, dark section): NAD+ Injection, then Extra Liter. The Menu index bar
  lists all 5.
- Extra Liter (added 2026-09-30) is an add-on to the three IV drips only. Never pair it with
  NAD+ in copy or schema. It has no photo slot.
- Mobile visits use this same table. There is no separate mobile menu and no mobile markup
  on any price; the only mobile-specific number is the $20 travel fee (see tokens).
- No ingredient lists, dosages, or "what's in the bag" details until confirmed `[NEEDS INPUT]`.
- Prices display as whole dollars ("$165"). No "starting at," no memberships, packages, or discounts unless added to this table.
- The "Best for" line on the Menu page comes from this table. Three are lifted from the confirmed
  descriptions; Hangover Help's is a draft `[VERIFY]` until the client confirms it.

---

## Health-claims language — LOCKED

- Benefits use soft, supportive verbs: *helps you rehydrate*, *supports recovery*, *helps you feel refreshed*.
- NEVER: cure, treat, heal, prevent, detox, boost immunity, "instant," guaranteed results, anti-aging promises, or any disease/condition claim.
- NEVER the event-flyer wording: "cure," "immunity," "number one" / "#1." The flyer is events-only and none of its copy goes on the site.
- NEVER compare against or disparage medical care or other clinics.
- "Hangover Help" copy stays about rehydration and feeling better. No glamorizing drinking.
- Every page carries the disclaimer (see below).

---

## Disclaimer — LOCKED placement, text `[NEEDS INPUT]`

Placement: site-wide in the footer (small, full text) AND as a visible callout on
What to Expect.

Text: the client's full wording is `[NEEDS INPUT]`. Confirmed fragment: "Not a substitute for
medical care. Consult your healthcare provider if pregnant…". Until the full text arrives,
render exactly that confirmed fragment inside
`<!-- DISCLAIMER: pending full client text -->` markers and do not write additional
medical disclaimer language. ES translation happens only after the EN text is final.

---

## Care advice — What to Expect content (confirmed)

**Before your visit:** eat a snack beforehand; wear loose, comfortable clothing (easy
sleeve access); drink water ahead of time; avoid antihistamines and decongestants
beforehand; sessions take about 30–45 minutes.

**After your visit:** wait 1 hour before getting the IV site wet; wait 24 hours before
strenuous activity; keep hydrating; avoid rough contact with the site for 48 hours;
IV therapy supplements a healthy lifestyle, it doesn't replace one.

Do not add timing advice, contraindications, or side-effect lists beyond this without
client confirmation.

---

## Site Architecture — VERIFY against disk first

Run `find . -name "*.html"` before writing paths. Disk is the source of truth.

Clean-URL convention (from STVI): every page is `folder/index.html`. Patch `serve.mjs` to
resolve `/folder/` → `folder/index.html` locally. `vercel.json` sets `cleanUrls: true` and
`trailingSlash: true` for production parity.

| Page | EN | ES |
|---|---|---|
| Home | `/` (`index.html`) | `/es/` |
| IV & Wellness Menu | `/iv-menu/` | `/es/iv-menu/` |
| Mobile IV Therapy (added 2026-09-30) | `/mobile-iv/` | `/es/mobile-iv/` |
| What to Expect / FAQ | `/what-to-expect/` | `/es/what-to-expect/` |
| About | `/about/` | `/es/about/` |
| Contact / Book | `/contact/` | `/es/contact/` |
| Thank you (form redirect, noindex) | `/thank-you/` | `/es/thank-you/` |

- ES pages use the same English slugs under `/es/` (routing stays simple).
- **Thank-you pages** (added 2026-09-29) are the GHL "Website Form" redirect targets. The
  thank-you trio is applied to both as one unit: `<meta name="robots" content="noindex,
  nofollow">` + excluded from `sitemap.xml` + `Disallow` in `robots.txt`. No hreflang, no
  JSON-LD. Content: short confirmation, "We'll call you within one business day," hours,
  Call button, link home. The redirect URL itself is set in GHL (form settings), not in
  markup; with one shared form it can point at only one thank-you page (EN).
- **No city pages, no individual drip pages, no gallery.** Local reach comes from schema `areaServed`. Drips link by anchor (`/iv-menu/#hangover-help`).

### Nav (simple, no mega-menu)
Logo · IV & Wellness Menu · **Mobile IV** (ES "IV a domicilio") · What to Expect · About · Contact · **Español/English toggle** ·
**Call to Book** button (phone token). Persistent click-to-call. Mobile: hamburger drawer +
the call button stays visible in the bar.

**Transparent nav — FROZEN.** The header is `position: fixed` and fully transparent on load,
so the hero background shows through behind it. After ~40px of scroll it becomes solid
`--color-dark` with the elevated shadow, animated with opacity only (a `::before` layer),
no layout shift. Every hero carries top padding equal to the nav height and a top-down navy
gradient scrim so the white logo and links stay readable over any photo. Mobile: same
behavior; the drawer is solid navy and forces the solid header while it is open. Inner
pages use the same pattern over their shorter heroes.

### Footer
Logo (small) · NAP · hours · the 6 page links · language toggle · the disclaimer ·
one line: "Thrive IV Solutions is led by Dr. R. Brookshire, who also leads
South Texas Vascular Institute." with a single link to STVI (`https://stvi.tech`, on the
practice name). No other STVI branding anywhere. Then, just before `</body>` on every
page (12 + the 2 thank-you pages): the GHL chat widget `<script … defer>` (canonical copy
in `_partials/footer.html`, identical tag everywhere, deferred so it never blocks
rendering), followed by the `GHL EXTERNAL TRACKING SCRIPT` placeholder comment.

---

## Bilingual method — FROZEN (from STVI)

- Real, fully translated `/es/` pages. Not a JS toggle, not machine-translated widgets.
- Every page pair carries reciprocal `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"` (→ EN).
- `<html lang="en">` on EN, `<html lang="es">` on ES.
- The Español/English toggle links to the **equivalent page**, not the other homepage.
- Prices, phone, address, and hours are identical across languages (from the tokens above).
- Spanish register: warm, plain, RGV-natural (e.g. "cruda," not "resaca"). Use *usted* in CTAs and instructions.
- All ES copy is flagged for a native-speaker read before launch, especially the disclaimer and care advice. Mark uncertain phrases `[VERIFY]` in an HTML comment.

---

## Page content briefs

**Home.** Hero: eyebrow "Hydration. Recovery. Wellness." · H1 built on the target keyword
("IV therapy in Edinburg" + physician-supervised angle) · subline naming Dr. Brookshire's
credential · CTAs: Call to Book (primary), See the Menu (secondary) · hero meta line carries
a "Clinic or mobile" link to `/mobile-iv/`. Then: trust-badge row ·
menu preview (all 5 items with prices, linking to anchors; sticky-image layout, see Layout;
NAD+ and Extra Liter under one "Add-ons" group label) · **"Clinic or mobile" section** right
after the menu: a compact two-option sheet, side by side on desktop (visit us in Edinburg /
we come to you, $20 travel fee within 30 miles), linking to `/contact/` and `/mobile-iv/` ·
"Why physician-supervised matters" section (plain-language, no claims beyond the Positioning
rules) · short What to Expect teaser (30–45 min, what to bring) · final CTA ("Hydration
That Works. So You Can Thrive." + call button + "Request online" link to
`/contact/#request` + hours).

**IV & Wellness Menu.** H1 around "IV hydration menu and prices." Three drip blocks with
anchor IDs, name, price, confirmed description, "best for" line, and a Call to Book
button, then the add-on group in one dark section: NAD+ (injection, with its photo) and
Extra Liter (`#extra-liter`, price on the name line, "Add-on to any IV drip", no photo).
Index bar lists all 5. One line linking to `/mobile-iv/` ("the same menu and prices on a
mobile visit"). Short "Not sure which one?" section routing to a call, with a "Request
online" link to `/contact/#request` beside it. Disclaimer visible near the menu.

**Mobile IV Therapy** (`/mobile-iv/`, added 2026-09-30). Same inner-hero pattern and
components. Content, from confirmed facts only: we come to you — homes, offices, and
events across the Valley · physician-supervised, same menu and prices as the clinic ·
$20 travel fee within 30 miles of our Edinburg office, call for farther · hours Mon–Fri
9–5 · events and groups: call to plan (minimum group size `[NEEDS INPUT]`). A short "How
mobile visits work" sequence (call → confirm location and drips → we arrive and set up →
~30–45 min session). The 5-item ledger with a separate "Travel" row for the $20 fee.
FAQ (min 4; `FAQPage` JSON-LD matches the visible text) + `BreadcrumbList`. One 4:5 photo
slot (`brand_assets/mobile-iv.*`, delivered 2026-10-01). Never say who comes to the visit
(see Positioning).

**What to Expect / FAQ.** Before / during (~30–45 min) / after, from the care advice.
Disclaimer callout. FAQ (min 6, only from confirmed facts): how long a session takes,
what to do before, what to do after, who oversees the therapy, prices (all 5 items), how
to book, hours, where you're located, whether NAD+ is an IV (no — injection), "Can you
come to me?" (yes, mobile, link to `/mobile-iv/`), "Is there a travel fee?" ($20 within
30 miles, call beyond).

**About.** Dr. R. Brookshire: board-certified vascular surgeon; why a physician-supervised
clinic. Bio details beyond the credential are `[NEEDS INPUT]`. Do not invent training,
years, schools, or staff. No team section until staff are confirmed.

**Contact / Book.** Call to Book (big) in the hero · section `#request` ("Request an
Appointment" / "Solicite una cita"): Call to Book block beside the GHL "Website Form" inline
embed (side by side on desktop, form below the call block on mobile). The embed is pasted
verbatim (iframe + `form_embed.js`, the script once per page) inside `.form-frame`, a
container with `min-height: 730px` so the page does not jump while the form loads; only the
container is styled. `/es/contact/` uses the same EN form until the Spanish duplicate exists
`[NEEDS INPUT]`. Mobile visits are booked by phone: say so in the hero lead and as a spec
row in `#request`. Then address, hours, Google Maps embed (public address confirmed),
parking/suite note `[NEEDS INPUT]`, and the "Before you call" links (Menu, What to Expect,
Mobile IV).

---

## Local SEO

**Titles (<60 chars) and descriptions (<160).**
- Home: "IV Therapy in Edinburg, TX | Thrive IV Solutions"
- Menu: "IV Hydration Menu & Prices in Edinburg | Thrive IV"
- What to Expect: "What to Expect at Your IV Visit | Thrive IV Solutions"
- About: "Physician-Supervised IV Therapy | Dr. R. Brookshire"
- Contact: "Book IV Therapy in Edinburg, TX | Thrive IV Solutions"
- Mobile IV: "Mobile IV Therapy in Edinburg & the RGV | Thrive IV"
- ES titles translated equivalents, same length limits.
- Home meta description must mention physician supervision + Edinburg + a call CTA.

Per page: unique title and description, self-canonical (`https://www.thriveivsolution.com`), robots
index/follow with max-image/snippet/video-preview, OG + Twitter (`brand_assets/og-image.jpg`
1200×630 `[NEEDS INPUT — create]`), `og:locale` en_US / es_US.

**JSON-LD.**
- Home: `MedicalClinic` with `@id` `https://www.thriveivsolution.com/#clinic`. Name, telephone
  (token), PostalAddress (INCLUDED — public address), `geo` `[VERIFY]`,
  `openingHoursSpecification` (Mon–Fri 09:00–17:00), `areaServed`: Edinburg, McAllen,
  Mission, Pharr, Weslaco, Rio Grande Valley `[VERIFY — client's actual draw area]`,
  `hasOfferCatalog` with the 5 menu items, each an `Offer` with `price` and
  `priceCurrency: "USD"`, and `priceRange` "$65–$185" (unchanged by the travel fee). Plus a
  `Service` node for mobile IV therapy (`@id` `https://www.thriveivsolution.com/mobile-iv/#service`,
  `provider` → `#clinic`, same `areaServed`, `hoursAvailable` Mon–Fri 09:00–17:00) with the
  $20 travel fee described in its `description` text, never as a priced `Offer`. Include a `Physician` object for
  Dr. R. Brookshire as `employee` / `founder` `[VERIFY role]`, with
  `medicalSpecialty` vascular surgery. No `aggregateRating`, no `email` until provided.
- Menu: `OfferCatalog` (the 5 Offers, same values as Home) + `BreadcrumbList`.
- Mobile IV: the same `Service` node (full declaration, same `@id`) + `FAQPage` (matches
  visible FAQs exactly) + `BreadcrumbList`.
- What to Expect: `FAQPage` (matches visible FAQs exactly) + `BreadcrumbList`.
- About: `Physician` (Person) + `BreadcrumbList`.
- Contact: clinic reference (`@id` only, not a re-declaration) + `BreadcrumbList`.
- ES pages: same structures, translated text, `inLanguage: "es"`.
- Offer count on Home == 5 == items on the Menu page == rows in the Menu table.
- Validate at search.google.com/test/rich-results before launch.

**On-page:** exactly one H1 per page, no skipped heading levels, "Edinburg" in visible
body text, descriptive alt text with service + location context.

**Files:** `sitemap.xml` (all 12 pages, with `xhtml:link` hreflang alternates), `robots.txt`
(allow all, point to sitemap).

---

## Hero & asset patterns

- Hero and final-CTA backgrounds use ONLY the named slot files in `brand_assets/`.
  They are **art-directed**: a 16:9 desktop file (`hero-background.*`, `cta-background.*`,
  1920 wide) plus a 9:16 mobile file (`hero-background-mobile.*`, `cta-background-mobile.*`,
  1080×1920 max), each as WebP + JPG, served through `<picture>` with a
  `(max-width: 767px)` media source for the mobile files. Mobile framing: subject in the
  lower part of the hero, text over the calm upper area (`object-position` per breakpoint
  in `brand.css`). Originals stay in `brand_assets/_source/` (git- and Vercel-ignored).
  Never promote a content photo into these slots.
- Hero: full-bleed static image, left-anchored text (max-width 620px on the shared
  container edge), navy overlay (~0.7) + top scrim + vignette + text-shadows. Home hero
  `min-h-[85vh]`; inner-page heroes shorter (~50vh). No hero video.
- Uniform photo containers: ONE ratio site-wide, **4:5**, via `aspect-ratio` +
  `object-fit: cover` (`.photo-frame`). The Dr. Brookshire portrait is the only exception
  (3:4, `object-position: center top`). Photo sections are true 50/50 splits with the image
  filling its full column width; never a small floating image box. Placeholders at the
  final size: `placehold.co/1200x1500` (4:5) and `placehold.co/900x1200` (portrait).
- Photo tiers (all slots filled as of 2026-10-01): Home 3 · Menu 1 per drip (4; Extra Liter has
  none) · Mobile IV 1 (`mobile-iv.*`) · What to Expect 1 · About
  1 portrait of Dr. Brookshire (`aspect-[3/4]`, `object-position: center top`) · Contact 0.
- Dr. Brookshire's headshot: `brand_assets/dr-brookshire.*` (1200×1600) and
  `dr-brookshire-600.*` (600×800), 3:4, metadata stripped, served via `srcset`. It is also
  the Physician `image` in JSON-LD.
- Content photos (delivered 2026-09-29; processed like the headshot: 4:5 crop, `name.*`
  at 1200×1500 + `name-600.*` at 600×750, JPG + WebP, metadata stripped, served via
  `<picture>` + `srcset`; originals in `brand_assets/_source/`):
  `home-visit.*` (Home, 30–45 min section) · `drip-recovery.*` (Menu `#recovery-pack`) ·
  `drip-hydration.*` (Menu `#basic-hydration`) · `drip-hangover.*` (Menu `#hangover-help`) ·
  `expect-prep.*` (What to Expect sticky) · `home-menu.*` (Home menu sticky) ·
  `drip-nad.*` (Menu `#nad-plus`) · `mobile-iv.*` (Mobile IV, we-come-to-you split; delivered
  2026-10-01, cropped to the left 4:5 window: pole, base, window light, sofa corner). The
  sources are only 768px tall, so the 1200×1500 files are ~2x upscales; ask for originals at
  least 1500px tall for crisp retina rendering `[NEEDS INPUT — higher-res sources]`.
- **Checked, not an exception (2026-10-01).** The hanging bag in `mobile-iv.*` carries a blank
  white label band with no legible characters at any served size; the tubing ends in capped
  connectors and a drip chamber (no needle); the navy kit has no text. Do NOT flag in audits.
- **Client-approved exceptions (2026-09-29).** `home-menu.*` shows printed bag labels
  ("STERILE saline / Batch #4321 / Exp 12/26") and `drip-nad.*` shows a readable
  "ALCOHOL PREP PAD" packet and an uncapped syringe. Both were placed as-is at the
  client's request (EN + ES). Do NOT flag them in audits. Heads-up only: the printed
  "Exp 12/26" on the bags reads as expired after December 2026.
- Excluded photo types (for any NEW photo; the two approved exceptions above stand):
  identifiable patients without consent, visible needle insertion close-ups, exposed
  needles, people/hands/faces, readable text or labels (batch numbers, expiry dates,
  product packaging), anything clinical-gory, blood, stock photos of bars/drinking.
- Document exact filenames from `ls brand_assets/`. Never assume names.

---

## Anti-Generic / Human-Built Guardrails — FROZEN (from STVI)

- Brand tokens only. Layered, color-tinted shadows (never flat `shadow-md`).
- Distinct display + body fonts; tight tracking on large headings.
- Subtle depth: layered radial gradients + SVG-noise grain on dark sections.
- Motion follows the Motion system below. Never `transition-all`.
- Every clickable element has hover + focus-visible + active states.
- Base → elevated → floating depth system; intentional spacing tokens.
- **Human-built feel:** no decorative icon grids, no invented badges/seals/"as seen in," no
  card-grid-for-everything. Vary section layouts (split, full-width text, list, menu
  table). No emoji. No stock "spa" clichés (orchids, stones, water drops everywhere).

### Motion system — FROZEN (premium, restrained)

- `transform` and `opacity` only. Spring easing from `brand.css` (`--ease-spring` for
  hover/press, `--ease-reveal` for reveals). Reveals run 500–800ms. ONE
  `IntersectionObserver` in `site.js` drives every reveal. No animation libraries, no
  parallax on text, no looping animations.
- Hero entrance on load: eyebrow → H1 → subline → buttons → meta line, fade-up ~16px with
  ~90ms stagger. The hero background settles from `scale(1.06)` to `1.0` over ~2.5s.
- Scroll reveals, once: section headings and text fade-up; ledger rows stagger in (~80ms);
  images fade + scale 1.03 → 1.0.
- Header: opacity-only transparent → solid swap (see Transparent nav).
- Buttons: slight lift + deeper shadow on hover, press-in on active; arrow icons nudge right
  on hover.
- `prefers-reduced-motion: reduce`: no motion, everything fully visible.
- JS off = content visible. The hidden pre-reveal state exists only under `html.js`, a
  class `site.js` sets first thing. Elements use `.reveal` (+ `.reveal--scale` for images,
  `data-delay` / `data-stagger` for order) and receive `.is-in`; `screenshot.mjs` forces
  `.is-in` for captures.

Content voice follows `SEO-CONTENT-PROMPT.md` (5th-grade reading level, avoid its word
list). Where it conflicts with the Health-claims or Positioning rules above, **these
rules win** (medical claims precision beats keyword stuffing).

---

## Workflow — FROZEN

- Invoke the frontend-design skill before frontend code if available; proceed without it if not.
- `node serve.mjs` (background, don't double-start) → `http://localhost:3000`.
- `node screenshot.mjs http://localhost:3000/[path] [label]` → `./temporary screenshots/`.
  Read the PNG back and report the exact path. Never screenshot `file:///`.
- Screenshot rounds: **Home and IV & Wellness Menu = 2 rounds (gated templates).** All other
  pages and all ES pages = 1 round + click-through.
- Screenshot each gated page at desktop (1440) and mobile (390).
- Output: self-contained HTML, Tailwind via CDN, shared CSS in `brand.css`, mobile-first.

---

## Template sections to DELETE

Financing · insurance carrier-logo row · review widget / stars / counts / testimonials ·
service-area and city pages · inventory/gallery · hero trust-badge pill row (replaced by
the single badge row) · mega-menu · any home-services artifact (emergency 24/7 bars,
"free estimate" CTAs, before/after sliders).

---

## Hard Rules

- No invented facts. `[NEEDS INPUT]` stays flagged until confirmed.
- No STVI content, colors, copy, or credential wording in this repo (the footer
  sister-practice line is the one exception).
- Prices only from the Menu table. NAD+ is always an injection.
- No health claims beyond the locked language. Disclaimer on every page.
- No reviews/stars/`aggregateRating`/testimonials until reputation is confirmed.
- Phone only via the single token. No `sms:` link until texting is confirmed. Never
  publish an unconfirmed number.
- No `transition-all`. No default Tailwind palette. No red.
- Zero grep hits before deploy for: `thrive-domain.tbd`, `placehold.co` in any `og:image`,
  `[NEEDS INPUT]`, `[VERIFY]`, `DISCLAIMER: pending`, `#C8102E`, `#C79A3B`, `#0A1F5C`,
  "South Texas Vascular" outside the footer line, "Playfair", `family=Inter`,
  `'Inter'`, `Barlow`, `Nunito`, `yourbusiness.com`, `service-one`, `city-one`,
  `https://thriveivsolution.com` (non-www absolute URLs must never appear).

## Git Discipline — FROZEN

- Three-command check before every commit: `git status`, `git branch`, `git remote -v`
  (origin = the Thrive repo, NEVER `nexor-template`, NEVER the STVI repo).
- Commit only when asked; branch first if on the default branch.
- Separate commits: CLAUDE.md · brand_assets · EN pages · ES pages · SEO files.
- Canonical host as Vercel Primary on day one.
- GSC: submit the full sitemap URL. Inspect order: Home → Menu → What to Expect → About →
  Contact → ES pages.

---

## Active Blockers

**Launch-blocking:** full disclaimer text · og-image ·
native Spanish read (disclaimer + care advice minimum; the new `/es/mobile-iv/` page and
"Litro adicional") · decision on dedicated Thrive phone line · **Remove pre-launch noindex lock** (vercel.json
`X-Robots-Tag` header + robots.txt `Disallow: /`, restore the launch robots.txt from its
"RESTORE AT LAUNCH" block) — Prompt 5 must confirm before the domain is connected.

**Backfillable:** vector/SVG logo (current PNG is usable) ·
higher-res content-photo sources (current ones are 768px tall) · Dr. Brookshire
bio details · email · whether the phone receives texts · Spanish duplicate of the GHL
form · parking/suite note · minimum group size for events ·
`areaServed` city list · `geo` coordinates · review status.

**Open decisions:** lab-coat embroidery in the headshot (STVI name + full name
"Ralph H. Brookshire D.O.") pending client OK; otherwise crop tighter.

**Separate-GBP note (for Juan, not Code):** Thrive sharing STVI's address, suite, and
phone risks Google merging or confusing the two Business Profiles. A dedicated Thrive phone
line (and ideally a distinct suite designation) before creating Thrive's GBP is strongly
recommended.
