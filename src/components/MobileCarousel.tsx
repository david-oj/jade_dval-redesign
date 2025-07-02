import { ComponentType } from "react";
import Button from "./Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ClampProps } from "./ClampReveal";

type MobileCarouselProps = {
  handleToggle: (id: string) => void;
  handleEnrollClick: (id: string) => void;
  ClampReveal: ComponentType<ClampProps>
  openCourseId: string | null;
  courses: {
    id: string;
    title: string;
    description: string;
    image: string;
    linkText: string;
  }[];
};

const MobileCarousel = ({
  handleToggle,
  handleEnrollClick,
  openCourseId,
  courses,
  ClampReveal
}: MobileCarouselProps) => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="basis-full max-w-[305px]">
            <div className="max-w-[305px] mx-auto">
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
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileCarousel;
