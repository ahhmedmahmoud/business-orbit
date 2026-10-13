from pathlib import Path
from bs4 import BeautifulSoup
import json,runpy
R=Path(__file__).parent;D=R/'dist';runpy.run_path(str(R/'refine-corporate.py'))
objectives={
 'technology':('Build technical foundations that enable growth, improve control and make performance easier to manage.','بناء أسس تقنية تدعم النمو، وتعزز الرقابة، وتجعل الأداء أكثر وضوحاً وقابلية للإدارة.'),
 'brand-marketing':('Build a clear market position, activate demand and improve commercial visibility over time.','بناء تموضع سوقي واضح، وتنشيط الطلب، وتعزيز الظهور التجاري على نحو مستدام.'),
 'engineering':('Provide technical planning, delivery oversight and operating support for engineering-dependent businesses.','توفير التخطيط الفني، والإشراف على التسليم، والدعم التشغيلي للأعمال المعتمدة على القدرات الهندسية.'),
 'strategy-advisory':('Improve decision quality and alignment between ambition, resources, operating reality and execution requirements.','رفع جودة القرار وتحقيق المواءمة بين الطموح والموارد والواقع التشغيلي ومتطلبات التنفيذ.'),
 'operations':('Create operating clarity, repeatability and performance visibility as the business develops.','إرساء وضوح تشغيلي، وقابلية للتكرار، ورؤية أدق للأداء مع تطور المنشأة.'),
 'financial-legal':('Ensure financial and legal inputs support — rather than sit apart from — the broader business-development mandate.','ضمان أن تدعم المدخلات المالية والقانونية نطاق تطوير الأعمال الأوسع، بدلاً من العمل بمعزل عنه.')}
for lang in ['en','ar']:
 def t(en,ar):return en if lang=='en' else ar
 def frag(s):return BeautifulSoup(s,'html.parser')
 def sethtml(e,s):e.clear();e.append(frag(s))
 def cards(titles,copies):return '<div class="grid">'+''.join('<article class="card"><span class="number">'+f'{i+1:02}'+'</span><h3>'+title+'</h3><p>'+copy+'</p></article>' for i,(title,copy) in enumerate(zip(titles,copies)))+'</div>'
 def section(kicker,title,copy,cls=''):return '<section class="section '+cls+'"><div class="eyebrow">'+kicker+'</div><h2>'+title+'</h2>'+copy+'</section>'
 # All protected data assertions are based on the last 27-slide profiles; UI wording is editorial.
 for p in (D/lang).glob('**/index.html'):
  s=BeautifulSoup(p.read_text(),'html.parser');slug=str(p.parent.relative_to(D/lang));slug='' if slug=='.' else slug
  for e in s.select('.new-nav .pill'):
   sethtml(e,t('Define your objective','حدد هدف أعمالك')+'<span aria-hidden="true">↗</span>')
  if not slug:
   sethtml(s.select_one('#problem h2'),t('GROWTH IS LOST WHERE<br>STRATEGY, CAPABILITY<br><em>AND EXECUTION DISCONNECT.</em>','تتبدد فرص النمو عندما تنفصل<br>الاستراتيجية عن<br><em>القدرات والتنفيذ.</em>'))
   s.select_one('.hero-description>p').string=t('One accountable partner from opportunity to measurable value. Business Orbit integrates intelligence, strategic direction, specialist capability and disciplined execution around one business objective.','شريك واحد بمسؤولية واضحة، من الفرصة إلى قيمة قابلة للقياس. تجمع بزنس أوربت بين المعلومات، والتوجه الاستراتيجي، والقدرات التخصصية، والانضباط التنفيذي ضمن هدف أعمال واحد.')
   sethtml(s.select_one('#methodology .experience-heading h2'),t('A SIX-STAGE METHOD.<br><em>CONTINUOUS DEVELOPMENT.</em>','منهج من ست مراحل.<br><em>وتطوير مستمر.</em>'))
   sethtml(s.select_one('#intelligence h2'),t('DECISION INFRASTRUCTURE.<br><em>CONNECTED INTELLIGENCE.</em>','بنية لصناعة القرار.<br><em>ومعلومات مترابطة.</em>'))
   s.select_one('#routes .experience-heading>p').string=t('Business Orbit supports both the creation of new ventures and the transformation of established businesses. Structure the business before scaling the activity.','تدعم بزنس أوربت تأسيس المشاريع الجديدة وتطوير الأعمال القائمة ضمن المنهج التشغيلي نفسه. هيكلة الأعمال قبل توسيع النشاط.')
   s.select_one('.experience-contact .overline').string=t('WORKING TOGETHER','آلية التعاون')
  elif slug.startswith('capabilities/'):
   key=slug.split('/')[-1];first=s.select_one('main .section');first.select_one('.eyebrow').string=t('BUSINESS OBJECTIVE','هدف الأعمال');first.select_one('h2').string=t('Business enablement. Defined purpose.','تمكين الأعمال. وغرض محدد.');first.select_one('.lead').string=objectives[key][0 if lang=='en' else 1]
   for sec in s.select('main .section'):
    h=sec.select_one('h2')
    if h and h.get_text(strip=True) in ['Part of one development mandate.','جزء من نطاق تطوير واحد.']:
     sec.select_one('p').string=t('The capability architecture is designed to create one accountable line from business objective to execution and review.','صُممت منظومة القدرات لإنشاء مسار واحد واضح للمساءلة، من هدف الأعمال إلى التنفيذ والمراجعة.')
  elif slug=='about':
   principles=t(['Commercial Discipline','Integrated Thinking','Execution Accountability','Long-Term Partnership'],['الانضباط التجاري','التفكير المتكامل','المساءلة التنفيذية','الشراكة طويلة الأمد'])
   principlecopy=t(['Decisions are evaluated through performance, sustainability and long-term business value.','Strategy, specialist capabilities and execution are coordinated around one business objective.','Responsibilities, delivery ownership and implementation discipline are defined from the outset.','Objectives, responsibilities and performance reviews remain aligned around enterprise value.'],['تُقيّم القرارات وفق أثرها على الأداء والاستدامة وقيمة المنشأة على المدى الطويل.','تُنسق الاستراتيجية والقدرات التخصصية والتنفيذ حول هدف أعمال واحد.','تُحدد المسؤوليات وملكية التنفيذ وضوابط التطبيق منذ البداية.','تبقى الأهداف والمسؤوليات ومراجعات الأداء متوائمة حول قيمة المنشأة.'])
   s.main.append(frag(section('03',t('Operating principles.<br>Decision quality and execution discipline.','مبادئ تشغيلية.<br>جودة القرار وانضباط التنفيذ.'),cards(principles,principlecopy))))
   titles=t(['Integrated Capability','Strategy-to-Execution Continuity','Investor & Operator Perspective','Governed Execution','Flexible Development Routes','Long-Term Value Orientation'],['قدرات متكاملة','استمرارية من الاستراتيجية إلى التنفيذ','منظور المستثمر والمشغّل','تنفيذ محكوم','مسارات تطوير مرنة','توجه نحو القيمة طويلة الأجل'])
   copies=t(['Multiple business disciplines coordinated through one development framework.','Recommendations connect directly to initiatives, ownership and implementation needs.','Investment priorities are considered alongside operational realities.','Responsibilities, milestones, performance measures and review cycles are built into delivery.','Supports new ventures, operating businesses and structured transformation programmes.','Focus remains on stronger operating foundations and sustainable enterprise value.'],['تُنسق تخصصات أعمال متعددة ضمن إطار تطوير واحد.','ترتبط التوصيات مباشرة بالمبادرات والمسؤوليات ومتطلبات التطبيق.','تُدرس الأولويات الاستثمارية بالتوازي مع الواقع التشغيلي.','تُدمج المسؤوليات والمراحل الرئيسية ومقاييس الأداء ودورات المراجعة ضمن التنفيذ.','دعم المشاريع الجديدة والمنشآت القائمة وبرامج التحول المنظمة.','التركيز على أسس تشغيلية أقوى وقيمة مؤسسية مستدامة.'])
   s.main.append(frag(section('04',t('Built to remove the failure points<br>between strategy and results.','إزالة نقاط التعثر<br>بين الاستراتيجية والنتائج.'),cards(titles,copies),'light-section')))
   titles=t(['Institutional Foundation','Portfolio & Market Expansion','Enterprise Value & Scale'],['التأسيس المؤسسي','توسع المحفظة والسوق','قيمة المنشأة والتوسع'])
   copies=t(['Establish methodologies; standardise governance and delivery; strengthen core capabilities; build strategic partnerships; develop the initial portfolio.','Expand market coverage; develop selected brands; strengthen cross-company collaboration; activate cross-selling; expand shared capabilities.','Scale successful businesses; launch advanced digital platforms; enter selected new markets; strengthen portfolio performance; establish recognised platform position.'],['إرساء المنهجيات، وتوحيد الحوكمة وآليات التنفيذ، وتعزيز القدرات الأساسية، وبناء الشراكات الاستراتيجية، وتطوير المحفظة الأولية.','توسيع التغطية السوقية، وتطوير علامات مختارة، وتعزيز التعاون بين الشركات، وتفعيل البيع المتقاطع، وتوسيع القدرات المشتركة.','توسيع الأعمال الناجحة، وإطلاق منصات رقمية متقدمة، ودخول أسواق مختارة جديدة، وتعزيز أداء المحفظة، وترسيخ مكانة المنصة في السوق.'])
   s.main.append(frag(section('05 / '+t('DEVELOPMENT DIRECTION','اتجاه تطويري'),t('From institutional foundation<br>to enterprise scale.','من التأسيس المؤسسي<br>إلى التوسع وقيمة المنشأة.'),'<p class="notice">'+t('A development direction, not a statement that all roadmap activities have been completed.','اتجاه للتطوير؛ ولا يعني أن جميع أنشطة خارطة الطريق قد اكتملت.')+'</p>'+cards(titles,copies))))
  elif slug=='scale':
   first=s.select_one('main .section');first.select_one('.eyebrow').string=t('GROWTH READINESS','الجاهزية للنمو');first.select_one('h2').string=t('Governance. Capability. Performance visibility.','الحوكمة. القدرات. وضوح الأداء.')
   first.select_one('.journey').insert_before(frag('<p class="notice">'+t('These are areas of growth readiness. The six-stage delivery methodology is described separately.','هذه مجالات للجاهزية للنمو. وتُعرض منهجية التنفيذ ذات الست مراحل بصورة مستقلة.')+'</p>'))
  # Context-specific supporting line: eliminate reused generic company pitch from unrelated heroes.
  hero=s.select_one('.hero.inner')
  intros={
   'about':t('Business Orbit exists to convert opportunity into structured, executable and scalable business systems.','توجد بزنس أوربت لتحويل الفرص إلى منظومات أعمال مهيكلة وقابلة للتنفيذ والتوسع.'),
   'capabilities':t('Capabilities are mobilised around the mandate, with specialist partners engaged where they strengthen the outcome.','تُحشد القدرات حول نطاق التكليف، مع إشراك شركاء متخصصين عندما يعزز ذلك جودة المخرجات.'),
   'methodology':t('Each stage produces a defined output and remains tied to the approved business objective.','لكل مرحلة مخرج محدد، وتبقى جميع المراحل مرتبطة بهدف الأعمال المعتمد.'),
   'scale':t('Build the governance, capability and performance visibility required for controlled growth.','بناء الحوكمة والقدرات ووضوح الأداء اللازم لتحقيق نمو منضبط وقابل للإدارة.'),
   'contact':t('Business Orbit works alongside leadership teams from objective definition through execution review.','تعمل بزنس أوربت إلى جانب فرق القيادة من تحديد الهدف حتى مراجعة التنفيذ.')}
  if hero:
   if slug in intros:hero.select_one('.lead').string=intros[slug]
   for cta in hero.select('a.button'):
    sethtml(cta,t('Define the development objective','حدد هدف التطوير')+'<span aria-hidden="true">↗</span>')
    if slug=='contact':cta['href']='#brief';sethtml(cta,t('Prepare an enquiry brief','جهّز ملخص الطلب')+'<span aria-hidden="true">↓</span>')
   description=hero.select_one('.lead').get_text(' ',strip=True)
  else:description=t('An integrated growth and execution partner for building, transforming and scaling businesses.','شريك متكامل للنمو والتنفيذ لبناء الأعمال وتطويرها وتمكينها من التوسع.')
  metadata=s.select_one('meta[name=description]');metadata['content']=description
  if s.select_one('meta[property="og:description"]'):s.select_one('meta[property="og:description"]')['content']=description
  p.write_text(str(s))
# Update the selector's generated responses to approved profile route statements.
p=D/'assets/corporate-refinement.js';s=p.read_text();s=s.replace('Begin with opportunity assessment, market logic and business design.','Create new businesses with clearer market logic, operating structure and launch discipline.').replace('Begin with diagnosis of the current state, improvement priorities and restructuring where required.','Strengthen existing businesses through diagnosis, restructuring and coordinated improvement.').replace('Begin with governance, capability and performance readiness for controlled growth.','Build the governance, capability and performance visibility required for controlled growth.').replace('ابدأ بتقييم الفرصة وفهم السوق وتصميم نموذج الأعمال.','بناء أعمال جديدة بمنطق سوقي أوضح، وهيكل تشغيلي منظم، وانضباط أكبر في الإطلاق.').replace('ابدأ بتشخيص الوضع الراهن وتحديد أولويات التحسين وإعادة الهيكلة عند الحاجة.','تطوير الأعمال القائمة من خلال التشخيص، وإعادة الهيكلة، والتحسين المنسق.').replace('ابدأ بتقييم جاهزية الحوكمة والقدرات ووضوح الأداء لتحقيق نمو منضبط.','بناء الحوكمة والقدرات ووضوح الأداء اللازم لتحقيق نمو منضبط وقابل للإدارة.');p.write_text(s)
for lang in ['en','ar']:
 p=D/lang/'index.html';s=BeautifulSoup(p.read_text(),'html.parser');s.select_one('#route-recommendation').string=('Create new businesses with clearer market logic, operating structure and launch discipline.' if lang=='en' else 'بناء أعمال جديدة بمنطق سوقي أوضح، وهيكل تشغيلي منظم، وانضباط أكبر في الإطلاق.');p.write_text(str(s))
print('Final content pass completed: 34 pages and context-specific metadata')
