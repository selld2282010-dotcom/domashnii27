/* ===== script.js: тут настройки (ник, описание, соцсети, песни) и код плеера ===== */
const P = {

  // ============ 1. НИК ============
  // Большое имя в центре карточки. Первая буква ника показывается на аватаре, пока нет картинки.
  nick: "Domashnii27",

  // ============ 2. ОПИСАНИЕ ============
  // Пара строк о себе под ником. Можно с эмодзи.
  about: "W   15y.o. talant.",

  // ============ 3. АВАТАРКА ============
  // Оставь пустым "" — будет буква. Или положи картинку в эту папку и впиши её имя,
  // например: "avatar.jpg" (лучше квадратная картинка).
  avatar: "covers/avatar.jpg",

  // ============ 4. СОЦСЕТИ ============
  // name  — ТОЛЬКО одно из: Steam, Telegram, Discord, Instagram (по нему подставляется иконка;
  //         другое название покажется без иконки). Надпись на кнопке = name.
  // url   — ссылка на ТВОЙ профиль. Ненужную соцсеть просто удали целиком вместе с запятой.
  // color — не трогай, не используется.
  links: [
    {name:"Steam",     url:"https://steamcommunity.com/profiles/76561199243951906/", color:"#66c0f4"},
    {name:"Telegram",  url:"https://t.me/+D_NEtTyopgllNTIy",                 color:"#4fb3ff"},
    {name:"Twitch",   url:"https://www.twitch.tv/domashnii27",     color:"#8c9eff"},
    {name:"Instagram", url:"https://www.instagram.com/timurwhitetea/",        color:"#ff7ab8"}
  ],

  // ============ 5. ПЕСНИ (ровно 5 штук) ============
  // title  — название песни (показывается под обложками)
  // artist — исполнитель
  // src    — mp3-файл из папки music, например: "music/song1.mp3".
  //          Пока пусто "" — играет мелодия-заглушка.
  // cover  — картинка-обложка из папки covers, например: "covers/cover1.jpg". Пусто "" — цветной квадрат с нотой.
  // chord  — НЕ ТРОГАЙ, это только для мелодии-заглушки.
  tracks: [
    // ----- ПЕСНЯ 1 -----
    {title:"Романтично", artist:"Uglystephan", src:"music/Романтично (Bonus).mp3", cover:"covers/Романтично.png", chord:[220,277.2,329.6]},
    // ----- ПЕСНЯ 2 -----
    {title:"worlds fuck", artist:"Sematary & Ghost Mountain", src:"covers/worldsfuck.mp3", cover:"music/worldsfuck.jpg", chord:[196,246.9,293.7]},
    // ----- ПЕСНЯ 3 -----
    {title:"love sosa", artist:"chief keef", src:"music/lovesosa.mp3", cover:"covers/lovesosa.jpg", chord:[174.6,220,261.6]},
    // ----- ПЕСНЯ 4 -----
    {title:"Название песни 4", artist:"Исполнитель", src:"", cover:"", chord:[233.1,293.7,349.2]},
    // ----- ПЕСНЯ 5 -----
    {title:"Название песни 5", artist:"Исполнитель", src:"", cover:"", chord:[207.7,261.6,311.1]}
  ]
};
// ============ КОНЕЦ НАСТРОЕК. Ниже код — трогать не нужно ============
const $=id=>document.getElementById(id);
$("nick").textContent=P.nick; $("about").textContent=P.about;
if(P.avatar){const m=document.createElement("img");m.src=P.avatar;$("avatar").textContent="";$("avatar").appendChild(m)}else $("avatar").textContent=P.nick.trim().charAt(0).toUpperCase();
const ICONS={
Steam:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.500" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15.200" cy="9.500" r="3" fill="none" stroke="currentColor" stroke-width="1.800"/><circle cx="8.800" cy="15.800" r="2.300"/><path d="M3 12.800l5.600 2.800M11.200 14.200l1.800-2.200" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round"/></svg>',
Telegram:'<svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
Twitch:'<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>',
Instagram:'<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.500 3h9A4.500 4.500 0 0 1 21 7.500v9a4.500 4.500 0 0 1-4.500 4.500h-9A4.500 4.500 0 0 1 3 16.500v-9A4.500 4.500 0 0 1 7.500 3zm0 1.800A2.700 2.700 0 0 0 4.800 7.500v9a2.700 2.700 0 0 0 2.700 2.700h9a2.700 2.700 0 0 0 2.700-2.700v-9a2.700 2.700 0 0 0-2.700-2.700zM12 7.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9zm0 1.800a2.700 2.700 0 1 0 0 5.400 2.700 2.700 0 0 0 0-5.400zm4.900-3.200a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200z"/></svg>'};
P.links.forEach(l=>{const a=document.createElement("a");a.className="ico";a.href=l.url;a.target="_blank";a.rel="noopener";a.title=l.name;a.setAttribute("aria-label",l.name);a.innerHTML=(ICONS[l.name]||"")+"<span></span>";a.lastChild.textContent=l.name;$("links").appendChild(a)});
let i=0,playing=false,ctx,nodes=[],audio=null,start=0,raf;
const DEMO=40;
const PLAY='<path d="M8 5v14l11-7z"/>',PAUSE='<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
function show(){layout();const t=P.tracks[i];$('pl').classList.toggle('playing',playing);$("title").textContent=t.title;$("artist").textContent=t.artist;$("ico").innerHTML=playing?PAUSE:PLAY}
function stopSound(){nodes.forEach(n=>{try{n.g.gain.setTargetAtTime(0,ctx.currentTime,.15);n.o.stop(ctx.currentTime+.6)}catch(e){}});nodes=[];if(audio){audio.pause();audio=null}cancelAnimationFrame(raf)}
function startSound(){
  stopSound();const t=P.tracks[i];start=performance.now();
  if(t.src){audio=new Audio(t.src);audio.onended=()=>go(1);audio.play().catch(()=>{})}
  else{
    ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
    t.chord.forEach((f,k)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f;g.gain.value=0;g.gain.setTargetAtTime(.07,ctx.currentTime,.5);o.connect(g).connect(ctx.destination);o.start();nodes.push({o,g});
      const l=ctx.createOscillator(),lg=ctx.createGain();l.frequency.value=.15+k*.07;lg.gain.value=3;l.connect(lg).connect(o.detune);l.start();nodes.push({o:l,g:lg})});
  }
  tick();
}
function tick(){
  let p=audio&&audio.duration?audio.currentTime/audio.duration:(performance.now()-start)/1000/DEMO;
  $("prog").style.width=Math.min(p*100,100)+"%";
  if(!audio&&p>=1){go(1);return}
  raf=requestAnimationFrame(tick);
}
function go(d){i=(i+d+P.tracks.length)%P.tracks.length;$("prog").style.width="0";if(playing)startSound();show()}
$("play").onclick=()=>{playing=!playing;if(playing)startSound();else stopSound();show()};
$("next").onclick=()=>go(1);$("prev").onclick=()=>go(-1);
const GR=[["#ff8ab5","#7a5cff"],["#5cc8ff","#3a4cff"],["#ffb86b","#ff5c8a"],["#6bf0c4","#2a8cff"],["#c48cff","#ff7ac8"]];
function off(k){const N=P.tracks.length;let d=((k-i)%N+N)%N;if(d>N/2)d-=N;return d}
function layout(){[...$("stage").children].forEach((el,k)=>{const d=off(k),a=Math.abs(d),sg=Math.sign(d);let tr,op;
 if(d===0){tr="translateX(0) translateZ(40px) scale(1)";op=1}
 else if(a===1){tr=`translateX(${d*118}px) translateZ(-60px) rotateY(${-d*38}deg) scale(.78)`;op=.85}
 else{tr=`translateX(${sg*150}px) translateZ(-160px) rotateY(${-sg*45}deg) scale(.5)`;op=0}
 el.style.transform=tr;el.style.opacity=op;el.style.zIndex=10-a*3;el.style.pointerEvents=a>1?"none":"auto";el.classList.toggle("c",d===0)})}
P.tracks.forEach((t,k)=>{const d=document.createElement("div");d.className="cv";
 if(t.cover){d.style.backgroundImage="url("+t.cover+")"}else{d.style.background=`linear-gradient(135deg,${GR[k%5][0]},${GR[k%5][1]})`;d.textContent="♪"}
 d.onclick=()=>{const o=off(k);if(o!==0)go(o)};$("stage").appendChild(d)});
show();
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("in")}),{threshold:.25});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
setTimeout(()=>document.querySelector(".card").classList.add("in"),150);
