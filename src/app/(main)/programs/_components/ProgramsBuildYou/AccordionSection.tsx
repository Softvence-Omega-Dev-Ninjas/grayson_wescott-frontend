import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";

const faqData = [
  {
    id: "item-1",
    question: "Can I run it with Jiu-Jitsu?",
    answer: "Most clients see noticeable changes in physique and confidence within the first 2-3 weeks of following the protocol.",
  },
  {
    id: "item-2",
    question: "How to choose training max?",
    answer: "The system is designed for both home and gym environments. We provide equipment alternatives for every exercise.",
  },
  {
    id: "item-3",
    question: "What if I miss a week?",
    answer: "Absolutely. The protocol scales from beginner to advanced with progressive difficulty levels and modifications.",
  },
];

function AccordionSection() {
  return (
    <div className="container mx-auto space-y-4  text-white">
      <SectionHeader title="Questions? We Have Answers" />

      <Accordion type="single" collapsible>
        {faqData.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border border-white/50 my-4 px-4 last:border-b ">
            <AccordionTrigger className="text-xl font-semibold cursor-pointer">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default AccordionSection;
