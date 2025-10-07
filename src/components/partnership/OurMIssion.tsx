import { Target, Users, Lightbulb, Heart } from "lucide-react";
import { community, innovation, inclusivity } from "@/assets/images";

export const OurMission = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Fostering creative problem-solving and cutting-edge technology solutions",
      image: innovation,
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "Creating opportunities for underrepresented communities in tech",
      image: inclusivity,
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Maintaining the highest standards in education and professional development",
      image: inclusivity,
    },
    {
      icon: Heart,
      title: "Community Growth",
      description:
        "Building sustainable tech ecosystems across African communities",
      image: community,
    },
  ];

  return (
    <section className="py-10 sm:py-16  px-6 md:px-25 bg-[#EFF7F7]c">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2>Our Mission & Vision</h2>
            <div className="space-y-4 lg:space-y-6 text-lg mt-4 lg:mt-6">
              <p className="md:text-lg leading-6">
                At Jade D'val Tech Academy, we are dedicated to{" "}
                <span className="text-primary font-semibold">
                  bridging the tech talent gap
                </span>{" "}
                across Africa through world-class, hands-on education that
                nurtures innovation and empowers underrepresented communities.
              </p>
              <p className="md:text-lg leading-6">
                Our comprehensive programs provide not just technical skills,
                but also mentorship, real-world project experience, and the
                professional network needed to launch successful careers in
                technology.
              </p>
              <p className="md:text-lg leading-6">
                We believe that by investing in Africa's tech talent today,
                we're building the foundation for the continent's digital
                transformation and economic prosperity tomorrow.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl p-6 hover:shadow-lg transition-all duration-300 group h-50 md:h-56"
                style={{
                  backgroundImage: `url(${value?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Lighter gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-black/50 group-hover:from-primary/50 group-hover:via-primary/40 group-hover:to-black/40 transition-all duration-300"/>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold font-satoshi text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm font-raleway text-white/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
