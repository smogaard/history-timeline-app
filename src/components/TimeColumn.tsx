type Props = {
  years: number[];
};

export default function TimeColumn({ years }: Props) {
  
  return (
    <div className="flex flex-col w-[100px] pl-4 pr-6 bg-gray-200 rounded-2xl p-2 relative">

      <div className="h-[40px] flex items-center justify-center font-bold text-lg mb-3">
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
