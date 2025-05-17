import { logo } from "@/assets/images";

const Header = () => {
  return (
    <header className="sm:mx-20 pt-7 pl-5 pr-3">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-1">
          <div className="max-w-[50px] max-h-[50px]">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="font-raleway font-bold text-white">Jade D'Val </p>
        </div>
        <button
          type="button"
          className="py-[13.5px] px-8 text-lg text-white bg-primary rounded-md"
        >
          Enroll Now
        </button>
      </div>
    </header>
  );
};

export default Header;
