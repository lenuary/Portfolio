<script setup lang="ts">
const { projects } = useProjects()

type ProjectItem = (typeof projects)[number]

interface Props {
  project: ProjectItem
}

defineProps<Props>()
</script>

<template>
  <aside class="lg:sticky lg:top-24 lg:col-span-4">
    <UPageCard
      :ui="{
        root: 'bg-zinc-950/75 border-zinc-800/80 backdrop-blur-md rounded-xl'
      }"
      variant="outline"
    >
      <div class="flex flex-col gap-4">
        <div v-if="project.liveUrl || project.githubUrl" class="flex flex-col gap-2.5">
          <UButton
            v-if="project.liveUrl"
            :to="project.liveUrl"
            block
            color="neutral"
            label="Visit project"
            rel="noopener noreferrer"
            target="_blank"
            trailing-icon="i-lucide-arrow-up-right"
            variant="solid"
          />

          <UButton
            v-if="project.githubUrl"
            :to="project.githubUrl"
            block
            color="neutral"
            icon="i-lucide-github"
            label="Source code"
            rel="noopener noreferrer"
            target="_blank"
            variant="outline"
          />
        </div>

        <USeparator v-if="project.liveUrl || project.githubUrl" />

        <dl v-if="project.role || project.timeline || project.status" class="flex flex-col gap-2.5 text-sm">
          <div v-if="project.role" class="flex items-center justify-between gap-2">
            <dt class="text-zinc-500">Role</dt>
            <dd class="font-medium text-zinc-200">{{ project.role }}</dd>
          </div>
          <div v-if="project.timeline" class="flex items-center justify-between gap-2">
            <dt class="text-zinc-500">Year</dt>
            <dd class="font-medium text-zinc-200">{{ project.timeline }}</dd>
          </div>
          <div v-if="project.status" class="flex items-center justify-between gap-2">
            <dt class="text-zinc-500">Status</dt>
            <dd class="font-medium text-zinc-200">{{ project.status }}</dd>
          </div>
        </dl>

        <USeparator v-if="project.role || project.timeline || project.status" />

        <div class="flex flex-col gap-2">
          <span class="text-xs tracking-wider text-zinc-500 uppercase">Tech stack</span>
          <div class="flex flex-wrap gap-1.5">
            <UBadge
              v-for="tech in project.stack"
              :key="tech"
              :label="tech"
              class="border-zinc-800 bg-zinc-900/70 text-zinc-300"
              color="neutral"
              size="xs"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </UPageCard>
  </aside>
</template>