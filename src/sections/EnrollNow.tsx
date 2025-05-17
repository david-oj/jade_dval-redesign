import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components";
import { formImage } from "@/assets/images";
import Mail from "@/assets/icons/mail.svg?react";

type FormData = {
  fullName: string;
  email: string;
  tel: string;
  course: string;
  ownLaptop: string;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  tel: "",
  course: "",
  ownLaptop: "",
};

const EnrollNow = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="enroll" className="md:mx-25 max-md:px-6 mt-7 sm:mt-19.5 sm:mb-8 mb-4.5">
      <div className="flex max-sm:flex-col-reverse gap-8 sm:items-center justify-between i">
        <div className="flex-1 shadow-sm rounded-lg sm:px-10 sm:py-8 p-4">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Email</label>
              <div className="flex gap-3 pl-3 items-center rounded-lg border h-10 ">
                <Mail/>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="p-0 px-3 h-full mt-0 border-none rounded-r-lg rounded-none "
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Phone Number</label>
              <div className="flex rounded-lg border h-10 ">
                <span className="flex items-center px-3 bg-[#E5E5E5]/25 border-r">
                  <p className="text-subtle">+234</p>
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  className="p-0 px-3 mt-0 rounded-r-lg border-none rounded-none "
                  name="tel"
                  id="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Course</label>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option selected disabled>
                  Select Course
                </option>
                <option value="Frontend Development">
                  Frontend Development
                </option>
                <option value="Backend Development">Backend Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Blockchain Technology">
                  Blockchain Technology
                </option>
              </select>
            </div>

            <div>
              <label>Do you have a laptop?</label>
              <select
                name="ownLaptop"
                id="ownLaptop"
                required
              >
                <option value="Select" disabled selected>
                  Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <Button
              type="submit"
              children="Enroll Now"
              className="rounded-4 text-sm py-[10.5px]"
            />
          </form>
        </div>
        <div className="flex-1 flex flex-col gap-4 max-sm:text-center">
          <h2>Ready to Start Your Tech Journey with Jade D’val?</h2>
          <p>
            Join the Jade D’val community and become part of the next generation
            of African Techstars. Whether you're starting from scratch or
            leveling up your skills, we’ve got a course for you.
          </p>
          <div className="max-sm:h-[177px] sm:max-h-[327px] rounded-2xl overflow-hidden">
            <img src={formImage} alt="" className="w-full h-full object-cover " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollNow;
