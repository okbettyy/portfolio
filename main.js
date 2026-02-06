/* ---------------- WINDOW CONTROL ---------------- */

function openWindow(id){
  const win=document.getElementById(id);
  if(!win) return;

  function minimizeWindow(id){
  const win=document.getElementById(id);
  if(win) win.style.display="none";
}

  win.style.display="block";
  win.style.top="120px";
  win.style.left="220px";
  bringToFront(win);
}

function closeWindow(id){
  const win=document.getElementById(id);
  if(win) win.style.display="none";
}

function bringToFront(win){
  document.querySelectorAll(".window").forEach(w=>w.style.zIndex="10");

  win.style.zIndex="100";
}

/* ---------------- DRAG ---------------- */

function initDrag(win){
  const bar=win.querySelector(".title-bar");
  if(!bar) return;

  let x=0,y=0,down=false;

  bar.onmousedown=e=>{
    down=true;
    bringToFront(win);
    x=e.clientX-win.offsetLeft;
    y=e.clientY-win.offsetTop;
  };

  document.onmouseup=()=>down=false;

  document.onmousemove=e=>{
    if(!down) return;
    win.style.left=e.clientX-x+"px";
    win.style.top=e.clientY-y+"px";
  };
}

/* ---------------- START MENU ---------------- */

const startBtn=document.getElementById("start-button");
const startMenu=document.getElementById("start-menu");

if(startBtn){
  startBtn.onclick=()=>{
    startMenu.style.display=
      startMenu.style.display==="block"
      ?"none":"block";
  };
}

/* ---------------- LOADER ---------------- */

function startLoading(){

  const bar=document.getElementById("load-bar");
  const text=document.getElementById("status-text");
  const screen=document.getElementById("loading-screen");
  const desktop=document.getElementById("desktop");

  let progress=0;

  const msgs=[
    "Booting Portfolio OS...",
    "Loading supermodel.dll...",
    "Applying lip gloss...",
    "Rendering struts..."
  ];

  const int=setInterval(()=>{

    progress+=10;
    if(progress>100) progress=100;

    bar.style.width=progress+"%";
    text.innerHTML=
      "Status: "+
      msgs[Math.floor(progress/25)];

    if(progress>=100){

      clearInterval(int);

      setTimeout(()=>{

        screen.style.opacity="0";
        desktop.style.opacity="1";

        const s=document.getElementById("startup-sound");
        if(s){
          s.currentTime=0;
          s.play().catch(()=>{});
        }

        setTimeout(()=>{
          screen.style.display="none";
        },600);

      },600);
    }

  },200);
}

/* ---------------- CLOCK ---------------- */

setInterval(()=>{
  const c=document.getElementById("clock");
  if(c){
    c.textContent=
      new Date().toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
      });
  }
},1000);

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded",()=>{

  startLoading();

  document.querySelectorAll(".window").forEach(initDrag);
});


function maximizeWindow(id) {
  const win = document.getElementById(id);

  if (win.classList.contains("maximized")) {
    win.classList.remove("maximized");
    win.style.width = "420px";
    win.style.height = "auto";
    win.style.top = "120px";
    win.style.left = "160px";
  } else {
    win.classList.add("maximized");
    win.style.top = "0";
    win.style.left = "0";
    win.style.width = "100%";
    win.style.height = "calc(100% - 30px)";
  }
}

function showFolder(name){

  document.querySelectorAll(".file-view").forEach(f=>f.style.display="none");

  const active = document.getElementById("folder-"+name);
  if(active) active.style.display="flex";
}


function showFolder(name){

  document
    .querySelectorAll(".file-view")
    .forEach(f=>f.style.display="none");

  const folder =
    document.getElementById("folder-"+name);

  if(folder){
    folder.style.display="flex";
  }
}


