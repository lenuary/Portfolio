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

const sectionRef = ref<HTMLElement | { $el?: HTMLElement } | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const el = sectionRef.value instanceof HTMLElement
    ? sectionRef.value
    : sectionRef.value?.$el
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(el)

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <UPageSection
    ref="sectionRef"
    id="scope"
    title="Scope of work"
    description="End-to-end support across frontend engineering, application logic, and visual assets—from initial wireframes to production."
    :ui="{
      root: 'bg-transparent scroll-mt-24',
      container: 'max-w-5xl',
      title: `text-zinc-50 font-medium tracking-tight scope-reveal ${isVisible ? 'is-visible' : ''}`,
      description: `text-zinc-400 scope-reveal ${isVisible ? 'is-visible' : ''}`
    }"
  >
    <UPageGrid class="work-grid">
      <UPageCard
        v-for="(area, index) in areas"
        :key="area.title"
        :title="area.title"
        :description="area.description"
        :icon="area.icon"
        variant="outline"
        :class="['scope-card-reveal', { 'is-visible': isVisible }]"
        :style="isVisible ? { animationDelay: `${0.2 + index * 0.12}s` } : undefined"
        :ui="{
          root: 'bg-zinc-950/65 border-zinc-800/80 hover:border-zinc-700 transition-colors backdrop-blur-sm',
          leadingIcon: 'text-zinc-300 size-5',
          title: 'text-zinc-100 font-medium',
          description: 'text-zinc-400 text-sm leading-relaxed'
        }"
      >
        <template #footer>
          <div class="work-tags">
            <UBadge
              v-for="tag in area.tags"
              :key="tag"
              :label="tag"
              color="neutral"
              variant="outline"
              size="xs"
              class="work-badge"
            />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

@keyframes scopeFadeUp {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.scope-reveal) {
  opacity: 0;
}

:deep(.scope-reveal.is-visible) {
  animation: scopeFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

:deep(.scope-reveal.is-visible:nth-child(2)) {
  animation-delay: 0.12s;
}

.scope-card-reveal {
  opacity: 0;
}

.scope-card-reveal.is-visible {
  animation: scopeFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.work-grid {
  @apply grid-cols-1 md:grid-cols-3 gap-5;
}

.work-tags {
  @apply flex flex-wrap gap-1.5;
}

.work-badge {
  @apply border-zinc-800 bg-zinc-900/70 text-zinc-300 font-normal;
}
</style>