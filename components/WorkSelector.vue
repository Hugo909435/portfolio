<template>
  <section ref="sectionEl" class="work-selector" aria-label="Selected work">
    <div class="selector-top">
      <p ref="hintEl" class="selector-hint mono">
        <span v-if="state === 'idle'">Choisis un projet</span>
        <span v-else-if="state === 'spinning'"></span>
        <span v-else-if="selectedCategory">{{ activeCategoryLabel }}</span>
      </p>

      <div
        ref="categoryZoneEl"
        class="category-zone"
        :class="[`is-${state}`, { compact: hasRevealed || state === 'revealed' }]"
      >
        <button
          v-for="category in categories"
          :key="category.key"
          class="cat"
          :class="{ active: selectedCategory === category.key }"
          type="button"
          @click="chooseCategory(category.key)"
        >
          {{ category.label }}
        </button>
      </div>
    </div>

    <div ref="projectGridEl" class="project-grid" :class="{ visible: state === 'revealed' }" aria-label="Projects">
        <div
          v-for="(project, index) in projects"
          :key="project.slug"
          class="project-slot"
          :style="projectSlotStyle(index, projects.length)"
        >
          <button
            type="button"
            class="project-card"
            @click="openProjectDetail(project)"
          >
            <span class="project-meta mono">{{ activeCategoryLabel }} · {{ project.year }}</span>
            <span class="project-title serif">{{ project.title }}</span>
            <span class="project-desc">{{ project.desc }}</span>
            <span class="project-tech mono">{{ project.meta }}</span>
          </button>
        </div>
      </div>

    <div ref="compassViewportEl" class="compass-viewport" :class="{ 'is-detail': !!detailProject }">
      <div ref="diskWrapEl" class="disk-wrap" aria-hidden="true">
        <div class="disk-surface" />
        <div class="disk-deco-outer" />
        <div class="disk-deco-mid" />
        <div class="disk-deco-inner" />

        <div class="compass-shell">
          <span
            v-for="tick in compassTicks"
            :key="tick"
            class="compass-tick"
            :style="compassTickStyle(tick)"
          />
          <span
            v-for="mark in degreeMarks"
            :key="mark.label"
            class="degree-mark mono"
            :style="compassPointStyle(mark.angle, mark.radius)"
          >
            {{ mark.label }}
          </span>
          <span
            v-for="point in compassPoints"
            :key="point.label"
            class="shell-point"
            :class="{ cardinal: point.cardinal }"
            :style="compassPointStyle(point.angle, point.radius)"
          >
            {{ point.label }}
          </span>
        </div>

        <div ref="rotorEl" class="disk-rotor">
          <div class="compass-face">
            <span class="rose-ring rose-ring-outer" />
            <span class="rose-ring rose-ring-inner" />
            <span
              v-for="arm in roseArms"
              :key="arm.className"
              class="rose-arm"
              :class="arm.className"
              :style="{ transform: `translate(-50%, -100%) rotate(${arm.angle}deg)` }"
            />
            <span class="rose-center" />
          </div>

          <div class="search-layer" :class="{ searching: state === 'spinning', settled: state === 'revealed' }">
            <span
              v-for="tick in searchTicks"
              :key="tick"
              class="search-tick"
              :style="searchTickStyle(tick)"
            />
            <span class="search-sweep" />
            <span class="search-node search-node-a" />
            <span class="search-node search-node-b" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div ref="curtainEl" class="g-curtain" />
  </Teleport>

  <Teleport to="body">
    <div ref="detailPanelEl" class="g-detail">
      <button class="g-detail-back mono" @click="closeDetail">← Retour</button>
      <div class="g-detail-body">
        <p class="g-detail-eyebrow mono">{{ detailProject?.role }} · {{ detailProject?.year }}</p>
        <h2 class="g-detail-title serif">{{ detailProject?.title }}</h2>
        <p class="g-detail-desc">{{ detailProject?.longDesc }}</p>
        <div class="g-detail-tags">
          <span v-for="tag in detailProject?.tags" :key="tag" class="g-detail-tag mono">{{ tag }}</span>
        </div>
        <a v-if="detailProject?.link" :href="detailProject.link" target="_blank" rel="noopener" class="g-detail-link mono">
          Voir le projet →
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { categories, projectsByCategory } from '~/data/projects'
import type { Project } from '~/data/projects'

type CategoryKey = (typeof categories)[number]['key']
type SelectorState = 'idle' | 'spinning' | 'revealed'

const SEARCH_TICK_COUNT = 72
const COMPASS_TICK_COUNT = 144
const SPIN_DURATION = 3
const COMPASS_POINTS = [
  { label: 'N', angle: 0, radius: 41, cardinal: true },
  { label: 'NE', angle: 45, radius: 40, cardinal: false },
  { label: 'E', angle: 90, radius: 41, cardinal: true },
  { label: 'SE', angle: 135, radius: 40, cardinal: false },
  { label: 'S', angle: 180, radius: 41, cardinal: true },
  { label: 'SO', angle: 225, radius: 40, cardinal: false },
  { label: 'O', angle: 270, radius: 41, cardinal: true },
  { label: 'NO', angle: 315, radius: 40, cardinal: false }
] as const
const DEGREE_MARKS = [
  { label: '030', angle: 30, radius: 45 },
  { label: '060', angle: 60, radius: 45 },
  { label: '120', angle: 120, radius: 45 },
  { label: '150', angle: 150, radius: 45 },
  { label: '210', angle: 210, radius: 45 },
  { label: '240', angle: 240, radius: 45 },
  { label: '300', angle: 300, radius: 45 },
  { label: '330', angle: 330, radius: 45 }
] as const
const ROSE_ARMS = [
  { angle: 0, className: 'rose-arm-cardinal rose-arm-gold' },
  { angle: 22.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 45, className: 'rose-arm-secondary rose-arm-pale' },
  { angle: 67.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 90, className: 'rose-arm-cardinal rose-arm-gold' },
  { angle: 112.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 135, className: 'rose-arm-secondary rose-arm-pale' },
  { angle: 157.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 180, className: 'rose-arm-cardinal rose-arm-gold' },
  { angle: 202.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 225, className: 'rose-arm-secondary rose-arm-pale' },
  { angle: 247.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 270, className: 'rose-arm-cardinal rose-arm-gold' },
  { angle: 292.5, className: 'rose-arm-minor rose-arm-shadow' },
  { angle: 315, className: 'rose-arm-secondary rose-arm-pale' },
  { angle: 337.5, className: 'rose-arm-minor rose-arm-shadow' }
] as const

const sectionEl = ref<HTMLElement | null>(null)
const hintEl = ref<HTMLElement | null>(null)
const categoryZoneEl = ref<HTMLElement | null>(null)
const diskWrapEl = ref<HTMLElement | null>(null)
const rotorEl = ref<HTMLElement | null>(null)
const projectGridEl = ref<HTMLElement | null>(null)
const compassViewportEl = ref<HTMLElement | null>(null)
const curtainEl = ref<HTMLElement | null>(null)
const detailPanelEl = ref<HTMLElement | null>(null)
const detailProject = ref<Project | null>(null)

let isTransitioning = false
let storedRect = { left: 0, top: 0, width: 0, height: 0, right: 0 }
let storedOriginalRight = 0
let storedTargetRight = 0
let storedRollDegrees = 0
let rotorIdleTween: gsap.core.Tween | null = null

const state = ref<SelectorState>('idle')
const selectedCategory = ref<CategoryKey | null>(null)
const hasRevealed = ref(false)
const searchTicks = Array.from({ length: SEARCH_TICK_COUNT }, (_, index) => index)
const compassTicks = Array.from({ length: COMPASS_TICK_COUNT }, (_, index) => index)
const compassPoints = COMPASS_POINTS
const degreeMarks = DEGREE_MARKS
const roseArms = ROSE_ARMS

const activeCategoryLabel = computed(() => {
  return categories.find((category) => category.key === selectedCategory.value)?.label ?? ''
})
const projects = computed(() => {
  return selectedCategory.value ? projectsByCategory[selectedCategory.value] ?? [] : []
})

function searchTickStyle(index: number) {
  const angle = (360 / SEARCH_TICK_COUNT) * index
  const radians = (angle * Math.PI) / 180
  const radius = index % 6 === 0 ? 43 : 41
  const x = 50 + radius * Math.sin(radians)
  const y = 50 - radius * Math.cos(radians)
  const length = index % 12 === 0 ? 24 : index % 6 === 0 ? 15 : 7
  const alpha = index % 12 === 0 ? 0.8 : index % 6 === 0 ? 0.45 : 0.18

  return {
    left: `${x}%`,
    top: `${y}%`,
    height: `${length}px`,
    opacity: alpha,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`
  }
}

function compassTickStyle(index: number) {
  const angle = (360 / COMPASS_TICK_COUNT) * index
  const radians = (angle * Math.PI) / 180
  const radius = 48.1
  const x = 50 + radius * Math.sin(radians)
  const y = 50 - radius * Math.cos(radians)
  const isMajor = index % 12 === 0
  const isMedium = index % 6 === 0

  return {
    left: `${x}%`,
    top: `${y}%`,
    height: `${isMajor ? 24 : isMedium ? 15 : 7}px`,
    opacity: isMajor ? 0.92 : isMedium ? 0.62 : 0.26,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`
  }
}

function compassPointStyle(angle: number, radius = 35) {
  const radians = (angle * Math.PI) / 180
  const x = 50 + radius * Math.sin(radians)
  const y = 50 - radius * Math.cos(radians)

  return {
    left: `${x}%`,
    top: `${y}%`
  }
}

function projectSlotStyle(index: number, total: number) {
  const spread = total <= 2 ? 44 : 82
  const angle = total <= 1 ? -8 : -spread / 2 + (spread / Math.max(total - 1, 1)) * index
  const radians = (angle * Math.PI) / 180
  const x = Math.sin(radians) * 45
  const y = 42 + (1 - Math.cos(radians)) * 86 + Math.abs(angle) * 0.22

  return {
    '--slot-x': `${x}%`,
    '--slot-y': `${y}%`,
    '--slot-rotation': `${angle / 13}deg`
  }
}

function getSearchElements() {
  return gsap.utils.toArray<HTMLElement>('.search-tick, .search-sweep, .search-node', rotorEl.value ?? undefined)
}

function getProjectCards() {
  return gsap.utils.toArray<HTMLElement>('.project-card', projectGridEl.value ?? undefined)
}

async function chooseCategory(categoryKey: CategoryKey) {
  if (state.value === 'spinning' || !rotorEl.value) {
    return
  }

  if (state.value === 'revealed' && selectedCategory.value === categoryKey) {
    return
  }

  const currentCards = getProjectCards()
  
  // 1. Immediately signal we are starting the transition
  const wasIdle = state.value === 'idle'
  state.value = 'spinning'
  
  // 2. Immediately hide the hint to avoid seeing the old category label or "Choisis un projet"
  gsap.set(hintEl.value, { autoAlpha: 0 })

  // 3. If we were already showing projects, fade them out first
  if (!wasIdle && currentCards.length > 0) {
    await gsap.to(currentCards, {
      autoAlpha: 0,
      filter: 'blur(14px)',
      duration: 0.3,
      stagger: { each: 0.02, from: 'end' },
      ease: 'power2.in',
      overwrite: true
    })
  }

  // 4. Update the category data now that everything is hidden
  selectedCategory.value = categoryKey
  await nextTick()

  // 5. Ensure the new project cards are invisible before starting the search animation
  gsap.set(getProjectCards(), { autoAlpha: 0, filter: 'blur(18px)', visibility: 'hidden' })
  
  gsap.to(categoryZoneEl.value, {
    autoAlpha: 0,
    filter: 'blur(14px)',
    y: -12,
    duration: 0.5,
    ease: 'power2.in'
  })
  gsap.to(hintEl.value, {
    autoAlpha: 0.78,
    y: -4,
    duration: 0.3,
    ease: 'power2.out'
  })
  gsap.fromTo(getSearchElements(), {
    autoAlpha: 0,
    scale: 0.82
  }, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.55,
    stagger: { each: 0.005, from: 'random' },
    ease: 'expo.out',
    overwrite: true
  })
  gsap.to(rotorEl.value, {
    rotation: 360 * (6 + Math.random() * 1.2),
    duration: SPIN_DURATION,
    ease: 'power3.inOut',
    overwrite: true,
    onComplete: async () => {
      state.value = 'revealed'
      hasRevealed.value = true
      await nextTick()
      revealProjects()
      revealCompactCategories()
    }
  })
}

function revealProjects() {
  gsap.fromTo(getProjectCards(), {
    autoAlpha: 0,
    visibility: 'hidden',
    filter: 'blur(18px)'
  }, {
    autoAlpha: 1,
    visibility: 'visible',
    filter: 'blur(0px)',
    duration: 0.95,
    stagger: 0.1,
    ease: 'back.out(1.15)',
    overwrite: true
  })
}

function revealCompactCategories() {
  gsap.fromTo(categoryZoneEl.value, {
    autoAlpha: 0,
    filter: 'blur(10px)',
    y: 8
  }, {
    autoAlpha: 0.72,
    filter: 'blur(0px)',
    y: 0,
    duration: 0.85,
    ease: 'power2.out',
    overwrite: true
  })
}

function openProjectDetail(project: Project) {
  if (isTransitioning || !diskWrapEl.value || !compassViewportEl.value || !curtainEl.value || !detailPanelEl.value) return
  isTransitioning = true
  detailProject.value = project

  const rect = diskWrapEl.value.getBoundingClientRect()
  storedRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right }

  // Mirror position: disk was right: -X, target is right: rect.left (same overhang on left side)
  storedOriginalRight = window.innerWidth - rect.right  // e.g. -220
  storedTargetRight = rect.left                          // e.g. 680 → same visual overhang on left

  const distance = rect.left - (window.innerWidth - rect.right) // total travel distance
  const rollDegrees = (distance / (Math.PI * rect.width)) * 360
  storedRollDegrees = rollDegrees

  const tl = gsap.timeline({ onComplete: () => { isTransitioning = false } })

  // 1. Fade out cards and UI
  const cards = getProjectCards()
  if (cards.length) {
    tl.to(cards, { autoAlpha: 0, filter: 'blur(14px)', y: -6, duration: 0.3, stagger: { each: 0.04, from: 'end' } })
  }
  tl.to([categoryZoneEl.value, hintEl.value], { autoAlpha: 0, duration: 0.25 }, '<')

  // 2. Make the whole compass-viewport fixed so it escapes every stacking context
  tl.call(() => {
    gsap.set(compassViewportEl.value!, {
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible',
      zIndex: 100,
      pointerEvents: 'none'  // laisse passer les clics vers le panneau détail
    })
  })

  // 3. Roll the disk-wrap right→left inside the now-fixed viewport
  //    disk-wrap uses CSS right/bottom so we animate "right"
  tl.fromTo(diskWrapEl.value,
    { right: storedOriginalRight },
    { right: storedTargetRight, rotation: `+=${rollDegrees}`, duration: 1.6, ease: 'power3.inOut' }
  )
  tl.fromTo(curtainEl.value,
    { clipPath: 'inset(0 0 0 100%)' },
    { clipPath: 'inset(0 0 0 0%)', duration: 1.6, ease: 'power3.inOut' },
    '<'
  )

  // 4. Lancer la rotation continue des aiguilles une fois la boussole posée
  tl.call(() => {
    rotorIdleTween = gsap.to(rotorEl.value, {
      rotation: '+=360',
      duration: 9,
      ease: 'none',
      repeat: -1
    })
  })

  // 5. Reveal detail panel
  tl.fromTo(detailPanelEl.value,
    { autoAlpha: 0, x: 30 },
    { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power2.out' },
    '-=0.3'
  )
}

function closeDetail() {
  if (isTransitioning || !diskWrapEl.value || !compassViewportEl.value || !curtainEl.value || !detailPanelEl.value) return
  isTransitioning = true

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(compassViewportEl.value!, { clearProps: 'all' })
      gsap.set(diskWrapEl.value!, { clearProps: 'all' })
      detailProject.value = null
      isTransitioning = false
      nextTick().then(() => {
        revealProjects()
        revealCompactCategories()
        gsap.to(hintEl.value, { autoAlpha: 0.78, duration: 0.4, delay: 0.2 })
      })
    }
  })

  // 0. Stopper la rotation des aiguilles
  if (rotorIdleTween) {
    rotorIdleTween.kill()
    rotorIdleTween = null
  }

  // 1. Hide detail panel
  tl.to(detailPanelEl.value, { autoAlpha: 0, x: 20, duration: 0.4, ease: 'power2.in' })

  // 2. Roll compass back right + restore curtain in sync
  tl.to(diskWrapEl.value, {
    right: storedOriginalRight,
    rotation: `-=${storedRollDegrees}`,
    duration: 1.4,
    ease: 'power3.inOut'
  })
  tl.to(curtainEl.value, {
    clipPath: 'inset(0 0 0 100%)',
    duration: 1.4,
    ease: 'power3.inOut'
  }, '<')
}

onMounted(async () => {
  await nextTick()

  gsap.set(rotorEl.value, {
    rotation: 0,
    transformOrigin: '50% 50%'
  })
})
</script>

<style scoped>
.work-selector {
  position: relative;
  display: block;
  height: calc(100vh - 96px);
  min-height: 560px;
  overflow: visible;
  padding-top: 0;
}

.selector-top {
  position: absolute;
  top: clamp(26px, 6vh, 72px);
  right: clamp(28px, 5vw, 78px);
  left: max(-150px, -12vw);
  z-index: 18;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 22px;
  padding: 0;
  text-align: center;
}

.selector-hint {
  min-height: 16px;
}

.category-zone {
  display: flex;
  justify-content: center;
  gap: clamp(14px, 3vw, 28px);
  will-change: filter, opacity, transform;
}

.category-zone.hidden {
  pointer-events: none;
}

.cat {
  min-width: clamp(152px, 13vw, 220px);
  border: 1px solid rgba(198, 151, 105, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(236, 228, 211, 0.1), rgba(198, 151, 105, 0.035)),
    rgba(28, 25, 22, 0.44);
  backdrop-filter: blur(16px);
  box-shadow:
    inset 0 1px 0 rgba(236, 228, 211, 0.11),
    0 22px 58px rgba(0, 0, 0, 0.22);
  color: var(--text-faint);
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: clamp(18px, 1.65vw, 25px);
  font-style: italic;
  padding: 13px 18px 15px;
  text-align: center;
  transition:
    background 0.45s var(--ease-out),
    border-color 0.35s var(--ease-out),
    box-shadow 0.65s var(--ease-out),
    color 0.35s var(--ease-out),
    opacity 0.45s var(--ease-out),
    transform 0.65s var(--ease-out);
  will-change: transform;
}

.cat:hover,
.cat:focus-visible {
  border-color: rgba(198, 151, 105, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(236, 228, 211, 0.16),
    0 32px 82px rgba(0, 0, 0, 0.3);
  color: var(--accent);
  outline: none;
  transform: translateY(-11px);
}

.category-zone.compact {
  gap: clamp(18px, 4vw, 48px);
}

.category-zone.compact .cat {
  min-width: clamp(148px, 12vw, 210px);
  border: none;
  border-bottom: 0.5px solid rgba(198, 151, 105, 0.12);
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
  color: rgba(236, 228, 211, 0.46);
  font-size: clamp(16px, 1.28vw, 21px);
  padding: 3px 0 8px;
}

.category-zone.compact .cat:hover,
.category-zone.compact .cat:focus-visible,
.category-zone.compact .cat.active {
  border-color: rgba(198, 151, 105, 0.68);
  box-shadow: none;
  color: var(--accent);
  transform: translateY(-8px);
}

.project-grid {
  position: absolute;
  top: clamp(78px, 10vh, 118px);
  left: max(-120px, -8vw);
  z-index: 17;
  display: block;
  width: min(940px, 84vw);
  height: clamp(230px, 24vw, 320px);
  margin: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  overflow: visible;
  transform: translateY(8px);
}

.project-grid.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

.project-slot {
  position: absolute;
  top: var(--slot-y);
  left: calc(50% + var(--slot-x));
  width: clamp(150px, 13vw, 188px);
  transform: translate(-50%, -50%) rotate(var(--slot-rotation));
  transform-origin: center;
}

.project-card {
  position: relative;
  display: flex;
  min-height: 116px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 13px;
  border: 1px solid rgba(198, 151, 105, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(236, 228, 211, 0.12), rgba(198, 151, 105, 0.05)),
    rgba(31, 28, 25, 0.5);
  backdrop-filter: blur(18px);
  box-shadow:
    inset 0 1px 0 rgba(236, 228, 211, 0.1),
    0 24px 70px rgba(0, 0, 0, 0.28);
  color: var(--text);
  cursor: pointer;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  transition:
    border-color 0.65s var(--ease-out),
    box-shadow 0.65s var(--ease-out),
    transform 0.65s var(--ease-out);
  will-change: filter, opacity, transform;
}

.project-card::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(236, 228, 211, 0.18), transparent 34%, transparent 68%, rgba(198, 151, 105, 0.12));
  content: "";
  opacity: 0.42;
  pointer-events: none;
}

.project-card:hover {
  border-color: rgba(198, 151, 105, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(236, 228, 211, 0.15),
    0 34px 90px rgba(0, 0, 0, 0.34);
  transform: translateY(-12px);
}

.project-meta,
.project-tech {
  position: relative;
  z-index: 1;
  color: var(--text-muted);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.project-title {
  position: relative;
  z-index: 1;
  margin-top: 10px;
  color: var(--text);
  font-size: clamp(21px, 2vw, 28px);
  line-height: 0.94;
  text-wrap: balance;
}

.project-desc {
  position: relative;
  z-index: 1;
  margin: 10px 0 14px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.34;
}

.compass-viewport {
  position: absolute;
  inset: 0;
  z-index: 1;
  height: auto;
  margin-top: 0;
  overflow: hidden;
  width: 100%;
}

.compass-viewport::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  z-index: 5;
  height: 110px;
  background: linear-gradient(to bottom, transparent, var(--bg) 82%);
  content: "";
  pointer-events: none;
}

.compass-viewport::before {
  position: absolute;
  top: 0;
  right: -1px;
  bottom: 0;
  z-index: 6;
  width: clamp(110px, 10vw, 180px);
  background: linear-gradient(to right, transparent, var(--bg) 82%);
  content: "";
  pointer-events: none;
}

.disk-wrap {
  position: absolute;
  right: clamp(-310px, -19vw, -220px);
  bottom: clamp(-430px, -34vw, -300px);
  width: min(980px, 72vw);
  aspect-ratio: 1;
  border-radius: 50%;
}

.disk-surface {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, transparent 0 17.8%, rgba(198, 151, 105, 0.16) 18% 18.1%, transparent 18.3% 31.8%, rgba(198, 151, 105, 0.14) 32% 32.1%, transparent 32.3% 40.8%, rgba(198, 151, 105, 0.08) 41% 41.1%, transparent 41.4% 100%),
    repeating-radial-gradient(circle at 50% 50%, rgba(236, 228, 211, 0.015) 0 1px, transparent 1px 21px),
    conic-gradient(from 0deg, rgba(198, 151, 105, 0.035) 0 1deg, transparent 1deg 44deg, rgba(236, 228, 211, 0.02) 44deg 45deg, transparent 45deg 89deg, rgba(198, 151, 105, 0.035) 89deg 90deg, transparent 90deg 360deg),
    radial-gradient(circle at 50% 50%, rgba(28, 24, 20, 0.78), rgba(17, 15, 13, 0.98) 66%, #100f0d 100%);
  box-shadow:
    inset 0 0 0 1px rgba(198, 151, 105, 0.46),
    inset 0 0 0 10px rgba(198, 151, 105, 0.05),
    inset 0 0 0 54px rgba(236, 228, 211, 0.012),
    inset 0 80px 180px rgba(198, 151, 105, 0.035),
    inset 0 -160px 220px rgba(0, 0, 0, 0.4);
  opacity: 0.96;
}

.disk-surface::before,
.disk-surface::after {
  position: absolute;
  border-radius: 50%;
  content: "";
}

.disk-surface::before {
  inset: 4.3%;
  border: 0.5px solid rgba(198, 151, 105, 0.17);
  box-shadow:
    inset 0 0 0 56px rgba(198, 151, 105, 0.035),
    inset 0 0 0 57px rgba(236, 228, 211, 0.018),
    inset 0 0 0 118px rgba(198, 151, 105, 0.018);
}

.disk-surface::after {
  inset: 0;
  background:
    linear-gradient(to right, transparent calc(50% - 0.5px), rgba(198, 151, 105, 0.13) 50%, transparent calc(50% + 0.5px)),
    linear-gradient(to bottom, transparent calc(50% - 0.5px), rgba(198, 151, 105, 0.08) 50%, transparent calc(50% + 0.5px)),
    linear-gradient(to bottom, rgba(236, 228, 211, 0.025), transparent 20%, transparent 68%, rgba(0, 0, 0, 0.26));
  opacity: 0.72;
}

.disk-deco-outer,
.disk-deco-mid,
.disk-deco-inner {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.disk-deco-outer {
  inset: 0;
  border: 1px solid color-mix(in srgb, var(--border) 54%, var(--accent));
}

.disk-deco-mid {
  inset: 58px;
  border: 0.5px solid color-mix(in srgb, var(--border-soft) 58%, var(--accent));
}

.disk-deco-inner {
  inset: 13.6%;
  border: 0.5px dashed color-mix(in srgb, var(--border-soft) 70%, var(--accent));
}

.disk-deco-outer::after,
.disk-deco-mid::after {
  position: absolute;
  inset: 7.8%;
  border: 0.5px solid rgba(198, 151, 105, 0.07);
  border-radius: 50%;
  content: "";
}

.compass-shell {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: 50%;
  pointer-events: none;
}

.compass-shell::before,
.compass-shell::after {
  position: absolute;
  content: "";
}

.compass-shell::before {
  top: 0;
  left: 50%;
  width: 1px;
  height: 15%;
  background: linear-gradient(to bottom, rgba(198, 151, 105, 0.82), transparent);
  transform: translateX(-50%);
}

.compass-shell::after {
  top: 5%;
  left: 50%;
  width: 76%;
  height: 76%;
  border: 0.5px solid rgba(198, 151, 105, 0.12);
  border-radius: 50%;
  transform: translateX(-50%);
}

.compass-tick {
  position: absolute;
  z-index: 1;
  width: 1px;
  border-radius: 100px;
  background: linear-gradient(to bottom, rgba(198, 151, 105, 0.95), rgba(198, 151, 105, 0.2));
  transform-origin: center;
}

.degree-mark {
  position: absolute;
  color: rgba(236, 228, 211, 0.55);
  font-size: 13px;
  opacity: 0.78;
  user-select: none;
}

.shell-point {
  position: absolute;
  z-index: 2;
  color: var(--text);
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.4vw, 38px);
  font-style: italic;
  line-height: 1;
  opacity: 0.94;
  transform: translate(-50%, -50%);
  user-select: none;
}

.shell-point.cardinal {
  color: var(--accent);
  font-size: clamp(44px, 5.2vw, 82px);
}

.disk-rotor,
.compass-face,
.rose-ring,
.rose-center,
.rose-arm,
.search-layer {
  position: absolute;
  pointer-events: none;
}

.disk-rotor,
.compass-face,
.search-layer {
  inset: 0;
  border-radius: 50%;
}

.disk-rotor {
  z-index: 3;
  touch-action: none;
  will-change: transform;
}

.compass-face {
  opacity: 0.92;
}

.rose-ring {
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.rose-ring-outer {
  width: 32%;
  aspect-ratio: 1;
  border: 0.5px solid rgba(198, 151, 105, 0.42);
  box-shadow:
    0 0 0 52px rgba(198, 151, 105, 0.035),
    0 0 0 53px rgba(236, 228, 211, 0.035),
    0 0 0 95px rgba(198, 151, 105, 0.018);
}

.rose-ring-inner {
  width: 19%;
  aspect-ratio: 1;
  border: 0.5px dashed rgba(236, 228, 211, 0.13);
}

.rose-arm {
  top: 50%;
  left: 50%;
  width: 8%;
  height: 38%;
  clip-path: polygon(50% 0, 70% 68%, 50% 100%, 30% 68%);
  opacity: 0.9;
  transform-origin: 50% 100%;
}

.rose-arm::before {
  position: absolute;
  inset: 0 50% 0 0;
  background: rgba(236, 228, 211, 0.33);
  content: "";
}

.rose-arm::after {
  position: absolute;
  inset: 0 0 0 50%;
  background: currentColor;
  content: "";
}

.rose-arm-cardinal {
  width: 9.6%;
  height: 43%;
  opacity: 0.96;
}

.rose-arm-secondary {
  width: 6.6%;
  height: 32%;
  opacity: 0.72;
}

.rose-arm-minor {
  width: 4.1%;
  height: 24%;
  opacity: 0.46;
}

.rose-arm-gold {
  color: var(--accent);
}

.rose-arm-pale {
  color: rgba(236, 228, 211, 0.42);
}

.rose-arm-shadow {
  color: rgba(236, 228, 211, 0.24);
}

.rose-center {
  top: 50%;
  left: 50%;
  z-index: 3;
  width: 2.2%;
  aspect-ratio: 1;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--bg);
  box-shadow:
    0 0 0 5px rgba(236, 228, 211, 0.12),
    0 0 28px rgba(198, 151, 105, 0.22);
  transform: translate(-50%, -50%);
}

.search-layer {
  opacity: 0;
  transition: opacity 0.6s var(--ease-out);
}

.search-layer.searching {
  opacity: 1;
}

.search-layer.settled {
  opacity: 0.16;
}

.search-tick {
  position: absolute;
  width: 1px;
  border-radius: 100px;
  background: linear-gradient(to bottom, transparent, rgba(198, 151, 105, 0.86), transparent);
  box-shadow: 0 0 18px rgba(198, 151, 105, 0.16);
  transform-origin: center;
}

.search-sweep {
  position: absolute;
  inset: 62px;
  border-radius: 50%;
  background:
    conic-gradient(from -18deg, transparent 0deg, rgba(198, 151, 105, 0.5) 8deg, rgba(198, 151, 105, 0.16) 30deg, transparent 58deg, transparent 360deg);
  mask: radial-gradient(circle, transparent 0 50%, #000 51% 53%, transparent 54%);
  opacity: 0.86;
}

.search-node {
  position: absolute;
  width: 7px;
  height: 7px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: var(--bg);
  box-shadow: 0 0 24px rgba(198, 151, 105, 0.22);
}

.search-node-a {
  top: 7.5%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search-node-b {
  top: 50%;
  right: 7.5%;
  transform: translate(50%, -50%);
}

@media (max-width: 1020px) {
  .project-grid {
    width: min(760px, 96vw);
  }

  .project-slot {
    width: clamp(132px, 20vw, 166px);
  }
}

/* Quand la boussole est à gauche : gradient sur le bord gauche au lieu du droit */
.compass-viewport.is-detail::before {
  top: 0;
  right: auto;
  left: -1px;
  bottom: 0;
  width: clamp(110px, 10vw, 180px);
  background: linear-gradient(to left, transparent, var(--bg) 82%);
}

/* Le layer de recherche reste pleinement visible en mode détail */
.compass-viewport.is-detail .search-layer {
  opacity: 1;
}

@media (max-width: 760px) {
  .work-selector {
    min-height: min(640px, 82vh);
    padding-top: 12px;
  }

  .selector-top {
    gap: 20px;
    padding-bottom: 14px;
  }

  .category-zone {
    gap: 18px;
  }

  .cat {
    min-width: 74px;
  }

  .project-grid {
    width: min(620px, 96vw);
    height: 190px;
    margin-bottom: -76px;
  }

  .project-slot {
    width: min(38vw, 142px);
  }

  .compass-viewport {
    height: clamp(340px, 78vw, 430px);
    margin-top: -26px;
  }

  .disk-wrap {
    top: 0;
    width: min(620px, 120vw);
  }
}
</style>

<style>
.g-curtain {
  position: fixed;
  inset: 0;
  z-index: 98;
  background: var(--bg);
  pointer-events: none;
  clip-path: inset(0 0 0 100%);
}

.g-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: clamp(480px, 50%, 860px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  padding: clamp(48px, 7vh, 88px) clamp(36px, 5vw, 80px);
  opacity: 0;
  visibility: hidden;
  pointer-events: auto;
}

.g-detail-back {
  align-self: flex-start;
  margin-bottom: clamp(36px, 5vh, 56px);
  background: none;
  border: none;
  color: var(--text-faint);
  cursor: pointer;
  letter-spacing: 0.12em;
  transition: color 0.25s;
}

.g-detail-back:hover {
  color: var(--accent);
}

.g-detail-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.g-detail-eyebrow {
  margin-bottom: 18px;
  color: var(--text-faint);
}

.g-detail-title {
  margin-bottom: 28px;
  color: var(--accent);
  font-family: 'Instrument Serif', serif;
  font-size: clamp(52px, 5.8vw, 92px);
  font-style: italic;
  font-weight: 400;
  line-height: 0.92;
}

.g-detail-desc {
  max-width: 520px;
  margin-bottom: 32px;
  color: var(--text-muted);
  font-size: clamp(14px, 1.1vw, 17px);
  line-height: 1.7;
}

.g-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.g-detail-tag {
  padding: 4px 13px;
  border: 1px solid rgba(198, 151, 105, 0.22);
  border-radius: 100px;
  color: var(--text-faint);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.g-detail-link {
  align-self: flex-start;
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: opacity 0.25s;
}

.g-detail-link:hover {
  opacity: 0.72;
}
</style>
