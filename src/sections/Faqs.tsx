import { faqsImage } from "@/assets/images";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants";

const Faqs = () => {
    return (
        <section className=" max=md:px-6 md:mr-25 max-md:px-6">
            <div className="flex gap-12 items-center">
                <div className="flex-1 max-md:hidden max-w-[619px] overflow-hidden lg:h-[698px] md:h-[657px]">
                    <img src={faqsImage} alt="faqs" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1  flex flex-col max-md:items-center">
                    <h2 className="">Frequently Asked Questions</h2>

                    <Accordion type="single" collapsible className="relative flex flex-col md:gap-8 gap-4 w-full max-w-[550px] mt-6">
                        {faqs.map((faq, idx) => (
                            <div className="relative">
                                    <div className="absolute -z-10 h-full border-[10px] rounded-l-sm left-0 border-primary" />
                                <AccordionItem value={idx.toString()} className=" rounded-l-sm bg-white ml-2.5 pl-10 ">
                                    <AccordionTrigger className="font-satoshi font-bold text-base leading-[120%] text-black">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="font-satoshi font-normal max-w-[505px] text-base leading-[120%] text-black">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            </div>

                        ))}
        

                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Faqs;
