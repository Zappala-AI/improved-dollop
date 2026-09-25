import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'digital');
const dataDir = path.join(root, 'data');
const storeFile = path.join(dataDir, 'store.json');
const authFile = path.join(dataDir, 'admin.json');
const port = Number(process.env.PORT || process.env.ZAVIAN_PORT || 8765);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const sessions = new Map();
const defaultStore = {products:[],categories:['Tecnología','Moda','Joyería y accesorios','Perfumería','Otros'],content:{heroTitle:'VNBX_STORE',heroText:'Venta mayorista y minorista para emprendedores. Ofrecemos productos de calidad, seleccionados para acompañar tus proyectos y tu día a día.',aboutText:'',contactText:'Consultanos por disponibilidad, compras mayoristas y opciones para emprendedores.',whatsapp:''}};

async function readJson(file, fallback){try{return JSON.parse(await fsp.readFile(file,'utf8'))}catch{return fallback}}
async function writeJson(file, value){await fsp.mkdir(dataDir,{recursive:true});await fsp.writeFile(file,JSON.stringify(value,null,2),'utf8')}
function hashPassword(password, salt=crypto.randomBytes(16).toString('hex')){return {salt,hash:crypto.scryptSync(password,salt,64).toString('hex')}}
function validPassword(password, record){return crypto.timingSafeEqual(Buffer.from(hashPassword(password,record.salt).hash,'hex'),Buffer.from(record.hash,'hex'))}
function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').filter(Boolean).map(x=>{const i=x.indexOf('=');return [x.slice(0,i).trim(),decodeURIComponent(x.slice(i+1))]}))}
function authenticated(req){const token=cookies(req).vnbx_session;return token&&sessions.has(token)}
function json(res,status,value,headers={}){const body=JSON.stringify(value);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(body)}
function body(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',chunk=>{raw+=chunk;if(raw.length>2_000_000)reject(new Error('Payload too large'))});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch(e){reject(e)}});req.on('error',reject)})}

function localAddresses(){
  const addresses=[];
  for(const interfaces of Object.values(os.networkInterfaces())) for(const item of interfaces||[]) if(item.family==='IPv4'&&!item.internal) addresses.push(item.address);
  return addresses;
}

const server=http.createServer((req,res)=>{
  try{
    const requestPath=decodeURIComponent(new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname);
    if(requestPath==='/api/auth/status'&&req.method==='GET'){readJson(authFile,null).then(record=>json(res,200,{configured:!!record,environmentConfigured:!!process.env.ADMIN_PASSWORD}));return}
    if(requestPath==='/api/auth/setup'&&req.method==='POST'){body(req).then(async input=>{const existing=await readJson(authFile,null);if(existing)return json(res,409,{error:'El acceso ya está configurado'});if(!input.password||String(input.password).length<4)return json(res,400,{error:'La contraseña debe tener al menos 4 caracteres'});await writeJson(authFile,hashPassword(String(input.password)));const token=crypto.randomBytes(32).toString('hex');sessions.set(token,Date.now());json(res,200,{ok:true},{'Set-Cookie':`vnbx_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`})}).catch(()=>json(res,400,{error:'Solicitud inválida'}));return}
    if(requestPath==='/api/auth/login'&&req.method==='POST'){body(req).then(async input=>{const record=await readJson(authFile,null),password=String(input.password||''),environmentPassword=String(process.env.ADMIN_PASSWORD||'');const valid=record&&validPassword(password,record),validEnvironment=environmentPassword&&password===environmentPassword;if(!password||(!valid&&!validEnvironment))return json(res,401,{error:'Contraseña incorrecta'});if(validEnvironment&&!valid)await writeJson(authFile,hashPassword(password));const token=crypto.randomBytes(32).toString('hex');sessions.set(token,Date.now());json(res,200,{ok:true},{'Set-Cookie':`vnbx_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`})}).catch(()=>json(res,400,{error:'Solicitud inválida'}));return}
    if(requestPath==='/api/auth/logout'&&req.method==='POST'){const token=cookies(req).vnbx_session;sessions.delete(token);json(res,200,{ok:true},{'Set-Cookie':'vnbx_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0'});return}
    if(requestPath==='/api/store'&&req.method==='GET'){readJson(storeFile,defaultStore).then(value=>json(res,200,value));return}
    if(requestPath==='/api/store'&&req.method==='PUT'){if(!authenticated(req)){json(res,401,{error:'No autorizado'});return}body(req).then(async value=>{await writeJson(storeFile,value);json(res,200,{ok:true})}).catch(()=>json(res,400,{error:'Datos inválidos'}));return}
    const relative=requestPath==='/'?'tienda.html':requestPath.replace(/^\/+/,''), file=path.resolve(publicDir,relative);
    if(!file.startsWith(path.resolve(publicDir)+path.sep)){res.writeHead(403);res.end('Forbidden');return}
    fs.stat(file,(error,stats)=>{
      if(error||!stats.isFile()){res.writeHead(404);res.end('Not found');return}
      res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
      fs.createReadStream(file).pipe(res);
    });
  }catch(error){res.writeHead(400);res.end('Bad request')}
});

server.listen(port,'0.0.0.0',()=>{
  console.log(`VNBX_STORE disponible en esta PC: http://localhost:${port}`);
  for(const address of localAddresses()) console.log(`ZAVIAN desde el celular (misma Wi-Fi): http://${address}:${port}`);
  console.log('Tienda pública: /  ·  Panel privado: /admin.html');
});
