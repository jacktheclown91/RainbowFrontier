import sys,struct,binascii,zipfile
from pathlib import Path
src,out=map(Path,sys.argv[1:3]); data=src.read_bytes(); name=b'index.html'
try:
 import zopfli.zlib
 z=zopfli.zlib.compress(data,numiterations=1000)[2:-4]
 crc=binascii.crc32(data)&0xffffffff; mt,md=0,33
 lh=struct.pack('<IHHHHHIIIHH',0x04034b50,20,0,8,mt,md,crc,len(z),len(data),len(name),0)+name
 cd=struct.pack('<IHHHHHHIIIHHHHHII',0x02014b50,20,20,0,8,mt,md,crc,len(z),len(data),len(name),0,0,0,0,0,0)+name
 out.write_bytes(lh+z+cd+struct.pack('<IHHHHIIH',0x06054b50,0,0,1,1,len(cd),len(lh)+len(z),0))
 print('ZOPFLI ZIP',out.stat().st_size)
except Exception:
 with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as f:f.writestr('index.html',data)
 print('DEFLATE ZIP',out.stat().st_size)
