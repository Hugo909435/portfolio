<template>
  <Teleport to="body">
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div
        v-if="open"
        ref="overlayRef"
        class="about-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        @click.self="$emit('close')"
      >
        <button class="about-close mono" @click="$emit('close')" aria-label="Fermer">✕</button>

        <!-- Boussole animée -->
        <div ref="compassRef" class="about-disk-wrap" aria-hidden="true">
          <div class="about-disk-bg" />
          <div class="about-disk-rings" />
          <div class="about-shell">
            <span v-for="i in 96" :key="i" class="about-tick" :style="tickStyle(i)" />
            <span v-for="pt in cardinals" :key="pt.label" class="about-cardinal" :class="{ major: pt.major }" :style="ptStyle(pt.angle)">{{ pt.label }}</span>
          </div>
          <div ref="rotorRef" class="about-rotor">
            <span v-for="arm in roseArms" :key="arm.angle" class="about-arm" :class="arm.cls" :style="armStyle(arm.angle)" />
            <span class="about-rose-center" />
          </div>
        </div>

        <!-- Contenu -->
        <div ref="contentRef" class="about-content">

          <!-- Header inline -->
          <div class="about-header">
            <div ref="photoRef" class="about-photo-wrap" aria-hidden="true">
              <img src="/hugo_beignon.png" class="about-photo-img" alt="Hugo Beignon" />
              <div class="about-photo-ring" />
            </div>
            <div class="about-header-text">
              <p class="about-eyebrow mono">à propos</p>
              <h2 id="about-title" class="about-title serif">Hugo Beignon.</h2>
            </div>
          </div>

          <p class="about-lead">
            Développeur full-stack basé en Vendée. Je construis des interfaces lisibles, des outils métier sur-mesure et des expériences web soignées, de la maquette au déploiement.
          </p>

          <!-- Stats animées -->
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-num mono">{{ statExpVal }}<sup>+</sup></span>
              <span class="stat-label mono">expériences</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-item">
              <span class="stat-num mono">{{ statFormVal }}</span>
              <span class="stat-label mono">formations</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-item">
              <span class="stat-num mono">{{ statLangVal }}<sup>+</sup></span>
              <span class="stat-label mono">projets</span>
            </div>
          </div>

          <!-- Onglets -->
          <div class="about-tab-nav">
            <button class="tab-btn mono" :class="{ active: tab === 'exp' }" @click="tab = 'exp'">Expériences</button>
            <button class="tab-btn mono" :class="{ active: tab === 'form' }" @click="tab = 'form'">Formations</button>
          </div>

          <!-- Cartes -->
          <Transition name="tab-slide" mode="out-in">
            <div v-if="tab === 'exp'" class="about-cards" key="exp">
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge mono">Alternance</span>
                  <span class="card-date mono">Sept. 2025 → Aujourd'hui</span>
                </div>
                <p class="card-title">Développeur Web</p>
                <p class="card-place">DOVIRIS &middot; La Châtaigneraie</p>
                <div class="card-chips">
                  <span class="card-chip">Applications</span>
                  <span class="card-chip">E-commerce</span>
                  <span class="card-chip">Cybersécurité</span>
                </div>
              </div>
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge card-badge--dim mono">Stage</span>
                  <span class="card-date mono">Janv. – Fév. 2025</span>
                </div>
                <p class="card-title">Développeur Web</p>
                <p class="card-place">Lycée Ste-Marie du Port &middot; Sables d'Olonne</p>
                <div class="card-chips">
                  <span class="card-chip">Headless</span>
                  <span class="card-chip">Web App</span>
                </div>
              </div>
            </div>

            <div v-else class="about-cards about-cards--grid4" key="form">
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge mono">En cours</span>
                  <span class="card-date mono">2025</span>
                </div>
                <p class="card-title">Bachelor 3 CDA</p>
                <p class="card-place">Notre-Dame du Roc &middot; La Roche-sur-Yon</p>
              </div>
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge card-badge--dim mono">BTS SIO</span>
                  <span class="card-date mono">2023</span>
                </div>
                <p class="card-title">Option SLAM</p>
                <p class="card-place">Notre-Dame du Roc &middot; La Roche-sur-Yon</p>
              </div>
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge card-badge--dim mono">Université</span>
                  <span class="card-date mono">2021 – 2022</span>
                </div>
                <p class="card-title">STAPS</p>
                <p class="card-place">Université de Nantes</p>
              </div>
              <div class="about-card">
                <div class="card-top">
                  <span class="card-badge card-badge--dim mono">Bac général</span>
                  <span class="card-date mono">2021</span>
                </div>
                <p class="card-title">Maths &middot; NSI &middot; SES</p>
                <p class="card-place">Lycée Notre-Dame du Roc &middot; La Roche-sur-Yon</p>
              </div>
            </div>
          </Transition>

          <!-- Skill pills -->
          <div class="about-skills">
            <span v-for="skill in skills" :key="skill" class="skill-pill mono">{{ skill }}</span>
          </div>

          <!-- Socials -->
          <div class="about-socials">
            <a class="about-social mono" href="mailto:hugo.beignon@gmail.com" aria-label="Envoyer un email à Hugo Beignon">
              <svg class="about-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.75 6.5h14.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-8.5c0-.69.56-1.25 1.25-1.25Zm.83 2 6.42 4.57 6.42-4.57H5.58Zm12.92 7.25v-5.42l-6.06 4.31a.75.75 0 0 1-.88 0L5.5 10.33v5.42h13Z" />
              </svg>
              Email
            </a>
            <a class="about-social mono" href="https://www.linkedin.com/in/hugo-beignon-3ab500366/" target="_blank" rel="noopener" aria-label="Profil LinkedIn de Hugo Beignon">
              <svg class="about-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.98H3.72v10.29h3.22V8.98ZM5.33 4.73a1.87 1.87 0 1 0 0 3.74 1.87 1.87 0 0 0 0-3.74ZM20.28 13.36c0-3.08-1.64-4.51-3.83-4.51a3.31 3.31 0 0 0-3.01 1.66h-.04V8.98h-3.08v10.29h3.21v-5.09c0-1.34.25-2.64 1.91-2.64s1.66 1.53 1.66 2.72v5.01h3.21l-.03-5.91Z" />
              </svg>
              LinkedIn
            </a>
            <a class="about-social mono" href="https://github.com/Hugo909435" target="_blank" rel="noopener" aria-label="Profil GitHub de Hugo Beignon">
              <svg class="about-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>
              GitHub
            </a>
            <a class="about-social mono" href="/CV hugo beignon.pdf" download aria-label="Télécharger le CV de Hugo Beignon">
              <svg class="about-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V3a1 1 0 0 1 1-1ZM4.75 19.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H4.75Z" />
              </svg>
              CV
            </a>
          </div>

          <p ref="locationRef" class="about-location mono">Vendée &middot; France &middot; 2026</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const overlayRef = ref<HTMLElement | null>(null)
const compassRef = ref<HTMLElement | null>(null)
const rotorRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)
const locationRef = ref<HTMLElement | null>(null)

const tab = ref<'exp' | 'form'>('exp')
const statExpVal = ref(0)
const statFormVal = ref(0)
const statLangVal = ref(0)

const skills = [
  'Vue', 'Nuxt', 'Laravel', 'PHP',
  'Flutter', 'Dart', 'Python', 'C#', 'MySQL', 'Git', 'REST API',
]

const cardinals = [
  { label: 'N', angle: 0, major: true },
  { label: 'NE', angle: 45, major: false },
  { label: 'E', angle: 90, major: true },
  { label: 'SE', angle: 135, major: false },
  { label: 'S', angle: 180, major: true },
  { label: 'SO', angle: 225, major: false },
  { label: 'O', angle: 270, major: true },
  { label: 'NO', angle: 315, major: false },
]

const roseArms = [
  { angle: 0,     cls: 'arm-cardinal arm-gold' },
  { angle: 22.5,  cls: 'arm-minor arm-shadow' },
  { angle: 45,    cls: 'arm-secondary arm-pale' },
  { angle: 67.5,  cls: 'arm-minor arm-shadow' },
  { angle: 90,    cls: 'arm-cardinal arm-gold' },
  { angle: 112.5, cls: 'arm-minor arm-shadow' },
  { angle: 135,   cls: 'arm-secondary arm-pale' },
  { angle: 157.5, cls: 'arm-minor arm-shadow' },
  { angle: 180,   cls: 'arm-cardinal arm-gold' },
  { angle: 202.5, cls: 'arm-minor arm-shadow' },
  { angle: 225,   cls: 'arm-secondary arm-pale' },
  { angle: 247.5, cls: 'arm-minor arm-shadow' },
  { angle: 270,   cls: 'arm-cardinal arm-gold' },
  { angle: 292.5, cls: 'arm-minor arm-shadow' },
  { angle: 315,   cls: 'arm-secondary arm-pale' },
  { angle: 337.5, cls: 'arm-minor arm-shadow' },
]

function tickStyle(i: number) {
  const angle = (360 / 96) * i
  const rad = (angle * Math.PI) / 180
  const r = 47.8
  const x = 50 + r * Math.sin(rad)
  const y = 50 - r * Math.cos(rad)
  const isMajor = i % 24 === 0
  const isMed = i % 12 === 0
  return {
    left: `${x}%`,
    top: `${y}%`,
    height: `${isMajor ? 22 : isMed ? 13 : 6}px`,
    opacity: isMajor ? 0.9 : isMed ? 0.55 : 0.22,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
  }
}

function ptStyle(angle: number) {
  const rad = (angle * Math.PI) / 180
  const r = 39
  const x = 50 + r * Math.sin(rad)
  const y = 50 - r * Math.cos(rad)
  return { left: `${x}%`, top: `${y}%` }
}

function armStyle(angle: number) {
  return { transform: `translate(-50%, -100%) rotate(${angle}deg)` }
}

function onEnter(el: Element, done: () => void) {
  const tl = gsap.timeline({ onComplete: done })
  const isMobile = window.innerWidth <= 480

  statExpVal.value = 0
  statFormVal.value = 0
  statLangVal.value = 0

  gsap.set(el, { autoAlpha: 0 })
  gsap.set(rotorRef.value, { rotation: 0 })

  if (isMobile) {
    gsap.set(compassRef.value, { y: 40, scale: 0.7, opacity: 0 })
    gsap.set(contentRef.value, { autoAlpha: 0, y: 24 })
    gsap.set(photoRef.value, { scale: 0.55, autoAlpha: 0, y: -12 })

    tl.to(el, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
    tl.to(compassRef.value, { y: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out' }, 0.08)
    tl.to(rotorRef.value, { rotation: 720, duration: 0.85, ease: 'power2.inOut' }, 0.08)
    tl.to(contentRef.value, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
    tl.to(photoRef.value, { scale: 1, autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, 0.6)

    tl.add(() => {
      const c1 = { v: 0 }, c2 = { v: 0 }, c3 = { v: 0 }
      gsap.to(c1, { v: 2, duration: 1, ease: 'power2.out', onUpdate: () => { statExpVal.value = Math.round(c1.v) } })
      gsap.to(c2, { v: 4, duration: 1, ease: 'power2.out', onUpdate: () => { statFormVal.value = Math.round(c2.v) } })
      gsap.to(c3, { v: 20, duration: 1, ease: 'power2.out', onUpdate: () => { statLangVal.value = Math.round(c3.v) } })
      const cards = contentRef.value?.querySelectorAll('.about-card')
      const pills = contentRef.value?.querySelectorAll('.skill-pill')
      if (cards?.length) gsap.from(cards, { opacity: 0, y: 10, duration: 0.3, stagger: 0.07, ease: 'power2.out' })
      if (pills?.length) gsap.from(pills, { opacity: 0, scale: 0.7, duration: 0.25, stagger: 0.04, ease: 'back.out(1.4)', delay: 0.2 })
    }, 0.75)
  } else {
    gsap.set(compassRef.value, { x: '90vw', scale: 0.6, opacity: 0 })
    gsap.set(contentRef.value, { autoAlpha: 0, x: 48 })
    gsap.set(photoRef.value, { scale: 0.55, autoAlpha: 0, y: -16 })

    tl.to(el, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
    tl.to(compassRef.value, { x: 0, scale: 1, opacity: 1, duration: 1.55, ease: 'power3.out' }, 0.1)
    tl.to(rotorRef.value, { rotation: 1080, duration: 1.55, ease: 'power2.inOut' }, 0.1)
    tl.to(contentRef.value, { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power2.out' }, 0.95)
    tl.to(photoRef.value, { scale: 1, autoAlpha: 1, y: 0, duration: 0.65, ease: 'back.out(1.6)' }, 1.15)

    tl.add(() => {
      const c1 = { v: 0 }, c2 = { v: 0 }, c3 = { v: 0 }
      gsap.to(c1, { v: 2, duration: 1.1, ease: 'power2.out', onUpdate: () => { statExpVal.value = Math.round(c1.v) } })
      gsap.to(c2, { v: 4, duration: 1.1, ease: 'power2.out', onUpdate: () => { statFormVal.value = Math.round(c2.v) } })
      gsap.to(c3, { v: 20, duration: 1.1, ease: 'power2.out', onUpdate: () => { statLangVal.value = Math.round(c3.v) } })
      const cards = contentRef.value?.querySelectorAll('.about-card')
      const pills = contentRef.value?.querySelectorAll('.skill-pill')
      if (cards?.length) gsap.from(cards, { opacity: 0, y: 14, duration: 0.35, stagger: 0.09, ease: 'power2.out' })
      if (pills?.length) gsap.from(pills, { opacity: 0, scale: 0.7, duration: 0.3, stagger: 0.05, ease: 'back.out(1.4)', delay: 0.25 })
    }, 1.4)
  }
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, { autoAlpha: 0, duration: 0.28, ease: 'power2.in', onComplete: done })
}
</script>

<style scoped>
.about-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
  padding: 0 clamp(28px, 6vw, 96px);
  background: rgba(14, 12, 10, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.about-close {
  position: absolute;
  top: 22px;
  right: 28px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  padding: 6px 8px;
  transition: color 0.2s;
  z-index: 10;
}
.about-close:hover { color: var(--text); }

/* ── Compass ── */
.about-disk-wrap {
  position: relative;
  flex-shrink: 0;
  width: min(420px, 38vw);
  aspect-ratio: 1;
  border-radius: 50%;
  will-change: transform, opacity;
}

.about-disk-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%,
      transparent 0 17.8%,
      rgba(198,151,105,0.16) 18% 18.1%,
      transparent 18.3% 31.8%,
      rgba(198,151,105,0.14) 32% 32.1%,
      transparent 32.3% 100%),
    radial-gradient(circle at 50% 50%, rgba(28,24,20,0.82), rgba(17,15,13,0.98) 66%, #100f0d 100%);
  box-shadow:
    inset 0 0 0 1px rgba(198,151,105,0.44),
    inset 0 80px 180px rgba(198,151,105,0.03),
    inset 0 -160px 220px rgba(0,0,0,0.4);
}

.about-disk-rings {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}
.about-disk-rings::before {
  content: '';
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 0.5px solid rgba(198,151,105,0.16);
}
.about-disk-rings::after {
  content: '';
  position: absolute;
  inset: 13%;
  border-radius: 50%;
  border: 0.5px dashed rgba(198,151,105,0.1);
}

.about-shell {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
}

.about-tick {
  position: absolute;
  width: 1px;
  border-radius: 100px;
  background: linear-gradient(to bottom, rgba(198,151,105,0.9), rgba(198,151,105,0.2));
  transform-origin: center;
}

.about-cardinal {
  position: absolute;
  transform: translate(-50%, -50%);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(14px, 1.6vw, 22px);
  color: var(--text);
  opacity: 0.8;
  user-select: none;
}

.about-cardinal.major {
  font-size: clamp(28px, 3.4vw, 52px);
  color: var(--accent);
  opacity: 0.95;
}

.about-rotor {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  z-index: 3;
  will-change: transform;
}

.about-arm {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8%;
  height: 38%;
  clip-path: polygon(50% 0, 70% 68%, 50% 100%, 30% 68%);
  transform-origin: 50% 100%;
  opacity: 0.9;
}
.about-arm::before {
  content: '';
  position: absolute;
  inset: 0 50% 0 0;
  background: rgba(236,228,211,0.32);
}
.about-arm::after {
  content: '';
  position: absolute;
  inset: 0 0 0 50%;
  background: currentColor;
}

.arm-cardinal { width: 9.6%; height: 43%; opacity: 0.96; }
.arm-secondary { width: 6.6%; height: 32%; opacity: 0.72; }
.arm-minor { width: 4.1%; height: 24%; opacity: 0.46; }
.arm-gold { color: var(--accent); }
.arm-pale { color: rgba(236,228,211,0.42); }
.arm-shadow { color: rgba(236,228,211,0.24); }

.about-rose-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2.2%;
  aspect-ratio: 1;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--bg);
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 5px rgba(236,228,211,0.1),
    0 0 28px rgba(198,151,105,0.22);
  z-index: 4;
}

/* ── Content ── */
.about-content {
  flex: 1;
  max-width: 520px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-right: 8px;
  will-change: opacity, transform;
  scrollbar-width: thin;
  scrollbar-color: rgba(198,151,105,0.2) transparent;
}
.about-content::-webkit-scrollbar { width: 3px; }
.about-content::-webkit-scrollbar-track { background: transparent; }
.about-content::-webkit-scrollbar-thumb { background: rgba(198,151,105,0.22); border-radius: 2px; }

/* ── Header ── */
.about-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
}

.about-photo-wrap {
  position: relative;
  flex-shrink: 0;
  width: 76px;
  height: 76px;
  will-change: opacity, transform;
}

.about-photo-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  display: block;
  position: relative;
  z-index: 1;
  box-shadow:
    0 0 0 2px rgba(198, 151, 105, 0.72),
    0 0 0 5px rgba(198, 151, 105, 0.10),
    0 10px 40px rgba(0, 0, 0, 0.5);
}

.about-photo-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(198, 151, 105, 0.22);
  animation: photo-ring-pulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes photo-ring-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.6; }
  50%       { transform: scale(1.05); opacity: 1;   }
}

.about-header-text { flex: 1; }

.about-eyebrow { margin-bottom: 4px; }

.about-title {
  font-size: clamp(32px, 4.5vw, 54px);
  line-height: 1;
  color: var(--text);
  margin: 0;
}

.about-lead {
  color: var(--text-muted);
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.65;
  margin-bottom: 22px;
  max-width: 48ch;
}

/* ── Stats ── */
.about-stats {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  background: rgba(198,151,105,0.04);
  border: 1px solid rgba(198,151,105,0.12);
  border-radius: 10px;
  margin-bottom: 22px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.stat-sep {
  width: 1px;
  height: 32px;
  background: rgba(198,151,105,0.15);
}

.stat-num {
  font-size: clamp(22px, 3vw, 32px);
  color: var(--accent);
  line-height: 1;
}

.stat-num sup {
  font-size: 0.5em;
  vertical-align: super;
}

.stat-label {
  font-size: 10px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── Tabs ── */
.about-tab-nav {
  display: flex;
  gap: 2px;
  padding: 3px;
  background: rgba(198,151,105,0.05);
  border: 1px solid rgba(198,151,105,0.1);
  border-radius: 8px;
  margin-bottom: 14px;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 11px;
  padding: 7px 12px;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 0.06em;
  transition: background 0.2s, color 0.2s;
}

.tab-btn.active {
  background: rgba(198,151,105,0.14);
  color: var(--accent);
}

.tab-btn:hover:not(.active) { color: var(--text-muted); }

/* ── Tab transition ── */
.tab-slide-enter-active,
.tab-slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tab-slide-enter-from { opacity: 0; transform: translateY(6px); }
.tab-slide-leave-to  { opacity: 0; transform: translateY(-6px); }

/* ── Cards ── */
.about-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.about-cards--grid4 {
  grid-template-columns: 1fr 1fr;
}

.about-card {
  padding: 14px 16px;
  background: rgba(198,151,105,0.03);
  border: 1px solid rgba(198,151,105,0.1);
  border-radius: 10px;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;
  cursor: default;
}

.about-card:hover {
  border-color: rgba(198,151,105,0.32);
  background: rgba(198,151,105,0.07);
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.card-badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 100px;
  border: 1px solid rgba(198,151,105,0.5);
  color: var(--accent);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.card-badge--dim {
  border-color: rgba(198,151,105,0.2);
  color: var(--text-faint);
}

.card-date {
  font-size: 10px;
  color: var(--text-faint);
  margin: 0;
}

.card-title {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  margin: 0 0 3px;
}

.card-place {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0 0 8px;
  line-height: 1.4;
}

.card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.card-chip {
  font-size: 9px;
  font-family: var(--font-mono);
  padding: 2px 7px;
  border-radius: 100px;
  background: rgba(198,151,105,0.08);
  color: var(--text-faint);
}

/* ── Skills ── */
.about-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 22px;
}

.skill-pill {
  font-size: 11px;
  padding: 5px 13px;
  border-radius: 100px;
  border: 1px solid rgba(198,151,105,0.16);
  color: var(--text-muted);
  cursor: default;
  transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
}

.skill-pill:hover {
  border-color: rgba(198,151,105,0.48);
  color: var(--accent);
  background: rgba(198,151,105,0.06);
  transform: scale(1.05);
}

/* ── Socials ── */
.about-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.about-social {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(198, 151, 105, 0.34);
  border-radius: 8px;
  color: rgba(236, 228, 211, 0.82);
  padding: 9px 13px;
  font-size: 12px;
  transition: border-color 0.25s, color 0.25s, transform 0.25s;
}

.about-social:hover,
.about-social:focus-visible {
  border-color: rgba(198, 151, 105, 0.72);
  color: var(--accent);
  outline: none;
  transform: translateY(-2px);
}

.about-social-icon {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.about-location {
  color: var(--text-faint);
  padding-top: 16px;
  border-top: 1px solid var(--border-soft);
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .about-overlay {
    flex-direction: column;
    justify-content: flex-start;
    padding: 80px 24px 36px;
    gap: 24px;
    overflow-y: auto;
  }

  .about-disk-wrap { display: none; }

  .about-content {
    max-width: 100%;
    max-height: none;
    overflow-y: visible;
    padding-right: 0;
  }

  .about-cards { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .about-overlay { padding: 64px 16px 28px; gap: 16px; }
  .about-close { top: 16px; right: 16px; }

  .about-header { gap: 14px; }
  .about-photo-wrap { width: 62px; height: 62px; }
  .about-title { font-size: clamp(28px, 9vw, 40px); }

  .about-stats { padding: 12px 14px; }
  .stat-num { font-size: 22px; }

  .about-cards { grid-template-columns: 1fr; }
  .about-cards--grid4 { grid-template-columns: 1fr 1fr; }
}
</style>
