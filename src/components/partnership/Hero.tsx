import { partnershipHero } from "@/assets/images";
// import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import Header from "@/sections/Header";
import {
  Users,
  Target,
  Globe,
  ArrowRight,
  BookOpen,
  Heart,
} from "lucide-react";
// import PartnerDialog from "../PartnerDialog";

const Hero = () => {
  return (
    <section
      className=" bg-cover bg-top relative h-screen"
      style={{
        background: `url(${partnershipHero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Header />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-primary/25 to-black/50" />
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto py-10 sm:py-16 lg:py-20 px-6 z-10">
        {/* Impact Badge */}
        <div className="flex w-fit mx-auto items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full max-sm:text-sm px-4 sm:px-6 py-3 mb-8 sm:mb-12">
          <Heart className="h-4 w-4 text-white" />
          <span className="text-white font-satoshi font-medium">
            Transforming Lives Through Technology
          </span>
        </div>
        
        <div className="text-center mb-12 ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-raleway">
            Partner with us to{" "}
            <span className="text-secondary">Empower Africa's Youth </span>
            {/* at Jade D'val Tech Academy */}
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Join us in the mission to bridge Africa's tech talent gap through
            quality education, innovation, and community empowerment.
          </p>
        </div>

        {/* Featured Partnership Card */}
        {/* <Card className="mb-16 shadow-hero border border-white/30 backdrop-blur-md bg-white/10 ">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Partner with us to empower Africa's youth
                </h2>
                <p className="text-white mb-6 leading-relaxed">
                  Support the next generation of African tech leaders. From
                  scholarships to corporate partnerships, discover how you can
                  make a lasting impact while building your talent pipeline.
                </p>

                <PartnerDialog
                  button={
                    <>
                      {" "}
                      Start Partnership Discussion
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  }

                  buttonStyles="w-full"
                />
              </div>
              <div className="hidden md:block">
                <img
                  src={heroStudents}
                  alt="Students collaborating"
                  className="rounded-lg shadow-card w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Key Impact Stats - Clean Inline Design */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-8 mb-10">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 border border-white/20">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="sm:text-2xl font-bold font-satoshi text-white">
                500+
              </div>
              <div className="text-sm text-white/80 font-raleway">
                Lives Changed
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 border border-white/20">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="sm:text-2xl font-bold font-satoshi text-white">
                85%
              </div>
              <div className="text-sm text-white/80 font-raleway">
                Career Success
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 border border-white/20">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="sm:text-2xl font-bold font-satoshi text-white">
                15+
              </div>
              <div className="text-sm text-white/80 font-raleway">
                Communities
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 font-satoshi font-semibold bg-secondary hover:bg-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Join Our Mission
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 font-satoshi font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-lg"
          >
            See Impact Stories
            <BookOpen className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
