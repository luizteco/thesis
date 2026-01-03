import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Resources() {
  const { t } = useTranslation();

  const resourceCards = [
    {
      path: "/about",
      title: t("nav.about"),
      description: "Learn about our mission, the problem we solve, and our approach to assistive technology.",
      icon: "📚",
    },
    {
      path: "/how-to-measure",
      title: t("nav.howToMeasure"),
      description: "Step-by-step guide on how to accurately measure for your personalized assistive device.",
      icon: "📏",
    },
    {
      path: "/printers",
      title: t("nav.printers"),
      description: "Explore 3D printing technology, local fabrication, and distributed manufacturing.",
      icon: "🖨️",
    },
    {
      path: "/faq",
      title: t("nav.faq"),
      description: "Frequently asked questions about the platform, devices, and printing process.",
      icon: "❓",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-3 sm:mb-4">
            Resources & Guides
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Explore everything you need to know about our platform and assistive devices.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {resourceCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all"
            >
              <div className="p-6 sm:p-8 h-full flex flex-col">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-purple-700 transition-colors">
                  {card.title}
                </h2>
                <p className="text-gray-700 flex-1">{card.description}</p>
                <div className="mt-6 inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
