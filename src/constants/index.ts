import {
  courseImg1,
  courseImg2,
  courseImg3,
  courseImg4,
  digital_marketing,
  jadeStar1,
  jadeStar2,
  jadeStar3,
  jadeStar4,
  jadeStar5,
  animation,
  audioEngineering,
  dataAnalysis,
  graphicsDesign,
  photoTech,
  videoEditing,
  projectManagement,
} from "@/assets/images";
import location from "@/assets/icons/location.svg?react";
import mail from "@/assets/icons/mail.svg?react";
import telephone from "@/assets/icons/telephone.svg?react";
import {
  facebook,
  instagram,
  linkedin,
  twitter,
  whatsapp,
} from "@/assets/icons";

export const courses: {
  id: string;
  title: string;
  description: string;
  image: string;
  linkText: string;
}[] = [
  {
    id: "UI/UX Design",
    title: "UI/UX Design",
    description:
      "Learn how to design intuitive, user-friendly interfaces and engaging digital experiences for websites, apps, and products. Perfect for beginners, We covers essential UI/UX principles and hands-on training with industry-standard tools like Figma, Adobe XD, and Sketch.",
    image: courseImg1,
    linkText: "Enroll Now",
  },
  {
    id: "Frontend Development",
    title: "Frontend Development",
    description:
      "Learn how to build responsive, high-performance websites and web applications using HTML, CSS, JavaScript, and modern frameworks like React and Vue. We cover the fundamentals of frontend development, UI integration, and version control with tools like Git and GitHub.",
    image: courseImg2,
    linkText: "Enroll Now",
  },
  {
    id: "Backend Development",
    title: "Backend Development",
    description:
      "Learn how to build the backbone of web and mobile applications using powerful backend technologies. We cover server-side programming, APIs, databases, and authentication using tools and frameworks like Node.js, Express, Python, Django, MongoDB and PostgreSQL.",
    image: courseImg3,
    linkText: "Enroll Now",
  },
  {
    id: "Mobile-development",
    title: "Mobile Development",
    description:
      "Learn how to build beautiful, high-performance mobile apps for both Android and iOS using Flutter and the Dart programming language. We cover everything from UI design to state management and backend integration, all with one codebase.",
    image: courseImg4,
    linkText: "Enroll Now",
  },
  {
    id: "Digital Marketing",
    title: "Digital Marketing",
    description:
      "Learn how to build effective online campaigns, grow brand presence, and master tools like Meta Ads, SEO, content strategy, and analytics. Perfect for aspiring marketers and business owners",
    image: digital_marketing,
    linkText: "Enroll Now",
  },
  {
    id: "Data analysis",
    title: "Data Analysis",
    description:
      "Learn how to collect, clean, and interpret data to uncover insights and support data-driven decisions. Covers tools and techniques like Excel, Python, SQL, and visualization with Tableau or Power BI.",
    image: dataAnalysis,
    linkText: "Enroll Now",
  },
  {
    id: "Video editing",
    title: "Video Editing",
    description:
      "Master the art of video storytelling by learning editing techniques, transitions, and visual effects using tools like Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve.",
    image: videoEditing,
    linkText: "Enroll Now",
  },
  {
    id: "Graphic design",
    title: "Graphic Design",
    description:
      "Learn to create visually compelling designs for digital and print media. Covers design principles, typography, branding, and hands-on work with Adobe Photoshop, Illustrator, and Canva.",
    image: graphicsDesign,
    linkText: "Enroll Now",
  },
  {
    id: "Audio engineer",
    title: "Audio Engineering",
    description:
      "Learn to record, mix, and master high-quality audio for music, podcasts, and media projects. Covers DAWs, sound design, effects processing, and professional production workflows.",
    image: audioEngineering,
    linkText: "Enroll Now",
  },
  {
    id: "Photo tech",
    title: "Photo Tech",
    description:
      "Explore photography techniques and digital photo editing. Learn about composition, lighting, camera settings, and retouching with tools like Lightroom and Photoshop.",
    image: photoTech,
    linkText: "Enroll Now",
  },
  {
    id: "Animation and motion graphics",
    title: "Animation & Motion Graphics",
    description:
      "Learn to bring visuals to life with 2D and 3D animation techniques. Covers keyframe animation, motion graphics, and tools like After Effects, Blender, and Cinema 4D.",
    image: animation,
    linkText: "Enroll Now",
  },
  {
    id: "Project management",
    title: "Project Management",
    description:
      "Master the fundamentals of project management tailored for professional teams. Learn how to plan, excecute and deliver projects on time using modern tools, agile workflow,s and clear stakeholder communication.",
    image: projectManagement,
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
  icon: React.ElementType;
  title: string;
  description?: string;
  phones?: { phone: string }[];
}[];
export const footerItems: Footer = [
  {
    icon: location,
    title: "Location",
    description:
      "Loveworld Arena, Christ Embassy Ministry Center, Behind Dove Filling Station, New Garage, Ibadan.",
  },
  {
    icon: mail,
    title: "Email",
    description: "support@jadedval.com",
  },
  {
    icon: telephone,
    title: "Phone",
    phones: [{ phone: "+234 70 3241 3350" }],
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
