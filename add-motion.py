from pathlib import Path
from bs4 import BeautifulSoup
import runpy,shutil
R=Path(__file__).parent
runpy.run_path(str(R/'add-three.py'))
for name in ['orbit-preload.js','orbit-motion.mjs','orbit-motion.css','arabic-typography.css']:
 shutil.copyfile(R/name,R/'dist/assets'/name)
p=R/'dist/assets/orbit-experience.js';s=p.read_text().replace('let scheduled=false;function updateStage()', 'let scheduled=false;let previousStage=-1;function updateStage()')
s=s.replace("})}window.addEventListener", "});if(current!==previousStage){previousStage=current;document.dispatchEvent(new CustomEvent('orbit:stage',{detail:{index:current}}))}}window.addEventListener")
s=s.replace("if(current!==previousStage){previousStage=current;queueMicrotask(()=>document.dispatchEvent(new CustomEvent('orbit:stage',{detail:{index:current}})))}", "")
p.write_text(s)
for p in (R/'dist').rglob('*.html'):
 if p.parent==R/'dist':continue
 doc=BeautifulSoup(p.read_text(),'html.parser')
 doc.head.append(doc.new_tag('link',rel='stylesheet',href='/assets/orbit-motion.css'))
 doc.body.append(doc.new_tag('script',src='/assets/orbit-preload.js',defer=True))
 doc.body.append(doc.new_tag('script',src='/assets/orbit-motion.mjs',type='module'))
 if doc.html.get('lang')=='ar':doc.head.append(doc.new_tag('link',rel='stylesheet',href='/assets/arabic-typography.css'))
 p.write_text(str(doc))

# Serve English immediately at the default URL, without language detection.
(R/'dist/index.html').write_text((R/'dist/en/index.html').read_text())
