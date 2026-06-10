const STRENGTH = 7;

function applyTilt(card: HTMLElement) {
  if (card.dataset.tiltInit) return;
  card.dataset.tiltInit = 'true';

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transition = 'transform 0.08s ease-out';
    card.style.transform = `perspective(600px) rotateY(${x * STRENGTH}deg) rotateX(${-y * STRENGTH}deg) scale3d(1.02,1.02,1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.4s ease-out';
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  });
}

export function initTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.tilt-card').forEach(applyTilt);
}
