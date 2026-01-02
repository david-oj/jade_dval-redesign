import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components";
import { formImage } from "@/assets/images";
import Mail from "@/assets/icons/mail.svg?react";
import { API_BASE } from "@/lib/api";
import { Loader } from "lucide-react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  haveALaptop: string;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  haveALaptop: "",
};

const EnrollNow = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  // Handle hash change to set course & effect auto-scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes("enroll?course=")) {
        const courseId = decodeURIComponent(hash.split("course=")[1]);
        setFormData((prev) => ({ ...prev, interest: courseId }));

        // Force scroll in case browser doesn't auto-scroll
        document
          .getElementById("enroll")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };
    // Initial check
    handleHashChange();
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Function to handle changes in form inputs-
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target; // Destructure name, value, and type from the event target
    const checked = (e.target as HTMLInputElement).checked; // Get the checked property for checkbox inputs

    // Update the formData state with new input values
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Use 'checked' for checkboxes, otherwise use 'value'
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // build payload with the keys your API expects
    const payload = {
      ...formData,
      haveALaptop: formData.haveALaptop === "Yes" ? true : false,
    };

    setSubmittedEmail(payload.email);

    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatusColor("text-red-400");
        const err = await res.json();
        throw new Error(err.message || "Submission failed");
      } else {
        // const success = await res.json();
        // setStatusColor("text-primary");
        // setSubmitMsg(success.message);
        setSuccessModal(true);
        setSubmitMsg(null);
        setFormData(initialFormData);
      }
    } catch (error) {
      setSubmitMsg(
        error instanceof Error ? error.message : "Submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enroll"
      className=" md:mx-25 max-md:px-6 mt-7 sm:mt-19.5 sm:mb-8 mb-4.5"
    >
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
                <Mail />
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
              <label>Whatsapp Number</label>
              <div className="flex rounded-lg border h-10 ">
                <span className="flex items-center px-3 bg-[#E5E5E5]/25 border-r">
                  <p className="text-subtle">+234</p>
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  className="p-0 px-3 mt-0 rounded-r-lg border-none rounded-none "
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Course</label>
              <select
                name="interest"
                id="interest"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Course
                </option>
                <option value="Frontend Development">
                  Frontend Development
                </option>
                <option value="Backend Development">Backend Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile-development">Mobile Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data analysis">Data Analysis</option>
                <option value="Video editing">Video Editing</option>
                <option value="Graphic design">Graphiic Design</option>
                <option value="Audio engineer">Audio Engineering</option>
                <option value="Photo tech">Photo Tech</option>
                <option value="Animation and motion graphics">
                  Animation & Motion Graphics
                </option>
                <option value="Project management">Project Management</option>
              </select>
            </div>

            <div>
              <label>Do you have a laptop?</label>
              <select
                name="haveALaptop"
                id="haveALaptop"
                value={formData.haveALaptop}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <Button
              type="submit"
              children={
                submitting ? (
                  <span className="flex gap-2 items-center justify-center">
                    Submitting <Loader className="size-5 animate-spin" />{" "}
                  </span>
                ) : (
                  " Enroll"
                )
              }
              className="rounded-4 text-sm py-[10.5px] bg-primary/80 cursor-pointer"
              // disabled
            />

            {submitMsg && (
              <p className={`${statusColor} text-sm `} aria-live="assertive">
                {submitMsg}
              </p>
            )}
            <p className="text-muted-foregroun text-sm pt-1">
              {/* Screening is on the 2nd of August */}
              Next cohort registration has begun
            </p>
          </form>

          {successModal && (
            <div
              className="fixed inset-0 flex items-center justify-center z-10"
              aria-modal="true"
              role="dialog"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSuccessModal(false)}
              />

              {/* Modal Content */}
              <div className="relative text-center bg-white rounded-lg shadow-lg max-w-sm w-full p-6 mx-4">
                <h2 className="text-xl font-semibold mb-4">
                  Registration Successful
                </h2>
                <p className="mb-6">
                  Thank you for enrolling! A confirmation email has been sent to{" "}
                  <strong>{submittedEmail || "your inbox"}</strong>.
                </p>
                <Button
                  className="bg-primary text-white py-1 rounded"
                  onClick={() => setSuccessModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4 max-sm:text-center">
          <h2>Ready to Start Your Tech Journey with Jade D’val?</h2>
          <p>
            Join the Jade D’val community and become part of the next generation
            of African Techstars. Whether you're starting from scratch or
            leveling up your skills, we’ve got a course for you.
          </p>
          <div className="max-sm:h-[177px] sm:max-h-[327px] rounded-2xl overflow-hidden">
            <img
              src={formImage}
              alt="Enroll Now"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollNow;
