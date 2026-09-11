export function LemonLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <ellipse cx="32" cy="35" rx="24" ry="19" fill="#E0C400" />
      <path d="M8 35c0-2.5 2.5-4 5-3 2 .8 2 5.2 0 6-2.5 1-5-.5-5-3Z" fill="#E0C400" />
      <path d="M56 35c0-2.5-2.5-4-5-3-2 .8-2 5.2 0 6 2.5 1 5-.5 5-3Z" fill="#E0C400" />
      <ellipse cx="32" cy="35" rx="24" ry="19" fill="#F5D800" />
      <ellipse cx="24" cy="27" rx="9" ry="5" fill="#FFF1A8" opacity="0.55" transform="rotate(-24 24 27)" />
      <path d="M27 35c1.5-1.5 8.5-1.5 10 0" stroke="#D9BE00" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M18 32c2-1 5.5-1 7.5 0" stroke="#D9BE00" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M32 17c2-6 9-9 14-7-4 6-9 9-14 7Z" fill="#3B8C4A" />
      <path d="M32 17c1.5-4 5.5-6 9-5.4-2.5 4-6 6-9 5.4Z" fill="#2C6B39" opacity="0.7" />
    </svg>
  );
}