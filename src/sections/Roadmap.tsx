import StepCard from "@/components/StepCard";
// import { checkCircle } from "@/assets/icons";

const steps = [
  {
    step: "01",
    title: "Choose Your Tech Path at Jade D’val",
    description:
      "Decide what excites you most—whether it’s coding, design, data, or product...",
  },
  {
    step: "02",
    title: "Learn by Doing (with Projects & Challenges)",
    description: "Dive into hands-on projects and real-world scenarios...",
  },
  {
    step: "03",
    title: "Join the Jade D’val Community",
    description: "Collaborate with mentors and fellow learners...",
  },
  {
    step: "04",
    title: "Build Your Portfolio & Personal Brand",
    description: "Showcase your work in a professional portfolio...",
  },
  {
    step: "05",
    title: "Launch Your Career",
    description: "Use your Jade D’val experience as a springboard...",
  },
];

const Roadmap = () => {
  return (
    <section className="bg-primary/5 overflow-hidden">
      <div className="sm:mx-20 max-sm:px-6 ">
        <h2 className="pt-17.5 mb:pb-6 mb-10 max-sm:text-2xl text-center">
          Roadmap to Becoming a Techstar
        </h2>

        <div className="relative flex flex-col items-center gap-6 bg-blue-100">
          <div className="absolute max-lg:hidden h-full lg:right-1/2 max-lg:left-3  transform lg:translate-x-1/2 border-black border-2 border-dashed" />
          {/* vertical bar */}

          <div className="bg-emerald-100 flex items-center gap-6">
            <div className="flex flex-col items-center relative bg-amber-100">
              {/* circle */}
              <div className="h-7.5 w-7.5 flex justify-center items-center border border-secondary rounded-full ">
                <div className=" h-5 w-5 bg-secondary rounded-full" />
              </div>
              {/* Step No. */}
              <p className="md:text-xl text-sm text-text3">Step</p>
              <h3 className="md:text-5xl text-2xl">03</h3>
              {/* vertical bar mobile */}
              <div className="absolute border-2 border-black md:h-[80%] h-[170%] border-dashed right-1/2 top-[100%]" />
            </div>

            <StepCard />
          </div>
          
          <div className="bg-emerald-100 flex items-center gap-6">
            <div className="flex flex-col items-center relative bg-amber-100">
              {/* circle */}
              <div className="h-7.5 w-7.5 flex justify-center items-center border border-secondary rounded-full ">
                <div className=" h-5 w-5 bg-secondary rounded-full" />
              </div>
              {/* Step No. */}
              <p className="md:text-xl text-sm text-text3">Step</p>
              <h3 className="md:text-5xl text-2xl">03</h3>
              {/* vertical bar mobile */}
              <div className="absolute border-2 border-black md:h-[80%] h-[150%] border-dashed right-1/2 top-[100%]" />
            </div>

            <StepCard />
          </div>
          
         
          
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

