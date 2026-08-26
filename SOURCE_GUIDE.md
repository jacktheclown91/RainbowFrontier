# Source Guide

`index.html` is the page shell. The scripts under `src/` are loaded in order and together form the readable game source. `tools/build/build.mjs` inlines those exact files before Terser and Roadroller turn them into the tiny self-contained release.

Do not hand-edit `tools/build/dist/index.html`. That file is generated output. Editing Roadroller soup directly is how you summon regret with a keyboard.

## File landmarks

- `src/00-render.js` — WebGL setup, shaders, geometry primitives, terrain math
- `src/10-world.js` — terrain chunks, trees, buildings, crystals, landmarks, region generation
- `src/20-creatures.js` — horse/unicorn mesh, gait animation, rainbow wings, corruption rendering
- `src/30-state.js` — player/progression state, network messages, audio, chat, controls
- `src/40-rules.js` — matrix/camera helpers, collision, region transitions, Hoof & Cross, trails/effects
- `src/50-runtime.js` — main frame loop, movement, combat, boss logic, flight, multiplayer interpolation, HUD
- `index.html` — HUD/menu markup, CSS, and canonical source-script order
- `dev-relay.js` — local relay emulator for multiplayer testing
- `tools/build/build.mjs` — release compiler/packer

## Public-source rule of thumb

Commit files somebody needs to understand, run, test, or rebuild the game. Ignore generated dependencies, build output, archives, screenshots, local notes, editor state, and other desk-drawer debris.

If a file helps build or understand Rainbow Frontier, it can stay. If it only helps me remember what I was doing at 3 AM, it can stay on my machine.
