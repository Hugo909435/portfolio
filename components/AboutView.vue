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
          <p class="about-eyebrow mono">à propos</p>
          <h2 id="about-title" class="about-title serif">Gogo.</h2>

          <p class="about-lead">
            Développeur front-end basé en Vendée. Je construis des interfaces lisibles, des outils métier sur-mesure et des expériences web soignées — de la maquette au déploiement.
          </p>

          <div class="about-blocks">
            <div ref="block1Ref" class="about-block">
              <p class="block-label mono">Stack</p>
              <ul class="block-list">
                <li>Vue · Nuxt · TypeScript</li>
                <li>Laravel · PHP</li>
                <li>Flutter</li>
                <li>MySQL · PostgreSQL</li>
              </ul>
            </div>
            <div ref="block2Ref" class="about-block">
              <p class="block-label mono">Envies</p>
              <ul class="block-list">
                <li>Interfaces soignées</li>
                <li>Animations & motion</li>
                <li>Outils métier</li>
                <li>Open au remote</li>
              </ul>
            </div>
          </div>

          <p ref="locationRef" class="about-location mono">Vendée, France &middot; 2026</p>
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
const block1Ref = ref<HTMLElement | null>(null)
const block2Ref = ref<HTMLElement | null>(null)
const locationRef = ref<HTMLElement | null>(null)

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

  gsap.set(el, { autoAlpha: 0 })
  gsap.set(compassRef.value, { x: '90vw', scale: 0.6, opacity: 0 })
  gsap.set(rotorRef.value, { rotation: 0 })
  gsap.set(contentRef.value, { autoAlpha: 0, x: 48 })

  // Backdrop
  tl.to(el, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })

  // Boussole glisse de droite à gauche en tournant
  tl.to(compassRef.value, {
    x: 0,
    scale: 1,
    opacity: 1,
    duration: 1.55,
    ease: 'power3.out',
  }, 0.1)
  tl.to(rotorRef.value, {
    rotation: 1080,
    duration: 1.55,
    ease: 'power2.inOut',
  }, 0.1)

  // Contenu apparaît pendant que la boussole ralentit
  tl.to(contentRef.value, {
    autoAlpha: 1,
    x: 0,
    duration: 0.75,
    ease: 'power2.out',
  }, 0.95)
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
  max-width: 480px;
  will-change: opacity, transform;
}

.about-eyebrow {
  margin-bottom: 10px;
}

.about-title {
  font-size: clamp(52px, 7vw, 96px);
  line-height: 0.95;
  color: var(--text);
  margin-bottom: 28px;
}

.about-lead {
  color: var(--text-muted);
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.65;
  margin-bottom: 32px;
  max-width: 44ch;
}

.about-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

.about-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-label {
  color: var(--accent);
}

.block-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.block-list li {
  color: var(--text);
  font-size: 14px;
  padding-left: 14px;
  position: relative;
}

.block-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--text-faint);
  font-size: 11px;
  top: 1px;
}

.about-location {
  color: var(--text-faint);
  padding-top: 20px;
  border-top: 1px solid var(--border-soft);
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .about-overlay {
    flex-direction: column;
    justify-content: center;
    padding: 80px 28px 36px;
    gap: 28px;
    overflow-y: auto;
  }

  .about-disk-wrap {
    width: min(260px, 60vw);
  }

  .about-content {
    max-width: 100%;
  }

  .about-title {
    font-size: clamp(44px, 10vw, 64px);
  }
}
</style>
