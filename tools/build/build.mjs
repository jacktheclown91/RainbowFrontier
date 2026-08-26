// Rainbow Frontier release build: inline the readable source pieces, minify, Roadroller-pack, emit one self-contained index.html.
import { minify } from 'terser';
import { Packer } from 'roadroller';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const root = new URL('../../', import.meta.url);
const page = readFileSync(new URL('index.html', root), 'utf8');
let js='';
const head = page.replace(/<script src=([^ >]+)><\/script>/g,(_,p)=>(js+=readFileSync(new URL(p,root),'utf8'),''));
if(!js){console.error('ERR: no source scripts found');process.exit(2)}
js=js.replace("DEV=q.has('side')||q.has('front')||q.has('rear'),SIL=q.has('side')",'DEV=0,SIL=0');
const st=head.match(/<style>([\s\S]*?)<\/style>/), body=head.slice(head.indexOf('</style>')+8).trim();
if(!st){console.error('ERR: no style shell');process.exit(2)}
const shell="document.title='Rainbow Frontier';document.body.innerHTML="+JSON.stringify('<style>'+st[1]+'</style>'+body)+';';

const min = (await minify(shell+js, {
  compress: { passes: 3, unsafe: true, unsafe_math: true, drop_console: true },
  mangle: { toplevel: true },
  format: { semicolons: true }
})).code;

const packer = new Packer([{ data: min, type: 'js', action: 'eval' }], {});
let rs=+process.env.RF_SEED||7; Math.random=()=>((rs=rs*16807%2147483647)-1)/2147483646;
await packer.optimize(1);
const { firstLine, secondLine } = packer.makeDecoder();
const packed = firstLine + '\n' + secondLine;
const out='<!doctype html><meta charset=utf-8><body><script>'+packed+'</script>';

mkdirSync(new URL('dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('dist/index.html', import.meta.url), out);
console.log('SOURCE ' + (head.length+js.length));
console.log('MINIFIED ' + min.length);
console.log('ROADROLLED ' + packed.length);
console.log('BUILT ' + out.length);
