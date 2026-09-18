import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Search as SearchIcon, Sparkles, X } from "lucide-react";
import { BottomNav } from "@/components/ribhana/BottomNav";
import { GenieMark } from "@/components/ribhana/GenieMark";
import { GridCard } from "@/components/ribhana/ProductCard";
import { Btn, Screen, TipBubble } from "@/components/ribhana/ui";
import { feed, tips } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home · Ribhana" },
      {
        name: "description",
        content: "A dense feed of finds, gift nudges for your people, and genie a tap away.",
      },
      { property: "og:title", content: "Home · Ribhana" },
      { property: "og:description", content: "Your feed, tuned to your taste and your people." },
    ],
  }),
  component: HomeFeed,
});

function HomeFeed() {
  const { people, query, set } = useStore();
  const [open, setOpen] = useState(false);
  const person = people[0];

  return (
    <>
      <Screen padBottom>
        <div className="mb-5 flex items-center gap-3">
          <GenieMark size={36} />
          <Btn to="/search" variant="outline" className="justify-start gap-3 py-3">
            <SearchIcon className="size-4 text-primary" />
            <span className="text-muted-foreground">Make a wish…</span>
          </Btn>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {feed.slice(0, 4).map((p) => (
            <GridCard key={p.id} product={p} />
          ))}
        </div>

        {person ? (
          <div className="my-3 rounded-2xl border border-accent/30 bg-accent-fill p-4">
            <p className="display text-sm text-foreground">{person.name} would love this</p>
            <p className="mt-1 text-xs text-accent">
              Because you noted: {person.tags.slice(0, 2).join(", ")}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {feed.slice(4, 6).map((p) => (
                <GridCard key={`rec-${p.id}`} product={p} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="my-3">
          <TipBubble>{tips[0]}</TipBubble>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {feed.slice(6).map((p) => (
            <GridCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-3">
          <TipBubble>{tips[1]}</TipBubble>
        </div>
      </Screen>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        {open ? (
          <div className="animate-rise pointer-events-auto rounded-2xl border border-primary-dim bg-card p-4 shadow-lift">
            <div className="flex items-start justify-between gap-3">
              <p className="display text-base text-foreground">
                Let's find something you'll treasure.
              </p>
              <button
                type="button"
                aria-label="Close genie"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-3 focus-within:border-primary">
              <SearchIcon className="size-4 text-primary" />
              <input
                value={query}
                onChange={(e) => set("query", e.target.value)}
                placeholder="A linen clutch, under E£1500…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <Btn variant="outline" className="py-2.5">
                <Camera className="size-4 text-accent" /> Photo
              </Btn>
              <Btn to="/matches" className="py-2.5">
                Find it
              </Btn>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Ask genie"
              onClick={() => setOpen(true)}
              className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-lift transition-transform active:scale-95"
            >
              <Sparkles className="size-4" /> Ask genie
            </button>
          </div>
        )}
      </div>

      <BottomNav active="home" />
    </>
  );
}
