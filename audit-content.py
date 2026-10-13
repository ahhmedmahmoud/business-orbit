from pathlib import Path
from bs4 import BeautifulSoup
import json,re
R=Path(__file__).parent;D=R/'dist';sources={'en':'Business Orbit - Distinct Visuals - Original Wording(2).pptx','ar':'Business_Orbit_Maximum_Corporate_Company_Profile_AR(2).pptx'}
slides={'':[1,2,3,7,8,10,18,20,21,22,27],'about':[2,5,6,25,26],'business-model':[2,7,8,19],'build':[2,8,18],'transform':[2,8,18],'scale':[2,20,21],'capabilities':[10],'methodology':[18,21],'governance':[20,23],'intelligence-os':[17,22,23],'contact':[27]}
for key,number in [('technology',11),('brand-marketing',12),('engineering',13),('strategy-advisory',14),('operations',15),('financial-legal',16)]:slides['capabilities/'+key]=[10,number,19]
results=[];errors=[]
for lang in ['en','ar']:
 for p in (D/lang).glob('**/index.html'):
  slug=str(p.parent.relative_to(D/lang));slug='' if slug=='.' else slug;s=BeautifulSoup(p.read_text(),'html.parser');text=s.get_text(' ',strip=True)
  if re.search(r'Business Wave|Lorem ipsum|\$4\.2B|555|omar@|100% success|Guaranteed|guaranteed results|CEO, Tech',text):errors.append(f'{lang}/{slug}: unsupported legacy copy')
  if s.select_one('meta[name=robots]')['content']!='noindex,nofollow':errors.append(f'{lang}/{slug}: review indexing gate lost')
  if slug=='intelligence-os' and not s.select_one('.notice'):errors.append(f'{lang}/{slug}: missing production-status separation')
  if slug=='about':
   if len(s.select('main .card'))!=16:errors.append(f'{lang}/{slug}: core principles/differentiation/roadmap incomplete')
  if slug=='capabilities/financial-legal':
   if ('qualified specialists' if lang=='en' else 'متخصصين مؤهلين') not in text:errors.append(f'{lang}/{slug}: specialist coordination qualification missing')
  results.append({'route':f'/{lang}/'+(slug+'/' if slug else ''),'source_file':sources[lang],'profile_slides':slides[slug],'content_review':'reviewed','wording_basis':'Approved profile wording or meaning-preserving web adaptation','editorial_elements':['Navigation and form instructions','Illustrative decision/output labels where present'],'publication_approval':'pending administration approval'})
assert not errors,errors
out={'status':'source-aligned content review completed; not management approval','pages':len(results),'identity_source':'orbit identity(2).pdf','source_priority':'Identity PDF for visual identity; latest uploaded 27-slide profiles for content; older guide historical only','claim_rules':['No unsupported clients, testimonials, credentials, revenue, return or delivery-time claims','Financial/legal inputs remain coordinated with qualified specialists','Build and Transform remain the two development routes; Scale is growth readiness','Intelligence OS model and roadmap not presented as confirmed live production features','Illustrative outputs not contractual deliverable guarantees'],'remaining_external_inputs':['Approved contact identity/email/phone','Verified and publication-approved case studies or credentials, if supplied','Confirmed Intelligence OS production inventory and separate roadmap','Management content sign-off'],'site_indexing':'blocked during review','pages_reviewed':results,'errors':errors}
(R/'CONTENT-SOURCE-MAP.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print('Content review guards passed for',len(results),'localized pages')
