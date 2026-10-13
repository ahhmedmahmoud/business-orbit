import {animate,inView,Lenis} from './motion-vendor.mjs';
const preference=matchMedia('(prefers-reduced-motion: reduce)');
let lenis=null, observers=[], controls=new Map(), frame=0;
const stop=element=>{controls.get(element)?.stop();controls.delete(element)};
function enter(element,delta=18){if(!element||preference.matches)return;stop(element);const control=animate(element,{opacity:[.35,1],transform:[`translateY(${delta}px)`,'translateY(0px)']},{duration:delta<=12?.24:.48,ease:[.22,1,.36,1]});controls.set(element,control)}
function clean(){lenis?.destroy();lenis=null;cancelAnimationFrame(frame);observers.forEach(stop=>stop());observers=[];controls.forEach((control,element)=>{control.stop();element.style.removeProperty('opacity');element.style.removeProperty('transform')});controls.clear();document.documentElement.classList.remove('has-smooth-scroll');document.querySelectorAll('[data-motion-reveal]').forEach(e=>{e.style.removeProperty('opacity');e.style.removeProperty('transform')})}
function boot(){clean();if(preference.matches)return;
 if(matchMedia('(pointer: fine)').matches&&!navigator.connection?.saveData){lenis=new Lenis({autoRaf:false,duration:1.05,smoothWheel:true,syncTouch:false,anchors:true,prevent:node=>!!node.closest('textarea, [data-scroll-native]')});document.documentElement.classList.add('has-smooth-scroll');const tick=time=>{lenis?.raf(time);frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);}
 document.querySelectorAll('.experience-heading,.alignment-copy,.experience-route,.kpi-dimensions article,.experience-contact h2,.content-grid article,.capability-visual').forEach(e=>{e.dataset.motionReveal='';observers.push(inView(e,()=>enter(e),{amount:.15}))});
}
boot();preference.addEventListener('change',boot);
document.addEventListener('orbit:stage',()=>{enter(document.querySelector('#stage-number'),9);enter(document.querySelector('#stage-name'),12)});
document.addEventListener('orbit:capability',()=>enter(document.querySelector('.cap-inspector'),12));
document.querySelectorAll('[data-value],[data-route]').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(()=>{const target=button.hasAttribute('data-value')?document.querySelector('.value-panel:not([hidden])'):document.querySelector('#route-response');enter(target,12)})));
const process=document.querySelector('.process-stage-list');const processStages=process?[...process.querySelectorAll('[data-stage]')]:[];const processLayout=document.querySelector('.process-layout');const processDial=document.querySelector('.process-dial');let pending=false;let lastProgress=-1;
function updateProgress(){pending=false;if(!process)return;if(!processStages.length)return;const first=processStages[0].getBoundingClientRect().top,last=processStages[processStages.length-1].getBoundingClientRect().top;const progress=Math.max(0,Math.min(1,(innerHeight*.45-first)/Math.max(1,last-first)));if(Math.abs(progress-lastProgress)<.0005)return;lastProgress=progress;processLayout.style.setProperty('--process-progress',String(progress));processDial?.style.setProperty('--process-turn',`${progress*300}deg`)}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateProgress)}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
// Keep the intro visible during its exit, then reveal the hero once.
document.addEventListener('orbit:intro-complete',()=>{enter(document.querySelector('.orbit-hero-content'),20);lenis?.resize()});
addEventListener('pagehide',clean);addEventListener('pageshow',e=>{if(e.persisted)boot()});

document.querySelectorAll('.stage-dots a').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(!target)return;event.preventDefault();event.stopPropagation();const offset=-innerHeight*.45;if(lenis)lenis.scrollTo(target,{offset});else window.scrollTo({top:Math.max(0,scrollY+target.getBoundingClientRect().top+offset),behavior:preference.matches?'instant':'smooth'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}));
