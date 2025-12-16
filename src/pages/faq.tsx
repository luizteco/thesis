import { useState } from "react";

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

  const faqs = [
    {
      question: "What is 3D printing and how does it work?",
      answer:
        "3D printing is an additive manufacturing technology that creates physical objects layer by layer from a digital model. A 3D printer heats a plastic filament (usually PLA or PETG) and deposits it precisely to build the desired object. It's like a regular printer, but in three dimensions.",
    },
    {
      question: "Do I need to have a 3D printer at home?",
      answer:
        "Not necessarily. You can use the generated STL file at local 3D printing services, makerspaces, public libraries, technical schools, or even order printing online. Many cities have community spaces with 3D printers available.",
    },
    {
      question: "How much does it cost to print a device?",
      answer:
        "The cost varies depending on the device size and material used, but generally ranges from $1 to $6 in materials. If you use a printing service, there may be additional labor costs. Still, it's much more affordable than traditional custom devices, which can cost hundreds of dollars.",
    },
    {
      question: "What material should I use for printing?",
      answer:
        "We recommend PLA for most devices as it's safe, easy to print, and suitable for hand contact. PETG is a more durable alternative and heat-resistant. For kitchen utensils, make sure to use food-safe filaments and clean properly after use.",
    },
    {
      question: "How do I measure the hand correctly?",
      answer:
        'Check our "How to Measure" page for a detailed guide with illustrations. In summary, you\'ll need to measure hand length (from middle finger tip to wrist), palm width, and comfortable grip diameter using a ruler in centimeters.',
    },
    {
      question: "Do the devices work for all types of Parkinson's?",
      answer:
        "The devices can help at different stages of Parkinson's, especially with tremors and grip difficulties. However, each case is unique. We always recommend consulting a doctor or occupational therapist to assess whether the device is suitable for your specific needs.",
    },
    {
      question: "How do I clean and maintain the devices?",
      answer:
        "Wash with warm water and mild soap. Don't use very hot water, as it can deform the plastic. Dry completely before use. For kitchen utensils, hand washing is recommended instead of dishwasher.",
    },
    {
      question: "Can I adjust the device if it's not comfortable?",
      answer:
        "Yes! One of the great advantages of 3D printing is that you can generate new files with adjusted measurements as many times as needed, at no additional cost. Just return to the product page, enter new measurements, and generate a new STL file.",
    },
    {
      question: "How long does it take to print a device?",
      answer:
        "It depends on size and complexity, but generally between 2 to 6 hours. Smaller devices like pen grips can take 2-3 hours, while adapted utensils can take 4-6 hours. Printing is automatic, so you can leave the printer working overnight.",
    },
    {
      question: "Do the devices replace medical treatment?",
      answer:
        "No. These devices are auxiliary and can improve quality of life and autonomy, but they don't replace medication, physical therapy, or medical follow-up. Always consult health professionals about your treatment.",
    },
    {
      question: "Can I use the files commercially?",
      answer:
        "The generated files are for personal and non-commercial use. You can print for yourself or to help family and friends, but you should not sell the printed devices or STL files.",
    },
    {
      question: "What if I have problems with the file or printing?",
      answer:
        "Contact us through our contact form. While we can't provide technical support for specific printers, we can help with issues related to STL files or measurement adjustments.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-700">
            Everything you need to know about our assistive devices
          </p>
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
            Didn't find your answer?
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Contact us through email:{" "}
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
