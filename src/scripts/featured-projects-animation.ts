const FONT_MAX_VW = 18;  // tamaño inicial en vw
const FONT_MIN_REM = 2.2; // tamaño final en rem
const LETTER_DELAY_MS = 40;
const GLOW_SETTLE_MS = 800;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function splitIntoLetters(title: HTMLElement): HTMLElement[] {
  const words = title.querySelectorAll<HTMLElement>('.fp-word');
  const letters: HTMLElement[] = [];

  words.forEach((word) => {
    const text = word.textContent ?? '';
    word.innerHTML = text
      .split('')
      .map((char) => `<span class="fp-letter">${char}</span>`)
      .join('');
    letters.push(...Array.from(word.querySelectorAll<HTMLElement>('.fp-letter')));
  });

  return letters;
}

function revealLetters(letters: HTMLElement[]) {
  letters.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
      setTimeout(() => el.classList.add('settled'), GLOW_SETTLE_MS);
    }, i * LETTER_DELAY_MS);
  });
}

function observeReveal(section: HTMLElement, letters: HTMLElement[]) {
  let revealed = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !revealed) {
        revealed = true;
        revealLetters(letters);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
}

function updateScroll(
  section: HTMLElement,
  title: HTMLElement,
  list: HTMLElement,
  cta: HTMLElement
) {
  const rect = section.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
  const eased = easeInOut(progress);

  // Tamaño del título: de FONT_MAX_VW a FONT_MIN_REM
  const vwPx = window.innerWidth / 100;
  const fsPx = lerp(FONT_MAX_VW * vwPx, FONT_MIN_REM * 16, eased);
  title.style.fontSize = `${fsPx}px`;

  // Posición: de centrado a izquierda
  const containerW = title.parentElement!.getBoundingClientRect().width;
  const titleW = title.getBoundingClientRect().width;
  const offset = Math.max(0, (containerW - titleW) / 2);
  title.style.transform = `translateX(${lerp(offset, 0, eased)}px)`;

  // Lista y CTA aparecen en la segunda mitad del scroll
  const listP = Math.min(1, Math.max(0, (progress - 0.55) * 2.2));
  list.style.opacity = String(listP);
  list.style.transform = `translateY(${lerp(40, 0, listP)}px)`;
  cta.style.opacity = String(listP);
  cta.style.transform = `translateY(${lerp(12, 0, listP)}px)`;
}

export function initFeaturedAnimation() {
  const section = document.getElementById('featured-projects');
  const title   = document.getElementById('fp-title') as HTMLElement | null;
  const list    = document.getElementById('fp-list')  as HTMLElement | null;
  const cta     = document.getElementById('fp-cta')   as HTMLElement | null;

  if (!section || !title || !list || !cta) return;
  if (title.dataset.fpInit) return;
  title.dataset.fpInit = 'true';

  const letters = splitIntoLetters(title);
  observeReveal(section, letters);

  const onScroll = () => updateScroll(section, title, list, cta);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}
