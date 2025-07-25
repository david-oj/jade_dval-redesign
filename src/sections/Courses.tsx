import { useState, useEffect } from "react";
import { courses } from "@/constants";
import { Button } from "@/components";
import MobileCarousel from "@/components/MobileCarousel";
import ClampReveal from "@/components/ClampReveal";

export default function Courses() {
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);

  const handleToggle = (courseId: string) => {
    setOpenCourseId((prev) => (prev === courseId ? null : courseId));
  };

  // whenever we cross into desktop size, collapse everything
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpenCourseId(null);
      }
    };
    // initial check in case we mounted on desktop
    if (mq.matches) setOpenCourseId(null);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleEnrollClick = (courseId: string) => {
    window.location.hash = `#enroll?course=${encodeURIComponent(courseId)}`;
  };

  return (
    <section className="sm:my-20 mt-7 mb-11 max-md:pl-6 md:mx-20">
      <div className="flex flex-col items-center">
        <h2 className="text-center max-sm:text-xl">
          Find the Perfect Courses For You
        </h2>

        {/* Desktop view */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:mt-10 mt-6 mb-[10px] max-md:hidden">
          {courses.map((course) => (
            <div className="flex-1 relative flex flex-col" key={course.id}>
              <div className="h-[200px] rounded-t-[20px] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="group p-5 border rounded-[8px] flex flex-col">
                <h3>{course.title}</h3>
                <ClampReveal
                  expanded={openCourseId === course.id}
                  onToggle={() => handleToggle(course.id)}
                >
                  {course.description}
                </ClampReveal>

                <Button
                  type="button"
                  className="py-[10.5px] mt-4 text-sm bg-primary/10"
                  textColor="text-primary"
                  font="font-satoshi"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEnrollClick(course.id);
                  }}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden w-full overflow-hidden rounded-lg mt-6">
          <MobileCarousel
            handleToggle={handleToggle}
            openCourseId={openCourseId}
            courses={courses}
            handleEnrollClick={handleEnrollClick}
            ClampReveal={ClampReveal}
          />
        </div>
      </div>
    </section>
  );
}
