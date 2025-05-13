import {
  courseImg1,
  courseImg2,
  courseImg3,
  courseImg4,
} from "@/assets/images";

export const courses: {
  title: string;
  description: string;
  image: string;
  linkText: string;
}[] = [
  {
    title: "UI/UX Design",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg1,
    linkText: "Enroll Now",
  },
  {
    title: "Frontend Development",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg2,
    linkText: "Enroll Now",
  },
  {
    title: "Backend Development",
    description:
      "Learn how to build powerful websites, apps, and digital products using the most in-demand programming languages and frameworks.",
    image: courseImg3,
    linkText: "Enroll Now",
  },
  {
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
      "Decide what excites you most—whether it’s coding, design, data, or product...",
  },
  {
    step: "02",
    title: "Learn by Doing (with Projects & Challenges)",
    description: "Dive into hands-on projects and real-world scenarios...",
  },
  {
    step: "03",
    title: "Join the Jade D’val Community",
    description: "Collaborate with mentors and fellow learners...",
  },
  {
    step: "04",
    title: "Build Your Portfolio & Personal Brand",
    description: "Showcase your work in a professional portfolio...",
  },
  {
    step: "05",
    title: "Launch Your Career",
    description: "Use your Jade D’val experience as a springboard...",
  },
];

type Footer = {
  title: string;
  links: { label: string; href: string }[];
}[];

export const footerLinks: Footer = [
  {
    title: "Courses",
    links: [
      {
        label: "Frontend Development",
        href: "#courses",
      },
      {
        label: "Backend Development",
        href: "#courses",
      },
      {
        label: "UI/UX Design",
        href: "#courses",
      },
      {
        label: "Blockchain Technology",
        href: "#courses",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Us",
        href: "#about",
      },
      {
        label: "Faqs",
        href: "#faqs",
      },
      {
        label: "Contact Us",
        href: "#enroll-form",
      },
      {
        label: "Privacy Policy",
        href: "#",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        label: "Our Partners",
        href: "#",
      },
      {
        label: "Become a partner",
        href: "#",
      },
    ],
  },
];

// export const socialIcons: {
//   icon: React.ElementType;
//   link: string;
//   alt: string;
// }[] = [
//   {
//     icon: twitter,
//     link: "https://twitter.com",
//     alt: "twitter_logo",
//   },
//   {
//     icon: instagram,
//     link: "https://instagram.com",
//     alt: "instaram_logo",
//   },
//   {
//     icon: facebook,
//     link: " https://facebook.com",
//     alt: " facebook_logo",
//   },
// ];
