const $ = (s)=>document.querySelector(s);
const intro = $("#intro");
const app = $("#appWindow");
const question = $("#question");
const celebration = $("#celebration");
const audio = new Audio("assets/love_music_2min.mp3");
audio.loop = true;
audio.preload = "auto";
audio.volume = .72;
let musicOn = true;
let opened = false;

function makeAmbientHearts(){
  const host=$("#ambient");
  const glyphs=["♥","♡","♥","·"];
  for(let i=0;i<24;i++){
    const h=document.createElement("span");
    h.className="float-heart";
    h.textContent=glyphs[Math.floor(Math.random()*glyphs.length)];
    h.style.left=(Math.random()*100)+"vw";
    h.style.fontSize=(7+Math.random()*9)+"px";
    h.style.animationDuration=(6+Math.random()*7)+"s";
    h.style.animationDelay=(-Math.random()*10)+"s";
    host.appendChild(h);
  }
}
makeAmbientHearts();

function playMusic(){
  if(!musicOn) return;
  audio.currentTime=0;
  audio.play().catch(()=>{});
}
function showToast(text){
  const t=$("#toast"); t.textContent=text; t.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>t.classList.remove("show"),1200);
}

$("#envelopeBtn").addEventListener("click",()=>{
  if(opened) return;
  opened=true;
  playMusic();
  intro.classList.add("opening");
  setTimeout(()=>{
    intro.classList.add("hidden");
    app.classList.remove("hidden");
  },360);
});

$("#yesBtn").addEventListener("click",()=>{
  question.animate(
    [{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(.86)"}],
    {duration:260,easing:"ease-in",fill:"forwards"}
  ).onfinish=()=>{
    question.classList.add("hidden");
    celebration.classList.remove("hidden");
    burst();
  };
});

$("#loveBtn").addEventListener("click",()=>{
  burst(24);
  showToast("LOVE YOU ♥");
});

$("#soundBtn").addEventListener("click",()=>{
  musicOn=!musicOn;
  if(musicOn){playMusic();$("#soundBtn").textContent="♫";showToast("Music ON ♫")}
  else{audio.pause();$("#soundBtn").textContent="×";showToast("Music OFF")}
});

function burst(count=75){
  const colors=["#ef86a9","#e74b79","#ffd45c","#fff","#b67bd8","#f29bb5"];
  for(let i=0;i<count;i++){
    const c=document.createElement("span");
    c.className="confetti";
    c.style.left=(45+Math.random()*10)+"vw";
    c.style.top=(38+Math.random()*12)+"vh";
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.setProperty("--dx",(Math.random()*120-60)+"vw");
    c.style.setProperty("--dy",(45+Math.random()*65)+"vh");
    c.style.animationDelay=(Math.random()*.45)+"s";
    c.style.width=(5+Math.random()*7)+"px";
    c.style.height=(5+Math.random()*10)+"px";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3000);
  }
  for(let i=0;i<28;i++){
    const h=document.createElement("span");
    h.className="heart-pop";
    h.textContent=["♥","♡","💗","♥"][Math.floor(Math.random()*4)];
    h.style.left=(42+Math.random()*16)+"vw";
    h.style.top=(38+Math.random()*15)+"vh";
    h.style.setProperty("--dx",(Math.random()*100-50)+"vw");
    h.style.setProperty("--dy",(20+Math.random()*55)+"vh");
    h.style.setProperty("--rot",(Math.random()*80-40)+"deg");
    h.style.animationDelay=(Math.random()*.25)+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),2500);
  }
}
