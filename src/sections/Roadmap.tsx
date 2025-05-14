import StepCard from "@/components/StepCard";
import {steps} from "@/constants";

const Roadmap = () => {
  return (
    <section className="bg-primary/5 overflow-hidden">
      <div className="md:mx-20 max-sm:px-6 ">
        <h2 className="mt-17.5 md:mb-6 mb-10 max-sm:text-2xl text-center">
          Roadmap to Becoming a Techstar
        </h2>

        <div className="relative lg:mb-10 lg:pb-10 mb-12 flex flex-col max-lg:items-center gap-6">
          {/* vertical bar */}
          <div className="absolute max-lg:hidden h-full lg:right-1/2 max-lg:left-3  transform lg:translate-x-1/2 border-black border-2 border-dashed" />
          {/* bullet point top and bottom */}
          <div className="h-5 w-5 max-lg:hidden bg-secondary rounded-full z-10 self-center"/>
          <div className="h-5 w-5 bg-secondary max-lg:hidden rounded-full z-10 absolute self-center bottom-0"/>

          {/* steps */}
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return isEven ? (
              <div
                className="lg:grid grid-cols-2 flex justify-end items-center flex-row-reverse gap-6"
                key={idx}
              >
                <div
                  className={`flex justify-end  ${isEven ? " lg:mr-7.5 xl:mr-12.5" : " lg:ml-7.5 xl:ml-12.5"
                    }`}
                >
                  <StepCard {...step} />
                </div>
                <div className="flex flex-col lg:ml-10 xl:ml-16 max-lg:items-center relative">
                  {/* circle mobile */}
                  <div className="h-7.5 w-7.5 lg:absolute top-1/2 -left-16.5  xl:-left-22.5  flex justify-center items-center border border-secondary rounded-full ">
                    <div className=" h-5 w-5 bg-secondary rounded-full" />
                  </div>
                  {/* Step No. */}
                  <p className="md:text-xl text-sm text-text3">Step</p>
                  <h3 className="md:text-5xl text-2xl">{step.step}</h3>
                  {/* vertical bar mobile */}
                   <div className={`absolute ${idx === steps.length - 1 ? "hidden" : "block"} lg:hidden  border-2 border-black md:h-[50%] h-[115%] border-dashed transform translate-x-1/2 right-1/2 top-[100%]`} />
                </div>
              </div>
            ) : (
              <div
                className=" lg:grid grid-cols-2 flex items-center gap-6"
                key={idx}
              >
                <div className="flex flex-col lg:mr-10 xl:mr-16 items-end max-lg:items-center relative">
                  {/* circle mobile */}
                  <div className="h-7.5 w-7.5 lg:absolute top-1/2 lg:-right-16.5 xl:-right-22.5 flex justify-center items-center border border-secondary rounded-full ">
                    <div className=" h-5 w-5 bg-secondary rounded-full" />
                  </div>
                  {/* Step No. */}
                  <p className="md:text-xl text-sm text-text3">Step</p>
                  <h3 className="md:text-5xl text-2xl">{step.step}</h3>
                  {/* vertical bar mobile */}
                   <div className={`absolute ${idx === steps.length - 1 ? "hidden" : "block"} lg:hidden  border-2 border-black md:h-[50%] h-[115%] border-dashed transform translate-x-1/2 right-1/2 top-[100%]`} />
                </div>
                <div
                  className={`flex  ${isEven ? "justify-end  lg:mr-7.5 xl:mr-12.5" : " lg:ml-7.5 xl:ml-12.5"
                    }`}
                >
                  <StepCard {...step} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
