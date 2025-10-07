import { CheckCircle } from "lucide-react";
import { demoDay, startupWorkspace } from "@/assets/images";

const WhyPartner = () => {
  const whyPartner = [
    "Access to a growing network of young African tech talents",
    "Proven track record of successful student placements and startups",
    "High engagement community of learners, mentors, and industry leaders",
    "Opportunity to support digital transformation and social impact at scale",
    "Direct involvement in shaping Africa's tech future",
  ];

  return (
    <section className="py-10 sm:py-16 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="md:text-3xl font-bold mb-8 text-foreground">
              Why Partner With Us?
            </h2>
            <div className="space-y-4">
              {whyPartner.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg shadow-card hover:shadow-lg transition h-50 sm:h-60 overflow-hidden">
              <img
                src={demoDay}
                alt="Students presenting at demo day"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-lg shadow-card hover:shadow-lg transition h-50 sm:h-60 overflow-hidden">
              <img
                src={startupWorkspace}
                alt="Startup workspace collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;
