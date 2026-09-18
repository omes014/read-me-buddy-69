import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/ribhana/BottomNav";
import { ProductCard } from "@/components/ribhana/ProductCard";
import { Btn, Screen, Title } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Tab = "people" | "wishlist" | "favourites";

export const Route = createFileRoute("/people")({
  validateSearch: (search: Record<string, unknown>): { tab: Tab } => {
    const tab = search.tab;
    return {
      tab: tab === "wishlist" || tab === "favourites" ? tab : "people",
    };
  },
  head: () => ({
    meta: [
      { title: "Your people · Ribhana" },
      {
        name: "description",
        content: "Saved gift profiles, your wishlist and the pieces you've hearted, in one place.",
      },
      { property: "og:title", content: "Your people · Ribhana" },
      { property: "og:description", content: "People, wishlist and favourites." },
    ],
  }),
  component: YourPeople,
});

const tabs: { id: Tab; label: string }[] = [
  { id: "people", label: "People" },
  { id: "wishlist", label: "Wishlist" },
  { id: "favourites", label: "Favourites" },
];

function YourPeople() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate();
  const { people, wishlist, favorites } = useStore();
  const items = tab === "wishlist" ? wishlist : favorites;

  return (
    <>
      <Screen padBottom>
        <Title sub="Taste notes, saved finds, and everything you've hearted.">Your people</Title>

        <div className="mb-5 flex gap-1 rounded-xl border border-border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => navigate({ to: "/people", search: { tab: t.id } })}
              className={cn(
                "flex-1 rounded-lg py-2 text-xs font-medium transition-all duration-200",
                tab === t.id ? "bg-surface-2 text-primary" : "text-muted-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "people" ? (
          <div className="animate-rise space-y-3">
            {people.map((p) => (
              <article
                key={p.id}
                className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <span className="display grid size-12 shrink-0 place-items-center rounded-full bg-primary-fill text-lg text-primary">
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <p className="display text-base text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.relation}
                    {p.importantDate ? ` · ${p.importantDate}` : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-accent-fill px-2.5 py-1 text-[0.7rem] text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <Btn variant="outline" to="/gift">
              Add someone new
            </Btn>
          </div>
        ) : (
          <div className="animate-rise space-y-4">
            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border-strong px-4 py-8 text-center text-sm text-muted-foreground">
                Nothing in your {tab} yet — save items from your matches to see them here.
              </p>
            ) : (
              items.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        )}
      </Screen>
      <BottomNav active={tab === "wishlist" ? "wishlist" : tab === "people" ? "people" : "people"} />
    </>
  );
}
