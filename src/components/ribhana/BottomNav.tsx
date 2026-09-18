import { Link } from "@tanstack/react-router";
import { Bookmark, Home, Settings, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function itemClass(active: boolean) {
  return cn(
    "flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-[0.7rem] transition-colors",
    active ? "bg-surface-2 text-primary" : "text-muted-foreground",
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

export function BottomNav({
  active,
}: {
  active: "home" | "wishlist" | "people" | "settings";
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        <Link to="/home" className={itemClass(active === "home")}>
          <Home className="size-5" />
          <Label>Home</Label>
        </Link>
        <Link
          to="/people"
          search={{ tab: "wishlist" }}
          className={itemClass(active === "wishlist")}
        >
          <Bookmark className="size-5" />
          <Label>Wishlist</Label>
        </Link>
        <Link to="/people" search={{ tab: "people" }} className={itemClass(active === "people")}>
          <Users className="size-5" />
          <Label>People</Label>
        </Link>
        <Link to="/settings" className={itemClass(active === "settings")}>
          <Settings className="size-5" />
          <Label>Settings</Label>
        </Link>
      </div>
    </nav>
  );
}
