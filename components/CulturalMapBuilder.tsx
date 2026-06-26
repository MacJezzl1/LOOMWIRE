"use client";

import { useMemo, useState } from "react";
import { Compass, Map, RotateCcw } from "lucide-react";
import { SaveToVaultButton } from "@/components/SaveToVaultButton";

const cultureNodes = [
  { name: "Streetwear", weight: 12, room: "Blank Room" },
  { name: "Afro-futurism", weight: 14, room: "Studio" },
  { name: "AI", weight: 13, room: "Atelier" },
  { name: "Music", weight: 9, room: "Lookbook" },
  { name: "Luxury", weight: 11, room: "Studio" },
  { name: "Blockchain", weight: 8, room: "IP Room" },
  { name: "Poetry", weight: 7, room: "Name Room" },
  { name: "Architecture", weight: 6, room: "Archive" },
  { name: "Gaming", weight: 6, room: "Drop Room" },
  { name: "Faith", weight: 5, room: "Name Room" },
  { name: "Sports", weight: 5, room: "Drop Room" },
  { name: "Youth Culture", weight: 13, room: "Cultural Map" }
];

export function CulturalMapBuilder() {
  const [selected, setSelected] = useState([
    "Streetwear",
    "Afro-futurism",
    "AI",
    "Luxury",
    "Youth Culture"
  ]);

  const score = useMemo(() => {
    const raw = cultureNodes
      .filter((node) => selected.includes(node.name))
      .reduce((sum, node) => sum + node.weight, 0);
    return Math.min(96, 42 + raw);
  }, [selected]);

  const rooms = useMemo(
    () =>
      Array.from(
        new Set(
          cultureNodes
            .filter((node) => selected.includes(node.name))
            .map((node) => node.room)
        )
      ),
    [selected]
  );

  function toggle(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="paper-panel relative z-10 p-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-wire">
              Cultural Nodes
            </p>
            <h2 className="editorial-heading mt-2 text-4xl text-paper">
              Choose the worlds your brand belongs to.
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost shrink-0"
            onClick={() =>
              setSelected(["Streetwear", "Afro-futurism", "AI", "Luxury", "Youth Culture"])
            }
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {cultureNodes.map((node) => {
            const active = selected.includes(node.name);
            return (
              <button
                key={node.name}
                type="button"
                onClick={() => toggle(node.name)}
                className={`relative z-10 min-h-[72px] rounded-md border px-3 py-2 text-left transition ${
                  active
                    ? "border-volt bg-volt/12 text-paper"
                    : "border-paper/10 bg-paper/[0.035] text-bone hover:border-wire/50"
                }`}
              >
                <span className="block text-sm font-black">{node.name}</span>
                <span className="mt-1 block text-xs text-bone/70">
                  {node.room}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="paper-panel relative z-10 p-5 sm:p-6">
        <div className="flex flex-col gap-5 border-b border-paper/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-volt">
              <Compass size={15} />
              Map Reading
            </p>
            <h2 className="editorial-heading mt-2 text-4xl text-paper">
              {score} / 100 cultural signal
            </h2>
          </div>
          <div
            className="score-ring grid h-28 w-28 shrink-0 place-items-center rounded-full"
            style={{ "--score": score } as React.CSSProperties}
          >
            <Map className="text-volt" size={30} />
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
              Selected territories
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.map((item) => (
                <span
                  key={item}
                  className="rounded border border-volt/35 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-volt"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
              Recommended rooms
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {rooms.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-paper/10 bg-paper/[0.035] p-3 text-sm font-bold text-bone"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-wire/25 bg-wire/10 p-4 text-sm leading-7 text-bone">
            {selected.length < 3
              ? "The map is too thin. Add more cultural territories before building the visual world."
              : selected.includes("AI") && selected.includes("Streetwear")
                ? "Strong territory: the brand can speak fashion and technology without sounding like plain software."
                : "The territory is workable. Use the Name Room to turn these worlds into a sharper enemy and manifesto."}
          </div>

          <SaveToVaultButton
            className="btn btn-primary"
            record={{
              title: "Cultural Map selection",
              category: "Brand name",
              notes: `Selected territories: ${selected.join(", ")}. Cultural signal score: ${score}. Recommended rooms: ${rooms.join(", ")}.`
            }}
          />
        </div>
      </section>
    </div>
  );
}
