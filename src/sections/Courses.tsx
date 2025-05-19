import { courses } from "@/constants";
import { Button } from "@/components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Courses = () => {
  // This function handles the click event on the enroll button and redirects
  // the user to the enroll section with the course id as a hash parameter.
  const handleEnrollClick = (courseId: string) => {
    window.location.hash = `#enroll?course=${encodeURIComponent(courseId)}`;
  };

  return (
    <section className="sm:my-20 mt-7 mb-11 max-md:pl-6 md:mx-20">
      <div className="flex flex-col items-center">
        <h2 className="text-center max-sm:text-xl">
          Find the Perfect Courses For You
        </h2>

        {/* Desktop View */}
        <div className="flex flex-wrap gap-5 sm:mt-10 mt-6 mb-[10px] md:justify-between justify-center max-md:hidden">
          {courses.map((course, idx) => (
            <div className="flex-1 max-w-[305px] min-w-[270px]" key={idx}>
              <div className="h-[200px] rounded-t-[20px] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 border rounded-[8px]">
                <h3 className="">{course.title}</h3>
                <p className="mt-2 text-[#525252] text-sm flex-grow font-extralight leading-[150%] max-w-[265px]">
                  {course.description}
                </p>

                <Button
                  type="button"
                  children="Enroll Now"
                  className="py-[10.5px] mt-4 text-sm bg-primary/10"
                  textColor="text-primary"
                  font="font-satoshi"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Important for nested click handlers
                    handleEnrollClick(course.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="md:hidden w-full overflow-hidden rounded-lg mt-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="basis-full max-w-[305px]"
                >
                  <div className="max-w-[305px] mx-auto">
                    <div className="h-[200px] rounded-t-[20px]  overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 border rounded-[8px]">
                      <h3 className="">{course.title}</h3>
                      <p className="mt-2 text-[#525252] text-sm font-extralight leading-[150%]">
                        {course.description}
                      </p>
                      <Button
                        type="button"
                        children="Enroll Now"
                        className="py-[10.5px] mt-4 text-sm bg-primary/10 w-full"
                        textColor="text-primary"
                        font="font-satoshi"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEnrollClick(course.id);
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Courses;
