# Nabor prototype

Static HTML + CSS prototype of the Nabor household app. No build step.

## Run

    bin/serve          # http://localhost:4000, no-cache so CSS edits show on reload

Pages need a local server because partials load with `fetch`.

- `preview.html` — phone (390×844) and desktop side by side. `?page=discover.html`
- `components.html` — every component isolated, phone and desktop width. `?only=topbar` focuses one
- `discover.html` — home
- `service.html?service=gutter` — service detail with offers
- `joined.html?service=gutter&pro=cape-gutter-guys` — "You're in": homes, invite, what happens next
- `brand.html` — logo files traced from Mati's draft PNG (`assets/brand/`)

## Structure

    css/tokens.css             colors, type, spacing, radius
    css/base.css               reset, .app container, .container
    css/components/*.css       one file per component
    partials/*.html            shared markup (top bar, bottom bar)
    js/scenario.js             scenario date, neighborhood, filters
    js/offers.js               sample services and provider offers
    js/photo-card.js           service card markup from data
    js/starters.js             "Not open yet" start-a-campaign pills
    js/*.js                    page wiring

## Rules

- Mobile first. Components respond to their container (`@container app`), not the window, so the same component renders correctly in the phone and desktop stages of the workbench.
- Brand coral is never a status color. Green, orange and red are reserved for feedback.
- Spacing and type only from tokens.
- User-provided text goes through `esc()` before entering HTML.
