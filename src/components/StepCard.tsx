import { checkCircle } from "@/assets/icons";

const StepCard = () => {
  return (
    <div className="md:px-12.5 px-5 py-6.25 flex justify-center items-start rounded-[40px] md:rounded-full md:max-w-[527px] max-w-[328px] gap-5 bg-primary">
      <div className="md:flex hidden w-16 h-16 items-center justify-center rounded-full bg-white">
        <img src={checkCircle} alt="checkedCircle" className="w-10 h-10" />
      </div>
      <div className="flex-1">
        <h3 className="text-white max-md:text-base">Choose Your Tech Path at Jade D’val</h3>
        <p className="mt-2 text-white max-md:font-normal max-md:text-sm max-md:max-w-[229px]">
          Decide what excites you most—whether it’s coding, design, data, or
          product. At Jade D’val, we offer specialized tracks to guide your
          journey in tech.
        </p>
      </div>
      {/* {title, description, className} */}
    </div>
  );
};

export default StepCard;
