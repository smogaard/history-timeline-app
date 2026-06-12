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
      className="flex-1 min-w-[180px] bg-white rounded-2xl shadow p-4 border relative overflow-visible">

      <h2 
        {...listeners}
        className="font-bold text-lg mb-3 cursor-move"
      >
        {timeline.title}
      </h2>
      
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          const name = prompt(`Rediger ${timeline.title}?`);
        }}
        className="absolute top-2 right-10 text-gray-400 hover:text-blue-500 z-10"
      >
        ✏️
      </button>

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

          // EVENTS
          if (timeline.type === "events") {
            const event = timeline.events.find(e => e.year === year);

            return (
              <div key={year} className="relative h-12 flex items-center">

                {event && (
                  <>
                    <div className="absolute style={{ left: "-9999px", right: "calc(100% + 12px)" }} top-1/2 border-t border-dashed border-gray-400 z-0"></div>

                    <div className="relative h-12 flex items-center whitespace-nowrap">
                      <span className="text-gray-500 text-sm mr-2">{event.year}</span>
                      <span className="font-medium">{event.title}</span>
                    </div>
                  </>
                )}

              </div>
            );
          }

          // PERIODS
          
         
          if (timeline.type === "periods") {
            const period = timeline.periods.find(
              (p) => p.startYear === year
            );

            const periodEnd = timeline.periods.find(
              (p) => p.endYear === year
            );

            // START
            if (period) {
              const span =
                years.findIndex(y => y === period.endYear) -
                years.findIndex(y => y === period.startYear) + 1;

              return (
                <div key={year} className="relative h-12 flex items-start">

                  {/* ✅ start-linje */}
                  <div className="absolute left-[-9999px] right-full top-1/2 border-t border-dashed border-gray-400 z-0"></div>

                  <div
                    className="absolute left-0 right-4 bg-blue-200 rounded z-10 flex items-center justify-center text-xs"
                    style={{ height: `${span * 48}px` }}
                  >
                    <span style={{ writingMode: "vertical-rl" }}>
                      {period.title}
                    </span>
                  </div>
                </div>
              );
            }

            // SLUTT
            if (periodEnd) {
              return (
                <div key={year} className="relative h-12 flex items-center">
                  <div className="absolute left-[-9999px] right-full top-1/2 border-t border-dashed border-gray-400 z-0"></div>
                </div>
              );
            }

            return <div key={year} className="relative h-12" />;
          }

          
          if (timeline.type === "combo") {
            const event = timeline.events.find(e => e.year === year);

            const activePeriods = timeline.periods.filter(
              (p) => year >= p.startYear && year <= p.endYear
            );

            return (
              <div key={year} className="relative h-12 flex items-center">

                {/* period-striper */}
                <div className="absolute left-0 flex gap-1">
                  {activePeriods.map((p) => (
                    <div key={p.id} className="w-[8px] bg-green-300 h-12" />
                  ))}
                </div>

                {/* event */}
                {event && (
                  <div className="ml-6 bg-white px-2 py-1 rounded">
                    {event.title}
                  </div>
                )}

              </div>
            );
          }



          return null;
        })}


      </div>
    </div>
  );
}