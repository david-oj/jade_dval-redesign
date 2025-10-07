import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import {  HelpCircle } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What types of sponsorship opportunities are available?",
      answer:
        "We offer five main partnership types: Program Sponsorships (funding full cohorts), Scholarships & Grants (supporting individual students), Corporate Partnerships (hiring and mentoring), Event Partnerships (supporting community events), and Custom Opportunities (tailored initiatives). Investment levels range from ₦300K for events to ₦2M+ for full program sponsorships.",
    },
    {
      question: "Can partners co-brand programs or events?",
      answer:
        "Absolutely! All our partnership packages include co-branding opportunities. This includes logo placement on materials, joint press releases, social media recognition, speaking opportunities at events, and acknowledgment in our impact reports. We work closely with partners to ensure brand alignment and maximum visibility.",
    },
    {
      question: "Is there flexibility in partnership investment levels?",
      answer:
        "Yes, we understand that organizations have different budgets and goals. We offer partnerships ranging from small grants (₦500K per student scholarship) to large sponsorships (₦2M+ per cohort). We also provide flexible payment terms and can structure partnerships as annual commitments, project-based investments, or multi-year strategic alliances.",
    },
    {
      question: "What impact reports and accountability do partners receive?",
      answer:
        "Partners receive comprehensive quarterly reports including student progress metrics, job placement rates, project showcases, and community impact data. We provide detailed breakdowns of fund utilization, success stories with photos and testimonials, ROI analysis for corporate partners, and exclusive access to graduation ceremonies and demo days.",
    },
    {
      question: "How are students selected for scholarship programs?",
      answer:
        "Our rigorous selection process evaluates academic potential, financial need, commitment to learning, and community impact potential. We use a points-based system considering educational background, personal circumstances, technical aptitude tests, and interviews. Scholarship partners can participate in the selection process and meet their sponsored students.",
    },
    {
      question: "What ongoing support do corporate partners receive?",
      answer:
        "Corporate partners get priority access to our talent pipeline, quarterly networking events with students and alumni, input into curriculum development, employee volunteer opportunities, and first-right-of-refusal on hiring graduates. We also provide regular performance analytics on placed graduates and facilitate ongoing mentorship relationships.",
    },
    {
      question:
        "Can partnerships be customized for specific industries or skills?",
      answer:
        "Yes! We regularly customize programs for specific sectors like fintech, healthtech, agritech, and e-commerce. Partners can influence curriculum design, provide real-world projects from their industry, arrange specialized workshops, and even co-develop new courses that address specific skill gaps in their sector.",
    },
    {
      question: "How do you measure and report on partnership ROI?",
      answer:
        "We track multiple ROI metrics including graduate hiring rates by partner companies, salary improvements for sponsored students, startup success rates, community engagement metrics, brand visibility analytics, and long-term career progression of alumni. Each partner receives customized ROI reports aligned with their specific investment goals.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:px-25 px-6 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          {/* <div className="size-12 md:size-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="size-6 md:size-8 text-primary" />
          </div> */}
          <h2>Frequently Asked Questions</h2>
          <p className=" sm:text-xl font-satoshi text-muted-foreground mt-4">
            Get answers to common questions about partnering with Jade D'val
            Tech Academy
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <div className="relative">
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card  border-border rounded-sm ml-2.5 px-6"
              >
                <div className="absolute -z-10 h-full border-[10px] rounded-l-sm left-0 border-primary" />
                <AccordionTrigger className="text-left text-base font-satoshi font-bold text-foreground hover:text-primary transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-satoshi font-normal  text-base leading-[140%] text-black">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary from-20%sa to-130% to-secondary/70 rounded-2xl p-8">
            <h3 className="text-white capitalize">Still have questions?</h3>
            <p className=" text-white mb-6 max-w-xl mx-auto mt-4">
              Our partnership team is here to help you find the perfect
              collaboration model for your organization's goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:partnerships@jadedval.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-satoshi font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Email Our Partnership Team
              </a>
              <a
                href="tel:+234-xxx-xxx-xxxx"
                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-foreground font-satoshi font-semibold rounded-lg hover:bg-muted transition-colors duration-200"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
