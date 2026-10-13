from pathlib import Path
from bs4 import BeautifulSoup
import runpy
R=Path(__file__).parent
runpy.run_path(str(R/'finalize-content.py'))
p=R/'dist/assets/orbit-experience.js';s=p.read_text()
if "orbit:capability" not in s:s=s.replace("if(announce)document.querySelector('#cap-announcement').textContent=cap.title;", "if(announce)document.querySelector('#cap-announcement').textContent=cap.title;document.dispatchEvent(new CustomEvent('orbit:capability',{detail:{index:i}}));")
p.write_text(s)
for lang in ['en','ar']:
 p=R/'dist'/lang/'index.html';doc=BeautifulSoup(p.read_text(),'html.parser');doc.head.append(doc.new_tag('link',rel='stylesheet',href='/assets/orbit-three.css'));doc.body.append(doc.new_tag('script',src='/assets/orbit-three-loader.js',defer=True));p.write_text(str(doc))
