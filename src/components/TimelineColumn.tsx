import { Timeline } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TimelineColumn({
  timeline,
  total,
  onRemove,
  years,
}: {
  timeline: Timeline;
  total: number;
  onRemove: (id: string) => void;
  years: number[];
}) {

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

      {/* ✅ Remove-knapp */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(timeline.id);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
      >
        ✕
      </button>

      {/* ✅ GRID BASERT PÅ TID */}
      <div className="flex flex-col">
        {years.map((year) => {
          const event = timeline.events.find(e => e.year === year);
          const detail = getDetailLevel();

          return (
            <div key={year} className="relative h-12 flex items-center">

              {/* ✅ STIPLET LINJE */}
              <div className="absolute left-[-300px] right-0 top-1/2 border-t border-dashed border-gray-400 z-0"></div>

              {/* ✅ EVENT */}
              {event && (
                <div className="relative z-10 bg-white px-2 py-1 rounded whitespace-nowrap overflow-hidden text-ellipsis">

                  <div className="flex items-center gap-2">

                    {/* År */}
                    <span className="text-gray-500 text-sm">
                      {event.year}
                    </span>

                    {/* Tittel */}
                    {detail !== "compact" && (
                      <span className="font-medium">
                        {event.title}
                      </span>
                    )}

                  </div>

                  {/* Ekstra info */}
                  {detail === "full" && (
                    <div className="text-sm text-gray-600 mt-1">
                      Ekstra info kan komme her senere
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}