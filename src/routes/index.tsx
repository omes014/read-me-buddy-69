import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GenieMark } from "@/components/ribhana/GenieMark";
import { Btn, Screen } from "@/components/ribhana/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ربحانة · Ribhana — Your wish, at the best price" },
      {
        name: "description",
        content:
          "Pick your language and meet genie: price comparison, review verdicts and taste-matched finds across Egypt.",
      },
      { property: "og:title", content: "ربحانة · Ribhana — Your wish, at the best price" },
      {
        property: "og:description",
        content: "An AI shopping genie for fashion, beauty, artisan crafts and home.",
      },
    ],
  }),
  component: LanguageSelect,
});

function LanguageSelect() {
  const { set } = useStore();
  const navigate = useNavigate();

  const choose = (lang: "en" | "ar") => {
    set("language", lang);
    navigate({ to: "/meet" });
  };

  return (
    <Screen className="brass-glow">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <GenieMark size={104} />
        <h1 className="display mt-6 text-4xl text-foreground">ربحانة</h1>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-primary">Ribhana</p>
        <p className="mt-6 text-sm text-subtle-foreground">Pick a language</p>
      </div>
      <div className="space-y-3">
        <Btn onClick={() => choose("en")}>English</Btn>
        <Btn variant="outline" onClick={() => choose("ar")}>
          <span dir="rtl" className="display text-base">
            عربي
          </span>
        </Btn>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Your wish, at the best price
        </p>
      </div>
    </Screen>
  );
}
