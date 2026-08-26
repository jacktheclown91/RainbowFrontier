import { readFileSync, writeFileSync } from 'fs';
import { deflateRawSync } from 'zlib';

let [src, out] = process.argv.slice(2), data = readFileSync(src), name = Buffer.from('index.html'), z = deflateRawSync(data, { level: 9 }), crc = ~data.reduce((c, b) => {
  c ^= b;
  for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1;
  return c;
}, -1) >>> 0;
let a = [];
function w(n, v) { let b = Buffer.alloc(n); n == 2 ? b.writeUInt16LE(v) : b.writeUInt32LE(v); a.push(b) }
w(4, 0x04034b50); w(2, 20); w(2, 0); w(2, 8); w(2, 0); w(2, 33); w(4, crc); w(4, z.length); w(4, data.length); w(2, name.length); w(2, 0); a.push(name, z);
let p = Buffer.concat(a), c = [];
function v(n, q) { let b = Buffer.alloc(n); n == 2 ? b.writeUInt16LE(q) : b.writeUInt32LE(q); c.push(b) }
v(4, 0x02014b50); v(2, 20); v(2, 20); v(2, 0); v(2, 8); v(2, 0); v(2, 33); v(4, crc); v(4, z.length); v(4, data.length); v(2, name.length); v(2, 0); v(2, 0); v(2, 0); v(2, 0); v(4, 0); v(4, 0); c.push(name);
let d = Buffer.concat(c), e = [];
for (let [n, q] of [[4, 0x06054b50], [2, 0], [2, 0], [2, 1], [2, 1], [4, d.length], [4, p.length], [2, 0]]) { let b = Buffer.alloc(n); n == 2 ? b.writeUInt16LE(q) : b.writeUInt32LE(q); e.push(b) }
writeFileSync(out, Buffer.concat([p, d, ...e]));
console.log('NODE ZIP ' + (p.length + d.length + Buffer.concat(e).length));
