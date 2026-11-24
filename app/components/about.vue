<template>
  <section id="about" class="hero-about" aria-labelledby="hero-about-title">
    <div class="hero-inner">
      <p class="hero-kicker hero-fade" style="animation-delay: 0.15s">
        Web Developer &amp; Visual Builder
      </p>
      <h1 id="hero-about-title" class="hero-title hero-fade" style="animation-delay: 0.3s">
        Hello, I am Łukasz
      </h1>

      <p class="hero-description hero-fade" style="animation-delay: 0.45s">
        I'm a web developer working with Vue 3, Nuxt, TypeScript, JavaScript,
        Three.js, and Python. Alongside personal and academic software projects,
        I work with 2D and 3D tools including Photoshop, Cinema 4D, and Blender—focusing
        on clean architecture and practical web solutions.
      </p>

      <div class="hero-actions hero-fade" style="animation-delay: 0.6s">
        <UButton
          to="/#scope"
          color="neutral"
          variant="solid"
          label="How can I help?"
          class="cta-primary"
        />

        <UButton
          to="/#contact"
          color="neutral"
          variant="outline"
          label="Get in touch"
          class="cta-secondary"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";

@keyframes aboutFadeIn {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-about {
  @apply w-full bg-transparent scroll-mt-24;
}

.hero-inner {
  @apply max-w-4xl mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-24 flex flex-col items-center text-center;
}

.hero-fade {
  opacity: 0;
  animation: aboutFadeIn 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-kicker {
  @apply text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4 font-mono;
}

.hero-title {
  @apply text-4xl sm:text-6xl font-medium tracking-tight text-zinc-50 mb-6 leading-[1.1];
}

.hero-description {
  @apply max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-9 font-normal;
}

.hero-actions {
  @apply flex flex-wrap items-center justify-center gap-3.5;
}

.cta-primary {
  @apply rounded-lg bg-zinc-50 hover:bg-white text-zinc-950 text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer border border-zinc-50;
}

.cta-secondary {
  @apply rounded-lg border border-zinc-800 hover:border-zinc-600 bg-zinc-950/60 hover:bg-zinc-900/80 text-zinc-300 hover:text-zinc-50 text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer backdrop-blur-sm;
}
</style>