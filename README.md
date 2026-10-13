# Business Orbit — Corporate Website Transformation

Independent review implementation, 34 localized pages (17 English + 17 Arabic). Original website untouched. Buildless static HTML/CSS/JS chosen because existing public site uses `.html` pages and no hosting/source credentials were provided. No framework dependencies at runtime.

## Run

`python3 -m http.server 8000 --directory dist`

Open `http://localhost:8000/en/` or `/ar/`. Use an HTTP server; absolute asset paths will not work by double-clicking HTML files.

## Build and checks

`python3 adapt.py` regenerates page HTML using the original website structure. Original homepage template and styles are retained in reference/. CSS/JS and official identity assets are in `dist/assets/`. `python3 check.py` requires BeautifulSoup4 and checks page structure, language pairing, local references and legacy content. `node --check dist/assets/app.js` checks JavaScript syntax.

## Content authority

The uploaded `(2)` copies of the two latest 27-slide profiles were used as supplied counterparts of the requested `(1)` references; no version-comparison claim is made. Identity PDF overrides every presentation for logo, palette and English typeface. Team Guide interprets the business but its obsolete four-stage workflow and 16-slide blueprint do not override latest profiles. Historic raster PDFs were inspected for historical context, not used to substantiate current claims.

## Deployment

Static host must serve directory index files and the supplied `404.html`. `robots.txt` and all page robots metadata deliberately block indexing during review. Before production, replace noindex policy, configure production canonical URLs, absolute hreflang/OG URLs, sitemap, and redirects described in AUDIT-AND-HANDOVER.md. Connect an approved submission backend with privacy notice, consent, server-side validation and spam controls before changing contact form from local download to submission. No data is stored or transmitted by review form.

## Revision 2 — Original website design
The homepage now uses the existing website HTML layout, photography, floating navigation, sector accordion cards, layered hero, alternating dark/light sections and roadmap. Palette, logo, pattern and typography follow Orbit identity. Tailwind utilities are precompiled in dist/assets/utilities.css; no CDN dependency is needed. The original stencil typeface and old Wave marks were replaced.

## Revision 3 — Stodio-inspired original design
Run `python3 stodio-direction.py` to regenerate the current 34 localized pages. Current styling is `dist/assets/stodio-direction.css`. Original independently implemented layout inspired by the supplied Stodio reference; no Stodio source code, media or template licensing is included. The homepage uses locally hosted illustrative imagery from the previous site, an inset rounded photographic hero, oversized regular-weight typography, editorial sections, native details accordions, development route tiles and a large closing section. Inner pages use the same navigation and typography. All content remains based on approved profiles.

## Revision 4 — Connected Orbit experience
Current generator: `python3 orbit-experience.py`. Current theme: orbit-experience.css layered over stodio-direction.css. Cinematic conceptual hero asset, objective-first story, interactive six-capability orbital explorer with mouse and arrow-key control, two development routes, scroll-tracked six-stage method, separate execution/business/market KPIs and development-status Intelligence OS. Hero is an AI-generated raster render, not a live WebGL scene. Hero art prompt: polished cinematic orbital sculpture around one luminous core; official navy/blue/purple/lavender; subject at right, negative space at left; no text/logo. Built-in image generation was used. Saved runtime asset: dist/assets/orbit-hero.webp. Official logo remains separate and unchanged.

Interaction tests: `npm install` then `npm test` (jsdom is a development-only dependency). Tests cover both languages: capability selection, output replacement, detail URLs, keyboard wraparound/focus, menu and Escape. These are DOM component tests, not browser/rendering tests. Full mobile visual QA and performance measurement remain pending.

## Revision 5 — Corporate refinement and video
Current generator: `python3 refine-corporate.py`. It applies all seven requested refinements after generating the base Orbit experience. User-supplied 8-second hero video is H.264 1080p, 2.74 MB, without audio; poster fallback, reduced-motion/save-data handling and play/pause controls are included. The four-step business-model tabs pair decision focus with typical outputs. These illustrative examples are editorial interpretations; scope and approval responsibilities remain mandate-specific. Build/Transform/Scale selector carries context into a three-step enquiry brief. Six methodology outputs interpret the approved stage definitions. Capability pages now include four exact profile-based scope areas and distinct visual compositions. Video has not been playback-tested in a real browser in this environment; component tests mock media APIs to test control state, not decoding or autoplay policy. Browser visual/responsive QA and performance measurement remain required before official launch. Contact backend remains unconnected; form downloads a local brief including the challenge.

## Revision 6 — Final source-aligned corporate content pass
Current generator: `python3 finalize-content.py`. It runs previous generators before applying the final page-specific copy, About content and metadata refinements. `python3 audit-content.py` verifies claim guardrails and produces CONTENT-SOURCE-MAP.json. Read CONTENT-REVIEW.md for completed changes and remaining factual publication inputs.

## Revision 7 — Real Three.js capability scene
Current generator: `python3 add-three.py` runs the previous content generator and attaches the enhancement. Three.js 0.186.1 is pinned, bundled locally in dist/assets/vendor-three.mjs, with its MIT license in THREE-LICENSE.txt. orbit-scene.mjs builds a real WebGL scene with three metallic/emissive torus rings, a faceted core, six capability markers and exclusive active connector lighting. DOM labels, official logo and keyboard controls remain accessible. Loader activates near viewport, preserves 2D fallback on failure or save-data, pauses offscreen/hidden, limits pixel ratio and targets 30 FPS. Reduced motion renders a static scene. There is a pause/play control. The hero video remains unchanged. Node tests verify scene geometry, selection, material state and disposal; no actual GPU/browser rendering validation was performed. To rebuild the vendor module: install dependencies and run esbuild on node_modules/three/build/three.module.js with bundle/minify/format=esm/platform=browser output to dist/assets/vendor-three.mjs.

## Revision 8 — Motion and layout
Current generator: `python3 add-motion.py` (BeautifulSoup4 required). Install the package.json dependencies, run the generator, then `npx esbuild motion-entry.mjs --bundle --format=esm --minify --outfile=dist/assets/motion-vendor.mjs`. Prebuilt runtime assets are supplied. Motion 14.1.0 is the vanilla JavaScript counterpart of the Motion/Framer Motion ecosystem; this static site does not use the React Framer Motion API. Lenis 1.3.26 smooths desktop wheel scrolling; touch scrolling remains native. UIUX Pro Max was unavailable and was not used.

All 34 localized pages include the introduction and motion stylesheet. The first visit in a tab shows the official Orbit mark rotating, types Business Orbit, and reveals the approved bold slogan; Escape and Skip intro dismiss it. It exits by 2.6 seconds even if fonts stall, and is omitted for reduced-motion visitors. Add `?intro=1` to replay it. Motion reveals start only when the module works; a failed module never hides page content. The existing video and Three.js capability map remain. Methodology has a continuous scroll-progress spine, active output treatment, stage-heading transitions, and stage navigation aligned to the reading position. Spacing and grid refinements preserve the existing visual direction.

Automated structural/content checks and DOM interactions are verified. Browser visual, responsive, real scroll feel, video decoding, WebGL and measured performance checks remain pending because control-browser is unavailable. Tests do not claim these browser outcomes.

## Revision 9 — Official skill review
Reviewed using the installed upstream UI UX Pro Max (7246805992a42b7bba37d4cac83b01416f0c6c44) and official Motion AI Kit skill (d1c5c26f424adfd47c112d894e9d424b57338c7e). Applied verified UX search results for touch targets, motion sensitivity, and prose readability. Controls now have larger pointer areas, primary reading text is 16px, native form inputs avoid tiny text, and focus remains visible. Motion entry uses full transform keyframes, state feedback is 240ms and larger entrance 480ms, and methodology frame work caches nodes and skips negligible repeated updates. The approved palette/typeface and content remain authoritative. Motion MCP is not connected; the local official guidance and public API docs were used. No MotionScore rating, Motion+ source or actual runtime performance claim is made.

## Revision 10 — Arabic legibility and English default
Arabic primary prose is 18px with stronger 600 weight, headings/actions 700, larger metadata/navigation, stronger dark-section prose contrast, and native input text at 18px. Retains Arial from the approved Arabic presentation and Montserrat for the English wordmark. An Arabic-only stylesheet loads last on all 17 RTL pages; English typography is unchanged. Arabic tablet navigation wraps deliberately instead of squeezing larger text. Root URL serves the complete English homepage directly; no browser-language detection or automatic Arabic redirect. Explicit /ar/ routes remain Arabic. Structural checks, locale reciprocity, root-language checks, Arabic stylesheet coverage, and existing interaction tests passed. Visual browser QA remains pending.
