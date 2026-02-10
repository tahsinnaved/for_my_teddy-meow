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
  for (let i = 0; i < 15; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '💖';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.bottom = '0';
    h.style.fontSize = Math.random() * 30 + 20 + 'px';
    h.style.position = 'absolute';
    h.style.zIndex = 1000;
    document.body.appendChild(h);

    // float up effect
    const duration = Math.random() * 1500 + 2000;
    h.animate(
      [
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(-${Math.random() * 200 + 150}px)`, opacity: 0 }
      ],
      { duration }
    );

    setTimeout(() => h.remove(), duration);
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
  const textDiv = lokkhiScene.querySelector('.text');
  typeWriter(textDiv, "Lokkhi mane bhalo mon, shanto, pure…\nAar sheta tumi, Oishi 💛", 50);
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

// ==================== Proposal Buttons ====================
const yesBtn = document.querySelector('.yes-btn');
const alwaysBtn = document.querySelector('.always-btn');

function proposalResponse(message) {
  // Delay to create drama
  setTimeout(() => {
    // Show alert
    alert(message);
    // Celebrate with hearts
    for (let i = 0; i < 20; i++) {
      createHeartAtButton(i % 2 === 0 ? yesBtn : alwaysBtn);
    }
  }, 500); // half-second pause before response
}

function createHeartAtButton(btn) {
  const rect = btn.getBoundingClientRect();
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '💛';
  h.style.position = 'absolute';
  h.style.left = rect.left + rect.width / 2 + (Math.random() * 40 - 20) + 'px';
  h.style.top = rect.top + 'px';
  h.style.fontSize = Math.random() * 25 + 15 + 'px';
  document.body.appendChild(h);

  // float up animation
  const duration = Math.random() * 1500 + 2000;
  h.animate(
    [
      { transform: 'translateY(0px)', opacity: 1 },
      { transform: `translateY(-${Math.random() * 200 + 150}px)`, opacity: 0 }
    ],
    { duration }
  );
  setTimeout(() => h.remove(), duration);
}

if (yesBtn && alwaysBtn) {
  yesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    yesBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 400 });
    proposalResponse("She said YES 💖\nAmi shotti lucky, Lokkhi.");
  });

  alwaysBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alwaysBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 400 });
    proposalResponse("Always… 🥺💛\nEi word ta amar shob.");
  });
}

// ==================== Typing Effect ====================
function typeWriter(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === '\n' ? '<br>' : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
