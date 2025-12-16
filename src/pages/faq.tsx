import { useState } from "react";
import { useTranslation } from "react-i18next";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left hover:text-purple-500 transition-colors group"
      >
        <span className="text-lg font-semibold text-black group-hover:text-purple-500 pr-8">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-700 group-hover:text-purple-500 transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-700 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.questions.q1.question"),
      answer: t("faq.questions.q1.answer"),
    },
    {
      question: t("faq.questions.q2.question"),
      answer: t("faq.questions.q2.answer"),
    },
    {
      question: t("faq.questions.q3.question"),
      answer: t("faq.questions.q3.answer"),
    },
    {
      question: t("faq.questions.q4.question"),
      answer: t("faq.questions.q4.answer"),
    },
    {
      question: t("faq.questions.q5.question"),
      answer: t("faq.questions.q5.answer"),
    },
    {
      question: t("faq.questions.q6.question"),
      answer: t("faq.questions.q6.answer"),
    },
    {
      question: t("faq.questions.q7.question"),
      answer: t("faq.questions.q7.answer"),
    },
    {
      question: t("faq.questions.q8.question"),
      answer: t("faq.questions.q8.answer"),
    },
    {
      question: t("faq.questions.q9.question"),
      answer: t("faq.questions.q9.answer"),
    },
    {
      question: t("faq.questions.q10.question"),
      answer: t("faq.questions.q10.answer"),
    },
    {
      question: t("faq.questions.q11.question"),
      answer: t("faq.questions.q11.answer"),
    },
    {
      question: t("faq.questions.q12.question"),
      answer: t("faq.questions.q12.answer"),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("faq.title")}
          </h1>
          <p className="text-xl text-gray-700">{t("faq.subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold text-black mb-3">
            {t("faq.notFound")}
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            {t("faq.contact")}{" "}
            <a
              href="mailto:contact@assisttech.com"
              className="text-purple-500 hover:text-purple-700 font-semibold transition-colors"
            >
              luizteco.torres@gmx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
