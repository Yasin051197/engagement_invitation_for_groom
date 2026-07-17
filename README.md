# Yasim &amp; Fiza — Engagement / Mangni Invitation

A premium, mobile-first **digital invitation** for an Indian Muslim engagement
ceremony. Built with **React + TypeScript + Vite**, no UI framework, no heavy
libraries — fast to load and beautiful on WhatsApp.

---

## ✏️ Where to change the invitation details

**Everything lives in one file:**

```
src/data/invitationData.ts
```

Open it and edit the values. Nothing about the event is hard-coded anywhere
else. Quick map:

| What you want to change           | Field(s) in `invitationData.ts`                                              |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Couple names                      | `groomName`, `brideName`                                                     |
| Parents / families                | `groomParents`, `brideParents`, `hostedBy`                                   |
| Date & time (text shown)          | `date`, `time`                                                               |
| Date & time (for Add-to-Calendar) | `isoStart`, `isoEnd`                                                         |
| Venue & map link                  | `venueName`, `address`, `mapLink`                                            |
| RSVP contacts                     | `rsvpContacts[]` (name + phone each), `whatsappMessage`                      |
| Messages, quotes, greeting        | `greeting`, `invitationMessage`, `heroQuote`, `footerQuote`                  |
| Extra poetic lines (pick & swap)  | `duas[]`, `shayariLines[]`, `quotes[]`, `invitationLines[]`, `footerLines[]` |
| Programme timeline                | `schedule[]`                                                                 |

> The page shows only **2–4** poetic lines at a time. The remaining lines in
> the arrays are there so you can swap in whichever you prefer — just change
> which index a component reads (e.g. `data.duas[0]` → `data.duas[3]`).

### WhatsApp / social preview text

Edit the `<title>`, `<meta name="description">` and the Open Graph / Twitter
tags in **`index.html`**.

---

## 🚀 Run locally

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+.

---

## 🌐 Deploy (Vercel / Netlify)

This is a standard static Vite app.

**Vercel** — import the repo, framework preset **Vite**, it auto-detects:

- Build command: `npm run build`
- Output directory: `dist`

**Netlify** — New site from Git:

- Build command: `npm run build`
- Publish directory: `dist`

Or drag-and-drop the `dist/` folder onto Netlify Drop.

---

## 🖼️ WhatsApp preview image (important)

The image WhatsApp shows when the link is shared is **`public/og-preview.jpg`**
— the couple portrait fitted to 1200×630 over a blurred copy of itself.

To regenerate it (after swapping the portrait):

```bash
powershell -File scripts/make-og.ps1     # reads public/couple.png → public/og-preview.jpg
```

Three constraints that are easy to trip over:

- **`og:image` must be an ABSOLUTE URL.** The crawler is a remote server; it
  cannot resolve `/og-preview.jpg`. Anything in `public/` is served at the site
  root, so the URL is `https://<your-domain>/og-preview.jpg`. If the deployed
  domain changes, update every absolute URL in `index.html`.
- **Keep it under ~300 KB.** WhatsApp silently shows *no* image above roughly
  that size — `couple.png` itself is 3.2 MB, which is why it can't be used
  directly. JPEG, not PNG: a photo at 1200×630 blows the budget as PNG.
- **WhatsApp never renders SVG.** (`public/og-preview.svg` is an older
  text-based card design, no longer referenced by `index.html`.)

Changes only take effect **after deploying** — the crawler fetches the live URL,
not your machine. WhatsApp also caches previews hard: re-scrape with the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), or
share the link with a throwaway query string (`?v=2`) to force a fresh fetch.

---

## 🎨 What's inside

- **Palette:** off-white, cream, baby pink, soft blush, rose-gold, soft gold.
- **Fonts:** Playfair Display + Cormorant Garamond (headings), Poppins (body),
  Noto Naskh Arabic (Bismillah). Loaded from Google Fonts in `index.html`.
- **Cultural elements:** Bismillah, crescent moon, soft lanterns, Mughal arch,
  jaali pattern, rose-gold dividers, floating petals.
- **Animations:** CSS + IntersectionObserver scroll reveals; fully respects
  `prefers-reduced-motion`. No animation library needed.
- **Accessibility:** semantic HTML, aria-labels on actions, decorative SVGs
  `aria-hidden`, visible focus styles, readable contrast.
- **Responsive:** `clamp()` typography, single-column on mobile, no horizontal
  scroll from 320px up.

### Project structure

```
src/
├─ data/invitationData.ts     ← EDIT THIS (all content)
├─ utils/links.ts             ← WhatsApp / calendar / share link helpers
├─ hooks/useInView.ts         ← scroll-reveal IntersectionObserver hook
├─ styles/
│  ├─ variables.css           ← colour + type design tokens
│  └─ global.css              ← all styling & animations
└─ components/
   ├─ InvitationPage.tsx      ← composes every section
   ├─ HeroSection.tsx         ├─ ScheduleSection.tsx
   ├─ BismillahHeader.tsx     ├─ VenueSection.tsx
   ├─ InvitationMessage.tsx   ├─ RSVPSection.tsx
   ├─ CoupleSection.tsx       ├─ AddToCalendar.tsx
   ├─ EventDetails.tsx        ├─ ShareSection.tsx
   ├─ DetailCard.tsx          ├─ Footer.tsx
   ├─ SectionTitle.tsx        ├─ FloatingPetals.tsx
   ├─ Reveal.tsx              ├─ FloralDecorations.tsx
   └─ decorations/Icons.tsx   ← all inline SVG icons & motifs
```

May Allah bless this beautiful beginning. 🌙
