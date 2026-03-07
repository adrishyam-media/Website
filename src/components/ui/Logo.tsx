export default function Logo({ className, large }: { className?: string; large?: boolean }) {
  const iconSize = large ? 120 : 64;
  return (
    <div className={`flex ${large ? "flex-col items-center gap-4" : "items-center gap-3"} ${className ?? ""}`}>
      {/* Icon mark: D shape + play triangle + orange dots */}
      <svg
        viewBox="0 0 52 52"
        width={iconSize}
        height={iconSize}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        {/* D tube — shadow */}
        <path
          d="M 9,5 L 9,47 L 26,47 Q 47,47 47,26 Q 47,5 26,5 Z"
          stroke="#222"
          strokeWidth="9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* D tube — main silver */}
        <path
          d="M 9,5 L 9,47 L 26,47 Q 47,47 47,26 Q 47,5 26,5 Z"
          stroke="#c8c8c8"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* D tube — top highlight */}
        <path
          d="M 9,5 L 9,47 L 26,47 Q 47,47 47,26 Q 47,5 26,5 Z"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Play triangle — shadow */}
        <path
          d="M 14,15 L 14,37 L 40,26 Z"
          stroke="#222"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Play triangle — main silver */}
        <path
          d="M 14,15 L 14,37 L 40,26 Z"
          stroke="#c0c0c0"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Orange accent dots at triangle vertices */}
        <circle cx="14" cy="15" r="3.5" fill="#E8820C" />
        <circle cx="14" cy="37" r="3.5" fill="#E8820C" />
        <circle cx="40" cy="26" r="3.5" fill="#E8820C" />
      </svg>

      {/* Brand name */}
      <div className={`flex flex-col ${large ? "items-center" : ""} leading-tight`}>
        <span className={`font-display text-cream tracking-wide ${large ? "text-5xl md:text-6xl" : "text-2xl"}`}>
          <span style={{ color: "#E8820C" }}>A</span>drishyam
        </span>
        <span className={`font-sans text-muted tracking-[0.25em] uppercase ${large ? "text-sm mt-1" : "text-xs"}`}>
          media
        </span>
      </div>
    </div>
  );
}
