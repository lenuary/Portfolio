<script setup lang="ts">
const route = useRoute();
const { getPostBySlug } = useBlog();

const slug = computed(() => String(route.params.slug ?? ""));
const post = computed(() => getPostBySlug(slug.value));

useSeoMeta({
  title: () => post.value?.title ?? "Article",
  description: () => post.value?.excerpt ?? "",
});

type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string };

const parsedBlocks = computed<ContentBlock[]>(() => {
  const raw = post.value?.content ?? "";
  if (!raw.trim()) return [];

  const normalized = raw
    .replace(/^\s*###\s+/gm, "\n\n### ")
    .replace(/^\s*##\s+/gm, "\n\n## ");

  return normalized
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("### ")) {
        return { type: "h3", text: chunk.replace(/^###\s+/, "") };
      }
      if (chunk.startsWith("## ")) {
        return { type: "h2", text: chunk.replace(/^##\s+/, "") };
      }
      return { type: "p", text: chunk };
    });
});
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 pt-24 pb-24 sm:px-6">
    <div class="mb-6">
      <UButton
        to="/blog"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-arrow-left"
        label="Back to blog"
      />
    </div>

    <article v-if="post" class="space-y-8">
      <header class="space-y-4 border-b border-zinc-800/80 pb-7">
        <div class="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400">
          <UBadge
            :label="post.tag"
            color="neutral"
            variant="subtle"
            size="xs"
            class="border border-zinc-700/80 bg-zinc-900/90 text-zinc-200"
          />
          <span>{{ post.publishedAt }}</span>
          <span class="text-zinc-600">•</span>
          <span>{{ post.readTime }}</span>
        </div>

        <h1
          class="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
        >
          {{ post.title }}
        </h1>

        <p class="text-base leading-relaxed text-zinc-300 sm:text-lg">
          {{ post.excerpt }}
        </p>
      </header>

      <div class="space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
        <template v-for="(block, index) in parsedBlocks" :key="index">
          <h2
            v-if="block.type === 'h2'"
            class="pt-5 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl"
          >
            {{ block.text }}
          </h2>

          <h3
            v-else-if="block.type === 'h3'"
            class="pt-3 text-base font-medium text-zinc-100 sm:text-lg"
          >
            {{ block.text }}
          </h3>

          <p v-else class="text-zinc-300">
            {{ block.text }}
          </p>
        </template>
      </div>
    </article>

    <div
      v-else
      class="rounded-xl border border-zinc-800 bg-zinc-950/75 p-8 text-center"
    >
      <p class="text-zinc-400">Article not found.</p>
      <UButton
        to="/blog"
        color="neutral"
        variant="outline"
        label="Go to blog"
        class="mt-4"
      />
    </div>
  </section>
</template>
