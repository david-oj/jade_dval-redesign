import {
  courseImg1,
  courseImg2,
  courseImg3,
  courseImg4,
  jadeStar1,
  jadeStar2,
  jadeStar3,
  jadeStar4,
  jadeStar5
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
      "Decide what excites you most—whether it’s coding, design, data, or product. At Jade D’val, we offer specialized tracks to guide your journey in tech.",
  },
  {
    step: "02",
    title: "Learn by Doing (with Projects & Challenges)",
    description: "Dive into hands-on projects and real-world scenarios designed to help you apply what you learn. Build websites, apps, interfaces, and more—step by step.",
  },
  {
    step: "03",
    title: "Join the Jade D’val Community",
    description: "Collaborate with mentors and fellow learners. Ask questions, get feedback, and grow in a supportive, like-minded network of aspiring techies.",
  },
  {
    step: "04",
    title: "Build Your Portfolio & Personal Brand",
    description: "As you complete projects, showcase your work in a professional portfolio. We’ll help you stand out to employers and clients with practical, job-ready skills.",
  },
  {
    step: "05",
    title: "Launch Your Career",
    description: "Use your Jade D’val experience as a springboard into internships, freelance gigs, or full-time tech roles. We’ll support you with resources, mock interviews, and job-hunting tips.",
  },
];


export const jadeStars: {star: string}[] = [
  {star: jadeStar1},
  {star: jadeStar2},
  {star: jadeStar3},
  {star: jadeStar4},
  {star: jadeStar5},
]

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
