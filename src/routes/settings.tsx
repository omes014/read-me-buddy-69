import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/ribhana/BottomNav";
import { GenieMark } from "@/components/ribhana/GenieMark";
import { ReasoningTag, Screen, Title } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Your shopper identity · Ribhana" },
      {
        name: "description",
        content: "The archetype genie derived from your favourites, plus brands it thinks complete it.",
      },
      { property: "og:title", content: "Your shopper identity · Ribhana" },
      { property: "og:description", content: "See and refine what shapes your feed." },
    ],
  }),
  component: SettingsScreen,
});

const complements = [
  { name: "Waqtun", why: "Slow-made leather, same restraint as the silver you heart." },
  { name: "Maramzy", why: "Matte ceramics that sit next to your neutral textiles." },
  { name: "Torriden", why: "Unscented, minimal-ingredient skincare — quiet like your wardrobe." },
];

function SettingsScreen() {
  const { brandFavorites, priorities } = useStore();
  const traits = [
    "Quality over quantity",
    "Neutral tones",
    "Small-batch makers",
    ...priorities.slice(0, 1),
  ];

  return (
    <>
      <Screen padBottom>
        <Title sub="This is what shapes everything I surface. Change it whenever it stops fitting.">
          Your shopper identity
        </Title>

        <section className="rounded-2xl border border-primary-dim bg-card p-5 shadow-card brass-glow">
          <div className="flex items-center gap-3">
            <GenieMark size={40} />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Genie reads you as</p>
              <p className="display text-xl text-foreground">The Understated Minimalist</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {traits.map((t) => (
              <span
                key={t}
                className="rounded-full border border-primary-dim bg-primary-fill px-3 py-1 text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Built from {brandFavorites.length || "your"} hearted brand
            {brandFavorites.length === 1 ? "" : "s"} and the priorities you set.
          </p>
          <Link
            to="/persona/$slug"
            params={{ slug: "fashion" }}
            className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            Not quite right? Refine your favourites
          </Link>
        </section>

        <h2 className="display mt-8 text-lg text-foreground">Because of this identity</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Brands you didn't pick — my own discovery, not folded into your selections.
        </p>
        <div className="space-y-3">
          {complements.map((c) => (
            <article key={c.name} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="display text-base text-foreground">{c.name}</p>
              <div className="mt-2">
                <ReasoningTag>{c.why}</ReasoningTag>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 space-y-2 rounded-2xl border border-border bg-card p-4 text-sm">
          <Link to="/vendor" className="block text-foreground">
            Switch to selling
          </Link>
          <Link to="/" className="block text-muted-foreground">
            Language · English / عربي
          </Link>
        </div>
      </Screen>
      <BottomNav active="settings" />
    </>
  );
}
