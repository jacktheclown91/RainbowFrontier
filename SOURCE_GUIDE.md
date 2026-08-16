# Source Guide

`index.html` is the uncompressed development source. The release pipeline generates a much smaller packed artifact from it; `tools/build/dist/index.html` is generated output and is intentionally excluded from source control.

The game is compact by design, but the major systems can be located by their function names:

- WebGL setup and geometry: `sh`, `tri`, `box`, `seg`, `pyr`, `roof`
- Terrain and world generation: `h`, `terrain`, `tree`, `house`, `crystal`, `chunk`, `region`
- Unicorn/mesh rendering: `mh`, `animal`
- Region progression: `setBoss`, `restore`, `bits`, `loadMask`, `frontier`
- Online relay/state: `send`, `see`, `net`
- Audio: `snd`, `music`
- UI/social: `gname`, `addMsg`, `discover`
- Camera/input/runtime: `resize`, `proj`, `blocked`, `respawn`, `enter`, `frame`
- Hoof & Cross: `board`, `gi`, `hoof`
- Effects/trails: `corruption`, `mark`, `beam`, `trailDraw`

The packed release intentionally uses Terser and Roadroller only after this source has been read. Those generated transformations are not the authoritative source files.
