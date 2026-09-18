import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { Btn, Screen, Title } from "@/components/ribhana/ui";
import { productImages } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/vendor/photos")({
  head: () => ({
    meta: [
      { title: "Show genie your product · Ribhana" },
      { name: "description", content: "Photos are the only thing genie needs to get started." },
      { property: "og:title", content: "Show genie your product · Ribhana" },
      { property: "og:description", content: "Add up to four photos. No forms yet." },
    ],
  }),
  component: AddPhotos,
});

const demo = [productImages.vase, productImages.throw, productImages.necklace, productImages.clutch];

function AddPhotos() {
  const { draft, patchDraft } = useStore();

  return (
    <Screen>
      <Title sub="Photos only. I'll work out the rest before I ask you anything.">
        Show genie your product
      </Title>

      <div className="grid grid-cols-2 gap-3">
        {demo.map((src, i) => {
          const filled = i < draft.photos;
          return (
            <button
              key={i}
              type="button"
              onClick={() => patchDraft({ photos: filled ? i : i + 1 })}
              className="relative aspect-square overflow-hidden rounded-2xl border border-dashed border-border-strong bg-card transition-colors hover:border-primary-dim"
            >
              {filled ? (
                <>
                  <img
                    src={src}
                    alt={`Product photo ${i + 1}`}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="animate-rise size-full object-cover"
                  />
                  <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                </>
              ) : (
                <span className="grid size-full place-items-center text-muted-foreground">
                  <Plus className="size-6" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Btn to="/vendor/noticing" disabled={draft.photos === 0}>
          {draft.photos === 0 ? "Add at least one photo" : "Let genie look"}
        </Btn>
      </div>
    </Screen>
  );
}
