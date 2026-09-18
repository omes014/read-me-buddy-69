import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  padBottom = false,
  className,
}: {
  children: ReactNode;
  padBottom?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))]",
        padBottom ? "pb-[calc(5.75rem+env(safe-area-inset-bottom))]" : "pb-8",
        className,
      )}
    >
      <div className="animate-rise flex flex-1 flex-col">{children}</div>
    </div>
  );
}

export function Title({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-6">
      <h1 className="display text-[1.75rem] leading-tight text-foreground">{children}</h1>
      {sub ? <p className="mt-1.5 text-sm text-subtle-foreground">{sub}</p> : null}
    </header>
  );
}

const btnBase =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-150 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-40";

export function Btn({
  children,
  to,
  onClick,
  variant = "primary",
  disabled,
  className,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  disabled?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    outline: "border border-border-strong bg-card text-foreground hover:bg-surface-2",
    ghost: "text-subtle-foreground hover:text-foreground",
  }[variant];
  const cls = cn(btnBase, styles, className);
  if (to && !disabled) {
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Chip({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all duration-150 active:scale-95",
        selected
          ? "border-primary bg-primary-fill text-foreground"
          : "border-border bg-card text-subtle-foreground hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const shared =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      ) : null}
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </label>
  );
}

export function ReasoningTag({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-lg bg-accent-fill px-3 py-2 text-xs leading-relaxed text-accent">
      <span aria-hidden className="font-semibold">
        ✦
      </span>
      <span>{children}</span>
    </p>
  );
}

export function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6 flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors duration-300",
            i < current ? "bg-primary" : "bg-surface-2",
          )}
        />
      ))}
    </div>
  );
}

export function OptionCard({
  title,
  sub,
  to,
  onClick,
}: {
  title: string;
  sub: string;
  to?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="display text-lg text-foreground">{title}</span>
      <span className="mt-1 block text-sm text-muted-foreground">{sub}</span>
    </>
  );
  const cls =
    "block w-full rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-all duration-200 hover:border-primary-dim hover:shadow-lift active:scale-[0.99]";
  return to ? (
    <Link to={to} onClick={onClick} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function TipBubble({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-primary-dim bg-primary-fill/50 px-4 py-3 text-sm text-subtle-foreground">
      {children}
    </div>
  );
}

export function Thinking({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-accent"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
      <span className="text-sm italic text-subtle-foreground">{children}</span>
    </div>
  );
}
