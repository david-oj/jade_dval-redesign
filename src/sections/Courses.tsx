import { courses } from "@/constants";

const Courses = () => {
  return (
    <section className="sm:my-20 mt-7 mb-11 px-6 md:mx-20">
      <div className=" flex flex-col items-center">
      <h2 className="text-center max-sm:text-xl">Find the Perfect Courses For You</h2>

      <div className="flex flex-wrap gap-5 sm:mt-10 mt-6 mb-[10px] md:justify-between justify-center">
        {courses.map((course, idx) => (
          <div className="flex-1 max-w-[305px] min-w-[280px]" key={idx}>
            <div className="h-[200px] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
                <img src={course.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-5 border rounded-[8px]">
                <h3 className="">{course.title}</h3>
                <p className="mt-2 text-[#525252] text-sm flex-grow font-extralight leading-[150%] max-w-[265px]">{course.description}</p>
                <button className="py-[10.5px] mt-4 w-full font-medium text-sm bg-primary/10 text-primary rounded-[10px]">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Courses;
