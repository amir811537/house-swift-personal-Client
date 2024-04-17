type TitleProp = {
  first: string;
  second: string;
};
export default function SectionTitle({ first, second }: TitleProp) {
  return (
    <div className="">
      <h2 className="text-4xl text-center font-semibold">
        <span className="text-[#09BE51]">{first}</span> <span>{second}</span>
      </h2>
      <hr className="w-56 md:w-96 border-b border-[#09BE51] mx-auto mt-4" />
      <hr className="w-32 md:w-40 border-b-4 border-[#09BE51] mx-auto -m-[4px] mb-5" />
    </div>
  );
}
