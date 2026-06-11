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
      className="flex-1 min-w-[180px] bg-white rounded-2xl shadow p-4 border relative"
    >

      <h2 
        {...listeners}
        className="font-bold text-lg mb-3" cursor-move
      >
        {timeline.title}
      </h2>

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
          
          const detail = getDetailLevel();

          return (
            <div key={year} className="relative h-12 flex items-center">

              {/* ✅ EVENTS */}
              {timeline.type === "events" && (() => {
                const event = timeline.events.find(e => e.year === year);

                return (
                  event && (
                    <>
                      {/* ✅ LINJE (kun hvis event finnes) */}
                      <div className="absolute left-[-300px] w-[300px] top-1/2 border-t border-dashed border-gray-400 z-0"></div>

                      {/* ✅ EVENT */}
                      <div className="relative h-12 flex items-center" whitespace-nowrap">
                        <span className="text-gray-500 text-sm mr-2">{event.year}</span>
                        <span className="font-medium">{event.title}</span>
                      </div>
                    </>
                  )
                );
              })()}

              {/* ✅ PERIODS */}
              {timeline.type === "periods" && (() => {
                const period = timeline.periods.find(
                  (p) => year >= p.startYear && year <= p.endYear
                );

                return (
                  period && (
                    <div className="absolute left-0 right-4 h-6 bg-blue-200 rounded z-5 flex items-center px-2">
                      {period.title}
                    </div>
                  )
                );
              })()}

            </div>
          );
        })}

      </div>
    </div>
  );
}