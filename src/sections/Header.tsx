import { logo } from "@/assets/images";
import { Button } from "@/components";
import { useState } from "react";
import Menu from "@/assets/icons/menu.svg?react";
import Close from "@/assets/icons/close.svg?react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const homePage = location.pathname === "/";
  const partnership = location.pathname === "/partnership";
  return (
    <header
      className={` ${
        homePage ? " sm:mx-20" : "md:mx-4 lg:mx-20"
      } pt-7 pl-3 pr-3 relative z-30`}
    >
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-1">
          <div className="max-w-[50px] max-h-[50px]">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="font-raleway font-bold text-white">Jade D'Val </p>
        </div>

        <a href="#enroll" className="max-sm:hidden">
          {homePage ? (
            <Button
              children="Enroll Now"
              className="px-4 md:px-8 py-2 md:py-3.5 rounded-md"
            />
          ) : (
            <ul className="flex gap-8">
              <li>
                <a
                  className="text-white hover:text-primary transition-colors duration-100"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-primary transition-colors duration-100"
                  href="/partnership"
                >
                  Partnerships
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-primary transition-colors duration-100"
                  href="#highlights"
                >
                  Highlights
                </a>
              </li>
            </ul>
          )}
        </a>

        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button onClick={() => setToggle((prev) => !prev)}>
            {toggle ? (
              <Close className="text-white transition-all duration-300 " />
            ) : (
              <Menu className="text-white transition-all duration-300 " />
            )}
          </button>
          {toggle && (
            <div className="absolute py-3 px-6 animate-slide-top rounded-md bg-white/5 backdrop-blur-md z-10 right-0 top-10">
              <ul className="space-y-3 ">
                <li>
                  <a
                    href="/"
                    className="text-white hover:text-primary transition-colors duration-100"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/partnership"
                    className="text-white hover:text-primary transition-colors duration-100"
                  >
                    Partner
                  </a>
                </li>
                {homePage && (
                  <li>
                    <a
                      href="/#enroll"
                      className="text-white hover:text-primary transition-colors duration-100"
                    >
                      Enroll
                    </a>
                  </li>
                )}
                {partnership && (
                  <li>
                    <a
                      className="text-white hover:text-primary transition-colors duration-100"
                      href="#highlights"
                    >
                      Highlights
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
