import { createFileRoute } from "@tanstack/react-router";
import { Camera, Check, Search as SearchIcon } from "lucide-react";
import { Btn, Screen, Title } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Make a wish · Ribhana" },
      {
        name: "description",
        content: "Type it, photograph it, or line a few up side by side — genie works out the rest.",
      },
      { property: "og:title", content: "Make a wish · Ribhana" },
      { property: "og:description", content: "One input. Genie infers the kind of help you need." },
    ],
  }),
  component: SearchScreen,
});

function SearchScreen() {
  const { query, set, compare } = useStore();

  return (
    <Screen>
      <Title sub="Genie works out the rest — where it's sold, what it's worth, whether it's you.">
        What's the wish?
      </Title>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-card focus-within:border-primary">
          <SearchIcon className="size-4 shrink-0 text-primary" />
          <input
            value={query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="e.g. a linen clutch, hand-embroidered"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-card/60 px-4 py-4 text-sm text-subtle-foreground transition-colors hover:border-primary-dim"
        >
          <Camera className="size-4 text-accent" />
          Add a photo instead
        </button>

        <button
          type="button"
          onClick={() => set("compare", !compare)}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-left text-sm text-foreground"
        >
          <span
            className={cn(
              "grid size-5 place-items-center rounded-md border transition-colors",
              compare ? "border-primary bg-primary text-primary-foreground" : "border-border-strong",
            )}
          >
            {compare ? <Check className="size-3.5" strokeWidth={3} /> : null}
          </span>
          Compare a few side-by-side
        </button>
      </div>

      <div className="mt-auto pt-8">
        <Btn to="/matches">Find it</Btn>
      </div>
    </Screen>
  );
}
