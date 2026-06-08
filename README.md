# EX Venture — Careers Site

A redesigned careers experience for EX Venture, built on the EX Venture design
system (dark-first, magenta accent, Codec Pro / Manrope type).

## Pages
- **index.html** — entry point, redirects to the listings.
- **Careers.html** — job listings. 78 regional postings consolidated into 14
  unique roles. Search + department filters. Each card expands to show details
  and links through to the full role.
- **Job.html?slug=ROLE** — full job detail page. One data-driven template that
  renders any role from `jobs-data.js`. Includes responsibilities, skills,
  benefits, trust band, hiring steps, testimonials, a video-reel slot, and an FAQ.
- **Apply.html?slug=ROLE** — branded application form with CV upload, validation,
  transparency acknowledgements, and an in-page success state.

## Roles (slugs)
consulting · it · hr · eng-general · mech-eng · cv-ai · ai-ml · sales ·
bio-lead · bio-aquatic · sustain-research · marketing · eu-grant-writer ·
eu-grants-outreach

## How to run
This is a static site. Serve the folder with any static web server, e.g.:

    npx serve .
    # or
    python3 -m http.server

Then open http://localhost:3000 (or the port shown).

Opening the files directly via file:// also works in most browsers, but a local
server is recommended.

## Notes / requirements
- React, ReactDOM and Babel are loaded from the unpkg CDN, and the fonts from
  Google Fonts — so an internet connection is needed on first load. (For a fully
  offline build, those can be vendored locally.)
- Content was adapted from the live EX Venture careers postings. Testimonials,
  the hiring-steps copy, and the video reel are representative placeholders —
  swap in the real assets when ready.
- The Apply form is a front-end prototype: submissions are validated and show a
  success screen, but are not yet wired to a backend. Each page also links to the
  official EX Venture careers portal as a fallback.

© 2026 EX Venture · Think Unlimited
