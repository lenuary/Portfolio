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
      <div class="flex items-center gap-2">
        <UButton color="neutral" icon="i-lucide-arrow-left" label="All projects" size="xs" to="/projects" variant="ghost" />

        <UButton color="neutral" icon="i-lucide-home" label="Home" size="xs" to="/" variant="ghost" />
      </div>
    </template>

    <div class="mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <img
        :src="project.image"
        :alt="project.title"
        class="size-full object-cover"
      />
    </div>

    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <article class="flex flex-col gap-7 lg:col-span-8">
        <p class="text-base leading-relaxed text-zinc-200 sm:text-lg">
          {{ project.details }}
        </p>

        <section
          v-for="section in project.sections"
          :key="section.heading"
          class="flex flex-col gap-3"
        >
          <h2 class="text-lg font-medium tracking-tight text-zinc-100">
            {{ section.heading }}
          </h2>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
            class="text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            {{ paragraph }}
          </p>
        </section>

        <USeparator />

        <section class="flex flex-col gap-3">
          <h2 class="text-lg font-medium tracking-tight text-zinc-100">Key deliverables</h2>
          <ul class="list-inside list-disc space-y-2 text-sm text-zinc-300">
            <li v-for="item in project.highlights" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>
      </article>

      <ProjectSidebar :project="project" />
    </div>

    <div v-if="nextProject" class="mt-10 flex justify-end border-t border-zinc-800/80 pt-6">
      <UButton
        :label="`Next project: ${nextProject.title}`"
        :to="`/projects/${nextProject.slug}`"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        variant="ghost"
      />
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
      <div class="flex items-center gap-2">
        <UButton color="neutral" icon="i-lucide-arrow-left" label="All projects" to="/projects" variant="solid" />

        <UButton color="neutral" icon="i-lucide-home" label="Home" to="/" variant="ghost" />
      </div>
    </template>
  </UPageSection>
</template>