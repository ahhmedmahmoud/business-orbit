'use strict';
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const force=new URLSearchParams(location.search).get('intro')==='1';
 try{if(sessionStorage.getItem('orbit-intro-seen')&&!force)return;sessionStorage.setItem('orbit-intro-seen','1')}catch{}
 if(reduced)return;
 const ar=document.documentElement.lang==='ar';
 const slogan=ar?'المعلومات. الاستراتيجية. التنفيذ. القيمة.':'Intelligence. Strategy. Execution. Value.';
 const layer=document.createElement('div');layer.className='orbit-preloader';layer.setAttribute('role','status');
 layer.innerHTML=`<div class="preload-content"><div class="preload-orbit" aria-hidden="true"><i></i><i></i><img src="/assets/logo-white.png" alt=""></div><p class="preload-name" aria-label="Business Orbit"><span aria-hidden="true"></span></p><p class="preload-slogan">${slogan}</p></div><button class="preload-skip" type="button">${ar?'تخطي المقدمة':'Skip intro'} ↗</button>`;
 document.body.append(layer);document.documentElement.classList.add('intro-running');
 const previousFocus=document.activeElement;
 const siblings=[...document.body.children].filter(e=>e!==layer&&!['SCRIPT','STYLE'].includes(e.tagName));
 const old=siblings.map(e=>[e,e.inert]);siblings.forEach(e=>e.inert=true);
 let closed=false;const timers=[];const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id)};
 function close(){if(closed)return;closed=true;timers.forEach(clearTimeout);old.forEach(([e,inert])=>e.inert=inert);document.documentElement.classList.remove('intro-running');layer.classList.add('is-leaving');document.removeEventListener('keydown',escape);document.dispatchEvent(new CustomEvent('orbit:intro-complete'));setTimeout(()=>layer.remove(),420);if(layer.contains(document.activeElement)&&previousFocus?.isConnected)previousFocus.focus()}
 function escape(e){if(e.key==='Escape')close()}
 document.addEventListener('keydown',escape);layer.querySelector('button').addEventListener('click',close);
 const name='Business Orbit';let index=0;const text=layer.querySelector('.preload-name span');
 function type(){if(closed)return;text.textContent=name.slice(0,++index);if(index<name.length)later(type,48);else layer.classList.add('name-ready')}
 later(type,180);
 // Bound the introduction: slow fonts/media never block entry to the website.
 const fonts=Promise.resolve(document.fonts?.ready).catch(()=>{});
 Promise.all([fonts,new Promise(resolve=>later(resolve,1750))]).then(()=>close());
 later(close,2600);
})();
