import {
  courseImg1,
  courseImg2,
  courseImg3,
  courseImg4,
  jadeStar1,
  jadeStar2,
  jadeStar3,
  jadeStar4,
  jadeStar5,
} from "@/assets/images";
import location from "@/assets/icons/location.svg?react";
import mail from "@/assets/icons/mail.svg?react";
import telephone from "@/assets/icons/telephone.svg?react";
import {facebook, instagram, linkedin, twitter, whatsapp} from "@/assets/icons";


export const courses: {
  id: string;
  title: string;
  description: string;
  image: string;
  linkText: string;
}[] = [
  {
    id: "UI/UX-design",
    title: "UI/UX Design",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg1,
    linkText: "Enroll Now",
  },
  {
    id: "Frontend-development",
    title: "Frontend Development",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg2,
    linkText: "Enroll Now",
  },
  {
    id: "Backend-development",
    title: "Backend Development",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg3,
    linkText: "Enroll Now",
  },
  {
    id: "Blockchain-technology",
    title: "Blockchain Technology",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg4,
    linkText: "Enroll Now",
  },
];

type Steps = { step: string; title: string; description: string }[];

export const steps: Steps = [
  {
    step: "01",
    title: "Choose Your Tech Path at Jade D’val",
    description:
      "Decide what excites you most—whether it’s coding, design, data, or product. At Jade D’val, we offer specialized tracks to guide your journey in tech.",
  },
  {
    step: "02",
    title: "Learn by Doing (with Projects & Challenges)",
    description:
      "Dive into hands-on projects and real-world scenarios designed to help you apply what you learn. Build websites, apps, interfaces, and more—step by step.",
  },
  {
    step: "03",
    title: "Join the Jade D’val Community",
    description:
      "Collaborate with mentors and fellow learners. Ask questions, get feedback, and grow in a supportive, like-minded network of aspiring techies.",
  },
  {
    step: "04",
    title: "Build Your Portfolio & Personal Brand",
    description:
      "As you complete projects, showcase your work in a professional portfolio. We’ll help you stand out to employers and clients with practical, job-ready skills.",
  },
  {
    step: "05",
    title: "Launch Your Career",
    description:
      "Use your Jade D’val experience as a springboard into internships, freelance gigs, or full-time tech roles. We’ll support you with resources, mock interviews, and job-hunting tips.",
  },
];

export const jadeStars: { star: string }[] = [
  { star: jadeStar1 },
  { star: jadeStar2 },
  { star: jadeStar3 },
  { star: jadeStar4 },
  { star: jadeStar5 },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Build Your Portfolio & Personal Brand",
    answer:
      "As you complete projects, showcase your work in a professional portfolio. We’ll help you stand out to employers and clients with practical, job-ready skills.",
  },
  {
    question: "How long do I have access to course materials?",
    answer:
      "Once enrolled, you have lifetime access to all course materials, including future updates. You can learn at your own pace and revisit lessons whenever you need to refresh your knowledge.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Prerequisites vary by course. Our beginner-level courses assume no prior experience, while advanced courses may require foundational knowledge. Each course description clearly outlines any prerequisites needed for success.",
  },
  {
    question: "What kind of support is available during the course?",
    answer:
      "We provide comprehensive support through multiple channels: a dedicated Q&A forum, weekly live sessions with instructors, and a community platform where you can connect with peers. Pro and Enterprise plans include additional 1-on-1 mentoring sessions.",
  },
  {
    question: "Are the certifications recognized by employers?",
    answer:
      "Our program prepares you for industry-recognized certifications from providers like AWS, Microsoft, Google, and CompTIA. We also provide our own course completion certificates, which are valued by many employers as evidence of practical skill development.",
  },
];

type Footer = {
  icon: React.ElementType ;
  title: string;
  description?: string;
  phones?: { phone: string }[];
}[];
export const footerItems: Footer = [
  {
    icon: location,
    title: "Location",
    description: "#23 Charpey, Ogun, Ogun State.",
  },
  {
    icon: mail,
    title: "Email",
    description: "#23 Charpey, Ogun, Ogun State.",
  },
  {
    icon: telephone,
    title: "Phone",
    phones: [
      { phone: "+234-903-667-2345" },
      { phone: "+234-345-678-0987" },
    ],
  },
];
export const socialIcons: {
  icon: string;
  link: string;
  alt: string;
}[] = [
  {
    icon: twitter,
    link: "https://twitter.com",
    alt: "twitter_logo",
  },
  {
    icon: instagram,
    link: "https://instagram.com",
    alt: "instaram_logo",
  },
  {
    icon: facebook,
    link: " https://facebook.com",
    alt: " facebook_logo",
  },
  {
    icon: linkedin,
    link: " https://linkedin.com",
    alt: " facebook_logo",
  },
  {
    icon: whatsapp,
    link: " https://whatsapp.com",
    alt: " facebook_logo",
  },
];
