'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce && 'IntersectionObserver' in window){document.body.classList.add('reveals-ready');const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('waiting');observer.unobserve(e.target)}})},{threshold:.08});document.querySelectorAll('.intro-grid,.image-pair,.framework-strip,.panel-title,.route-pair,.method-lines,.intelligence-section,.closing h2').forEach(el=>{el.dataset.reveal='';el.classList.add('waiting');observer.observe(el)})}
document.querySelectorAll('.cap-row').forEach(row=>row.addEventListener('toggle',()=>{if(row.open){document.querySelectorAll('.cap-row').forEach(other=>{if(other!==row)other.open=false})}}));
