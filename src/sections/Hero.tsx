import { heroImage } from "@/assets/images";
import { Button } from "@/components";
import Star from "@/assets/icons/Star.svg?react";

const Hero = () => {
  return (
    <section  className="sm:mx-25 pt-10 max-sm:px-6">
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="flex self-center flex-col flex-1 gap-6 max-md:w-full max-md:text-center">
          <h1 className="text-white bg max-w-[640px] lg:text-5xl md:text-3xl text-2xl leading-[120%] font-satoshi font-bold">
            Your Tech Journey Starts <br className="max-sm:block hidden" /> With
            <span className="text-primary"> Jade D’Val</span>. Don’t Just{" "}
            <br className="block sm:hidden" /> Watch the Future, Build It.
          </h1>
          <p className="font-satoshi text-base lg:text-2xl text-white font-medium max-w-[620px] leading-[120%]">
            Join thousands of learners across Africa{" "}
            <br className="max-sm:block hidden" /> gaining in-demand tech
            skills. Choose a <br className="max-sm:block hidden" /> course and
            start building your future now.
          </p>
          <a href="#enroll">
            <Button children="Enroll Now" className="sm:max-w-[327px] py-[15.5px] max-md:self-center" />
          </a>
        </div>

        <div className="flex-1 max-h-[618px] relative max-md:self-center max-w-[600px] max-md:w-[76%] max-md:mt-5 ">
             {/* Star 1 - top Left */}
            <Star className="absolute max-lg:w-[27px] max-md:h-[26px] top-[2%] md:top-[13%] left-[3%] lg:left-[2%]"/>
             {/* Star 2 - middle right */}
            <Star className="absolute max-lg:w-[27px] max-md:h-[26px] right-0 top-[16%] md:top-[30%]"/>
             {/* Star 3 - Bottom Left */}
            <Star className="absolute max-lg:w-[27px] max-md:h-[26px] bottom-[51%] md:bottom-[39.5%] -left-[5%] lg:-left-[8%]"/>
          <img
            src={heroImage}
            alt="hero image"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
