import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ChevronDown, Heart } from "lucide-react";
import { Btn, Progress, Screen, Title } from "@/components/ribhana/ui";
import { personaSteps } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/persona/$slug")({
  head: () => ({
    meta: [
      { title: "Your favourites · Ribhana" },
      {
        name: "description",
        content: "Pick the brands and crafts you already shop, so genie learns your taste.",
      },
      { property: "og:title", content: "Your favourites · Ribhana" },
      { property: "og:description", content: "Real brands, not abstract categories." },
    ],
  }),
  component: PersonaBuilder,
});

function PersonaBuilder() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { subInterests, brandFavorites, toggleIn, intent } = useStore();

  const index = Math.max(
    0,
    personaSteps.findIndex((s) => s.slug === slug),
  );
  const step = personaSteps[index]!;
  const next = personaSteps[index + 1];

  const onContinue = () => {
    if (next) {
      navigate({ to: "/persona/$slug", params: { slug: next.slug } });
    } else {
      navigate({ to: intent === "gift" ? "/gift" : "/priorities" });
    }
  };

  return (
    <Screen>
      <Progress current={index + 1} total={personaSteps.length} />
      <Title sub={`Pick your ${step.category} favourites`}>{step.headline}</Title>

      <div className="flex-1 space-y-3">
        {step.rows.map((row) => {
          const rowId = `${step.slug}:${row.id}`;
          const open = subInterests.includes(rowId);
          return (
            <section
              key={row.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-card shadow-card transition-colors duration-200",
                open ? "border-primary-dim" : "border-border",
              )}
            >
              <button
                type="button"
                onClick={() => toggleIn("subInterests", rowId)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                    open
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong",
                  )}
                >
                  {open ? <Check className="size-3.5" strokeWidth={3} /> : null}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-foreground">{row.label}</span>
                  {!open ? (
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {row.items.join(", ")}
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>

              {open ? (
                <div className="animate-rise border-t border-border p-3">
                  <div className="grid grid-cols-2 gap-2">
                    {row.items.map((item) => {
                      const faved = brandFavorites.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleIn("brandFavorites", item)}
                          className={cn(
                            "relative rounded-xl border px-3 py-3 pr-8 text-left text-xs transition-all duration-150 active:scale-[0.97]",
                            faved
                              ? "border-primary bg-primary-fill text-foreground"
                              : "border-border bg-surface-2 text-subtle-foreground",
                          )}
                        >
                          {item}
                          <Heart
                            className={cn(
                              "absolute right-2 top-2 size-3.5",
                              faved ? "animate-pop text-primary" : "text-muted-foreground",
                            )}
                            fill={faved ? "currentColor" : "none"}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-xs text-accent underline-offset-4 hover:underline"
                  >
                    See all {row.label.toLowerCase()}
                  </button>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 bg-gradient-to-t from-background via-background to-transparent px-5 pb-4 pt-4">
        <Btn onClick={onContinue}>Continue</Btn>
      </div>
    </Screen>
  );
}
