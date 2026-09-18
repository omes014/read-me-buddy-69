import { createFileRoute } from "@tanstack/react-router";
import { GenieLine, GenieMark } from "@/components/ribhana/GenieMark";
import { OptionCard, Screen } from "@/components/ribhana/ui";

export const Route = createFileRoute("/gift/")({
  head: () => ({
    meta: [
      { title: "Let's find their gift · Ribhana" },
      {
        name: "description",
        content: "Know the person but not the gift? Genie builds their taste profile and suggests.",
      },
      { property: "og:title", content: "Let's find their gift · Ribhana" },
      { property: "og:description", content: "Two ways in: know them, or know the gift." },
    ],
  }),
  component: GiftPath,
});

function GiftPath() {
  return (
    <Screen className="brass-glow">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 flex items-start gap-3">
          <GenieMark size={56} />
          <GenieLine>Let's find their gift. Which part do you already know?</GenieLine>
        </div>
        <div className="space-y-3">
          <OptionCard
            title="I know them, not the gift"
            sub="Genie builds a quick taste profile"
            to="/gift/profile"
          />
          <OptionCard
            title="I know the gift, not the source"
            sub="Straight to where it's sold, cheapest first"
            to="/gift/search"
          />
        </div>
      </div>
    </Screen>
  );
}
