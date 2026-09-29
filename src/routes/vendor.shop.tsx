import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Btn, Screen, TipBubble, Title } from "@/components/ribhana/ui";
import { money } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/vendor/shop")({
  head: () => ({
    meta: [
      { title: "My shop · Ribhana" },
      { name: "description", content: "Your listings, views and saves at a glance." },
      { property: "og:title", content: "My shop · Ribhana" },
      { property: "og:description", content: "A seller's dashboard for handmade makers on Ribhana." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { listings } = useStore();
  const live = listings.filter((l) => l.status === "live").length;
  const stats = [
    { label: "Live", value: live },
    { label: "Views", value: 128 + live * 14 },
    { label: "Saves", value: 23 + live * 3 },
  ];

  return (
    <Screen>
      <Title sub="How your pieces are doing this week.">My shop</Title>

      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center shadow-card">
            <p className="display text-2xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        {listings.map((l) => (
          <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card">
            <img src={l.image} alt={l.title} loading="lazy" width={64} height={64} className="size-16 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{l.title}</p>
              <p className="text-sm text-subtle-foreground">{money(l.price)}</p>
            </div>
            <span
              className={
                l.status === "live"
                  ? "rounded-full bg-accent-fill px-2.5 py-1 text-xs text-accent"
                  : "rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground"
              }
            >
              {l.status === "live" ? "Live" : "Draft"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <TipBubble>Genie: your throw gets most views on weekends — I can bump it then.</TipBubble>
      </div>

      <div className="mt-auto space-y-3 pt-8">
        <Btn to="/vendor/photos">
          <Plus className="size-4" /> New listing
        </Btn>
        <Btn variant="ghost" to="/">
          Back to start
        </Btn>
      </div>
    </Screen>
  );
}
