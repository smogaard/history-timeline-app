import { Timeline } from "../types";


export default function TimelineColumn({
  timeline,
  total,
}: {
  timeline: Timeline;
  total: number;
}) {


  return (
    <div className="flex-1 min-w-[180px] bg-white rounded-2xl shadow p-4 border">
      <h2 className="font-bold text-lg mb-3">{timeline.title}</h2>

      <div className="flex flex-col gap-3">
        {timeline.events.map((event) => (
          <div
            key={event.id}
            className="p-2 rounded-xl bg-gray-100"
          >
            <div className="text-sm text-gray-500">{event.year}</div>
            <div className="font-medium">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}