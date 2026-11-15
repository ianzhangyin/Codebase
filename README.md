# TravelKu

A static, Indonesian-language travel e-commerce front end. It is a demo of a booking site for flights, hotels, trains, and attractions, built with plain HTML, CSS, and JavaScript.

> **Status: front-end prototype.** Nothing on the site books, charges, or stores anything. Search results, login/register, and the help-center form are simulated in the browser (see [Behavior notes](#behavior-notes)).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page: search tabs (Penerbangan / Hotel / Kereta Api / Atraksi), promo strip, sponsored ad banner, popular destinations, weekly special offers, "why TravelKu", app download section |
| `consult.html` | Help center (Pusat Bantuan): support contact form and contact details |

## Project structure

```
.
├── index.html        # Home page
├── consult.html      # Help center / contact page
├── styles.css        # All styles (single stylesheet, responsive)
├── script.js         # All client-side behavior (single DOMContentLoaded handler)
├── images/           # Destination and offer photos (JPEG)
├── *.svg             # Illustrations left over from an earlier version (not referenced)
├── CNAME             # Custom domain for static hosting (cn2cloud.cc)
├── AGENTS.md         # Development rules for AI coding agents
└── Electron.md       # Rules for a separate Electron project (not used by this site)
```

## Run locally

No build step and no dependencies are needed.

- Quick look: open `index.html` in a browser.
- Closer to production (correct relative paths, no `file://` quirks): serve the folder over HTTP, for example:

  ```sh
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

To see the mobile-only ad banner, use your browser's device emulation (for example Chrome DevTools → Toggle device toolbar) and reload. The check runs on page load.

## Behavior notes

`script.js` is divided into numbered sections. Their current behavior:

| # | Feature | Actual behavior |
| --- | --- | --- |
| 1 | Mobile menu | Toggles the nav and keeps `aria-expanded` in sync |
| 2 | Search tabs | Switches between the four search panels |
| 3 | Search forms | Validates inputs, shows "Mencari...", then after 2 s shows a **random** result count (5–54). No real search happens. |
| 4 | Help-center form | Validates inputs, then replaces the form with a "Pesan Terkirim!" success message. **Nothing is sent or stored**, even though the message says the team will reply within 24 hours. |
| 5 | Promo strip | Auto-scrolls horizontally, pauses on hover, and loops back to the start |
| 6 | Destination cards | Clicking a card shows an `alert()` saying the feature is coming soon |
| 7 | Footer year | Inserts the current year |
| 8 | Smooth scroll | Smooth scrolling for in-page anchor links |
| 9 | Header shadow | Adds a shadow to the header after scrolling |
| 10 | Login / Register | Shows a "coming soon" modal |
| 11 | Ad banner visibility | Shows `.jackpot-ad-section` **only when the User-Agent looks like a mobile device** (`navigator.userAgentData.mobile`, or a UA regex as fallback); it stays hidden on desktop |

### Sponsored ad banner

`index.html` contains a slot-machine / "Mega Jackpot" ad banner (`.jackpot-ad-section`) labelled "IKLAN · 18+". It currently links to `https://www.youtube.com`. Because of feature 11, **reviewers on desktop browsers will not see it.** Test on a mobile device or in emulation before you change or review this section.

## Deployment

The site is plain static files. `CNAME` points to `cn2cloud.cc`, which suggests hosting on GitHub Pages or a similar static host. Deploy by publishing the repository root; there are no build artifacts.

## Contributing

- Read [`AGENTS.md`](AGENTS.md) before making changes. It covers planning, testing, security, git practices, and the final report every change needs.
- Keep everything in the existing single-file layout (`styles.css`, `script.js`) unless there is a clear reason to split it.
- All user-facing copy is in Bahasa Indonesia (`<html lang="id">`).
- Check changes at both mobile and desktop widths, and with the browser console open.

## Known gaps

- No backend: the search, auth, and contact form are all mocks.
- The help-center form tells users their message was sent when it was not.
- The `*.svg` files and `Electron.md` are not used by this site.
- There are no automated tests or linting.
