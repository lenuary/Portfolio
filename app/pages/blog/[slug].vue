<script setup lang="ts">
const route = useRoute()
const { getPostBySlug } = useBlog()

const slug = computed(() =>
  Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
)
const post = computed(() => getPostBySlug(slug.value))

useSeoMeta({
  title: () => (post.value ? `${post.value.title} — Blog` : 'Article Not Found'),
  description: () => post.value?.excerpt ?? 'Blog article'
})
</script>

<template>
  <UPageSection
    v-if="post"
    :title="post.title"
    :description="`${post.publishedAt} · ${post.readTime}`"
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400 font-mono text-xs'
    }"
  >
    <div class="post-top-nav">
      <UButton
        to="/blog"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-arrow-left"
        label="All posts"
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

    <article class="post-article">
      <UBadge
        :label="post.tag"
        color="neutral"
        variant="outline"
        size="sm"
        class="self-start"
      />

      <p class="post-lead">
        {{ post.excerpt }}
      </p>

      <USeparator />

      <p class="post-body">
        {{ post.content }}
      </p>
    </article>
  </UPageSection>

  <UPageSection
    v-else
    title="Article not found"
    description="The requested article could not be found."
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      title: 'text-zinc-50',
      description: 'text-zinc-400'
    }"
  >
    <div class="post-top-nav">
      <UButton
        to="/blog"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="solid"
        label="All posts"
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

.post-top-nav {
  @apply flex items-center gap-2 mb-6;
}

.post-article {
  @apply flex flex-col gap-5;
}

.post-lead {
  @apply text-base sm:text-lg text-zinc-200 leading-relaxed;
}

.post-body {
  @apply text-sm sm:text-base text-zinc-400 leading-relaxed;
}
</style>