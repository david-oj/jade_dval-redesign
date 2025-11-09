import { heroStudents, partnershipHero } from "@/assets/images";

const gridImages = [
  {
    id: 1,
    img: heroStudents,
    alt: "",
    style: "col-span-2 md:col-span-5",
  },
  {
    id: 2,
    img: heroStudents,
    alt: "",
    style: "col-span-2 md:col-span-4",
  },
  {
    id: 3,
    img: heroStudents,
    alt: "",
    style: "max-md:row-start-3 col-span-2 md:col-span-5",
  },
  {
    id: 4,
    img: partnershipHero,
    alt: "",
    style: "row-start-2 col-span-4 md:col-span-9",
  },
  {
    id: 5,
    img: heroStudents,
    alt: "",
    style: "col-span-2 md:col-span-5",
  },
];

const Highlights = () => {
  return (
    <section className="py-10 sm:py-16 px-6 md:px-25 bg-amber-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center">Highlights From The Last Cohort </h2>
        <div className="grid md:grid-cols-14 grid-col-4 gap-3 mt-8">
          {gridImages.map((img) => (
            <div
              className={`${img.style} min-h-50 max-h-50 md:min-h-58 md:max-h-58`}
              key={img.id}
            >
              <img
                src={img.img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-16">
          <h3 className="sm:text-[32px] text-center">
            Speech From The COO{" "}
          </h3>
          <div className="aspect-video mt-8">
            <iframe
              // width="560"
              // height="315"
              className="w-full h-full"
              src="https://www.youtube.com/embed/34Na4j8AVgA?si=cgTjRVTVoggiH0pS"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
