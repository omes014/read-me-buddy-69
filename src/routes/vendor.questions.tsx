import { createFileRoute } from "@tanstack/react-router";
import { Btn, Chip, Field, Progress, ReasoningTag, Screen, Title } from "@/components/ribhana/ui";
import { comparables, money } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/vendor/questions")({
  head: () => ({
    meta: [
      { title: "A few quick questions · Ribhana" },
      { name: "description", content: "Genie only asks what a photo can't tell it, then suggests a fair price." },
      { property: "og:title", content: "A few quick questions · Ribhana" },
      { property: "og:description", content: "Story, audience and a price checked against similar pieces." },
    ],
  }),
  component: Questions,
});

const audiences = ["Gift buyers", "Home decorators", "Collectors", "Everyday use"];
const avg = Math.round(comparables.reduce((a, c) => a + c.price, 0) / comparables.length);

function Questions() {
  const { draft, patchDraft } = useStore();
  const price = draft.price ?? avg;
  const toggle = (a: string) =>
    patchDraft({
      audience: draft.audience.includes(a)
        ? draft.audience.filter((x) => x !== a)
        : [...draft.audience, a],
    });

  return (
    <Screen>
      <Progress current={3} total={4} />
      <Title sub="Just what a photo can't show me.">A few quick questions</Title>

      <div className="space-y-6">
        <Field
          label="What's the story behind it?"
          multiline
          value={draft.story ?? ""}
          onChange={(v) => patchDraft({ story: v })}
          placeholder="e.g. Thrown in my Fayoum studio, each glaze is mixed by hand"
        />

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Who's it for?
          </p>
          <div className="flex flex-wrap gap-2">
            {audiences.map((a) => (
              <Chip key={a} selected={draft.audience.includes(a)} onClick={() => toggle(a)}>
                {a}
              </Chip>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="display text-3xl text-foreground">{money(price)}</span>
            <span className="text-xs text-subtle-foreground">similar avg {money(avg)}</span>
          </div>
          <input
            type="range"
            min={300}
            max={1200}
            step={10}
            value={price}
            onChange={(e) => patchDraft({ price: Number(e.target.value) })}
            className="mt-3 w-full accent-[var(--color-primary)]"
            aria-label="Price"
          />
          <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
            {comparables.map((c) => (
              <li key={c.name} className="flex justify-between text-sm">
                <span className="text-subtle-foreground">{c.name}</span>
                <span className="text-foreground">{money(c.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <ReasoningTag>
              {price > avg * 1.15
                ? "Above similar pieces — make sure your story earns it."
                : price < avg * 0.85
                  ? "Below similar pieces — you could charge more."
                  : "Right in line with similar handmade pieces."}
            </ReasoningTag>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Btn to="/vendor/review" onClick={() => patchDraft({ price })}>
          Draft my listing
        </Btn>
      </div>
    </Screen>
  );
}
