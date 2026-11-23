<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  scaleMultiplier?: number
}

const props = withDefaults(defineProps<Props>(), {
  scaleMultiplier: 0.03
})

const { projects } = useProjects()
const sectionRef = ref<HTMLElement | null>(null)
const progress = ref(0)
let rafId: number | null = null

const updateScrollProgress = () => {
  rafId = null
  const el = sectionRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const totalDistance = rect.height - window.innerHeight * 0.4

  if (totalDistance <= 0) {
    progress.value = 0
    return
  }

  const clamped = Math.min(Math.max(-rect.top, 0), totalDistance)
  progress.value = clamped / totalDistance
}

const onScroll = () => {
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(updateScrollProgress)
}

onMounted(() => {
  updateScrollProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
  }
})

const getCardStyle = (index: number) => {
  const total = projects.length
  const step = 1 / total
  const start = index * step
  const localProgress = Math.max(0, Math.min(1, (progress.value - start) / step))
  const scale = 1 - (total - 1 - index) * props.scaleMultiplier * localProgress

  return {
    top: `${84 + index * 18}px`,
    zIndex: index + 10,
    transform: `scale(${scale.toFixed(4)})`
  }
}
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="projects-section"
    aria-labelledby="projects-heading"
  >
    <div class="projects-header">
      <h2 id="projects-heading" class="projects-title">
        Selected projects
      </h2>
      <p class="projects-subtitle">
        A selection of web applications, scheduling tools, and interactive 3D builds.
      </p>
    </div>

    <div class="projects-stack">
      <div
        v-for="(project, index) in projects"
        :key="project.slug"
        class="stack-card-wrap"
        :style="getCardStyle(index)"
      >
        <NuxtLink
          :to="`/projects/${project.slug}`"
          :class="[project.cardBg, 'project-card group']"
        >
          <div class="card-text">
            <h3 class="card-heading">
              {{ project.title }}
            </h3>
            <p class="card-desc">
              {{ project.summary }}
            </p>
            <span class="card-link">
              View project →
            </span>
          </div>

          <div class="card-image-box">
            <img
              :src="project.image"
              :alt="project.title"
              width="800"
              height="450"
              loading="lazy"
              class="card-image"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.projects-section {
  @apply max-w-5xl mx-auto px-4 sm:px-6 py-24 scroll-mt-24;
}

.projects-header {
  @apply mb-10 px-2;
}

.projects-title {
  @apply text-2xl sm:text-3xl font-medium tracking-tight text-zinc-50;
}

.projects-subtitle {
  @apply text-sm sm:text-base text-zinc-400 mt-2;
}

.projects-stack {
  @apply flex flex-col gap-10 pb-24;
}

.stack-card-wrap {
  @apply sticky transition-transform duration-150 ease-out will-change-transform;
}

.project-card {
  @apply relative mx-auto flex w-full flex-col justify-between gap-6 rounded-2xl px-8 py-9 shadow-2xl sm:flex-row transition-colors hover:border-zinc-500 backdrop-blur-md;
}

.card-text {
  @apply flex flex-1 flex-col justify-center;
}

.card-heading {
  @apply mb-3 text-xl sm:text-2xl font-medium text-zinc-50;
}

.card-desc {
  @apply text-sm sm:text-base text-zinc-300 leading-relaxed mb-6;
}

.card-link {
  @apply text-xs uppercase tracking-widest text-zinc-400 group-hover:text-zinc-50 transition-colors font-mono;
}

.card-image-box {
  @apply relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 sm:w-5/12 self-center shrink-0;
}

.card-image {
  @apply absolute inset-0 size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300;
}
</style>