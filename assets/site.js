(function(){
  "use strict";
  var SITE = window.SITE || {items:[], formKey:"", email:""};
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* header is fixed; the page is padded by its full height so nothing shifts when the menu tucks away */
  var top=$("#top-bar"), prog=$("#progress");
  function measure(){ var was=top.classList.contains("compact"); top.classList.remove("compact");
    root.style.setProperty("--head",top.offsetHeight+"px"); if(was)top.classList.add("compact"); }
  measure(); window.addEventListener("resize",measure);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);

  /* reveal: sections fade up once, the first time they come into view */
  function count(el){
    $$("[data-count]",el).forEach(function(n){
      var end=+n.dataset.count, suf=n.dataset.suffix||"", t0=null;
      function step(t){ if(!t0)t0=t; var p=Math.min((t-t0)/1300,1), e=1-Math.pow(1-p,3);
        n.textContent=Math.round(end*e).toLocaleString("en-US")+suf; if(p<1)requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }
  window.__rv=true;
  if(root.className==="js"){
    var ro=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(!e.isIntersecting)return; var el=e.target; ro.unobserve(el);
        el.classList.add("in","seen"); count(el);
        var d=(parseInt(el.style.getPropertyValue("--i"),10)||0)*70+900;
        setTimeout(function(){el.classList.remove("rv","in")},d);   /* hand the element back to its own styles */
      });
    },{threshold:.08,rootMargin:"0px 0px -4% 0px"});
    $$(".rv").forEach(function(el){ro.observe(el)});
  } else { $$(".rv").forEach(function(el){el.classList.add("seen")}); }

  /* hero stage follows the pointer (eased) */
  var stage=$("#stage"), hero=$(".hero");
  if(stage && hero && fine && !calm){
    var tx=0,ty=0,cx=0,cy=0,run=false;
    var loop=function(){
      cx+=(tx-cx)*.07; cy+=(ty-cy)*.07;
      stage.style.setProperty("--ry",cx.toFixed(3)+"deg"); stage.style.setProperty("--rx",cy.toFixed(3)+"deg");
      if(Math.abs(tx-cx)>.01||Math.abs(ty-cy)>.01)requestAnimationFrame(loop); else run=false;
    };
    var kick=function(){ if(!run){run=true;requestAnimationFrame(loop)} };
    hero.addEventListener("pointermove",function(e){
      var r=hero.getBoundingClientRect();
      tx=((e.clientX-r.left)/r.width-.5)*12; ty=((e.clientY-r.top)/r.height-.5)*-8; kick();
    });
    hero.addEventListener("pointerleave",function(){tx=0;ty=0;kick()});
  }

  /* cards lean toward the pointer (eased, one animation frame loop per card) */
  if(fine && !calm){
    $$(".tilt").forEach(function(c){
      var gx=0,gy=0,x=0,y=0,lift=0,gl=0,on=false,rect=null;
      function frame(){
        x+=(gx-x)*.12; y+=(gy-y)*.12; lift+=(gl-lift)*.12;
        if(!gl && Math.abs(x)<.02 && Math.abs(y)<.02 && lift<.05){ c.style.transform=""; c.classList.remove("tilting"); on=false; return; }
        c.style.transform="perspective(900px) rotateX("+(-y).toFixed(3)+"deg) rotateY("+x.toFixed(3)+"deg) translateY("+(-lift).toFixed(2)+"px)";
        requestAnimationFrame(frame);
      }
      c.addEventListener("pointerenter",function(){ if(c.classList.contains("rv"))return; rect=c.getBoundingClientRect(); gl=6; c.classList.add("tilting"); if(!on){on=true;requestAnimationFrame(frame)} });
      c.addEventListener("pointermove",function(e){ if(!rect)return; gx=((e.clientX-rect.left)/rect.width-.5)*7; gy=((e.clientY-rect.top)/rect.height-.5)*7; });
      c.addEventListener("pointerleave",function(){ gx=0;gy=0;gl=0;rect=null; });
    });
  }

  /* pill menu: a soft highlight slides to the item under the pointer */
  var nav=$("#nav"), glow=$("#nav-glow");
  if(nav && glow && fine){
    $$("a",nav).forEach(function(a){
      a.addEventListener("pointerenter",function(){
        if(a.classList.contains("on")){glow.style.opacity=0;return}
        glow.style.width=a.offsetWidth+"px"; glow.style.transform="translateX("+a.offsetLeft+"px)"; glow.style.opacity=1;
      });
    });
    nav.addEventListener("pointerleave",function(){glow.style.opacity=0});
  }
  var onLink=nav&&$("a.on",nav);
  if(onLink&&window.innerWidth<700) nav.parentNode.scrollLeft=onLink.offsetLeft-40;

  /* menu tucks away on the way down, returns on the way up; progress line */
  var lastY=window.scrollY, anchor=lastY, ticking=false;
  function onScroll(){
    var y=window.scrollY, max=root.scrollHeight-window.innerHeight;
    if((y>lastY)!==(lastY>anchor)) anchor=lastY;          /* direction changed */
    if(y<140) top.classList.remove("compact");
    else if(y-anchor>60) top.classList.add("compact");
    else if(anchor-y>60) top.classList.remove("compact");
    lastY=y;
    prog.style.transform="scaleX("+(max>0?Math.min(y/max,1):0).toFixed(4)+")";
    ticking=false;
  }
  window.addEventListener("scroll",function(){ if(!ticking){ticking=true;requestAnimationFrame(onScroll)} },{passive:true});
  onScroll();

  /* the search bar searches the site */
  var input=$("#site-search"), sugg=$("#sugg"), clear=$("#search-clear"), items=SITE.items, shown=[], sel=0;
  function render(){
    var q=input.value.trim().toLowerCase();
    clear.hidden=!input.value;
    shown=items.filter(function(it){return !q||(it[0]+" "+it[1]).toLowerCase().indexOf(q)>-1}).slice(0,q?8:7);
    sel=0; sugg.textContent="";
    if(!shown.length){var d=document.createElement("div");d.className="none";d.textContent="No match. Try “GEO”, “guest posts” or “contact”.";sugg.appendChild(d);}
    shown.forEach(function(it,i){
      var b=document.createElement("button"); b.type="button"; b.setAttribute("role","option"); if(i===0)b.className="on";
      b.innerHTML='<svg class="ico" aria-hidden="true"><use href="#'+it[3]+'"/></svg><span></span><small></small>';
      b.children[1].textContent=it[0]; b.children[2].textContent=it[1];
      b.addEventListener("mousedown",function(e){e.preventDefault();go(it)});
      sugg.appendChild(b);
    });
    sugg.classList.add("open"); input.setAttribute("aria-expanded","true");
  }
  function close(){sugg.classList.remove("open");input.setAttribute("aria-expanded","false")}
  function go(it){ if(!it)return; close(); input.value=""; clear.hidden=true; input.blur(); window.location.href=it[2]; }
  input.addEventListener("focus",function(){stopType();render()});
  input.addEventListener("input",render);
  input.addEventListener("blur",function(){close();startType()});
  input.addEventListener("keydown",function(e){
    var bs=$$("button",sugg);
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault(); if(!bs.length)return;
      sel=(sel+(e.key==="ArrowDown"?1:-1)+bs.length)%bs.length; bs.forEach(function(b,i){b.classList.toggle("on",i===sel)}); bs[sel].scrollIntoView({block:"nearest"}); }
    else if(e.key==="Enter"){e.preventDefault();go(shown[sel])}
    else if(e.key==="Escape"){input.blur()}
  });
  clear.addEventListener("mousedown",function(e){e.preventDefault();input.value="";input.focus();render()});

  /* voice search: speak a query, it lands in the bar */
  var mic=$("#search-mic"), SR=window.SpeechRecognition||window.webkitSpeechRecognition, rec=null;
  if(!SR){ mic.hidden=true; }
  else mic.addEventListener("click",function(){
    if(rec){rec.stop();return}
    try{
      rec=new SR(); rec.lang="en-US"; rec.interimResults=true; rec.maxAlternatives=1;
      stopType(); input.placeholder="Listening…"; mic.classList.add("listening");
      rec.onresult=function(e){ var t=""; for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript; input.value=t.replace(/[.?!]+$/,""); };
      rec.onerror=function(e){ input.placeholder=e.error==="not-allowed"?"Microphone access is blocked":"Didn't catch that. Try again"; };
      rec.onend=function(){ mic.classList.remove("listening"); rec=null; if(input.value){input.focus();render()} else setTimeout(function(){if(document.activeElement!==input){stopType();startType()}},2500); };
      rec.start();
    }catch(err){ mic.classList.remove("listening"); rec=null; }
  });

  /* scan button: jump to the audit form */
  var audit=$("#audit");
  if(audit) [$("#search-scan"),$("#hero-audit")].forEach(function(b){ if(b) b.addEventListener("click",function(e){
    e.preventDefault(); audit.scrollIntoView({behavior:calm?"auto":"smooth",block:"center"});
    setTimeout(function(){$("#a-site").focus({preventScroll:true})},calm?0:500);
  }); });
  if(audit&&location.hash==="#audit") setTimeout(function(){$("#a-site").focus({preventScroll:true})},600);

  /* placeholder types out searches while the bar is idle */
  var phrases=["Bilal Rasheed, SEO Specialist","link building expert","what is GEO in SEO","how to increase domain rating","e-commerce SEO services"];
  var pi=0,ci=phrases[0].length,dir=-1,timer=null;
  function type(){
    var p=phrases[pi]; ci+=dir; input.placeholder=p.slice(0,Math.max(ci,0))+"▏";
    var wait=dir>0?70:32;
    if(dir>0&&ci>=p.length){dir=-1;wait=2200;input.placeholder=p}
    else if(dir<0&&ci<=0){dir=1;pi=(pi+1)%phrases.length;wait=350}
    timer=setTimeout(type,wait);
  }
  function startType(){ if(calm||timer||input.value)return; timer=setTimeout(type,2600); }
  function stopType(){ clearTimeout(timer); timer=null; input.placeholder="Search services, case studies, blog"; pi=0;ci=0;dir=1; }
  startType();

  /* copy email */
  var copy=$("#copy");
  if(copy) copy.addEventListener("click",function(){
    var b=this, t=$("#email").textContent;
    function done(ok){b.textContent=ok?"Copied":"Select and copy";setTimeout(function(){b.textContent="Copy"},1800)}
    try{navigator.clipboard.writeText(t).then(function(){done(true)},function(){done(false)})}catch(err){done(false)}
  });

  /* forms: contact page and the hero audit request share one sender */
  var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, SITE_RE=/^(https?:\/\/)?[^\s.\/]+(\.[^\s.\/]+)+(\/\S*)?$/i;
  function wire(o){
    var form=$(o.form); if(!form)return;
    var note=$(o.note), send=$(o.send), label=send.lastElementChild.textContent;
    var say=function(kind,msg){note.className="note show "+kind;note.textContent=msg};
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var ok=true, first=null;
      o.rules.forEach(function(r){var el=$(r[0]),good=r[1](el.value.trim());el.classList.toggle("bad",!good);if(!good){ok=false;first=first||el}});
      if(!ok){say("err",o.invalid);first.focus();return}
      if($(o.hp).checked)return;
      if(!SITE.formKey){say("info","This form works, but delivery isn't switched on yet. For now, email "+SITE.email+" directly.");return}
      var data={access_key:SITE.formKey,subject:o.subject};
      $$("input[name],select,textarea",form).forEach(function(el){if(el.name!=="botcheck")data[el.name]=el.value.trim()});
      send.disabled=true; send.lastElementChild.textContent="Sending…";
      fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
        .then(function(r){return r.json()})
        .then(function(j){ if(j&&j.success){say("ok",o.done);form.reset()} else throw new Error("rejected") })
        .catch(function(){say("err","That didn't send. Please try again, or email "+SITE.email+".")})
        .then(function(){send.disabled=false;send.lastElementChild.textContent=label});
    });
    $$("input,textarea",form).forEach(function(el){el.addEventListener("input",function(){el.classList.remove("bad")})});
  }
  wire({form:"#form",note:"#note",send:"#send",hp:"#f-hp",subject:"New enquiry from bilalrasheed.com",
    rules:[["#f-name",function(v){return v.length>1}],["#f-email",function(v){return EMAIL.test(v)}],["#f-msg",function(v){return v.length>9}]],
    invalid:"Please add your name, a valid email and a short message (10 characters or more).",
    done:"Thanks, your message is on its way. I'll reply by email soon."});
  wire({form:"#audit",note:"#a-note",send:"#a-send",hp:"#a-hp",subject:"Website audit request from bilalrasheed.com",
    rules:[["#a-site",function(v){return SITE_RE.test(v)}],["#a-email",function(v){return EMAIL.test(v)}]],
    invalid:"Please enter your website address and a valid email.",
    done:"Got it. I'll review your site and email you the audit."});
})();
