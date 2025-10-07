import { Badge, Users, TrendingUp, Globe, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const impactStats = [
  { number: "500+", label: "Graduates", icon: Users },
  { number: "85%", label: "Placement Rate", icon: TrendingUp },
  { number: "50+", label: "Partner Companies", icon: Building },
  { number: "20+", label: "Countries Reached", icon: Globe },
];

const testimonials = [
  {
    quote:
      "Jade D'val Tech Academy graduates bring exceptional skills and fresh perspectives to our team. They're not just technically competent—they're innovative problem solvers.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp Africa",
    company: "TechCorp",
  },
  {
    quote:
      "Partnering with the academy has been transformative. We've found outstanding talent and made a meaningful impact on the next generation of African tech leaders.",
    author: "Michael Okafor",
    role: "Head of Talent, InnovateLabs",
    company: "InnovateLabs",
  },
  {
    quote:
      "Jade D'val Tech Academy graduates bring exceptional skills and fresh perspectives to our team. They're not just technically competent—they're innovative problem solvers.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp Africa",
    company: "TechCorp",
  },
  {
    quote:
      "The collaboration has redefined how we approach tech education. These graduates hit the ground running.",
    author: "Aisha Bello",
    role: "Engineering Manager, CodeWorks",
    company: "CodeWorks",
  },
  {
    quote:
      "Partnering with the academy has been transformative. We've found outstanding talent and made a meaningful impact on the next generation of African tech leaders.",
    author: "Michael Okafor",
    role: "Head of Talent, InnovateLabs",
    company: "InnovateLabs",
  },
];

const OurImpact = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  return (
    <section className="py-10 sm:py-16 px-6 bg-[#EFF7F7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="md:text-3xl text-center font-bold mb-8 md:mb-10 text-foreground">
          Our Impact & Reach
        </h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`${
                  index === 0 ? "ml-8" : ""
                } shadow-card min-w-full sm:min-w-[432px]`}
              >
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <Badge className="mt-2">{testimonial.company}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
