import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname);
const publicDir=path.join(root,'digital');
const dataDir=path.join(root,'data');
const dataFile=path.join(dataDir,'store.json');
const authFile=path.join(dataDir,'admin.json');
fs.mkdirSync(dataDir,{recursive:true});
const read=(file,fallback)=>{try{return JSON.parse(fs.readFileSync(file,'utf8'))}catch{return fallback}};
let store=read(dataFile,{brand:'VNBX_STORE',description:'Venta mayorista y minorista para emprendedores. Ofrecemos productos de calidad.',whatsapp:'',products:[]});
let auth=read(authFile,{password:''});
const envAdminPassword=process.env.ADMIN_PASSWORD;
if(envAdminPassword){auth={password:String(envAdminPassword)};fs.writeFileSync(authFile,JSON.stringify(auth));}
const save=()=>fs.writeFileSync(dataFile,JSON.stringify(store,null,2));
const json=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type,x-admin-key','Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS'});res.end(JSON.stringify(obj));};
const body=req=>new Promise(resolve=>{let s='';req.on('data',c=>s+=c);req.on('end',()=>{try{resolve(JSON.parse(s||'{}'))}catch{resolve({})}})});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url||'/','http://'+(req.headers.host||'localhost'));
if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type,x-admin-key','Access-Control-Allow-Methods':'GET,POST,PUT,OPTIONS'});return res.end()}
if(u.pathname==='/api/store'&&req.method==='GET')return json(res,200,{...store,products:(store.products||[]).filter(p=>p.active!==false)});
if(u.pathname==='/api/auth/status'&&req.method==='GET')return json(res,200,{configured:!!auth.password});
if(u.pathname==='/api/auth/setup'&&req.method==='POST'){const b=await body(req);if(auth.password)return json(res,409,{error:'Ya configurado'});if(!b.password||String(b.password).length<6)return json(res,400,{error:'La clave debe tener 6 caracteres'});auth={password:String(b.password)};fs.writeFileSync(authFile,JSON.stringify(auth));return json(res,200,{ok:true})}
if(u.pathname==='/api/auth/login'&&req.method==='POST'){const b=await body(req);return json(res,b.password===auth.password&&auth.password?200:401,b.password===auth.password&&auth.password?{ok:true,key:auth.password}:{error:'Clave incorrecta'})}
if(u.pathname==='/api/store'&&req.method==='PUT'){if(req.headers['x-admin-key']!==auth.password)return json(res,401,{error:'No autorizado'});store={...store,...await body(req)};save();return json(res,200,store)}
const rel=u.pathname==='/'?'index.html':u.pathname.replace(/^\/+/,''),file=path.resolve(publicDir,rel);if(!file.startsWith(path.resolve(publicDir)+path.sep))return res.end('Forbidden');fs.stat(file,(e,st)=>{if(e||!st.isFile()){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res)});
}catch(e){res.writeHead(500);res.end('Server error')}});
server.listen(Number(process.env.PORT||8765),'0.0.0.0',()=>console.log('VNBX_STORE online'));
