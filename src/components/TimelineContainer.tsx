
"use client";

import { useState } from "react";
import TimelineColumn from "./TimelineColumn";
import { timelines as initialTimelines } from "../data/events";
import useScreenWidth from "../hooks/useScreenWidth";
import TimeColumn from "./TimeColumn";


export default function TimelineContainer() {
  
  const generateYears = () => {
    return [1750, 1800, 1850, 1900, 1950, 2000];
  };

  const width = useScreenWidth();

  const getMaxTimelines = () => {
    if (width < 600) return 2;       // mobil portrett
    if (width < 900) return 3;       // mobil landskap / liten tablet
    if (width < 1200) return 4;      // tablet
    return 6;                        // desktop
  };

  const maxTimelines = getMaxTimelines();
  const [timelines, setTimelines] = useState(initialTimelines);

  
  const handleRemove = (id: string) => {
    setTimelines((prev) => prev.filter((t) => t.id !== id));
  };


  const handleAddTimeline = () => {
    if (timelines.length >= maxTimelines) {
      alert("Maks antall nådd. Roter skjermen for flere tema.");
      return;
    }

    const newTimeline = {
      id: Math.random().toString(),
      title: "Nytt tema",
      events: [],
    };

    setTimelines([...timelines, newTimeline]);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-2 sm:p-4 overflow-x-auto">
      
      <div className="flex gap-4 w-full items-stretch">
        
        {/* ✅ TIDSHJUL */}
        <TimeColumn years={generateYears()} />

        {/* ✅ HJUL */}
        {timelines.map((tl) => (
          <TimelineColumn
            key={tl.id}
            timeline={tl}
            total={timelines.length}
            onRemove={handleRemove}
          />
        ))}

      </div>

      {/* + knapp */}
      <button
        onClick={handleAddTimeline}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg"
      >
        +
      </button>
    </main>
  );
}