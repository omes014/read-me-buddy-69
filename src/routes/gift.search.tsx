import { createFileRoute } from "@tanstack/react-router";
import { Link2, Search as SearchIcon } from "lucide-react";
import { Btn, Screen, Title } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/gift/search")({
  head: () => ({
    meta: [
      { title: "What's the gift? · Ribhana" },
      {
        name: "description",
        content: "Name the gift and genie finds the source and the best price — no questions asked.",
      },
      { property: "og:title", content: "What's the gift? · Ribhana" },
      { property: "og:description", content: "Straight to sources and prices." },
    ],
  }),
  component: GiftSearch,
});

function GiftSearch() {
  const { query, set } = useStore();

  return (
    <Screen>
      <Title sub="No taste quiz needed — I only have to find the source and the price.">
        What's the gift?
      </Title>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-card focus-within:border-primary">
          <SearchIcon className="size-4 shrink-0 text-primary" />
          <input
            value={query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="e.g. a hand-embroidered clutch from Khan el-Khalili"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-card/60 px-4 py-4 text-sm text-subtle-foreground transition-colors hover:border-primary-dim"
        >
          <Link2 className="size-4 text-accent" />
          Attach a photo or link
        </button>
      </div>

      <div className="mt-auto pt-8">
        <Btn to="/matches">Find it</Btn>
      </div>
    </Screen>
  );
}
