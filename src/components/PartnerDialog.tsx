// components/PartnerWithUsDialog.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components";
import { API_BASE } from "@/lib/api";

type PartnerForm = {
  name: string;
  email: string;
  phone: string;
  howWouldYouLikeToPartner: string;
};

const initialPartnerForm: PartnerForm = {
  name: "",
  email: "",
  phone: "",
  howWouldYouLikeToPartner: "",
};

const PartnerDialog = () => {
  const [form, setForm] = useState<PartnerForm>(initialPartnerForm);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [statusColor, setStatusColor] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setSubmittedEmail(form.email);
    setSubmittedName(form.name);
    try {
      const res = await fetch(`${API_BASE}/partner`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        setStatusColor("text-red-400");
        throw new Error(err.message || "Submission failed");
      } else {
        // const success = await res.json();
        // setStatusColor("text-primary");
        // setSubmitMsg(success.message);
        setSuccessModal(true);
        setSubmitMsg(null);
      }
    } catch (error) {
      setSubmitMsg(
        error instanceof Error ? error.message : "Submission failed"
      );
    } finally {
      setSubmitting(false);
      setForm(initialPartnerForm);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          children="Become a partner"
          bgColor="bg-white"
          textColor="text-primary"
          className="max-w-[327px] py-[10.5px] text-sm"
        />
      </DialogTrigger>
      <DialogContent className="shadow-sm rounded-lg p-4 sm:px-10 sm:py-8 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="">Partner With Us</DialogTitle>
          <DialogDescription>
            Fill out the form below and we’ll be in touch shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 ">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+234 801 234 5678"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              How would you like to partner?
            </label>
            <textarea
              id="howWouldYouLikeToPartner"
              name="howWouldYouLikeToPartner"
              rows={4}
              placeholder="Tell us your idea..."
              value={form.howWouldYouLikeToPartner}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-primary resize-none"
            />
          </div>
          <Button
            type="submit"
            children={submitting ? "Submitting..." : "Submit"}
            disabled={submitting}
            className=" py-2 text-sm"
          />

          {submitMsg && (
            <p className={`${statusColor}`} aria-live="assertive">
              {submitMsg}
            </p>
          )}

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
                <h3 className="text-xl font-semibold mb-3">
                  Partnership Request Received
                </h3>
                <p className="mb-2">
                  Thank you, <strong>{submittedName}</strong>! We’ve received
                  your request.
                </p>
                <p className="mb-6">
                  An email has been sent to <strong>{submittedEmail}</strong>.
                  We’ll be in touch to discuss next steps.
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDialog;
