"use client";

type Props = {
  years: number[];
};

export default function TimeColumn({ years }: Props) {
  return (
    <div className="flex flex-col items-center bg-gray-300 rounded-2xl p-2 w-[90px]">
      {years.map((year) => (
        <div
          key={year}
          className="py-2 text-xs text-gray-800 border-b border-gray-400 w-full text-center"
        >
          {year}
        </div>
      ))}
    </div>
  );
}
