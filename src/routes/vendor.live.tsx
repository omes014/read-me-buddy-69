import { createFileRoute } from "@tanstack/react-router";
import { GenieLine, GenieMark } from "@/components/ribhana/GenieMark";
import { Btn, Screen } from "@/components/ribhana/ui";

export const Route = createFileRoute("/vendor/live")({
  head: () => ({
    meta: [
      { title: "You're live · Ribhana" },
      { name: "description", content: "Your listing is live and genie is already showing it to the right shoppers." },
      { property: "og:title", content: "You're live · Ribhana" },
      { property: "og:description", content: "Your handmade piece is now on Ribhana." },
    ],
  }),
  component: Live,
});

function Live() {
  return (
    <Screen className="brass-glow">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <GenieMark size={88} />
        <h1 className="display mt-6 text-4xl text-foreground">You're live</h1>
        <div className="mt-6 text-left">
          <GenieLine>
            I'm already showing it to shoppers who love handmade ceramics. I'll tell you when someone saves it.
          </GenieLine>
        </div>
      </div>
      <div className="space-y-3">
        <Btn to="/vendor/shop">Go to my shop</Btn>
        <Btn variant="ghost" to="/vendor/photos">
          List another piece
        </Btn>
      </div>
    </Screen>
  );
}
