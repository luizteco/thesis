import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Welcome() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/preview-images/hero-placeholder.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-14 min-h-[90vh] flex flex-col justify-between items-center">
        <div className="text-center space-y-6 text-white drop-shadow-2xl pt-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            {t("welcome.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed stagger-1 animate-fade-in" style={{ opacity: 0 }}>
            {t("welcome.subtitle")}
          </p>
        </div>
        <div className="pb-16 stagger-2 animate-fade-in" style={{ opacity: 0 }}>
          <Link
            to="/devices"
            className="btn-glow group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {t("welcome.exploreProducts")}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
