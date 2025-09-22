import { heroStudents } from "@/assets/images";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Intro = () => {
  return (
    <section className="pt-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Partner with us at Jade D'val Tech Academy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in the mission to bridge Africa's tech talent gap through
            quality education, innovation, and community empowerment.
          </p>
        </div>

        {/* Featured Partnership Card */}
        <Card className="mb-16 shadow-hero border border-primary/20 bg-gradient-subtle">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Partner with us at Jade D'val Tech Academy
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Support the next generation of African tech leaders. From
                  scholarships to corporate partnerships, discover how you can
                  make a lasting impact while building your talent pipeline.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  Start Partnership Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
        </Card>
      </div>
    </section>
  );
};

export default Intro;
