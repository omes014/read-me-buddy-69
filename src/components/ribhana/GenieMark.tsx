export function GenieMark({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-label="Ribhana genie mark" role="img">
      <path
        d="M65 16 A42 42 0 1 0 65 104 A34 34 0 1 1 65 16 Z"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="6"
      />
      <path
        className="animate-flicker"
        style={{ transformOrigin: "60px 60px" }}
        d="M60 44 C64 50 67 55 67 61 C67 64 65 66 64 67 C65 64 63 62 61 62 C60 65 61 67 62 69 C59 71 55 69 54 65 C53 62 54 59 56 56 C54 57 53 59 53 61 C50 56 52 50 60 44 Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}

export function GenieLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 shadow-card">
      <p className="display text-[1.05rem] leading-snug text-foreground">{children}</p>
    </div>
  );
}
