type Props = {
  years: number[];
};

export default function TimeColumn({ years }: Props) {
  
  return (
    <div className="flex flex-col w-[100px] bg-gray-200 rounded-2xl pt-4 px-4 pb-4">

      <div className="h-[48px] flex items-center justify-center font-bold text-lg mb-1">
        Tid
      </div>

      {years.map((year) => (
        
        <div
          key={year}
          className="h-12 flex items-center justify-center text-sm relative"
        >
          <span className="bg-gray-200 px-3 relative z-10">
            {year}
          </span>
        </div>

      ))}

    </div>
  );

}
