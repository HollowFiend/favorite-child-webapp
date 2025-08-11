const wrap   = document.getElementById('wrap');
const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');
const result = document.getElementById('result');
const again  = document.getElementById('again');
const card   = document.getElementById('card');

// Place the No button at a random safe spot inside the wrap area
function placeNoRandom(){
  const wRect = wrap.getBoundingClientRect();
  const bRect = noBtn.getBoundingClientRect();

  const maxLeft = Math.max(0, wRect.width - bRect.width);
  const maxTop  = Math.max(0, wRect.height - bRect.height);

  const left = Math.random() * maxLeft;
  const top  = Math.random() * maxTop;

  noBtn.style.left = left + 'px';
  noBtn.style.top  = top  + 'px';
}

// Make the No button “run away” on hover and touch
['pointerenter','pointerdown','touchstart','mouseover'].forEach(ev => {
  noBtn.addEventListener(ev, () => placeNoRandom(), {passive:true});
});

// YES = celebration overlay + confetti
yesBtn.addEventListener('click', () => {
  celebrate();
  result.classList.add('show');
});

// Play again
again.addEventListener('click', () => {
  result.classList.remove('show');
  placeNoRandom();
});

// Confetti generator
function celebrate(){
  const colors = ['#ef4444','#f97316','#f59e0b','#22c55e','#06b6d4','#3b82f6','#a855f7','#ec4899'];
  const count = 120;
  const cardRect = card.getBoundingClientRect();

  for(let i=0;i<count;i++){
    const piece = document.createElement('span');
    piece.className = 'confetti';

    const size = 6 + Math.random()*8; // 6–14px
    piece.style.width = size + 'px';
    piece.style.height = (size*1.4) + 'px';
    piece.style.left = (Math.random()*cardRect.width) + 'px';
    piece.style.background = colors[(Math.random()*colors.length)|0];

    const duration = 1.6 + Math.random()*1.6; // 1.6–3.2s
    const delay = Math.random()*0.25;

    piece.style.animationDuration = duration + 's';
    piece.style.animationDelay = delay + 's';
    piece.style.transform = `translateY(-20px) rotate(${Math.random()*360}deg)`;

    card.appendChild(piece);

    // Cleanup after animation ends
    setTimeout(() => piece.remove(), (duration + delay) * 1000 + 100);
  }
}

// Initial placement when layout is ready + on resize
window.addEventListener('load', placeNoRandom);
window.addEventListener('resize', placeNoRandom);
