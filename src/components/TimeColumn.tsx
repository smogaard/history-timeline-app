type Props = {
  years: number[];
};

export default function TimeColumn({ years }: Props) {
  
  return (
    <div className="flex flex-col w-[100px] bg-gray-200 rounded-2xl p-4">

      <div className="h-[48px] flex items-center justify-center font-bold text-lg mb-3">
        Tid
      </div>

      {years.map((year) => (
        <div
          key={year}
          className="h-12 flex items-center justify-center text-sm"
        >
          {year}
        </div>
      ))}

    </div>
  );

}
