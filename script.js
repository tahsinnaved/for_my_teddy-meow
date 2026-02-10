const scenes = document.querySelectorAll('.scene');
let index = 0;
let pressTimer;

// Scene progression
document.body.addEventListener('click', () => {
  if (index < scenes.length - 1) {
    index++;
    showScene(index);
  } else {
    index = 0;
    showScene(index);
  }
});

function showScene(i) {
  scenes.forEach(s => s.classList.remove('active'));
  scenes[i].classList.add('active');
  if (navigator.vibrate) navigator.vibrate(20);
}

// Music toggle
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('musicToggle');
let playing = false;

toggle.addEventListener('click', e => {
  e.stopPropagation();
  if (!playing) {
    bgm.play();
    toggle.textContent = '🔊';
  } else {
    bgm.pause();
    toggle.textContent = '🔈';
  }
  playing = !playing;
});

// Heart rain on name double tap
let lastTap = 0;
document.getElementById('name').addEventListener('touchend', () => {
  const now = Date.now();
  if (now - lastTap < 300) heartRain();
  lastTap = now;
});

function heartRain() {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '💖';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.bottom = '0';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

// Lokkhi meaning
const lokkhiScene = document.getElementById('lokkhiScene');
lokkhiScene.addEventListener('dblclick', revealLokkhi);
lokkhiScene.addEventListener('touchstart', () => {
  pressTimer = setTimeout(revealLokkhi, 600);
});
lokkhiScene.addEventListener('touchend', () => clearTimeout(pressTimer));

function revealLokkhi() {
  lokkhiScene.querySelector('.text').innerHTML =
    "Lokkhi mane bhalo mon, shanto, pure…<br>aar sheta tumi, Oishi 💛";
}

// Hug squeeze
const hugScene = document.getElementById('hugScene');
hugScene.addEventListener('click', () => {
  hugScene.classList.add('hug');
  setTimeout(() => hugScene.classList.remove('hug'), 600);
});

// Teddy secret
const teddyScene = document.getElementById('teddyScene');
teddyScene.addEventListener('touchstart', () => {
  pressTimer = setTimeout(() => {
    alert("Ami shotti try kori, Lokkhi. Tumi amar shob. 🧸💛");
  }, 700);
});
teddyScene.addEventListener('touchend', () => clearTimeout(pressTimer));
// Propose Day buttons
const yesBtn = document.querySelector('.yes-btn');
const alwaysBtn = document.querySelector('.always-btn');

function proposalResponse(message) {
  alert(message);
}

if (yesBtn && alwaysBtn) {
  yesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    proposalResponse("She said YES 💖\nAmi shotti lucky, Lokkhi.");
  });

  alwaysBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    proposalResponse("Always… 🥺💛\nEi word ta amar shob.");
  });
}
