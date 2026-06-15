type Props = {
  years: number[];
};

export default function TimeColumn({ years }: Props) {
  
  return (
    <div className="flex flex-col w-[80px] bg-gray-200 rounded-2xl p-2">

      <div className="h-[32px] flex items-center justify-center font-bold">
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
