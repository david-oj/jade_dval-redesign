import { hackathon as hackathonImg } from "@/assets/images";
import { ArrowRight } from "lucide-react";
import PartnerDialog from "../PartnerDialog";

const CTA = () => {
  return (
    <section className="py-10 sm:py-16 md:px-25 px-6 ">
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <img
          src={hackathonImg}
          alt="Students working at a hackathon event"
          className="w-full h-80 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"/>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl mx-auto px-8 text-center lg:text-left lg:ml-12">
            <h3 className="text-xl lg:text-4xl font-bold font-raleway text-white mb-4">
                Ready to Make an Impact?
            </h3>
            <p className="text-sm max-sm:leading-[150%] sm:text-lg font-satoshi text-white/90 mb-6 leading-relaxed">
              Join leading organizations who are already transforming lives and
              building Africa's tech future through strategic partnerships.
            </p>
            <PartnerDialog
              button={
                <>
                  Start Your Partnership Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              }
            //   buttonStyles="font-semibold"
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
