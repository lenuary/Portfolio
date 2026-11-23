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
    <UPageGrid class="work-grid">
      <UPageCard
        v-for="area in areas"
        :key="area.title"
        :title="area.title"
        :description="area.description"
        :icon="area.icon"
        variant="outline"
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