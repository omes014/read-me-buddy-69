import { createFileRoute } from "@tanstack/react-router";
import { GenieLine, GenieMark } from "@/components/ribhana/GenieMark";
import { Btn, Screen } from "@/components/ribhana/ui";

export const Route = createFileRoute("/vendor/")({
  head: () => ({
    meta: [
      { title: "Sell with genie · Ribhana" },
      {
        name: "description",
        content: "Show genie a few photos and it drafts your listing — title, description, tags, price.",
      },
      { property: "og:title", content: "Sell with genie · Ribhana" },
      { property: "og:description", content: "Listing a handmade piece takes minutes, not an evening." },
    ],
  }),
  component: VendorWelcome,
});

function VendorWelcome() {
  return (
    <Screen className="brass-glow">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 flex items-start gap-3">
          <GenieMark size={56} />
          <GenieLine>
            Let's list something people will love. Show me a few photos and I'll do the rest.
          </GenieLine>
        </div>
      </div>
      <div className="space-y-3">
        <Btn to="/vendor/photos">Start listing</Btn>
        <Btn variant="ghost" to="/vendor/shop">
          See my shop
        </Btn>
      </div>
    </Screen>
  );
}
