import { logo } from "@/assets/images";
import { Button } from "@/components";
import { useState } from "react";
import Menu from "@/assets/icons/menu.svg?react";
import Close from "@/assets/icons/close.svg?react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="sm:mx-20 pt-7 pl-5 pr-3">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-1">
          <div className="max-w-[50px] max-h-[50px]">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="font-raleway font-bold text-white">Jade D'Val </p>
        </div>

        <a href="#enroll" className="max-sm:hidden">
          <Button children="Enroll Now" className=" px-8 py-3.5" />
        </a>
        
        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button onClick={() => setToggle((prev) => !prev)}>
            {toggle ? <Close className="text-white transition-all duration-300 " /> : <Menu className="text-white transition-all duration-300 " />}
          </button>
          {toggle && (
            <div className="absolute animate-slide-top rounded-lg bg-white/10 backdrop-blur-md z-10 right-0 top-10">
              <ul className="space-y-3 py-2 px-3 ">
                <li>
                  <a href="#" className="text-white hover:text-primary transition-colors duration-100">Partner</a>
                </li>
                <li>
                  <a href="#enroll" className="text-white hover:text-primary transition-colors duration-100">Enroll</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
