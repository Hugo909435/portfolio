<template>
  <main class="home">
    <nav class="site-nav" aria-label="Navigation principale">
      <a class="brand" href="/" aria-label="Gogo home">
        <span class="brand-name">gogo</span><span class="brand-ext">.dev</span>
      </a>
      <div class="nav-links mono" aria-label="Sections du site">
        <a href="#work">work</a>
        <a href="mailto:hello@gogo.dev">contact</a>
      </div>
    </nav>

    <section class="home-stage" aria-labelledby="hero-title">
      <div class="intro-panel">
        <p class="hero-meta mono">Developer &middot; Vendee, FR &middot; 2026</p>

        <div class="hero-title-wrap">
          <h1 id="hero-title" class="hero-title serif" aria-label="Hello, je suis Gogo.">
            <span class="title-line">Hello, je suis</span>
            <span class="title-line"><span>Gogo.</span></span>
          </h1>
        </div>

        <p class="hero-lead">
          Je construis des interfaces, des outils metier et des experiences web qui restent lisibles meme quand la logique devient dense.
        </p>

        <div class="hero-actions">
          <a class="primary-link mono" href="#work">Explorer les projets</a>
          <a class="ghost-link mono" href="mailto:hello@gogo.dev">Me contacter</a>
        </div>
      </div>

      <aside id="work" class="work-stage" aria-label="Selection de projets">
        <WorkSelector />
      </aside>
    </section>
  </main>
</template>

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
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
}

.brand-name {
  color: var(--accent);
}

.brand-ext {
  color: var(--text-muted);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.4vw, 32px);
  white-space: nowrap;
}

.nav-links a {
  transition: color 0.25s var(--ease-out);
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--accent);
  outline: none;
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
}

.title-line:nth-child(2) {
  color: var(--accent);
}

.hero-lead {
  max-width: 520px;
  margin-top: clamp(28px, 4vh, 44px);
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
  border: 1px solid rgba(236, 228, 211, 0.1);
  color: var(--text-muted);
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
}

@media (max-width: 640px) {
  .site-nav {
    padding: 20px 24px;
  }

  .nav-links {
    gap: 20px;
    max-width: 48vw;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
  }
}

@media (max-width: 560px) {
  .intro-panel,
  .work-stage {
    width: min(100%, calc(100vw - 40px));
    max-width: calc(100vw - 40px);
  }

  .hero-actions {
    width: min(100%, 320px);
    align-items: stretch;
    flex-direction: column;
    margin-top: 24px;
  }

  .primary-link,
  .ghost-link {
    max-width: 100%;
    width: 100%;
  }

  .hero-title-wrap {
    margin-top: 18px;
  }

  .hero-title {
    max-width: none;
    font-size: clamp(50px, 15vw, 60px);
  }

  .hero-lead {
    width: min(100%, 320px);
    max-width: calc(100vw - 72px);
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }
}
</style>
