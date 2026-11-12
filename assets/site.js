(function(){
  "use strict";
  var SITE = window.SITE || {items:[], formKey:"", email:""};
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* reveal on entry: elements are visible by default and animate as they enter */
  function count(root){
    $$("[data-count]",root).forEach(function(el){
      var end=+el.dataset.count, suf=el.dataset.suffix||"", t0=null;
      function step(t){ if(!t0)t0=t; var p=Math.min((t-t0)/1300,1), e=1-Math.pow(1-p,3);
        el.textContent=Math.round(end*e)+suf; if(p<1)requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }
  if(!calm && "IntersectionObserver" in window){
    var ro = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); ro.unobserve(e.target); count(e.target); } });
    },{threshold:0});
    $$(".rv").forEach(function(el){ro.observe(el)});
  }

  /* hero stage follows the pointer */
  var stage=$("#stage"), hero=$(".hero");
  if(stage && hero && fine && !calm){
    var tx=0,ty=0,cx=0,cy=0,run=false;
    var loop=function(){
      cx+=(tx-cx)*.08; cy+=(ty-cy)*.08;
      stage.style.setProperty("--ry",cx.toFixed(2)+"deg"); stage.style.setProperty("--rx",cy.toFixed(2)+"deg");
      if(Math.abs(tx-cx)>.02||Math.abs(ty-cy)>.02)requestAnimationFrame(loop); else run=false;
    };
    var kick=function(){ if(!run){run=true;requestAnimationFrame(loop)} };
    hero.addEventListener("pointermove",function(e){
      var r=hero.getBoundingClientRect();
      tx=((e.clientX-r.left)/r.width-.5)*16; ty=((e.clientY-r.top)/r.height-.5)*-12; kick();
    });
    hero.addEventListener("pointerleave",function(){tx=0;ty=0;kick()});
  }

  /* cards tilt toward the pointer */
  if(fine && !calm){
    $$(".tilt").forEach(function(c){
      c.addEventListener("pointermove",function(e){
        var r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        c.style.transition="box-shadow .35s"; c.style.animation="none";
        c.style.transform="perspective(900px) rotateX("+(-y*8).toFixed(2)+"deg) rotateY("+(x*8).toFixed(2)+"deg) translateY(-6px)";
      });
      c.addEventListener("pointerleave",function(){c.style.transition="";c.style.transform=""});
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
  if(onLink&&onLink.scrollIntoView&&window.innerWidth<700){ var w=nav.parentNode; w.scrollLeft=onLink.offsetLeft-40; }

  /* header: menu tucks away on the way down, returns on the way up; progress line */
  var top=$("#top-bar"), prog=$("#progress"), lastY=window.scrollY, tick=false;
  function onScroll(){
    var y=window.scrollY, max=document.documentElement.scrollHeight-window.innerHeight;
    if(y>260 && y>lastY+4) top.classList.add("compact");
    else if(y<lastY-4 || y<120) top.classList.remove("compact");
    lastY=y;
    prog.style.transform="scaleX("+(max>0?Math.min(y/max,1):0)+")";
  }
  window.addEventListener("scroll",function(){ if(!tick){tick=true;requestAnimationFrame(function(){onScroll();tick=false})} },{passive:true});
  onScroll();

  /* the search bar searches the site */
  var input=$("#site-search"), sugg=$("#sugg"), items=SITE.items, shown=[], sel=0;
  function render(){
    var q=input.value.trim().toLowerCase();
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
  function go(it){ if(!it)return; close(); input.value=""; input.blur(); window.location.href=it[2]; }
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
  $("#search-go").addEventListener("click",function(){ if(input.value.trim()){render();go(shown[0])} else input.focus(); });

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

  /* contact form */
  var form=$("#form");
  if(form){
    var note=$("#note"), send=$("#send");
    var say=function(kind,msg){note.className="note show "+kind;note.textContent=msg};
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var ok=true, first=null;
      [["#f-name",function(v){return v.length>1}],["#f-email",function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)}],["#f-msg",function(v){return v.length>9}]]
      .forEach(function(r){var el=$(r[0]),good=r[1](el.value.trim());el.classList.toggle("bad",!good);if(!good){ok=false;first=first||el}});
      if(!ok){say("err","Please add your name, a valid email and a short message (10 characters or more).");first.focus();return}
      if($("#f-hp").checked)return;
      if(!SITE.formKey){say("info","The form works, but delivery isn't switched on yet. For now, email "+SITE.email+" directly.");return}
      var data={access_key:SITE.formKey,subject:"New enquiry from bilalrasheed.com"};
      $$("input[name],select,textarea",form).forEach(function(el){if(el.name!=="botcheck")data[el.name]=el.value.trim()});
      send.disabled=true; send.lastElementChild.textContent="Sending…";
      fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
        .then(function(r){return r.json()})
        .then(function(j){ if(j&&j.success){say("ok","Thanks, your message is on its way. I'll reply by email soon.");form.reset()} else throw new Error("rejected") })
        .catch(function(){say("err","The message didn't send. Please try again, or email "+SITE.email+".")})
        .then(function(){send.disabled=false;send.lastElementChild.textContent="Send message"});
    });
    $$("input,textarea",form).forEach(function(el){el.addEventListener("input",function(){el.classList.remove("bad")})});
  }
})();
