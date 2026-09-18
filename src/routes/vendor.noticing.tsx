import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Btn, Screen, Thinking, Title } from "@/components/ribhana/ui";

export const Route = createFileRoute("/vendor/noticing")({
  head: () => ({
    meta: [
      { title: "Genie's noticing · Ribhana" },
      {
        name: "description",
        content: "What genie read from your photos, shown before it asks you a single question.",
      },
      { property: "og:title", content: "Genie's noticing · Ribhana" },
      { property: "og:description", content: "Category, material, colour and style — read from the images." },
    ],
  }),
  component: Noticing,
});

const found = [
  { label: "Category", value: "Home decor · vase" },
  { label: "Material", value: "Stoneware ceramic, matte glaze" },
  { label: "Colour", value: "Sand, speckled oatmeal" },
  { label: "Style", value: "Handmade, minimal, organic form" },
];

function Noticing() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= found.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 520);
    return () => clearTimeout(t);
  }, [shown]);

  const done = shown >= found.length;

  return (
    <Screen>
      <Title sub="Here's what I can already see, so I only ask you what a photo can't tell me.">
        Genie's noticing
      </Title>

      <div className="space-y-2.5">
        {found.slice(0, shown).map((f) => (
          <div
            key={f.label}
            className="animate-rise flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-fill text-accent">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</p>
              <p className="text-sm text-foreground">{f.value}</p>
            </div>
          </div>
        ))}
        {!done ? <Thinking>reading your photos…</Thinking> : null}
      </div>

      <div className="mt-auto space-y-3 pt-8">
        <Btn to="/vendor/questions" disabled={!done}>
          Looks right — continue
        </Btn>
        <Btn variant="ghost" to="/vendor/photos">
          Add more photos
        </Btn>
      </div>
    </Screen>
  );
}
