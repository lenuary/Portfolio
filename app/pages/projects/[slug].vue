<script setup lang="ts">
const route = useRoute()
const { projects, getProjectBySlug } = useProjects()

const slug = computed(() =>
  Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
)
const project = computed(() => getProjectBySlug(slug.value))

const nextProject = computed(() => {
  if (!project.value || projects.length <= 1) return undefined
  const idx = projects.findIndex((item) => item.slug === project.value?.slug)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
})

useSeoMeta({
  title: () =>
    project.value ? `${project.value.title} — Projects` : 'Project Not Found',
  description: () => project.value?.summary ?? 'Project details'
})
</script>

<template>
  <UPageSection
    v-if="project"
    :description="project.summary"
    :title="project.title"
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-5xl',
      header: 'items-start text-left',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400 max-w-3xl'
    }"
  >
    <template #headline>
      <div class="project-top-nav">
        <UButton color="neutral" icon="i-lucide-arrow-left" label="All projects" size="xs" to="/projects" variant="ghost"/>

        <UButton color="neutral" icon="i-lucide-home" label="Home" size="xs" to="/" variant="ghost"/>
      </div>
    </template>

    <div class="project-preview-frame">
      <img
        :src="project.image"
        :alt="project.title"
        class="project-preview-img"
      />
    </div>

    <div class="project-layout">
      <article class="project-main">
        <p class="project-lead">
          {{ project.details }}
        </p>

        <section
          v-for="section in project.sections"
          :key="section.heading"
          class="project-section"
        >
          <h2 class="project-section-heading">
            {{ section.heading }}
          </h2>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
            class="project-paragraph"
          >
            {{ paragraph }}
          </p>
        </section>

        <USeparator/>

        <section class="project-section">
          <h2 class="project-section-heading">Key deliverables</h2>
          <ul class="project-highlights">
            <li v-for="item in project.highlights" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>
      </article>

      <aside class="project-sidebar">
        <UPageCard :ui="{
            root: 'bg-zinc-950/75 border-zinc-800/80 backdrop-blur-md rounded-xl'
          }" variant="outline">
          <div class="sidebar-stack">
            <div class="sidebar-actions">
              <UButton :to="project.liveUrl" block color="neutral" label="Visit project" rel="noopener noreferrer" target="_blank" trailing-icon="i-lucide-arrow-up-right" v-if="project.liveUrl" variant="solid"/>

              <UButton :to="project.githubUrl" block color="neutral" icon="i-lucide-github" label="Source code" rel="noopener noreferrer" target="_blank" v-if="project.githubUrl" variant="outline"/>
            </div>

            <USeparator/>

            <dl class="sidebar-meta">
              <div v-if="project.role" class="meta-row">
                <dt>Role</dt>
                <dd>{{ project.role }}</dd>
              </div>
              <div v-if="project.timeline" class="meta-row">
                <dt>Year</dt>
                <dd>{{ project.timeline }}</dd>
              </div>
              <div v-if="project.status" class="meta-row">
                <dt>Status</dt>
                <dd>{{ project.status }}</dd>
              </div>
            </dl>

            <USeparator/>

            <div class="sidebar-tech">
              <span class="sidebar-label">Tech stack</span>
              <div class="sidebar-badges">
                <UBadge :key="tech" :label="tech" class="project-tech-badge" color="neutral" size="xs" v-for="tech in project.stack" variant="outline"/>
              </div>
            </div>
          </div>
        </UPageCard>
      </aside>
    </div>

    <div v-if="nextProject" class="project-next">
      <UButton :label="`Next project: ${nextProject.title}`" :to="`/projects/${nextProject.slug}`" color="neutral" trailing-icon="i-lucide-arrow-right" variant="ghost"/>
    </div>
  </UPageSection>

  <UPageSection
    v-else
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      header: 'items-start text-left',
      title: 'text-zinc-50',
      description: 'text-zinc-400'
    }"
    description="The requested project could not be found."
    icon="i-lucide-file-question"
    title="Project not found"
  >
    <template #headline>
      <div class="project-top-nav">
        <UButton color="neutral" icon="i-lucide-arrow-left" label="All projects" to="/projects" variant="solid"/>

        <UButton color="neutral" icon="i-lucide-home" label="Home" to="/" variant="ghost"/>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.project-top-nav {
  @apply flex items-center gap-2;
}

.project-preview-frame {
  @apply aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 mb-8;
}

.project-preview-img {
  @apply size-full object-cover;
}

.project-layout {
  @apply grid grid-cols-1 lg:grid-cols-12 gap-8 items-start;
}

.project-main {
  @apply lg:col-span-8 flex flex-col gap-7;
}

.project-lead {
  @apply text-base sm:text-lg text-zinc-200 leading-relaxed;
}

.project-section {
  @apply flex flex-col gap-3;
}

.project-section-heading {
  @apply text-lg font-medium text-zinc-100 tracking-tight;
}

.project-paragraph {
  @apply text-sm sm:text-base text-zinc-400 leading-relaxed;
}

.project-highlights {
  @apply list-disc list-inside space-y-2 text-sm text-zinc-300;
}

.project-sidebar {
  @apply lg:col-span-4 lg:sticky lg:top-24;
}

.sidebar-stack {
  @apply flex flex-col gap-4;
}

.sidebar-actions {
  @apply flex flex-col gap-2.5;
}

.sidebar-meta {
  @apply flex flex-col gap-2.5 text-sm;
}

.meta-row {
  @apply flex items-center justify-between gap-2;
}

.meta-row dt {
  @apply text-zinc-500;
}

.meta-row dd {
  @apply text-zinc-200 font-medium;
}

.sidebar-tech {
  @apply flex flex-col gap-2;
}

.sidebar-label {
  @apply text-xs uppercase tracking-wider text-zinc-500;
}

.sidebar-badges {
  @apply flex flex-wrap gap-1.5;
}

.project-tech-badge {
  @apply border-zinc-800 bg-zinc-900/70 text-zinc-300;
}

.project-next {
  @apply flex justify-end mt-10 pt-6 border-t border-zinc-800/80;
}
</style>