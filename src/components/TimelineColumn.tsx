import { Timeline } from "../types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



export default function TimelineColumn({
  timeline,
  total,
  onRemove,
}: {
  timeline: Timeline;
  total: number;
  onRemove: (id: string) => void;
}){


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: timeline.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getDetailLevel = () => {
    if (total <= 2) return "full";
    if (total <= 4) return "medium";
    return "compact";
  };


  return (
    
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex-1 min-w-[180px] bg-white rounded-2xl shadow p-4 border relative cursor-move"
    >

      <h2 className="font-bold text-lg mb-3">{timeline.title}</h2>

      <div className="flex flex-col gap-3">
        
        <button
          onClick={() => onRemove(timeline.id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        >
          ✕
        </button>

        {timeline.events.map((event) => {
          const detail = getDetailLevel();

          return (
            <div key={event.id} className="p-2 rounded-xl bg-gray-100">
              
              {/* ALLTID synlig */}
              <div className="text-sm text-gray-500">{event.year}</div>

              {/* Medium + full */}
              {detail !== "compact" && (
                <div className="font-medium">{event.title}</div>
              )}

              {/* Kun full */}
              {detail === "full" && (
                <div className="text-sm text-gray-600">
                  Ekstra info kan komme her senere
                </div>
              )}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}