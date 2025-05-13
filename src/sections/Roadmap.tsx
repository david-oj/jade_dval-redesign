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
          <div className="absolute  h-full top-1/2 translate-y-1/2 lg:right-1/2 max-lg:left-3  transform lg:translate-x-1/2 border-black border-2 border-dashed" />
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
              <div className="absolute border-2 border-black md:h-[80%] h-[150%] border-dashed right-1/2 top-[100%]" />
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

// {/* <div className="space-y-8">
//   {/* <!-- Row 1: Card left, Number right --> */}
//   <div className="grid grid-cols-[auto_8px_auto] items-center gap-4">
//     {/* <!-- Card --> */}
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-medium">Card One</h3>
//       <p className="text-sm text-gray-600">Content for card #1.</p>
//     </div>
//     {/* <!-- Vertical bar --> */}
//     <div className="h-12 bg-gray-300"></div>
//     {/* <!-- Number badge --> */}
//     <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full">
//       1
//     </div>
//   </div>

//   {/* <!-- Row 2: Number left, Card right --> */}
//   <div className="grid grid-cols-[auto_8px_auto] items-center gap-4">
//     {/* <!-- Number badge --> */}
//     <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full">
//       2
//     </div>
//     {/* <!-- Vertical bar --> */}
//     <div className="h-12 bg-gray-300"></div>
//     {/* <!-- Card --> */}
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-medium">Card Two</h3>
//       <p className="text-sm text-gray-600">Content for card #2.</p>
//     </div>
//   </div>

//   {/* <!-- Row 3: Card left, Number right (same as Row 1) --> */}
//   <div className="grid grid-cols-[auto_8px_auto] items-center gap-4">
//     {/* <!-- Card --> */}
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-medium">Card Three</h3>
//       <p className="text-sm text-gray-600">Content for card #3.</p>
//     </div>
//     {/* <!-- Vertical bar --> */}
//     <div className="h-12 bg-gray-300"></div>
//     {/* <!-- Number badge --> */}
//     <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full">
//       3
//     </div>
//   </div>
// </div> */}

{
  /* <div
  className={`md:col-span-4 ${
    isLeft ? "md:col-start-1" : "md:col-start-6"
  } flex justify-${
    isLeft ? "end" : "start"
  } md:px-12.5 px-5 py-6.25 rounded-[40px] md:rounded-full bg-primary  md:items-center`}
  key={idx}
>
  <div className="md:flex hidden w-16 h-16 items-center justify-center rounded-full bg-white">
    <img src={checkCircle} alt="checkedCircle" className="w-10 h-10" />
  </div>
  <div className="">
    <h3 className="text-white max-md:text-base">{step.title}</h3>
    <p className="mt-2 text-white max-md:font-normal max-md:text-sm max-md:max-w-[229px]">
      {step.description}
    </p>
  </div>
</div>; */
}

// import StepCard from "@/components/StepCard";

// const Roadmap = () => {
//   return (
//     <section className="bg-primary/5 overflow-hidden">
//       <div className="sm:mx-20 max-sm:px-6 ">
//         <h2 className="pt-17.5 mb:pb-6 mb-10 max-sm:text-2xl text-center">
//           Roadmap to Becoming a Techstar
//         </h2>

//         <div className="relative pb-6 flex flex-col gap-8">
//           <div className="absolute border-2 border-dashed md:right-1/2 transform md:translate-x-1/2 border-black h-full"/>

//           <div className="flex max-md:flex-row-reverse max-md:max-w-[369px]  bg-blue-100 flex-1 items-center gap-10">
//             <StepCard />
//             <div className=" bg-amber-100">
//               <p className="text-xl text-text3">Step</p>
//               <h3 className="text-5xl">01</h3>
//             </div>
//           </div>

//           <div className="flex max-md:flex-row-reverse max-md:max-w-[369px]  flex-1 items-center gap-10">
//             <StepCard />
//             <div className=" bg-amber-100">
//               <p className="text-xl text-text3">Step</p>
//               <h3 className="text-5xl">02</h3>
//             </div>
//           </div>

//           {/* <div className="flex items-center gap-10">
//             <StepCard />
//             <div>
//               <p className="text-xl text-text3">Step</p>
//               <h3 className="text-5xl">03</h3>
//             </div>
//           </div>
//            */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmap;
