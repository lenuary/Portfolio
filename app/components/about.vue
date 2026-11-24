<template>
  <section
    id="about"
    class="w-full scroll-mt-24 bg-transparent"
    aria-labelledby="hero-about-title"
  >
    <div
      class="mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-24 text-center sm:px-10 sm:pt-28"
    >
      <p
        class="mb-4 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase motion-safe:animate-[aboutFadeIn_0.95s_cubic-bezier(0.22,1,0.36,1)_both]"
        style="animation-delay: 0.15s"
      >
        Web Developer &amp; Visual Builder
      </p>

      <h1
        id="hero-about-title"
        class="mb-6 text-4xl leading-[1.1] font-medium tracking-tight text-zinc-50 sm:text-6xl motion-safe:animate-[aboutFadeIn_0.95s_cubic-bezier(0.22,1,0.36,1)_both]"
        style="animation-delay: 0.3s"
      >
        Hello, I am Łukasz
      </h1>

      <p
        class="mb-9 max-w-2xl text-base leading-relaxed font-normal text-zinc-400 sm:text-lg motion-safe:animate-[aboutFadeIn_0.95s_cubic-bezier(0.22,1,0.36,1)_both]"
        style="animation-delay: 0.45s"
      >
        I'm a web developer working with Vue 3, Nuxt, TypeScript, JavaScript,
        Three.js, and Python. Alongside personal and academic software projects,
        I work with 2D and 3D tools including Photoshop, Cinema 4D, and
        Blender—focusing on clean architecture and practical web solutions.
      </p>

      <div
        class="flex flex-wrap items-center justify-center gap-3.5 motion-safe:animate-[aboutFadeIn_0.95s_cubic-bezier(0.22,1,0.36,1)_both]"
        style="animation-delay: 0.6s"
      >
        <UButton
          to="/#scope"
          color="neutral"
          variant="solid"
          label="How can I help?"
          class="cursor-pointer rounded-lg border border-zinc-50 bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
        />

        <UButton
          to="/#contact"
          color="neutral"
          variant="outline"
          label="Get in touch"
          class="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-950/60 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-600 hover:bg-zinc-900/80 hover:text-zinc-50"
        />
      </div>
    </div>
  </section>
</template>
