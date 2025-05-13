import { checkCircle } from "@/assets/icons";


type Card = {
  title: string,
  description: string
}

const StepCard = ({ title, description }: Card) => {
  return (
    <div className="md:px-12.5 px-5 py-6.25 flex justify-center items-start rounded-[40px] md:rounded-full lg:max-w-[527px] md:max-w-[509px] sm:max-w-[320px]  max-w-[273px] gap-5 bg-primary">
      <div className="md:flex hidden w-16 h-16 items-center justify-center rounded-full bg-white">
        <img src={checkCircle} alt="checkedCircle" className="w-10 h-10" />
      </div>
      <div className="flex-1">
        <h3 className="text-white max-md:text-base">{title}</h3>
        <p className="mt-2 text-white max-md:font-normal max-md:text-sm max-sm:max-w-[229px] max-md:max-w-[280px]">{description}</p>
      </div>
      {/* {title, description, className} */}
    </div>
  );
};

export default StepCard;
