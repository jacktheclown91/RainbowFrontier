# Rainbow Frontier

**Rainbow Frontier** is a js13kGames 2026 Online entry for the theme **Unicorns and Rainbows**.

Ride a procedural unicorn through an endless 3D frontier, cleanse Grey Growths, collect Spectrum crystals, fight the Grey Beast, restore regions, meet other players, chat, send herd pings, and play Hoof & Cross on a board sitting in the world. All in a 13 KB-ish box, because apparently reasonable hobbies were unavailable.

## Play

Open `index.html` directly for solo play.

For two-window local multiplayer testing:

```text
node dev-relay.js
```

Then open:

```text
http://localhost:8080/?w=/rainbow-frontier
```

The submitted game uses the official js13kGames Online relay by default. `dev-relay.js` exists so local multiplayer testing does not require making the internet responsible for your evening.

## Controls

- `WASD` — ride
- `SHIFT` — gallop / charge
- `SPACE` — jump; after the first Grey Beast falls, tap in air to climb and hold to glide
- `RMB` — toggle rider steer
- Mouse wheel — camera zoom
- `ENTER` — world chat
- `F` — Hoof & Cross stamp
- `1`–`4` — herd pings
- `M` — mute / unmute

## Source map

The readable source is deliberately split into small browser scripts. The build puts it all back together before compression, because humans deserve files and compressors deserve suffering.

- `index.html` — page shell, HUD, menu, and source-script order
- `src/00-render.js` — WebGL setup, geometry primitives, terrain helpers
- `src/10-world.js` — procedural regions, settlements, vegetation, crystals, landmarks
- `src/20-creatures.js` — horse/unicorn mesh data, animation, wings, corruption visuals
- `src/30-state.js` — progression state, relay protocol, chat, audio, input
- `src/40-rules.js` — camera/math helpers, collision, Hoof & Cross, effects/trails
- `src/50-runtime.js` — frame loop, movement, boss fight, flight/glide, multiplayer rendering, HUD
- `dev-relay.js` — tiny local emulator for the js13k Online relay protocol
- `PACK_RELEASE.bat` — Windows release builder plus the 13,312-byte size gate
- `tools/build/build.mjs` — source inliner, Terser minifier, Roadroller pack step
- `tools/build/maxzip.py` — optional Zopfli/DEFLATE ZIP writer
- `tools/build/zip.mjs` — Node-only ZIP fallback
- `tools/build/package.json` / `package-lock.json` — pinned build dependencies
- `requirements.txt` — optional Python build dependency for the tighter ZIP path

Generated output is not source. No `node_modules`, no `tools/build/dist`, no release ZIPs, no screenshots, no editor clutter, and no random desk-drawer archaeology. Git gets the code, not the entire desk.

## Build

Install the JavaScript build tools:

```text
cd tools/build
npm ci
cd ../..
```

Optional, for the best ZIP compression path:

```text
python -m pip install -r requirements.txt
```

Build the submission archive:

```text
PACK_RELEASE.bat
```

The builder syntax-checks the readable source files, inlines them in `index.html` order, removes development-only reference modes, minifies with Terser, packs with Roadroller, creates a self-contained release `index.html`, zips it, and fails if the archive exceeds the js13kGames limit.

Current verified package: **13,194 / 13,312 bytes**. That leaves 118 bytes, which in js13k terms is basically beachfront property.

## Recent polish

- Faster relay handshakes for same-room multiplayer.
- Hoof & Cross now continues correctly past the first stamp and syncs board state to late-arriving peers.
- First Grey Beast defeat unlocks rainbow wing-climb/glide.
- Wings flap while airborne; glides trail longer; horses have ground shadows; crystals shimmer; beacon light hue-cycles; corruption pulses harder; the boss warning marker swells during wind-up.
- The HUD falls back to `SOLO HERD` if the relay is unavailable while continuing to retry.

## License

This repository is **source-available, not open source**. Read it, run it privately, learn from it, and make your own weird thing. If you want to copy, adapt, redistribute, or commercially reuse protected parts of Rainbow Frontier, ask first. The full terms are in `LICENSE`, because “please don't steal my unicorn game” apparently needed paragraphs.
