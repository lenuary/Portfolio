<script setup lang="ts">
const { projects } = useProjects();

useSeoMeta({
  title: "Projects",
  description:
    "All web applications, scheduling tools, and interactive 3D projects.",
});
</script>

<template>
  <UPageSection
    title="Projects"
    description="All selected builds, web applications, and 3D prototypes in one place."
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-5xl',
      header: 'items-start text-left',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400',
    }"
  >
    <template #headline>
      <div class="projects-top-nav">
        <UButton
          to="/#projects"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-arrow-left"
          label="Projects section"
        />
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-home"
          label="Home"
        />
      </div>
    </template>

    <UPageGrid class="projects-index-grid">
      <UPageCard
        v-for="project in projects"
        :key="project.slug"
        :title="project.title"
        :description="project.summary"
        :to="`/projects/${project.slug}`"
        variant="outline"
        :ui="{
          root: 'bg-zinc-950/75 border-zinc-800/80 hover:border-zinc-600 transition-colors backdrop-blur-md rounded-xl',
          leadingIcon: 'text-zinc-300',
          title: 'text-zinc-100 font-medium',
          description: 'text-zinc-400 text-sm leading-relaxed',
        }"
      >
        <template #footer>
          <div class="project-card-stack">
            <UBadge
              v-for="tech in project.stack"
              :key="tech"
              :label="tech"
              color="neutral"
              variant="outline"
              size="xs"
              class="project-stack-badge"
            />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.projects-top-nav {
  @apply flex items-center gap-2;
}

.projects-index-grid {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5;
}

.project-card-stack {
  @apply flex flex-wrap gap-1.5;
}

.project-stack-badge {
  @apply border-zinc-800 bg-zinc-900/70 text-zinc-300 font-normal;
}
</style>