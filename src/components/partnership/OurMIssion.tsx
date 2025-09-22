import { Target, Users, Lightbulb, Heart } from "lucide-react";

export const OurMission = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Fostering creative problem-solving and cutting-edge technology solutions",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "Creating opportunities for underrepresented communities in tech",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Maintaining the highest standards in education and professional development",
    },
    {
      icon: Heart,
      title: "Community Growth",
      description:
        "Building sustainable tech ecosystems across African communities",
    },
  ];

  return (
    <section className="my-10 sm:my-20 md:mx-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2>
              Our Mission & Vision
            </h2>
            <div className="space-y-4 lg:space-y-6 text-lg mt-4 lg:mt-6">
              <p className="text-lg">
                At Jade D'val Tech Academy, we are dedicated to{" "}
                <span className="text-primary font-semibold">
                  bridging the tech talent gap
                </span>{" "}
                across Africa through world-class, hands-on education that
                nurtures innovation and empowers underrepresented communities.
              </p>
              <p>
                Our comprehensive programs provide not just technical skills,
                but also mentorship, real-world project experience, and the
                professional network needed to launch successful careers in
                technology.
              </p>
              <p>
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
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold font-satoshi text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm font-raleway text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
