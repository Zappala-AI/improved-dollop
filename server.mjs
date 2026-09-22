import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'digital');
const port = Number(process.env.ZAVIAN_PORT || 8765);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};

function localAddresses(){
  const addresses=[];
  for(const interfaces of Object.values(os.networkInterfaces())) for(const item of interfaces||[]) if(item.family==='IPv4'&&!item.internal) addresses.push(item.address);
  return addresses;
}

const server=http.createServer((req,res)=>{
  try{
    const requestPath=decodeURIComponent(new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname);
    const relative=requestPath==='/'?'index.html':requestPath.replace(/^\/+/,''), file=path.resolve(publicDir,relative);
    if(!file.startsWith(path.resolve(publicDir)+path.sep)){res.writeHead(403);res.end('Forbidden');return}
    fs.stat(file,(error,stats)=>{
      if(error||!stats.isFile()){res.writeHead(404);res.end('Not found');return}
      res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
      fs.createReadStream(file).pipe(res);
    });
  }catch(error){res.writeHead(400);res.end('Bad request')}
});

server.listen(port,'0.0.0.0',()=>{
  console.log(`ZAVIAN disponible en esta PC: http://localhost:${port}`);
  for(const address of localAddresses()) console.log(`ZAVIAN desde el celular (misma Wi-Fi): http://${address}:${port}`);
  console.log('Dejá esta ventana abierta mientras uses el panel desde el celular.');
});
