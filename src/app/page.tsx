import TimelineColumn from "@/components/TimelineColumn";
import { timelines } from "@/data/events";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 overflow-x-auto">
      <div className="flex gap-4">
        {timelines.map((tl) => (
          <TimelineColumn key={tl.id} timeline={tl} />
        ))}
      </div>
    </main>
  );
}