import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Welcome() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/preview-images/hero-placeholder.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative max-w-7xl mx-auto px-8 py-14 min-h-[90vh] flex flex-col justify-between items-center">
        <div className="text-center space-y-4 text-white drop-shadow-md pt-1">
          <h1 className="text-6xl font-bold tracking-tight">
            {t("welcome.title")}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t("welcome.subtitle")}
          </p>
        </div>
        <div className="pb-16">
          <Link
            to="/devices"
            className="inline-flex items-center px-8 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            {t("welcome.exploreProducts")}
          </Link>
        </div>
      </div>
    </div>
  );
}
