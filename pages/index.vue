<template>
  <main class="home">
    <nav class="site-nav" aria-label="Navigation principale">
      <a class="brand" href="/" aria-label="Hugo Beignon — Portfolio">
        <img src="/img/logos/transparent-logo.svg" class="brand-logo" alt="" aria-hidden="true" />
      </a>
    </nav>

    <section class="home-stage" aria-labelledby="hero-title">
      <div class="intro-panel">
        <p class="hero-meta mono">Vendée &middot; France &middot; 2026</p>

        <div class="hero-title-wrap">
          <h1 id="hero-title" class="hero-title serif" aria-label="Hugo Beignon">
            <span class="title-line"><span>Hugo <span class="title-beignon">Beignon</span></span></span>
          </h1>
        </div>

        <p class="hero-lead">
          Je conçois des interfaces précises, des outils métier sur mesure et des expériences web soignées. Ce portfolio me permet à la fois de présenter mes projets et d'explorer un langage visuel plus personnel.
        </p>

        <div class="hero-disciplines mono" aria-label="Disciplines">
          <span>Full-Stack</span>
          <span class="hero-disc-sep" aria-hidden="true">/</span>
          <span>UI · UX</span>
          <span class="hero-disc-sep" aria-hidden="true">/</span>
          <span>Marketing</span>
        </div>

        <div class="hero-actions">
          <button class="primary-link mono" @click="aboutOpen = true">Qui suis-je →</button>
          <button class="ghost-link mono" @click="contactOpen = true">Contact</button>
        </div>

        <div class="hero-foot" aria-hidden="true">
          <span class="hero-foot-label mono">Portfolio personnel</span>
          <span class="hero-foot-coords mono">46°40'N&nbsp;&nbsp;1°26'O</span>
        </div>
      </div>

      <aside id="work" class="work-stage" aria-label="Selection de projets">
        <WorkSelector />
      </aside>
    </section>

    <AboutView :open="aboutOpen" @close="aboutOpen = false" />
    <ContactModal :open="contactOpen" @close="contactOpen = false" />
  </main>
</template>

<script setup lang="ts">
const contactOpen = ref(false)
const aboutOpen = ref(false)
</script>

<style>
.home {
  min-height: 100vh;
  overflow: hidden;
  background: var(--bg);
}

.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: transparent;
  pointer-events: none;
}

.brand,
.nav-links {
  pointer-events: auto;
}

.brand {
  display: inline-flex;
  align-items: center;
}

.brand-logo {
  display: block;
  width: 156px;
  height: 156px;
  object-fit: contain;
  transition: opacity 0.25s var(--ease-out);
}

.brand:hover .brand-logo,
.brand:focus-visible .brand-logo {
  opacity: 0.72;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.4vw, 32px);
  white-space: nowrap;
}

.nav-links a,
.nav-contact-btn {
  transition: color 0.25s var(--ease-out);
}

.nav-links a:hover,
.nav-links a:focus-visible,
.nav-contact-btn:hover,
.nav-contact-btn:focus-visible {
  color: var(--accent);
  outline: none;
}

.nav-contact-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  padding: 0;
}

.home-stage {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(340px, 0.78fr) minmax(560px, 1.22fr);
  align-items: stretch;
  column-gap: clamp(16px, 3vw, 52px);
  overflow: hidden;
  padding: 96px 0 0 clamp(24px, 5.8vw, 96px);
}

.intro-panel {
  position: relative;
  z-index: 12;
  display: flex;
  min-width: 0;
  min-height: calc(100vh - 96px);
  flex-direction: column;
  justify-content: center;
  padding-bottom: clamp(48px, 7vh, 86px);
}

.intro-panel::before {
  content: '';
  position: absolute;
  inset: -30% -20% -20% -30%;
  background: radial-gradient(ellipse at 38% 42%, rgba(198, 151, 105, 0.11) 0%, rgba(198, 151, 105, 0.04) 40%, transparent 68%);
  pointer-events: none;
  z-index: -1;
}


.hero-meta {
  color: var(--text-muted);
}

.hero-title-wrap {
  display: flex;
  align-items: center;
  margin-top: clamp(26px, 5vh, 56px);
}

.hero-title {
  max-width: 12ch;
  font-size: clamp(64px, 8.8vw, 128px);
  letter-spacing: 0;
  line-height: 0.95;
}

.title-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}

.title-beignon {
  color: #c4956a;
}

.title-line:nth-child(2) {
  color: var(--accent);
}

.hero-lead {
  max-width: 520px;
  margin-top: clamp(44px, 6vh, 68px);
  color: var(--text-muted);
  font-size: clamp(17px, 1.35vw, 21px);
  line-height: 1.55;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-link,
.ghost-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 18px;
  transition:
    background 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out),
    color 0.3s var(--ease-out),
    transform 0.35s var(--ease-out);
}

.primary-link {
  border: 1px solid rgba(198, 151, 105, 0.58);
  background: rgba(198, 151, 105, 0.14);
  color: var(--accent);
}

.ghost-link {
  border: 1px solid rgba(236, 228, 211, 0.24);
  background: rgba(236, 228, 211, 0.04);
  color: rgba(236, 228, 211, 0.82);
}

.primary-link:hover,
.ghost-link:hover,
.primary-link:focus-visible,
.ghost-link:focus-visible {
  transform: translateY(-3px);
  outline: none;
}

.ghost-link:hover,
.ghost-link:focus-visible {
  border-color: rgba(198, 151, 105, 0.38);
  color: var(--text);
}

.hero-disciplines {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: clamp(18px, 2.2vh, 26px);
  color: var(--text-faint);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.hero-disc-sep {
  color: rgba(198, 151, 105, 0.28);
  font-size: 9px;
}

.hero-foot {
  position: absolute;
  bottom: clamp(24px, 3.5vh, 48px);
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid rgba(198, 151, 105, 0.1);
}

.hero-foot-label {
  color: var(--text-faint);
  font-size: 9px;
  letter-spacing: 0.16em;
}

.hero-foot-coords {
  color: rgba(198, 151, 105, 0.38);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.work-stage {
  position: relative;
  width: 100%;
  min-width: 0;
}


@media (max-width: 980px) {
  .home {
    overflow-y: auto;
  }

  .home-stage {
    min-height: auto;
    grid-template-columns: 1fr;
    padding: 92px 20px 0;
  }

  .intro-panel {
    min-height: auto;
    justify-content: flex-start;
    padding-bottom: 30px;
  }

  .hero-title {
    max-width: 10ch;
  }

  .work-stage {
    min-height: min(620px, 78vh);
  }

  .hero-foot {
    display: none;
  }
}

/* ── Mobile premium — 100svh, boussole intacte ── */

@keyframes m-hero-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .site-nav {
    padding: 16px 22px;
  }

  .brand-logo {
    width: 78px;
    height: 78px;
  }

  .home {
    height: 100svh;
    overflow: hidden;
  }

  .home-stage {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    padding: 52px 0 0;
  }

  /* ── Hero ── */
  .intro-panel {
    flex: 0 0 auto;
    min-height: 0;
    justify-content: flex-start;
    padding: 64px 26px 0;
    margin-bottom: -44px;
    align-items: flex-start;
    text-align: left;
    position: relative;
  }

  .intro-panel::before {
    inset: -40% -10% -10% -40%;
    background: radial-gradient(ellipse at 40% 38%, rgba(198, 151, 105, 0.10) 0%, rgba(198, 151, 105, 0.03) 42%, transparent 66%);
  }

  .hero-meta {
    font-size: 9px;
    letter-spacing: 0.17em;
    text-transform: uppercase;
    color: var(--text-faint);
    animation: m-hero-in 0.45s ease both;
    animation-delay: 0.04s;
  }

  .hero-title-wrap {
    margin-top: 10px;
    animation: m-hero-in 0.52s ease both;
    animation-delay: 0.17s;
  }

  .hero-title {
    max-width: none;
    font-size: clamp(44px, 11.5vw, 54px);
    line-height: 0.91;
  }

  .hero-lead {
    max-width: 100%;
    margin-top: 12px;
    font-size: 17px;
    line-height: 1.62;
    color: rgba(236, 228, 211, 0.54);
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: normal;
    animation: m-hero-in 0.5s ease both;
    animation-delay: 0.29s;
  }

  .hero-disciplines {
    margin-top: 9px;
    font-size: 9px;
    letter-spacing: 0.13em;
    gap: 6px 8px;
    animation: m-hero-in 0.45s ease both;
    animation-delay: 0.36s;
  }

  .hero-foot {
    display: none;
  }

  .hero-actions {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 10px;
    margin-top: 16px;
    width: auto;
    align-items: center;
    justify-content: flex-start;
    animation: m-hero-in 0.45s ease both;
    animation-delay: 0.41s;
  }

  .primary-link,
  .ghost-link {
    min-height: 40px;
    max-width: none;
    width: auto;
    padding: 0 20px;
    border-radius: 10px;
    font-size: 11px;
    letter-spacing: 0.1em;
  }

  .primary-link {
    border-color: rgba(198, 151, 105, 0.65);
    background: rgba(198, 151, 105, 0.12);
  }

  .ghost-link {
    border-color: rgba(236, 228, 211, 0.18);
  }

  .work-stage {
    flex: 1;
    min-height: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>
