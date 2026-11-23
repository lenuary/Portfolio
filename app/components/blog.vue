<script setup lang="ts">
const { posts } = useBlog()
</script>

<template>
  <UPageSection
    id="blog"
    title="Latest Articles"
    description="Some of my recent thoughts & technical notes."
    :ui="{
      root: 'bg-transparent scroll-mt-24 py-12 sm:py-16',
      container: 'max-w-3xl',
      header: 'mb-7',
      title: 'text-xl sm:text-2xl font-medium tracking-tight text-zinc-50',
      description: 'text-xs sm:text-sm text-zinc-400 mt-1'
    }"
  >
    <template #links>
      <UButton
        to="/blog"
        color="neutral"
        variant="link"
        trailing-icon="i-lucide-arrow-right"
        label="All posts"
        size="xs"
        class="text-zinc-400 hover:text-zinc-100 px-0"
      />
    </template>

    <div class="articles-list">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="article-row group"
      >
        <time class="article-date">
          {{ post.publishedAt }}
        </time>

        <h3 class="article-title">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>

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

.articles-list {
  @apply flex flex-col divide-y divide-zinc-800/70;
}

.article-row {
  @apply py-5 first:pt-1 last:pb-1 flex flex-col items-start gap-1;
}

.article-date {
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