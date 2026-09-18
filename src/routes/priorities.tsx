import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Chip, Field, Screen, Title } from "@/components/ribhana/ui";
import { priorityOptions } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/priorities")({
  head: () => ({
    meta: [
      { title: "What matters most · Ribhana" },
      {
        name: "description",
        content: "Tell genie what you weigh when you shop — deals, quality, ethics or reviews.",
      },
      { property: "og:title", content: "What matters most · Ribhana" },
      { property: "og:description", content: "These weights are shown back to you on every result." },
    ],
  }),
  component: Priorities,
});

function Priorities() {
  const { priorities, toggleIn } = useStore();
  const [custom, setCustom] = useState("");

  return (
    <Screen>
      <Title sub="Pick as many as you like.">What matters most?</Title>
      <div className="flex flex-wrap gap-2">
        {priorityOptions.map((p) => (
          <Chip key={p} selected={priorities.includes(p)} onClick={() => toggleIn("priorities", p)}>
            {p}
          </Chip>
        ))}
        {priorities
          .filter((p) => !priorityOptions.includes(p))
          .map((p) => (
            <Chip key={p} selected onClick={() => toggleIn("priorities", p)}>
              {p}
            </Chip>
          ))}
      </div>

      <div className="mt-6 space-y-3">
        <Field
          label="Something else?"
          value={custom}
          onChange={setCustom}
          placeholder="Type it here"
        />
        <Btn
          variant="outline"
          disabled={!custom.trim()}
          onClick={() => {
            toggleIn("priorities", custom.trim());
            setCustom("");
          }}
        >
          Add priority
        </Btn>
      </div>

      <div className="mt-auto pt-8">
        <Btn to="/search" disabled={priorities.length === 0}>
          Continue
        </Btn>
      </div>
    </Screen>
  );
}
