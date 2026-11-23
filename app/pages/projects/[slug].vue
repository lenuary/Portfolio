<script setup lang="ts">
const route = useRoute()
const { getProjectBySlug } = useProjects()

const slug = computed(() =>
  Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
)
const project = computed(() => getProjectBySlug(slug.value))

useSeoMeta({
  title: () =>
    project.value ? `${project.value.title} — Projects` : 'Project Not Found',
  description: () => project.value?.summary ?? 'Project details'
})
</script>

<template>
  <UPageSection
    v-if="project"
    :title="project.title"
    :description="project.summary"
    :icon="project.icon"
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-4xl',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400'
    }"
  >
    <div class="project-top-nav">
      <UButton
        to="/projects"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-arrow-left"
        label="All projects"
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

    <div class="project-body">
      <div class="project-badges">
        <UBadge
          v-for="tech in project.stack"
          :key="tech"
          :label="tech"
          color="neutral"
          variant="outline"
          size="sm"
          class="project-tech-badge"
        />
      </div>

      <p class="project-description">
        {{ project.details }}
      </p>

      <div class="project-actions">
        <UButton
          v-if="project.githubUrl"
          :to="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-lucide-github"
          color="neutral"
          variant="solid"
          label="View on GitHub"
        />

        <UButton
          v-if="project.liveUrl"
          :to="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-lucide-external-link"
          color="neutral"
          variant="outline"
          label="Live preview"
        />
      </div>

      <USeparator class="project-separator" />

      <UPageCard
        title="Key highlights"
        description="Core technical deliverables and architectural details."
        icon="i-lucide-check-circle-2"
        variant="outline"
        :ui="{
          root: 'bg-zinc-950/65 border-zinc-800/80 backdrop-blur-sm',
          leadingIcon: 'text-zinc-300',
          title: 'text-zinc-100',
          description: 'text-zinc-400'
        }"
      >
        <ul class="project-highlights">
          <li
            v-for="item in project.highlights"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </UPageCard>
    </div>
  </UPageSection>

  <UPageSection
    v-else
    title="Project not found"
    description="The requested project could not be found."
    icon="i-lucide-file-question"
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      title: 'text-zinc-50',
      description: 'text-zinc-400'
    }"
  >
    <div class="project-top-nav">
      <UButton
        to="/projects"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="solid"
        label="All projects"
      />

      <UButton
        to="/"
        icon="i-lucide-home"
        color="neutral"
        variant="ghost"
        label="Home"
      />
    </div>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.project-top-nav {
  @apply flex items-center gap-2 mb-6;
}

.project-body {
  @apply flex flex-col gap-6;
}

.project-badges {
  @apply flex flex-wrap gap-2;
}

.project-tech-badge {
  @apply border-zinc-800 bg-zinc-900/70 text-zinc-300;
}

.project-description {
  @apply text-base text-zinc-300 leading-relaxed max-w-3xl;
}

.project-actions {
  @apply flex flex-wrap items-center gap-3;
}

.project-separator {
  @apply my-2;
}

.project-highlights {
  @apply list-disc list-inside space-y-2 text-sm text-zinc-300;
}
</style>