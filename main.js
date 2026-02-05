/* 🪟 Window Controls */
function openWindow(id) {
  const win = document.getElementById(id);
  if (win) {
    win.style.display = "block";
    bringToFront(win);
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = "none";
}

function bringToFront(win) {
  document.querySelectorAll(".window")
    .forEach(w => w.style.zIndex = "10");

  win.style.zIndex = "100";
}


/* 🖱️ Draggable */
function initDraggable(win) {

  const bar = win.querySelector(".title-bar");
  if (!bar) return;

  bar.onmousedown = e => {

    bringToFront(win);

    let shiftX =
      e.clientX -
      win.getBoundingClientRect().left;

    let shiftY =
      e.clientY -
      win.getBoundingClientRect().top;

    function moveAt(x, y) {
      win.style.left = x - shiftX + "px";
      win.style.top = y - shiftY + "px";
    }

    function onMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener(
      "mousemove",
      onMove
    );

    document.onmouseup = () => {
      document.removeEventListener(
        "mousemove",
        onMove
      );
      document.onmouseup = null;
    };
  };

  bar.ondragstart = () => false;
}


/* 🔊 Startup Sound Fix */
function playStartupSound() {

  const sound =
    document.getElementById(
      "startup-sound"
    );

  if (!sound) return;

  sound.currentTime = 0;

  sound.play().catch(() => {

    /* Fallback click */
    document.addEventListener(
      "click",
      () => {
        sound.play().catch(()=>{});
      },
      { once: true }
    );

  });
}


/* 💿 Loading Sequence */
function startLoading() {

  const bar =
    document.getElementById("load-bar");

  const text =
    document.getElementById(
      "status-text"
    );

  const screen =
    document.getElementById(
      "loading-screen"
    );

  const desktop =
    document.getElementById("desktop");

  let progress = 0;

  const messages = [
    "Booting Portfolio OS...",
    "Loading supermodel.dll...",
    "Installing confidence.exe...",
    "Applying lip gloss...",
    "Rendering struts..."
  ];

  const interval =
    setInterval(() => {

      progress +=
        Math.floor(Math.random()*10)+3;

      if (progress > 100)
        progress = 100;

      bar.style.width =
        progress + "%";

      let i = Math.floor(
        (progress/100) *
        messages.length
      );

      text.innerHTML = messages[i];

      if (progress >= 100) {

        clearInterval(interval);

        setTimeout(() => {

          playStartupSound();

          screen.style.opacity = "0";
          desktop.style.opacity = "1";

          document
            .querySelector(
              ".ui-desktop"
            )
            ?.style.setProperty(
              "opacity","1"
            );

          setTimeout(() => {
            screen.style.display =
              "none";
          }, 500);

        }, 500);
      }

    }, 200);
}


/* 💥 Crash Screen */
function crashSite() {

  document.body.innerHTML = `
    <div style="
      background:#0000AA;
      color:white;
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      font-family:monospace;
      text-align:center;
      padding:40px;
    ">
      <h2>Windows</h2>
      <p>A fatal exception 0E has occurred</p>
      <p>PortfolioOS has been shut down</p>
      <br>
      <p>Press CTRL+ALT+DEL to restart</p>
    </div>
  `;
}


/* ⏰ Clock */
function startClock() {

  const clock =
    document.getElementById("clock");

  function updateClock() {

    const now = new Date();

    clock.textContent =
      now.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
      });
  }

  updateClock();
  setInterval(updateClock,1000);
}


/* 🟦 Boot Sequence */
document.addEventListener(
  "DOMContentLoaded",
  () => {

    const boot =
      document.getElementById(
        "boot-screen"
      );

    const loader =
      document.getElementById(
        "loading-screen"
      );

    loader.style.display = "none";

    setTimeout(() => {

      boot.style.display = "none";
      loader.style.display = "flex";

      startLoading();

    }, 2500);


    /* Draggable windows */
    document
      .querySelectorAll(
        ".window.draggable"
      )
      .forEach(initDraggable);


    startClock();

  }
);
