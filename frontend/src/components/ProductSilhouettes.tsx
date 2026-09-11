export function ProductSilhouettes() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 680 430" style={{ position: 'absolute', top: 0, left: 0 }}>
      <g opacity={0.16} stroke="#EAF3DE" strokeWidth={1.6} fill="none">
        <g transform="translate(48,40) rotate(-8)">
          <path d="M0 30 C-14 10 -8 -8 12 -6 C18 -18 34 -18 38 -6 C58 -8 62 12 46 30 C50 48 34 58 24 48 C14 58 -4 48 0 30Z" />
          <circle cx="16" cy="14" r="2" fill="#EAF3DE" />
          <circle cx="30" cy="14" r="2" fill="#EAF3DE" />
        </g>
        <g transform="translate(560,70) rotate(10)">
          <rect x="0" y="0" width="46" height="80" rx="10" />
          <line x1="0" y1="16" x2="46" y2="16" />
          <circle cx="23" cy="8" r="2.4" fill="#EAF3DE" />
          <path d="M8 40 L20 55 L38 30" opacity={0.5} />
        </g>
        <g transform="translate(90,290) rotate(6)">
          <circle cx="0" cy="0" r="26" />
          <path d="M-14 -4 Q0 -18 14 -4 Q4 -2 0 6 Q-4 -2 -14 -4Z" fill="#EAF3DE" opacity={0.5} />
        </g>
        <g transform="translate(600,320) rotate(-12)">
          <rect x="-24" y="-38" width="48" height="76" rx="9" />
          <line x1="-24" y1="-22" x2="24" y2="-22" />
          <path d="M-10 6 L2 20 L18 -8" opacity={0.5} />
        </g>
        <g transform="translate(340,60) rotate(4)">
          <path d="M0 26 C-12 10 -6 -6 10 -4 C16 -16 30 -16 34 -4 C52 -6 56 10 42 26 C46 42 32 50 22 42 C12 50 -4 42 0 26Z" />
        </g>
      </g>
    </svg>
  );
}