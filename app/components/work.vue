<script setup lang="ts">
interface WorkArea {
  title: string
  description: string
  icon: string
  tags: readonly string[]
}

const areas: readonly WorkArea[] = [
  {
    title: 'Web & Applications',
    description:
      'Building modern websites and web applications with a focus on clear UI hierarchy, responsiveness, and maintainable TypeScript code.',
    icon: 'i-lucide-terminal',
    tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Interactive & Backend',
    description:
      'Connecting frontend interfaces with APIs, relational and NoSQL databases, and interactive 3D scenes.',
    icon: 'i-lucide-cpu',
    tags: ['Python', 'Three.js', 'REST APIs', 'Databases']
  },
  {
    title: '2D & 3D Visuals',
    description:
      'Designing interface mockups, product graphics, and 3D assets to support cohesive digital products.',
    icon: 'i-lucide-box',
    tags: ['Photoshop', 'Blender', 'Cinema 4D']
  }
]

// Non-uniform stagger (ms) for the one-time entrance.
const delays = [0, 60, 110] as const

const grid = ref<HTMLElement | null>(null)
// SSR renders cards visible; we only hide them on the client when the grid is
// still below the fold, so there is never a flash of missing content.
const pending = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = grid.value
  if (!el || !('IntersectionObserver' in window)) return
  if (el.getBoundingClientRect().top < window.innerHeight) return

  pending.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      pending.value = false
      observer?.disconnect()
    },
    { rootMargin: '0px 0px -80px 0px' }
  )
  observer.observe(el)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <UPageSection
    id="scope"
    title="Scope of work"
    description="End-to-end support across frontend engineering, application logic, and visual assets—from initial wireframes to production."
    :ui="{
      root: 'bg-transparent scroll-mt-24',
      container: 'max-w-5xl',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400'
    }"
  >
    <div
      ref="grid"
      class="scope-grid grid grid-cols-1 gap-6 md:grid-cols-3"
      :data-pending="pending || undefined"
    >
      <div
        v-for="(area, index) in areas"
        :key="area.title"
        class="scope-item flex"
        :style="{ '--stagger': `${delays[index] ?? 0}ms` }"
      >
        <serviceCard
          :title="area.title"
          :description="area.description"
          :icon="area.icon"
          :tags="area.tags"
        />
      </div>
    </div>
  </UPageSection>
</template>