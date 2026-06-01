import { Timeline } from "../types";


export default function TimelineColumn({
  timeline,
  total,
}: {
  timeline: Timeline;
  total: number;
}) {


  const getDetailLevel = () => {
    if (total <= 2) return "full";
    if (total <= 4) return "medium";
    return "compact";
  };


  return (
    <div className="flex-1 min-w-[180px] bg-white rounded-2xl shadow p-4 border">
      <h2 className="font-bold text-lg mb-3">{timeline.title}</h2>

      <div className="flex flex-col gap-3">
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