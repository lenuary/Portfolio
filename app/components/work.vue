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
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        v-for="area in areas"
        :key="area.title"
        class="flex justify-center"
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