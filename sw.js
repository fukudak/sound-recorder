const K='clip-rec-v3';
addEventListener('install',e=>{e.waitUntil(caches.open(K).then(c=>c.addAll(['./','./manifest.json'])).then(()=>skipWaiting()))});
addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==K).map(k=>caches.delete(k)))).then(()=>clients.claim())));
// オンラインなら常に最新を取る。オフラインのときだけキャッシュを使う
addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(K).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
