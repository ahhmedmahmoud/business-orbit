from pathlib import Path
from bs4 import BeautifulSoup
import json,re
D=Path(__file__).parent/'dist'; errors=[];count=0;links=0
for p in D.glob('**/index.html'):
 s=BeautifulSoup(p.read_text(),'html.parser')
 if p==D/'index.html':continue
 count+=1
 for a in s.select('[href], [src]'):
  u=a.get('href') or a.get('src');u=u.split('?')[0];links+=1
  if u.startswith('/'):
   target=D/u.lstrip('/');target=target/'index.html' if u.endswith('/') else target
   if not target.exists():errors.append(f'{p}: broken {u}')
  if u.startswith('#') and not s.find(id=u[1:]):errors.append(f'{p}: missing anchor {u}')
 if len(s.select('h1'))!=1:errors.append(f'{p}: H1 count')
 if not s.select_one('main'):errors.append(f'{p}: main missing')
 if '/ar/' in str(p) and s.html.get('dir')!='rtl':errors.append(f'{p}: RTL missing')
 alt=s.select_one('a.lang')['href'];other=BeautifulSoup((D/alt.lstrip('/')/'index.html').read_text(),'html.parser')
 if other.select_one('a.lang')['href']!='/'+str(p.relative_to(D).parent)+'/':errors.append(f'{p}: language route mismatch')
 if re.search(r'Business Wave|555|New York|\$4\.2B|Tech Scale-up|omar@',s.get_text()):errors.append(f'{p}: legacy copy')
 if not s.select_one('meta[name=description]')['content']:errors.append(f'{p}: description missing')
 for label in s.select('form label'):
  if not label.find(['input','select','textarea']):errors.append(f'{p}: label missing control')
r={'pages_checked':count,'references_checked':links,'errors':errors,'js_syntax':'verified separately with node --check','browser_QA':'not performed: managed preview requires control-browser capability which is not available','performance':'lightweight static implementation; no Lighthouse or measured Core Web Vitals'}
(Path(__file__).parent/'qa-results.json').write_text(json.dumps(r,indent=2));print(json.dumps(r));assert not errors
