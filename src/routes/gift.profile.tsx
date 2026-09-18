import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Camera, Check, Star } from "lucide-react";
import {
  Btn,
  Chip,
  Field,
  Progress,
  ReasoningTag,
  Screen,
  Thinking,
  Title,
} from "@/components/ribhana/ui";
import { giftSuggestions, money } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gift/profile")({
  head: () => ({
    meta: [
      { title: "Build a profile · Ribhana" },
      {
        name: "description",
        content: "Four quick steps and genie weaves a taste profile for the person you're gifting.",
      },
      { property: "og:title", content: "Build a profile · Ribhana" },
      { property: "og:description", content: "Relationship, occasion, clues — then suggestions with reasoning." },
    ],
  }),
  component: BuildProfile,
});

const relations = ["Partner", "Sister", "Friend", "Parent", "Colleague", "Other"];
const ages = ["Under 18", "18–24", "25–34", "35–49", "50+"];

function BuildProfile() {
  const navigate = useNavigate();
  const { addPerson } = useStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");
  const [occasion, setOccasion] = useState("");
  const [clues, setClues] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (step !== 4) return;
    setThinking(true);
    const t = setTimeout(() => setThinking(false), 1600);
    return () => clearTimeout(t);
  }, [step]);

  const save = () => {
    const person = name.trim() || relation || "Someone";
    addPerson({
      id: `${Date.now()}`,
      name: person,
      relation: relation || "Friend",
      initials: person.slice(0, 1).toUpperCase(),
      importantDate: occasion ? `${occasion}` : undefined,
      tags: [clues.trim() ? clues.trim().slice(0, 28) : "Handmade", "Neutral tones", age || "25–34"],
    });
    navigate({ to: "/people", search: { tab: "people" } });
  };

  return (
    <Screen>
      <Progress current={step} total={4} />

      {step === 1 ? (
        <>
          <Title sub="A name helps me keep their notes straight.">Who's this for?</Title>
          <Field value={name} onChange={setName} placeholder="Their name" label="Name" />
          <div className="mt-5 flex flex-wrap gap-2">
            {relations.map((r) => (
              <Chip key={r} selected={relation === r} onClick={() => setRelation(r)}>
                {r}
              </Chip>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <Btn disabled={!relation} onClick={() => setStep(2)}>
              Continue
            </Btn>
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Title sub="Roughly is fine. I fill in the gaps.">Tell genie more</Title>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Age range
          </p>
          <div className="flex flex-wrap gap-2">
            {ages.map((a) => (
              <Chip key={a} selected={age === a} onClick={() => setAge(a)}>
                {a}
              </Chip>
            ))}
          </div>
          <div className="mt-5">
            <Field
              label="Occasion"
              value={occasion}
              onChange={setOccasion}
              placeholder="Birthday, graduation, just because"
            />
          </div>
          <div className="mt-6">
            <Thinking>weaving {name.trim() || "their"}'s profile…</Thinking>
          </div>
          <div className="mt-auto pt-8">
            <Btn disabled={!age} onClick={() => setStep(3)}>
              Continue
            </Btn>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Title sub="A comment, a joke, a link — anything helps.">Any clues?</Title>
          <Field
            value={clues}
            onChange={setClues}
            multiline
            placeholder="She kept photographing the embroidery stalls in Khan el-Khalili…"
          />
          <button
            type="button"
            className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-card/60 px-4 py-4 text-sm text-subtle-foreground transition-colors hover:border-primary-dim"
          >
            <Camera className="size-4 text-accent" />
            Attach a photo or link
          </button>
          <div className="mt-auto pt-8">
            <Btn onClick={() => setStep(4)}>See what genie found</Btn>
          </div>
        </>
      ) : null}

      {step === 4 ? (
        <>
          <Title sub={`Three I'd stand behind for ${name.trim() || "them"}.`}>Genie's picks</Title>
          {thinking ? (
            <Thinking>reading your clues…</Thinking>
          ) : (
            <div className="animate-rise space-y-3">
              {giftSuggestions.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setPicked(g.id)}
                  className={cn(
                    "flex w-full gap-3 rounded-2xl border bg-card p-3 text-left shadow-card transition-all duration-150 active:scale-[0.99]",
                    picked === g.id ? "border-primary" : "border-border",
                  )}
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="size-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 space-y-1.5">
                    <p className="display text-sm leading-snug text-foreground">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.retailer}</p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                      {money(g.price)}
                      <span className="flex items-center gap-1 text-xs font-normal text-subtle-foreground">
                        <Star className="size-3 fill-current text-primary" />
                        {g.rating}
                      </span>
                      {picked === g.id ? <Check className="size-4 text-accent" /> : null}
                    </p>
                    <ReasoningTag>{g.reasoning}</ReasoningTag>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="mt-auto pt-8">
            <Btn disabled={!picked} onClick={save}>
              Save to your people
            </Btn>
          </div>
        </>
      ) : null}
    </Screen>
  );
}
