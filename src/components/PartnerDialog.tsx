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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    console.log("Submitting:", form);

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
        const success = await res.json();
        setStatusColor("text-primary");
        setSubmitMsg(success.message);
        setForm(initialPartnerForm);
      }
    } catch (error) {
      setSubmitMsg(
        error instanceof Error ? error.message : "Submission failed"
      );
    } finally {
      setSubmitting(false);
      console.log("submission Successful");
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDialog;
