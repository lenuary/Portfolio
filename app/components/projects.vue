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
    class="mx-auto max-w-5xl scroll-mt-24 px-4 py-24 sm:px-6"
    aria-labelledby="projects-heading"
  >
    <div class="mb-10 px-2">
      <h2 id="projects-heading" class="text-2xl font-medium tracking-tight text-zinc-50 sm:text-3xl">
        Selected projects
      </h2>
      <p class="mt-2 text-sm text-zinc-400 sm:text-base">
        A selection of web applications, scheduling tools, and interactive 3D builds.
      </p>
    </div>

    <div class="flex flex-col gap-10 pb-24">
      <div
        v-for="(project, index) in projects"
        :key="project.slug"
        class="sticky transition-transform duration-150 ease-out will-change-transform"
        :style="getCardStyle(index)"
      >
        <NuxtLink
          :to="`/projects/${project.slug}`"
          :class="[
            project.cardBg,
            'group relative mx-auto flex w-full flex-col justify-between gap-6 rounded-2xl px-8 py-9 shadow-2xl backdrop-blur-md transition-colors hover:border-zinc-500 sm:flex-row'
          ]"
        >
          <div class="flex flex-1 flex-col justify-center">
            <h3 class="mb-3 text-xl font-medium text-zinc-50 sm:text-2xl">
              {{ project.title }}
            </h3>
            <p class="mb-6 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {{ project.summary }}
            </p>
            <span class="font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-zinc-50">
              View project →
            </span>
          </div>

          <div class="relative aspect-video w-full shrink-0 self-center overflow-hidden rounded-xl border border-zinc-800 sm:w-5/12">
            <img
              :src="project.image"
              :alt="project.title"
              width="800"
              height="450"
              loading="lazy"
              class="absolute inset-0 size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>