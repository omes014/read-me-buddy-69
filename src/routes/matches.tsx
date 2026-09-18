import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { ProductCard } from "@/components/ribhana/ProductCard";
import { Btn, Screen, Title } from "@/components/ribhana/ui";
import { matches } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Your matches · Ribhana" },
      {
        name: "description",
        content: "Ranked against the priorities you set, with genie's reasoning on every card.",
      },
      { property: "og:title", content: "Your matches · Ribhana" },
      { property: "og:description", content: "Best price, best verdict, and why it suits you." },
    ],
  }),
  component: Matches;
});

function Matches() {
  const { priorities, compare, query } = useStore();
  const ranked = priorities.length ? priorities.join(" · ") : "your taste so far";

  return (
    <Screen>
      <Title sub={`Ranked on ${ranked}`}>Your matches</Title>
      {query ? (
        <p className="-mt-3 mb-4 text-xs text-muted-foreground">For “{query}”</p>
      ) : null}

      {compare ? (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-accent-fill px-4 py-3 text-xs text-accent">
          <Layers className="size-4" />
          Compare mode is on — tap a few cards to line them up
        </div>
      ) : null}

      <div className="space-y-4">
        {matches.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pt-6">
        <Btn variant="ghost" to="/home">
          Done for now
        </Btn>
      </div>
    </Screen>
  );
}
