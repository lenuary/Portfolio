<template>
  <UApp class="app-root">
    <Background />

    <div class="app-shell">
      <Header />

      <main class="app-main">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.app-root {
  @apply bg-transparent;
}

.app-shell {
  @apply relative z-10 min-h-screen bg-transparent text-zinc-100;
}

.app-main {
  @apply w-full bg-transparent;
}
</style>