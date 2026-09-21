type MotifProps = { className?: string };

export function Ladybug({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 72 56" fill="none" aria-hidden>
      <ellipse cx="28" cy="42" rx="5" ry="2.2" fill="#2f4329" opacity=".35" />
      <ellipse cx="48" cy="42" rx="5" ry="2.2" fill="#2f4329" opacity=".35" />
      <path d="M22 40 Q18 28 22 22" stroke="#2f4329" strokeWidth="1.6" />
      <path d="M50 40 Q54 28 50 22" stroke="#2f4329" strokeWidth="1.6" />
      <ellipse cx="36" cy="30" rx="18" ry="14" fill="#c5372a" />
      <path d="M36 16 v28" stroke="#2f4329" strokeWidth="1.5" />
      <circle cx="36" cy="16" r="6" fill="#2f4329" />
      <circle cx="28" cy="26" r="2.3" fill="#2f4329" />
      <circle cx="44" cy="26" r="2.3" fill="#2f4329" />
      <circle cx="27" cy="34" r="2.1" fill="#2f4329" />
      <circle cx="45" cy="34" r="2.1" fill="#2f4329" />
      <path d="M33 11 Q30 4 26 6" stroke="#2f4329" strokeWidth="1.4" />
      <path d="M39 11 Q42 4 46 6" stroke="#2f4329" strokeWidth="1.4" />
      <circle cx="26" cy="6" r="1.4" fill="#2f4329" />
      <circle cx="46" cy="6" r="1.4" fill="#2f4329" />
    </svg>
  );
}

export function LadybugPair({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 140 70" fill="none" aria-hidden>
      <g transform="translate(4,10)">
        <ellipse cx="30" cy="44" rx="18" ry="14" fill="#c5372a" />
        <path d="M30 30 v28" stroke="#2f4329" strokeWidth="1.4" />
        <circle cx="30" cy="29" r="6" fill="#2f4329" />
        <circle cx="23" cy="40" r="2.2" fill="#2f4329" />
        <circle cx="37" cy="40" r="2.2" fill="#2f4329" />
        <circle cx="23" cy="48" r="2" fill="#2f4329" />
        <circle cx="37" cy="48" r="2" fill="#2f4329" />
        <path d="M26 24 Q18 12 14 16" stroke="#2f4329" strokeWidth="1.3" />
        <path d="M34 24 Q38 12 44 14" stroke="#2f4329" strokeWidth="1.3" />
      </g>
      <g transform="translate(68,8) scale(-1,1) translate(-60,0)">
        <ellipse cx="30" cy="44" rx="18" ry="14" fill="#7a5c3a" />
        <path d="M30 30 v28" stroke="#2f4329" strokeWidth="1.4" />
        <circle cx="30" cy="29" r="6" fill="#2f4329" />
        <circle cx="23" cy="40" r="2.2" fill="#ede9df" />
        <circle cx="37" cy="40" r="2.2" fill="#ede9df" />
        <circle cx="23" cy="48" r="2" fill="#ede9df" />
        <circle cx="37" cy="48" r="2" fill="#ede9df" />
        <path d="M26 24 Q18 12 14 16" stroke="#2f4329" strokeWidth="1.3" />
        <path d="M34 24 Q38 12 44 14" stroke="#2f4329" strokeWidth="1.3" />
      </g>
      <path d="M58 48 Q70 40 82 48" stroke="#2f4329" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function Beetle({ className, tone = "chartreuse" }: MotifProps & { tone?: "chartreuse" | "poppy" | "walnut" }) {
  const fill = tone === "poppy" ? "#c5372a" : tone === "walnut" ? "#7a5c3a" : "#c8c840";
  const spots = tone === "chartreuse" ? "#2f4329" : "#ede9df";
  return (
    <svg className={className} viewBox="0 0 70 40" fill="none" aria-hidden>
      <path d="M12 28 Q8 18 14 14" stroke="#2f4329" strokeWidth="1.3" />
      <path d="M12 28 Q8 32 10 36" stroke="#2f4329" strokeWidth="1.3" />
      <path d="M58 28 Q62 18 56 14" stroke="#2f4329" strokeWidth="1.3" />
      <path d="M58 28 Q62 32 60 36" stroke="#2f4329" strokeWidth="1.3" />
      <ellipse cx="36" cy="22" rx="20" ry="11" fill={fill} />
      <ellipse cx="18" cy="22" rx="7" ry="6" fill="#2f4329" />
      <path d="M36 11 v22" stroke="#2f4329" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="1.8" fill={spots} />
      <circle cx="42" cy="18" r="1.8" fill={spots} />
      <circle cx="31" cy="26" r="1.6" fill={spots} />
      <circle cx="43" cy="26" r="1.6" fill={spots} />
    </svg>
  );
}

export function WalkingBug({
  className,
  fill = "#c5372a",
  spots = "#2f4329",
  striped,
}: MotifProps & { fill?: string; spots?: string; striped?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 56 48" fill="none" aria-hidden>
      <path d="M16 34 L8 42" stroke="#2f4329" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 38 L18 47" stroke="#2f4329" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M34 38 L40 47" stroke="#2f4329" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M42 34 L50 41" stroke="#2f4329" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="28" cy="27" rx="17" ry="13.5" fill={fill} />
      {striped ? (
        <>
          <path d="M18 20 q10 6 20 0" stroke="#2f4329" strokeWidth="3" fill="none" />
          <path d="M16 28 q12 7 24 0" stroke="#2f4329" strokeWidth="3" fill="none" />
          <path d="M18 35 q10 5 20 -1" stroke="#2f4329" strokeWidth="3" fill="none" />
        </>
      ) : (
        <>
          <path d="M28 14 v26" stroke="#2f4329" strokeWidth="1.2" />
          <circle cx="21" cy="25" r="2.3" fill={spots} />
          <circle cx="35" cy="24" r="2.1" fill={spots} />
          <circle cx="22" cy="33" r="1.8" fill={spots} />
          <circle cx="36" cy="33" r="2" fill={spots} />
        </>
      )}
      <circle cx="28" cy="13" r="6.8" fill="#2f4329" />
      <path d="M24 8 Q16 0 11 7" stroke="#2f4329" strokeWidth="1.4" fill="none" />
      <path d="M32 7 Q40 1 46 8" stroke="#2f4329" strokeWidth="1.4" fill="none" />
      <circle cx="11" cy="7" r="1.6" fill="#2f4329" />
      <circle cx="46" cy="8" r="1.6" fill="#2f4329" />
    </svg>
  );
}

export function LadybugParade({ className }: MotifProps) {
  return (
    <div className={`bug-parade ${className ?? ""}`} aria-hidden>
      <WalkingBug fill="#c5372a" />
      <WalkingBug fill="#e8a090" spots="#7a5c3a" />
      <WalkingBug fill="#c8c840" striped />
      <WalkingBug fill="#c5372a" />
      <WalkingBug fill="#7a5c3a" spots="#ede9df" />
      <WalkingBug fill="#d46a3a" spots="#2f4329" />
      <WalkingBug fill="#c8c840" striped />
      <WalkingBug fill="#3a4f78" spots="#ede9df" />
      <WalkingBug fill="#c5372a" />
    </div>
  );
}

export function MoonBranch({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" aria-hidden>
      <circle cx="86" cy="28" r="22" fill="#ede9df" />
      <circle cx="80" cy="24" r="5" fill="#e2ddd2" opacity=".7" />
      <path
        d="M6 78 C28 70 40 52 58 48 C74 44 88 58 110 54"
        stroke="#7a5c3a"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="38" cy="58" r="5" fill="#3a4f78" />
      <circle cx="52" cy="50" r="4.5" fill="#3a4f78" />
      <circle cx="66" cy="56" r="5" fill="#2f4329" />
      <circle cx="80" cy="62" r="4" fill="#3a4f78" />
      <path d="M48 52 Q40 40 32 36" stroke="#4a6741" strokeWidth="1.5" />
      <path d="M64 52 Q70 38 78 34" stroke="#4a6741" strokeWidth="1.5" />
    </svg>
  );
}

export function Primrose({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 90 100" fill="none" aria-hidden>
      <path d="M44 96 C42 70 30 58 18 48" stroke="#4a6741" strokeWidth="2" />
      <path d="M44 80 C50 62 64 54 78 50" stroke="#4a6741" strokeWidth="2" />
      <ellipse cx="22" cy="42" rx="14" ry="18" fill="#ede9df" transform="rotate(-20 22 42)" />
      <circle cx="22" cy="44" r="4" fill="#c8c840" />
      <g transform="translate(58,28)">
        <ellipse cx="0" cy="-10" rx="7" ry="11" fill="#c8c840" />
        <ellipse cx="9" cy="-2" rx="7" ry="11" fill="#dcd87a" transform="rotate(50)" />
        <ellipse cx="-9" cy="-2" rx="7" ry="11" fill="#dcd87a" transform="rotate(-50)" />
        <ellipse cx="6" cy="8" rx="7" ry="11" fill="#c8c840" transform="rotate(20)" />
        <ellipse cx="-6" cy="8" rx="7" ry="11" fill="#c8c840" transform="rotate(-20)" />
        <circle cx="0" cy="0" r="4" fill="#7a5c3a" />
      </g>
    </svg>
  );
}

export function Owl({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden>
      <ellipse cx="28" cy="32" rx="16" ry="18" fill="#e8a090" />
      <ellipse cx="20" cy="22" rx="8" ry="9" fill="#f0c4b8" />
      <ellipse cx="36" cy="22" rx="8" ry="9" fill="#f0c4b8" />
      <circle cx="20" cy="22" r="3" fill="#2f4329" />
      <circle cx="36" cy="22" r="3" fill="#2f4329" />
      <path d="M26 30 l2 4 l2-4" fill="#c5372a" />
      <path d="M14 18 Q20 8 28 14 Q36 8 42 18" stroke="#c5372a" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function Bird({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 90 70" fill="none" aria-hidden>
      <circle cx="45" cy="35" r="32" fill="#c8e4c0" />
      <path
        d="M22 40 C30 28 48 22 62 32 C50 34 44 40 48 50 C38 48 28 48 22 40Z"
        fill="#2f4329"
      />
      <circle cx="58" cy="30" r="1.6" fill="#ede9df" />
      <path d="M64 32 l8 -2" stroke="#c5372a" strokeWidth="1.6" />
    </svg>
  );
}

export function FlowerStamp({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 72 72" fill="none" aria-hidden>
      <rect x="4" y="4" width="64" height="64" rx="6" fill="#3a4f78" />
      <path
        d="M36 54 C34 40 36 30 36 18"
        stroke="#e8a090"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="36" cy="22" rx="12" ry="10" fill="#e8a090" />
      <ellipse cx="24" cy="28" rx="8" ry="12" fill="#c5372a" transform="rotate(-30 24 28)" />
      <ellipse cx="48" cy="28" rx="8" ry="12" fill="#c5372a" transform="rotate(30 48 28)" />
    </svg>
  );
}

export function Leaves({ className }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden>
      <path d="M40 72 C18 50 16 24 40 8 C64 24 62 50 40 72Z" fill="#4a6741" />
      <path d="M40 72 C28 48 36 22 40 8" stroke="#c8e4c0" strokeWidth="1.4" />
      <path d="M40 40 C28 36 22 28 18 22" stroke="#c8e4c0" strokeWidth="1.2" />
      <path d="M40 48 C52 42 58 32 62 24" stroke="#c8e4c0" strokeWidth="1.2" />
    </svg>
  );
}

const dayMotif = {
  thu: <LadybugPair className="motif md" />,
  fri: <Primrose className="motif md" />,
  sat: <MoonBranch className="motif md" />,
  sun: <Bird className="motif md" />,
} as const;

export function DayMotif({ day }: { day: string }) {
  return dayMotif[day as keyof typeof dayMotif] ?? <Leaves className="motif md" />;
}

export function Vignette({
  src,
  wide,
  className = "",
}: {
  src: string;
  wide?: boolean;
  className?: string;
}) {
  return (
    <img
      className={`vignette ${wide ? "wide" : ""} ${className}`}
      src={src}
      alt=""
    />
  );
}
