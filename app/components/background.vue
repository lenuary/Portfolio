<template>
  <div class="global-bg-container" aria-hidden="true">
    <div class="pattern-overlay" />
    <svg
      preserveAspectRatio="xMidYMid slice"
      class="cube-svg animate-infiniteScrollX"
      viewBox="0 0 120 104"
    >
      <defs>
        <linearGradient id="cube-dark" y2="100%" x2="100%" y1="0%" x1="0%">
          <stop stop-color="#16191d" offset="0%" />
          <stop stop-color="#22272e" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="url(#cube-dark)" stroke="#2b313a" stroke-width="0.3">
        <path
          d="M60 0 L90 17.32 L90 51.96 L60 69.28 L30 51.96 L30 17.32 Z"
          opacity="0.5"
        />
        <path
          d="M0 51.96 L30 69.28 L30 103.92 L0 121.24 L-30 103.92 L-30 69.28 Z"
          opacity="0.3"
        />
        <path
          d="M120 51.96 L150 69.28 L150 103.92 L120 121.24 L90 103.92 L90 69.28 Z"
          opacity="0.3"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.global-bg-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0f1115;
  z-index: 0;
  pointer-events: none;
}

.pattern-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(#22272e 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.25;
}

.cube-svg {
  position: absolute;
  left: -100%;
  top: 0;
  height: 100%;
  width: 300%;
  opacity: 0.35;
}

@keyframes infiniteScrollX {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(33.333%);
  }
}

.animate-infiniteScrollX {
  animation: infiniteScrollX 35s linear infinite;
}
</style>