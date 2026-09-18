import { Link } from "@tanstack/react-router";
import { Bookmark, Home, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", icon: Home, to: "/home", tab: undefined },
  { label: "Wishlist", icon: Bookmark, to: "/people", tab: "wishlist" },
  { label: "People", icon: Users, to: "/people", tab: "people" },
  { label: "Settings", icon: Settings, to: "/settings", tab: undefined },
] as const;

export function BottomNav({ active }: { active: "home" | "wishlist" | "people" | "settings" }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ label, icon: Icon, to, tab }) => {
          const isActive = active === label.toLowerCase();
          return (
            <Link
              key={label}
              to={to}
              search={tab ? { tab } : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-[0.7rem] transition-colors",
                isActive ? "bg-surface-2 text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
