const K='clip-rec-v2';
addEventListener('install',e=>{e.waitUntil(caches.open(K).then(c=>c.addAll(['./','./manifest.json'])).then(()=>skipWaiting()))});
addEventListener('activate',e=>e.waitUntil(clients.claim()));
addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok)caches.open(K).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>hit);return hit||net}))});
