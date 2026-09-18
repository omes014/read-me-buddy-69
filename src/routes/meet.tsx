import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GenieLine, GenieMark } from "@/components/ribhana/GenieMark";
import { Btn, OptionCard, Screen } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/meet")({
  head: () => ({
    meta: [
      { title: "Meet genie · Ribhana" },
      {
        name: "description",
        content: "Tell genie whether you're shopping for yourself or finding a gift.",
      },
      { property: "og:title", content: "Meet genie · Ribhana" },
      { property: "og:description", content: "Shopping for you, or a gift for someone else?" },
    ],
  }),
  component: MeetGenie,
});

function MeetGenie() {
  const { set } = useStore();
  const navigate = useNavigate();

  const pick = (intent: "self" | "gift") => {
    set("intent", intent);
    navigate({ to: "/persona/$slug", params: { slug: "fashion" } });
  };

  return (
    <Screen className="brass-glow">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 flex items-start gap-3">
          <GenieMark size={56} />
          <GenieLine>Hi, I'm genie. Tell me your wish — I'll find it, at the best price.</GenieLine>
        </div>
        <div className="space-y-3">
          <OptionCard
            title="Find something for me"
            sub="Browse, compare, decide faster"
            onClick={() => pick("self")}
          />
          <OptionCard
            title="Find a gift"
            sub="For someone else, made easy"
            onClick={() => pick("gift")}
          />
        </div>
      </div>
      <Btn variant="ghost" to="/vendor">
        I'm here to sell something
      </Btn>
    </Screen>
  );
}
