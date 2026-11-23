<script setup lang="ts">
const { posts } = useBlog()

useSeoMeta({
  title: 'Blog — Łukasz',
  description: 'Technical articles, development notes, and project write-ups.'
})
</script>

<template>
  <UPageSection
    title="Blog"
    description="All articles and technical notes. This page serves as a clean foundation for future posts."
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      header: 'items-start text-left',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400'
    }"
  >
    <template #headline>
      <div class="blog-top-actions">
        <UButton
          to="/#blog"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-arrow-left"
          label="Blog section"
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

    <div class="articles-list">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="article-row group"
      >
        <div class="article-meta">
          <time class="article-date">{{ post.publishedAt }}</time>
          <span class="article-sep">·</span>
          <span class="article-date">{{ post.readTime }}</span>
        </div>

        <h2 class="article-title">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h2>

        <p class="article-excerpt">
          {{ post.excerpt }}
        </p>

        <div class="article-cta">
          <UButton
            :to="`/blog/${post.slug}`"
            color="neutral"
            variant="link"
            label="Read Article"
            size="xs"
            class="read-link"
          />
        </div>
      </article>
    </div>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.blog-top-actions {
  @apply flex items-center gap-2;
}

.articles-list {
  @apply flex flex-col divide-y divide-zinc-800/70;
}

.article-row {
  @apply py-5 first:pt-1 last:pb-1 flex flex-col items-start gap-1;
}

.article-meta {
  @apply flex items-center gap-1.5;
}

.article-date,
.article-sep {
  @apply text-xs text-zinc-500 font-normal;
}

.article-title {
  @apply text-base sm:text-lg font-medium text-zinc-100 group-hover:text-white transition-colors leading-snug;
}

.article-excerpt {
  @apply text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mt-0.5;
}

.article-cta {
  @apply mt-1.5;
}

.read-link {
  @apply px-0 py-0 text-xs font-normal text-zinc-300 hover:text-white underline-offset-4 group-hover:underline;
}
</style>