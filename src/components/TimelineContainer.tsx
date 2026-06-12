
"use client";

import { useState } from "react";
import TimelineColumn from "./TimelineColumn";
import { timelines as initialTimelines } from "../data/events";
import useScreenWidth from "../hooks/useScreenWidth";
import TimeColumn from "./TimeColumn";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";



export default function TimelineContainer() {
  
 const [showList, setShowList] = useState(false); 
 const [timelines, setTimelines] = useState(initialTimelines);
 
 const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTimelines((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const generateYears = () => {
    const yearsSet = new Set<number>();

    timelines.forEach((timeline) => {
      if (timeline.type === "events") {
        timeline.events.forEach((event) => {
          yearsSet.add(event.year);
        });
      }

      
      if (timeline.type === "periods") {
        timeline.periods.forEach((p) => {
          yearsSet.add(p.startYear);
          yearsSet.add(p.endYear);
        });
      }

    });

    return Array.from(yearsSet).sort((a, b) => a - b);
  };


  const width = useScreenWidth();

  const getMaxTimelines = () => {
    if (width < 600) return 2;       // mobil portrett
    if (width < 900) return 3;       // mobil landskap / liten tablet
    if (width < 1200) return 4;      // tablet
    return 6;                        // desktop
  };

  const maxTimelines = getMaxTimelines();

  
  const handleRemove = (id: string) => {
    setTimelines((prev) => prev.filter((t) => t.id !== id));
  };


  const handleAddTimeline = () => {
    const name = prompt("Navn på nytt hjul:");
    if (!name) return;

    const type = prompt("Type (events / periods / combo):");
    if (!type) return;

    if (type === "events") {
      setTimelines((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          title: name,
          type: "events",
          events: [],
        },
      ]);
    }

    if (type === "periods") {
      setTimelines((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          title: name,
          type: "periods",
          periods: [],
        },
      ]);
    }

    if (type === "combo") {
      setTimelines((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          title: name,
          type: "combo",
          events: [],
          periods: [],
        },
      ]);
    }
  };


  
  
  const handleAddFromList = () => {
    const available = initialTimelines.filter(
      (t) => !timelines.some((active) => active.title === t.title)
    );

    if (available.length === 0) {
      alert("Ingen flere tilgjengelige hjul");
      return;
    }

    const choice = prompt(
      "Velg hjul:\n" + available.map((t, i) => `${i}: ${t.title}`).join("\n")
    );

    const index = Number(choice);

    if (isNaN(index) || index < 0 || index >= available.length) {
      alert("Ugyldig valg");
      return;
    }

    const chosen = {
      ...available[index],
      id: Math.random().toString(),
    };

    setTimelines((prev) => [...prev, chosen]);
  };



  const years = generateYears();

  return (
    <main className="h-screen bg-gray-50 p-2 sm:p-4 overflow-hidden">
            
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={timelines.map((t) => t.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 w-full items-stretch h-full overflow-y-auto">
            
            <TimeColumn years={years} />

            {timelines.map((tl) => (
              <TimelineColumn
                key={tl.id}
                timeline={tl}
                total={timelines.length}
                onRemove={handleRemove}
                years={years}
              />
            ))}

          </div>
        </SortableContext>
      </DndContext>


      {/* + knapp */}
      <button
        onClick={handleAddTimeline}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg"
      >
        +
      </button>

      {/* "Legg tilfra liste" knapp */}
      
      <button
        onClick={() => setShowList(true)}
        className="fixed bottom-6 left-6 px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        Legg til fra liste
      </button>


      {showList && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          
          <div className="bg-white p-6 rounded-2xl flex flex-wrap gap-4 max-w-md">

            {initialTimelines.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  const chosen = {
                    ...t,
                    id: Math.random().toString(),
                  };

                  setTimelines((prev) => [...prev, chosen]);
                  setShowList(false);
                }}
                className="w-[120px] h-[80px] bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200"
              >
                {t.title}
              </div>
            ))}

          </div>

        </div>
      )}

    </main>
  );
}