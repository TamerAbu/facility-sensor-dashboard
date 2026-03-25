export const ChartGradients = () => (
  <defs>
    <linearGradient id="temp-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#ff6b6b" />
      <stop offset="50%" stopColor="#ee5a24" />
      <stop offset="100%" stopColor="#f0932b" />
    </linearGradient>
    <linearGradient id="moist-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#4facfe" />
      <stop offset="50%" stopColor="#00f2fe" />
      <stop offset="100%" stopColor="#43e97b" />
    </linearGradient>
    <linearGradient id="temp-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#f0932b" stopOpacity="0.02" />
    </linearGradient>
    <linearGradient id="moist-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4facfe" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#43e97b" stopOpacity="0.02" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <radialGradient id="pie-temp" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ff6b6b" />
      <stop offset="100%" stopColor="#ee5a24" />
    </radialGradient>
    <radialGradient id="pie-moist" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#4facfe" />
      <stop offset="100%" stopColor="#00f2fe" />
    </radialGradient>
    <radialGradient id="pie-empty" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="rgba(0,0,0,0.04)" />
      <stop offset="100%" stopColor="rgba(0,0,0,0.01)" />
    </radialGradient>
  </defs>
);
