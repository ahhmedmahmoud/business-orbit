import * as THREE from './vendor-three.mjs';
export function createOrbitScene(){
 const scene=new THREE.Scene();const root=new THREE.Group();scene.add(root);
 const body=new THREE.Mesh(new THREE.IcosahedronGeometry(.7,3),new THREE.MeshStandardMaterial({color:0x19004f,metalness:.78,roughness:.27,emissive:0x2527ec,emissiveIntensity:.18}));root.add(body);
 const wire=new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry,30),new THREE.LineBasicMaterial({color:0xb28fff,transparent:true,opacity:.2}));body.add(wire);
 const rings=[];for(let i=0;i<3;i++){const geometry=new THREE.TorusGeometry(1.25+i*.25,.02,8,100);const material=new THREE.MeshStandardMaterial({color:i===1?0xb28fff:0x2527ec,metalness:.75,roughness:.25,emissive:i===1?0xb28fff:0x2527ec,emissiveIntensity:.3});const ring=new THREE.Mesh(geometry,material);ring.rotation.set(.45+i*.7,.3-i*.4,i*.8);root.add(ring);rings.push(ring);}
 const halo=new THREE.Mesh(new THREE.TorusGeometry(2.05,.009,6,128),new THREE.MeshBasicMaterial({color:0xb28fff,transparent:true,opacity:.3}));root.add(halo);
 const satellites=[];const links=[];
 for(let i=0;i<6;i++){const angle=Math.PI/2-i*Math.PI/3;const position=new THREE.Vector3(Math.cos(angle)*2.05,Math.sin(angle)*2.05,0);const satellite=new THREE.Mesh(new THREE.IcosahedronGeometry(.115,1),new THREE.MeshStandardMaterial({color:0x2527ec,metalness:.5,roughness:.2,emissive:0x2527ec,emissiveIntensity:.25}));satellite.position.copy(position);root.add(satellite);satellites.push(satellite);
 const start=position.clone().normalize().multiplyScalar(.78);const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([start,position]),new THREE.LineBasicMaterial({color:0xb28fff,transparent:true,opacity:.08}));root.add(line);links.push(line);}
 scene.add(new THREE.HemisphereLight(0xb28fff,0x081c34,2.4));const key=new THREE.DirectionalLight(0xffffff,3.5);key.position.set(3,4,5);scene.add(key);const blue=new THREE.PointLight(0x2527ec,18,12);blue.position.set(-3,1,3);scene.add(blue);const violet=new THREE.PointLight(0xb28fff,14,12);violet.position.set(3,-2,2);scene.add(violet);
 function select(index){satellites.forEach((sat,i)=>{const active=i===index;sat.material.color.setHex(active?0xb28fff:0x2527ec);sat.material.emissive.setHex(active?0xb28fff:0x2527ec);sat.material.emissiveIntensity=active?1.5:.25;sat.scale.setScalar(active?1.6:1);links[i].material.opacity=active?.9:.08;});}
 function dispose(){scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose()}});}
 select(0);return {scene,root,body,rings,satellites,links,select,dispose};
}
export function mountOrbit(container){
 const canvas=document.createElement('canvas');canvas.className='orbit-webgl';canvas.setAttribute('aria-hidden','true');
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});}catch(error){canvas.remove();throw error;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<650?1.25:1.75));renderer.setClearColor(0x081c34,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.4;
 const world=createOrbitScene();const camera=new THREE.PerspectiveCamera(37,1,.1,30);camera.position.set(0,0,8.4);camera.lookAt(0,0,0);
 let paused=false,onscreen=true,lost=false,disposed=false,last=0,elapsed=0;const motion=matchMedia('(prefers-reduced-motion: reduce)');const target={x:0,y:0};container.prepend(canvas);
 const controls=document.createElement('button');controls.type='button';controls.className='orbit-3d-toggle';controls.textContent=document.documentElement.lang==='ar'?'إيقاف حركة المدار':'Pause orbital motion';controls.setAttribute('aria-pressed','false');container.append(controls);
 function render(){if(!disposed&&!lost)renderer.render(world.scene,camera);}
 function resize(){const r=container.getBoundingClientRect();if(r.width>0&&r.height>0){renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();render();}}
 const ro=new ResizeObserver(resize);ro.observe(container);
 function animate(time){if(time-last<33)return;const dt=Math.min((time-last)/1000,.05);last=time;elapsed+=dt;world.rings.forEach((ring,i)=>{ring.rotation.z+=dt*(i%2?-.13:.1);ring.rotation.y+=dt*.035});world.body.rotation.y+=dt*.08;world.root.rotation.x+=((target.x)-world.root.rotation.x)*.045;world.root.rotation.y+=((target.y)-world.root.rotation.y)*.045;render();}
 function schedule(){const running=onscreen&&!document.hidden&&!paused&&!motion.matches&&!lost&&!disposed;renderer.setAnimationLoop(running?animate:null);if(!running)render();controls.hidden=motion.matches||lost||disposed;}
 const io=new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;schedule()},{rootMargin:'80px'});io.observe(container);
 const pointer=e=>{if(motion.matches)return;const r=container.getBoundingClientRect();target.x=-((e.clientY-r.top)/r.height-.5)*.14;target.y=((e.clientX-r.left)/r.width-.5)*.2;};const leave=()=>{target.x=0;target.y=0};container.addEventListener('pointermove',pointer,{passive:true});container.addEventListener('pointerleave',leave);
 function selection(event){const value=Number(event.detail?.index);if(Number.isInteger(value)&&value>=0&&value<6){world.select(value);render();}}
 document.addEventListener('orbit:capability',selection);const active=Number(container.querySelector('.cap-node[aria-pressed="true"]')?.dataset.cap||0);world.select(active);
 const toggle=()=>{paused=!paused;controls.setAttribute('aria-pressed',String(paused));controls.textContent=document.documentElement.lang==='ar'?(paused?'تشغيل حركة المدار':'إيقاف حركة المدار'):(paused?'Play orbital motion':'Pause orbital motion');schedule()};controls.addEventListener('click',toggle);
 const visibility=()=>schedule();document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',visibility);
 const contextLost=e=>{e.preventDefault();lost=true;container.classList.remove('has-three');controls.hidden=true;schedule()};canvas.addEventListener('webglcontextlost',contextLost);
 const contextRestored=()=>{lost=false;container.classList.add('has-three');resize();schedule()};canvas.addEventListener('webglcontextrestored',contextRestored);
 const cleanup=()=>{if(disposed)return;disposed=true;renderer.setAnimationLoop(null);ro.disconnect();io.disconnect();document.removeEventListener('orbit:capability',selection);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',visibility);container.removeEventListener('pointermove',pointer);container.removeEventListener('pointerleave',leave);world.dispose();renderer.dispose();canvas.remove();controls.remove();container.classList.remove('has-three')};window.addEventListener('pagehide',cleanup,{once:true});container.classList.add('has-three');resize();schedule();return {select:world.select,dispose:cleanup};
}
