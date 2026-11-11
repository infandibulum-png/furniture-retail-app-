'use strict';
const $=id=>document.getElementById(id),money=n=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n/100);
// Retail pounds from the showroom price boards. A blank cell on the source is deliberately not offered.
const item=(name,values,code=name)=>({name,prices:Object.fromEntries(values.split(' ').map((v,i)=>[i,v==='-'?null:Number(v)])),code});
const ranges={
 marlesford:{name:'Marlesford',supplier:'Matteo',source:'Marlesford A4 price board · 9 November 2026',feet:['Mid Oak','Walnut'],grades:['C','D','E'],collections:{C:'Noble',D:'Hennessey',E:'Vancouver'},items:[['3 Seater','1545 1595 1665','3ST'],['2 Seater','1459 1509 1579','2ST'],['Chair','875 899 945','1ST'],['Love Chair','1029 1055 1115','LOV'],['4 Seater Modular','1819 1869 1955','4MD'],['Armless Unit','575 599 619','ALU'],['Corner LH1 + COR + RH2','2839 2939 3069','LH1, COR, RH2'],['Corner RH1 + COR + LH2','2839 2939 3069','RH1, COR, LH2'],['Corner RH2 + COR + LH2','3215 3335 3489','RH2, COR, LH2'],['Corner LH1 + COR + RH1','2469 2539 2649','LH1, COR, RH1'],['3 Seater Suite','3299 3395 3559','311'],['2 Seater Suite','3215 3309 3479','211'],['3 Seater + 2 Seater','3009 3105 3249','3+2']].map(([n,v,c])=>({name:n,code:c,prices:Object.fromEntries(v.split(' ').map((p,i)=>[['C','D','E'][i],Number(p)]))}))},
 snape:{name:'Snape',supplier:'Sala',source:'Sala and Raphoe boards · 3 November 2026',feet:['Light Beech','Dark Beech'],grades:['0','1','2','3','Print'],items:[['Footstool','379 389 399 449 465'],['Snuggler','779 805 835 885 1019'],['Small Sofa','935 965 999 1085 -'],['Medium Sofa','1049 1099 1129 1219 -'],['Small Sofabed','1515 1555 1619 1689 -'],['Large Sofa','1345 1385 1429 1535 -'],['Chaise Unit (Reversible)','1665 1735 1809 1979 -'],['Grand Chair','659 685 715 745 869'],['Scatter Cushions (pair)','79 85 89 99 125']].map(([n,v])=>item(n,v))},
 snapeHigh:{name:'Snape High Back',supplier:'Sala High Back',source:'Siren Sussex base boards · 3 November 2026',feet:['Light Beech','Dark Beech'],grades:['0','1','2','3','Print'],items:[['Snuggler','859 899 945 1005 1135'],['Small Sofa','1019 1069 1119 1245 -'],['Medium Sofa','1179 1239 1289 1429 -'],['Small Sofabed','1719 1809 1859 1915 -'],['Large Sofa','1485 1555 1615 1705 -'],['Chaise Unit (Reversible)','1809 1895 1979 2115 -'],['Grand Chair','739 779 815 849 969'],['Scatter Cushions (pair)','79 85 89 99 125']].map(([n,v])=>item(n,v))},
 aylesham:{name:'Aylesham',supplier:'Alice',source:'Siren Sussex base boards · 3 November 2026',feet:['Dark Wood','Light Wood','Brass','Gunmetal'],grades:['1','2','3'],items:[['Footstool','555 579 609'],['Chair','1045 1069 1139'],['Snuggler','1219 1245 1309'],['Medium Sofa','1639 1689 1785'],['Large Sofa','1879 1929 2035'],['Grand Sofa','2059 2145 2249']].map(([n,v])=>item(n,v))},
 sandringham:{name:'Sandringham',supplier:'Samantha',source:'Siren Sussex base boards · 3 November 2026',feet:['Light Oak','Dark Oak'],grades:['0','1','2','3','Print'],items:[['Footstool','289 309 319 339 365'],['Chair','665 709 749 779 819'],['Small Sofa','929 969 1015 1045 1119'],['Medium Sofa','1029 1069 1109 1165 1295'],['Large Sofa','1149 1195 1235 1285 1409'],['High Back Chair','709 749 789 835 919']].map(([n,v])=>item(n,v))},
 somerton:{name:'Somerton',supplier:'Somerton',source:'Siren Sussex base boards · 3 November 2026',feet:['Finish to confirm with supplier'],grades:['0','1','2','3','Leather A','Leather B','Leather C'],items:[['Footstool','529 555 579 609 675 699 729'],['Chair','1055 1099 1139 1189 1455 1535 1569'],['Medium Sofa','1455 1509 1585 1665 2075 2179 2235'],['Large Sofa','1745 1799 1879 1979 2539 2669 2725']].map(([n,v])=>item(n,v))},
 manual:{name:'Other range · manual price',supplier:'',source:'Enter and check the retail price and supplier specification.',feet:['To confirm'],grades:['Manual'],items:[{name:'Other item',code:'',prices:{}}]}
};
// Map positional source columns to their printed grade headings.
for(const r of Object.values(ranges))if(r!==ranges.marlesford&&r!==ranges.manual)for(const p of r.items)p.prices=Object.fromEntries(r.grades.map((g,i)=>[g,p.prices[i]]).filter(([,v])=>v!==null));
ranges.marlesford.items.push({name:'Swivel Chair',code:'Swivel Chair',grades:['Plain','Pattern','Deluxe','Superior'],prices:{Plain:719,Pattern:789,Deluxe:839,Superior:909}},{name:'Footstool',code:'Footstool',grades:['Plain','Pattern','Deluxe','Superior'],prices:{Plain:465,Pattern:479,Deluxe:499,Superior:549}});
// The care plan is for furniture; leave loose scatter-cushion accessories out of the quote selector.
for(const key of ['snape','snapeHigh'])ranges[key].items=ranges[key].items.filter(p=>!p.name.startsWith('Scatter'));
ranges.sandringham.items.find(p=>p.name==='High Back Chair').code='High Back Chair (Samantha High Back)';
Object.assign(ranges,window.jdAdditionalRanges||{});
const marlesfordColours={C:['Brew','Chalk','Deep Moss','Fero','Hollow'],D:['Ash','Black','Bournville','Clay','Dove','Espresso','Ivory','Olive','Sand'],E:['Black','Cacao','Charcoal','Dove Grey','Indigo','Ink','Khaki','Mink','Mist','Mocha','Olive','Oyster','Pebble','Snow']};
// The supplied care-plan table applies to furniture value only, before the delivery charge.
const tiers=[[0,49999,5000],[50000,99999,15000],[100000,149999,17500],[150000,199999,20000],[200000,299999,25000],[300000,399999,27500],[400000,499999,30000],[500000,999999,32500],[1000000,1999999,37500]];
function staingard(furniture){return tiers.find(([min,max])=>furniture>=min&&furniture<=max)?.[2]??null;}
const blank=()=>({quotes:[],orders:[],receipts:[],issues:[],pos:[]});let data=blank(),selectedQuote=null;
const DRAFT_KEY='jd-retail-draft-lines-v1';
let basket=[];
try{
 const saved=JSON.parse(localStorage.getItem(DRAFT_KEY));
 if(Array.isArray(saved)&&saved.length<=100&&saved.every(x=>Number.isSafeInteger(x.unit)&&x.unit>0&&Number.isSafeInteger(x.quantity)&&x.quantity>0&&typeof x.model==='string'&&typeof x.spec==='string'))basket=saved;
}catch{}
function persistBasket(){try{localStorage.setItem(DRAFT_KEY,JSON.stringify(basket));}catch{ /* Keep the current unsaved basket in memory if storage is unavailable. */ }}
try{const saved=JSON.parse(localStorage.getItem('jd-retail-v2'));if(saved&&Object.keys(data).every(k=>Array.isArray(saved[k])))data=saved;}catch{}
function commit(next){try{localStorage.setItem('jd-retail-v2',JSON.stringify(next));data=next;draw();return true;}catch{alert('Unable to save: browser storage is full or unavailable. Export your records before closing.');return false;}}
function mutate(fn,status,success){try{const next=structuredClone(data);fn(next);if(commit(next))$(status).textContent=success;}catch(e){$(status).textContent=e.message;}}
function text(id){return $(id).value.trim();}function required(id){const v=text(id);if(!v)throw Error('Please complete '+document.querySelector('label[for="'+id+'"]').textContent+'.');return v;}
function qty(id){const v=Number(text(id));if(!Number.isSafeInteger(v)||v<1||v>10000)throw Error('Quantity must be a whole number from 1 to 10,000.');return v;}
function amount(id){if(!/^\d+(\.\d{1,2})?$/.test(text(id)))throw Error('Enter a valid amount with no more than two decimal places.');const v=Math.round(Number(text(id))*100);if(v>100000000)throw Error('Amount is too large.');return v;}
function prices(unit,q,delivery,protect){if(!Number.isSafeInteger(unit)||unit<0||!Number.isSafeInteger(q)||q<1)throw Error('Invalid price or quantity.');const base=unit*q,protection=staingard(base);if(protect&&protection===null)throw Error('Staingard rate for furniture of £20,000 or more needs confirmation.');return {base,delivered:base+6900,protected:protection===null?null:base+6900+protection,protection,total:base+((delivery||protect)?6900:0)+(protect?protection:0)};}
function calculate(){
 try{
  const base=basket.reduce((sum,line)=>sum+line.unit*line.quantity,0);
  const result=basket.length?prices(base,1,$('delivery').checked,$('protect').checked):{base:0,delivered:0,protected:0,protection:0,total:0};
  $('delivered').textContent=money(result.delivered);
  $('protected').textContent=result.protected===null?'Ask for a price':money(result.protected);
  $('staingard').textContent=result.protection===null?'Ask for a price':money(result.protection);
  $('extras').textContent=money(result.total-result.base);
  $('total').textContent=money(result.total);
  $('totalNote').textContent=basket.length?basket.length+' added line item'+(basket.length===1?'':'s')+' · Combined order pricing; delivery is charged once.':'Add items to calculate a combined quotation.';
  return result;
 }catch(e){
  $('total').textContent='Check entries';
  $('status').textContent=e.message;
  return null;
 }
}
function drawBasket(){
 const body=$('basketRows');body.replaceChildren();
 $('itemCount').textContent='('+basket.length+')';
 $('emptyItems').hidden=basket.length>0;
 for(const [index,line] of basket.entries()){
  const tr=document.createElement('tr');
  const desc=document.createElement('td'),name=document.createElement('strong'),spec=document.createElement('small');
  name.textContent=line.model;spec.textContent=line.spec;
  desc.append(name,spec);
  const qtyCell=document.createElement('td');qtyCell.textContent=String(line.quantity);
  const totalCell=document.createElement('td');totalCell.textContent=money(line.unit*line.quantity);
  const action=document.createElement('td'),remove=document.createElement('button');
  remove.type='button';remove.className='remove-item';remove.textContent='Remove';
  remove.setAttribute('aria-label','Remove '+line.model+' from order');
  remove.onclick=()=>{
   basket.splice(index,1);persistBasket();drawBasket();calculate();
   $('status').textContent='Item removed from the quotation.';
  };
  action.append(remove);tr.append(desc,qtyCell,totalCell,action);body.append(tr);
 }
}
$('addItem').onclick=()=>{
 try{
  if(basket.length>=100)throw Error('This quotation already has 100 item lines.');
  const key=text('range'),r=ranges[key],product=r?.items[Number(text('catalogue'))],grade=text('band');
  if(!r||!product)throw Error('Choose a valid range and item.');
  const quantity=qty('quantity'),unit=amount('unit');
  if(unit===0)throw Error('Enter a positive retail price before adding the item.');
  const line={id:crypto.randomUUID(),range:key,model:required('model'),spec:required('spec'),
   item:product.name,grade,feet:text('feet'),fabric:text('fabric'),colour:text('colour'),
   source:r.source,quantity,unit};
  basket.push(line);persistBasket();drawBasket();calculate();
  $('quantity').value='1';
  $('status').textContent=line.model+' added. Choose another range or item and press Add item to order again.';
 }catch(e){$('status').textContent=e.message;}
};
function options(id,items){$(id).replaceChildren(...items.map(([value,label])=>new Option(label,value)));}
const allRangeEntries=Object.entries(ranges).sort((a,b)=>a[1].name.localeCompare(b[1].name,'en-GB'));
const duplicateRangeNames=Object.values(ranges).reduce((m,r)=>(m.set(r.name.toLowerCase(),(m.get(r.name.toLowerCase())||0)+1),m),new Map());
let lastSelection='';
function refreshRangeOptions(){
 const query=$('rangeSearch').value.trim().toLowerCase(),previous=$('range').value||'marlesford';
 const matches=allRangeEntries.filter(([key,r])=>r.name.toLowerCase().includes(query)||r.supplier.toLowerCase().includes(query));
 options('range',matches.length?matches.map(([key,r])=>[key,duplicateRangeNames.get(r.name.toLowerCase())>1?r.name+' — '+r.supplier:r.name]):[['','No matching ranges']]);
 $('range').disabled=!matches.length;
 $('rangeCount').textContent=matches.length+' of '+allRangeEntries.length+' ranges shown';
 if(matches.length){$('range').value=matches.some(([key])=>key===previous)?previous:matches[0][0];populateItems();}
 else $('source').textContent='No matching ranges. Change your search to show the catalogue.';
}
$('rangeSearch').addEventListener('input',refreshRangeOptions);
function populateItems(){const r=ranges[text('range')];options('catalogue',r.items.map((p,i)=>[String(i),p.name]));options('feet',r.feet.map(f=>[f,f]));$('fabric').value='';$('colour').value='';if(r===ranges.manual){$('model').value='';$('unit').value='0';$('spec').value='';}$('source').textContent='Retail source: '+r.source+(r.unpriced?' · Enter a confirmed retail price; no automatic amount is available.':'')+(text('range')==='somerton'?' Foot finish needs confirmation.':'');populateGrades();}
function populateGrades(){const r=ranges[text('range')],p=r.items[Number(text('catalogue'))],available=(p.grades??r.grades).filter(g=>r.unpriced||p.prices[g]!=null);options('band',(available.length?available:['Manual']).map(g=>[g,r.collections?.[g]?'Fabric '+g+' · '+r.collections[g]:g==='Manual'?'Manual price':g==='Print'||g.startsWith('Leather')||p.grades?g:'Fabric band '+g]));configure();}
function configure(){
 const r=ranges[text('range')],p=r.items[Number(text('catalogue'))],manual=text('range')==='manual',grade=text('band');
 const selection=[text('range'),text('catalogue'),grade,text('feet')].join('|'),changed=selection!==lastSelection;
 lastSelection=selection;
 const needsManualPrice=manual||p.prices[grade]==null;
 $('model').readOnly=!(manual||r.unpriced||needsManualPrice);
 $('unit').readOnly=!needsManualPrice;
 $('spec').readOnly=!(manual||r.unpriced||needsManualPrice);
 $('unit').placeholder=needsManualPrice?'Enter verified retail price':'';
 options('fabricColours',(r===ranges.marlesford?marlesfordColours[grade]??[]:[]).map(c=>[c,c]));
 if(!manual){
  if(changed){
   $('model').value=r.name+(p.name.startsWith('Enter ')||p.name.startsWith('Other item')?'':' '+p.name);
   $('unit').value=p.prices[grade]??'';
  }
  $('fabric').placeholder=r.collections?.[grade]?'e.g. '+r.collections[grade]:'Enter fabric or leather name if known';
  const name=text('fabric')||r.collections?.[grade]||'fabric / leather name to confirm',colour=text('colour')||'colour to confirm';
  if(changed||!needsManualPrice)$('spec').value=r.supplier+' '+p.code+' · '+(grade.startsWith('Leather')?grade:grade==='Print'?'Print':grade==='Standard'?'Standard': 'Fabric '+grade)+' · '+name+' '+colour+' · '+text('feet')+(text('range')==='marlesford'?' · Standard back · Encore Foam':'');
 }
 calculate();
}
$('range').onchange=populateItems;$('catalogue').onchange=populateGrades;$('band').onchange=configure;$('feet').onchange=configure;for(const k of ['fabric','colour'])$(k).addEventListener('input',configure);refreshRangeOptions();
for(const k of ['unit','quantity','delivery','protect'])$(k).addEventListener('input',()=>{if($('protect').checked)$('delivery').checked=true;$('delivery').disabled=$('protect').checked;calculate();});
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x===b));['sales','stock','care','settings'].forEach(k=>$(k).classList.toggle('hidden',k!==b.dataset.page));document.querySelector('.heading h2').textContent={sales:'Sales dashboard',stock:'Warehouse',care:'Customer care',settings:'Your workspace'}[b.dataset.page];});
function table(id,rows,fields,click){$(id).replaceChildren();for(const r of rows){const tr=document.createElement('tr');for(const field of fields){const td=document.createElement('td');td.textContent=typeof field==='function'?field(r):r[field]??'';tr.append(td);}if(click){tr.className='click-row';tr.tabIndex=0;tr.onclick=()=>click(r);tr.onkeydown=e=>{if(e.key==='Enter')click(r);};}$(id).append(tr);}}
function draw(){table('quotes',data.quotes,['id','customer','model',q=>money(q.total)],detail);table('orders',data.orders,['id','customer','model',q=>money(q.total)]);table('receipts',data.receipts,['po','sku','quantity','bay','condition']);table('issues',data.issues,['ref','assignee','issue']);table('expected',data.pos,['po','sku',p=>p.due||'Not confirmed',p=>p.quantity-data.receipts.filter(r=>r.po===p.po&&r.sku===p.sku).reduce((n,r)=>n+r.quantity,0)]);}
$('saveQuote').onclick=()=>{
 try{
  if(!basket.length)throw Error('Add at least one item to the quotation first.');
  const p=calculate();if(!p)throw Error('Correct the price entries before saving.');
  const customer=required('customer'),lines=structuredClone(basket),first=lines[0];
  const summary=lines.length===1?first.model:lines.length+' items · '+lines.slice(0,2).map(l=>l.model).join(' + ')+(lines.length>2?'…':'');
  const next=structuredClone(data);
  next.quotes.unshift({
   id:'Q-'+crypto.randomUUID().slice(0,8).toUpperCase(),customer,model:summary,
   spec:lines.length===1?first.spec:'Multiple furniture lines; see item details',
   range:first.range,grade:first.grade,feet:first.feet,fabric:first.fabric,colour:first.colour,
   source:[...new Set(lines.map(l=>l.source))].join(' | '),quantity:lines.reduce((n,l)=>n+l.quantity,0),
   unit:lines.length===1?first.unit:null,lines,
   withProtection:$('protect').checked,withDelivery:$('delivery').checked,
   notes:text('notes'),...p,status:'Open',created:new Date().toISOString()
  });
  if(commit(next)){
   basket=[];persistBasket();drawBasket();calculate();
   $('status').textContent='Quotation saved with '+lines.length+' item line'+(lines.length===1?'':'s')+'. You can review it below and accept it as one customer order.';
  }
 }catch(e){$('status').textContent=e.message;}
};
function detail(q){
 selectedQuote=q.id;const box=$('detailContent');box.replaceChildren();
 const append=(tag,value)=>{const el=document.createElement(tag);el.textContent=value??'';box.append(el);};
 append('h2',q.id+' · '+q.customer);
 const lines=Array.isArray(q.lines)&&q.lines.length?q.lines:[{model:q.model,spec:q.spec,quantity:q.quantity,unit:q.unit}];
 for(const [index,line] of lines.entries()){
  append('h3',(index+1)+'. '+line.model);
  append('p',line.spec);
  append('p',line.quantity+' × '+money(line.unit)+' = '+money(line.quantity*line.unit));
 }
 append('p','Furniture subtotal: '+money(q.base));
 append('p','Furniture + delivery: '+money(q.delivered));
 append('p','Furniture + delivery + Staingard: '+(q.protected===null?'Not priced':money(q.protected)));
 append('h2','Selected total: '+money(q.total));
 if(q.notes)append('p','Notes: '+q.notes);
 append('p','Status: '+q.status);
 $('convert').hidden=q.status!=='Open';$('detail').showModal();
}
$('closeDetail').onclick=()=>$('detail').close();$('print').onclick=()=>window.print();$('convert').onclick=()=>{const next=structuredClone(data),q=next.quotes.find(q=>q.id===selectedQuote);if(!q||q.status!=='Open')return;q.status='Converted';next.orders.unshift({...q,id:'SO-'+crypto.randomUUID().slice(0,8).toUpperCase(),quoteId:q.id,status:'Awaiting stock'});if(commit(next))$('detail').close();};
$('recordPO').onclick=()=>mutate(next=>{const po=required('expectedPO'),sku=required('expectedSKU');if(next.pos.some(p=>p.po===po&&p.sku===sku))throw Error('That PO line is already recorded.');next.pos.push({po,sku,quantity:qty('expectedQty'),due:text('expectedDate')});},'stockStatus','Existing PO recorded. No supplier order was sent.');
$('receive').onclick=()=>mutate(next=>{const po=required('po'),sku=required('sku'),ref=required('receiptRef'),bay=required('bay'),quantity=qty('received');const line=next.pos.find(p=>p.po===po&&p.sku===sku);if(!line)throw Error('Record the existing PO and matching SKU first.');if(next.receipts.some(r=>r.ref===ref))throw Error('This receipt reference has already been booked in.');const received=next.receipts.filter(r=>r.po===po&&r.sku===sku).reduce((n,r)=>n+r.quantity,0);if(received+quantity>line.quantity)throw Error('Receipt exceeds the quantity remaining on this PO.');next.receipts.unshift({po,sku,ref,bay,quantity,condition:text('condition'),at:new Date().toISOString()});},'stockStatus','Receipt saved. Expected quantity updated.');
const management=['Refund request','Repeated repair','Staff complaint','Safety concern'];$('category').onchange=()=>{$('assignee').value=management.includes(text('category'))?'Management':'Sales';$('assignee').disabled=management.includes(text('category'));};
$('logIssue').onclick=()=>mutate(next=>{next.issues.unshift({ref:required('ref'),issue:required('issue'),category:text('category'),assignee:management.includes(text('category'))?'Management':text('assignee'),at:new Date().toISOString()});},'careStatus','Concern recorded on this device. No notification has been sent.');
$('export').onclick=()=>{const blob=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),...data},null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='john-doe-pilot-records.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
let prompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;$('install').hidden=false;});$('install').onclick=async()=>{if(prompt){await prompt.prompt();prompt=null;$('install').hidden=true;}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});draw();drawBasket();calculate();
