import { jadeStars } from "@/constants";
import { Button } from "@/components";

const JadeStarCTA = () => {
  return (
    <section className="md:mx-25 max-h-[488px] overflow-hidden max-md:px-6 mt-[71px] mb-19.5">
      <div className="flex @container items-center lg:px-16 px-6 lg:gap-25.5 md:gap-16 mx-auto max-md:max-w-lg rounded-[28px] bg-primary/5">
        <div className="flex flex-1 max-h-[488px] max-md:hidden overflow-hidden items-center gap-4.5">
          <div className="flex flex-col lg:gap-5 gap-2">
            {jadeStars.map(
              (star, idx) =>
                idx < 2 && (
                  <div
                    key={idx}
                    className="max-w-[186px] max-h-[162px] rounded-2xl overflow-hidden"
                  >
                    <img
                      src={star.star}
                      alt="jade_d'val_stars"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
            )}
          </div>
          <div className="flex flex-col max-md:py-2 lg:gap-5 gap-2">
            {jadeStars.map(
              (star, idx) =>
                idx > 1 && (
                  <div key={idx} className="max-w-[186px] max-h-[162px] rounded-2xl overflow-hidden">
                    <img
                      src={star.star}
                      alt="jade_d'val_stars"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
            )}
          </div>
        </div>

        <div className="max-w-[484px] flex-1 max-md:items-center max-md:text-center flex flex-col gap-4 sm:gap-6">
          <h2 className="max-sm:text-xl ">
            Join the Movement. Become a Jade Star.
          </h2>
          <p className="max-sm:text-sm max-md:leading-[150%]">
            Jade D’val is more than a tech academy—it’s a launchpad. <br />
            Enroll in hands-on programs, work with mentors, and unlock global
            opportunities. The future of tech is waiting for you.
          </p>
          <Button children="Enroll Now" className="max-w-[250px] py-[10.5px]" />
        </div>
      </div>
    </section>
  );
};

export default JadeStarCTA;

{
  /* <div className="">
  {jadeStars.map(
    (star, idx) =>
      idx < 2 && (
        <div key={idx} className="flex gap-6">
          <div className="max-w-[186px] h-[162px]">
            <img src={star.star} alt="" className="w-full h-full" />
          </div>
        </div>
      )
  )}
</div>; */
}
