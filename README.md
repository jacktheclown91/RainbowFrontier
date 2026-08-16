# Rainbow Frontier

**Rainbow Frontier** is a js13kGames 2026 Online entry for the theme **Unicorns and Rainbows**.

Ride an animated unicorn through a continuously generated 3D frontier, cleanse Grey Growths, fight the Grey Beast, restore regions, meet other players, chat, use herd pings, and play Hoof & Cross on a physical board in the shared world.

## Source layout

- `index.html` — readable development source and the authoritative game source.
- `dev-relay.js` — tiny local emulator for the js13k Online relay protocol; development only.
- `PACK_RELEASE.bat` — Windows release builder and 13,312-byte size gate.
- `tools/build/build.mjs` — folds the HTML/CSS shell into JavaScript, minifies with Terser, and packs with Roadroller.
- `tools/build/maxzip.py` — deterministic maximum-DEFLATE ZIP writer using Zopfli when installed.
- `tools/build/package.json` / `package-lock.json` — pinned JavaScript build dependencies.
- `requirements.txt` — Python packaging dependency used by the release build.

Generated files (`node_modules`, `tools/build/dist`, and release ZIPs) are deliberately not committed.

## Controls

- `WASD` — ride
- `SHIFT` — gallop / charge
- `SPACE` — jump
- `RMB` — Rider Steer
- Mouse wheel — camera zoom
- `ENTER` — world chat
- `F` — Hoof & Cross interaction
- `1`–`4` — herd pings
- `M` — mute / unmute

## Build

Requirements:

- Node.js + npm
- Python 3
- Python package `zopfli==0.4.2`

Install dependencies:

```text
cd tools/build
npm ci
cd ../..
python -m pip install -r requirements.txt
```

On Windows, run:

```text
PACK_RELEASE.bat
```

The builder:

1. syntax-checks the development JavaScript,
2. minifies it with Terser,
3. packs it with Roadroller using deterministic seed 7,
4. creates a self-contained `index.html`,
5. builds `RainbowFrontier_release.zip`, and
6. fails if the archive exceeds the js13kGames 13,312-byte limit.

The frozen release-candidate build is reproducible at **13,063 bytes**, leaving **249 bytes** under the limit when built with Zopfli.

## Online mode

The production client uses the official js13kGames Online relay. `dev-relay.js` exists only for local multi-client development/testing and is not part of the submitted release ZIP.

The multiplayer model keeps gameplay state client-reconcilable: Growth cleansing, Grey Beast damage, region restoration, player movement/chat/pings, and Hoof & Cross are exchanged through compact relay messages without a custom production server.

## Release archive

The actual js13kGames submission archive is intentionally **not stored in this source repository**. It is generated locally by `PACK_RELEASE.bat` and submitted separately.
