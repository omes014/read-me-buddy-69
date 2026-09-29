import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Btn, Field, Progress, ReasoningTag, Screen, Title } from "@/components/ribhana/ui";
import { money, productImages } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/vendor/review")({
  head: () => ({
    meta: [
      { title: "Review your listing · Ribhana" },
      { name: "description", content: "Genie's drafted title, description and tags — edit anything before you go live." },
      { property: "og:title", content: "Review your listing · Ribhana" },
      { property: "og:description", content: "Your listing, drafted by genie and ready to publish." },
    ],
  }),
  component: Review,
});

function Review() {
  const { draft, patchDraft, publishDraft } = useStore();
  const navigate = useNavigate();

  return (
    <Screen>
      <Progress current={4} total={4} />
      <Title sub="I drafted this from your photos and answers. Change anything.">Your listing</Title>

      <img
        src={productImages.vase}
        alt="Listing cover"
        width={816}
        height={816}
        className="mb-5 aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
      />

      <div className="space-y-4">
        <Field label="Title" value={draft.title} onChange={(v) => patchDraft({ title: v })} />
        <Field
          label="Description"
          multiline
          value={draft.description}
          onChange={(v) => patchDraft({ description: v })}
        />
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-2">
            {[...draft.tags, ...draft.audience].map((t) => (
              <span key={t} className="rounded-full bg-primary-fill px-3 py-1 text-xs text-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
          <span className="text-sm text-subtle-foreground">Price</span>
          <span className="display text-xl text-foreground">{money(draft.price ?? 650)}</span>
        </div>
        <ReasoningTag>Buyers searching "handmade vase" and "gift for new home" will find this.</ReasoningTag>
      </div>

      <div className="mt-auto space-y-3 pt-8">
        <Btn
          onClick={() => {
            publishDraft(productImages.vase);
            navigate({ to: "/vendor/live" });
          }}
        >
          Publish listing
        </Btn>
        <Btn variant="ghost" to="/vendor/questions">
          Back
        </Btn>
      </div>
    </Screen>
  );
}
