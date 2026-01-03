import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Welcome() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[100vh] bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/preview-images/hero-placeholder.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50" />
      
      {/* Subtle animated gradient orbs - spaced far apart */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl opacity-30" style={{ animation: 'float 8s ease-in-out infinite' }}></div>
      <div className="absolute top-1/3 -right-32 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl opacity-20" style={{ animation: 'float 10s ease-in-out infinite 1s' }}></div>
      <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-purple-300/5 rounded-full blur-3xl opacity-15" style={{ animation: 'float 12s ease-in-out infinite 2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 min-h-screen flex flex-col justify-center items-center">
        <div className="text-center space-y-6 text-white drop-shadow-2xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {t("welcome.title")}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed stagger-1 animate-fade-in" style={{ opacity: 0 }}>
            {t("welcome.subtitle")}
          </p>
        </div>
        <div className="pb-16 stagger-2 animate-fade-in mt-12" style={{ opacity: 0 }}>
          <Link
            to="/devices"
            className="btn-glow group inline-flex items-center gap-2 px-8 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t("welcome.exploreProducts")}
          </Link>
        </div>
      </div>
    </div>
  );
}
