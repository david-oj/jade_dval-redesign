// components/PartnerWithUsDialog.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components";

type PartnerForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialPartnerForm: PartnerForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const PartnerDialog = () => {
  const [form, setForm] = useState<PartnerForm>(initialPartnerForm);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => setForm(initialPartnerForm))
      .catch(console.error);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
       <Button children="Become a partner" bgColor="bg-white" textColor="text-primary" className="max-w-[327px] py-[10.5px] text-sm" />
      </DialogTrigger>
      <DialogContent className="shadow-sm rounded-lg p-4 sm:px-10 sm:py-8 max-w-[365px] sm:max-w-md">
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
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              How would you like to partner?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us your idea..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" children="Submit"  className=" py-2 text-sm" />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PartnerDialog;