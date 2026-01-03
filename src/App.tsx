import { About } from "@pages/about";
import { Devices } from "@pages/devices";
import { Device } from "@pages/devices/[id]/device";
import { FAQ } from "@pages/faq";
import { HowToMeasure } from "@pages/how-to-measure";
import { Printers } from "@pages/printers";
import { PrintingServices } from "@pages/printing-services";
import { RequestProduct } from "@pages/request-product";
import { Welcome } from "@pages/welcome";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLinkClassName = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-semibold transition-colors ${
      isActive
        ? "text-purple-700 bg-purple-50 px-3 py-1 rounded-lg"
        : "text-purple-500 py-1 hover:text-purple-700"
    }`;
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/how-to-measure", label: t("nav.howToMeasure") },
    { path: "/printers", label: t("nav.printers") },
    { path: "/faq", label: t("nav.faq") },
    { path: "/printing-services", label: t("nav.printingServices") },
    { path: "/request-product", label: t("nav.requestProduct") },
  ];

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Back button + Logo/Home link */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              className="flex items-center justify-center w-8 rounded-full hover:bg-purple-50 text-purple-500 font-medium transition-colors"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
          )}
          <Link className={getLinkClassName("/")} to="/">
            {t("nav.home")}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            link.path !== "/" && (
              <Link key={link.path} className={getLinkClassName(link.path)} to={link.path}>
                {link.label}
              </Link>
            )
          ))}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-semibold text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            {i18n.language === "en" ? "PT" : "EN"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-sm font-semibold text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            {i18n.language === "en" ? "PT" : "EN"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-purple-50 text-purple-500 font-medium transition-colors"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            link.path !== "/" && (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-lg font-semibold text-sm ${getLinkClassName(link.path)}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/device/:id" element={<Device />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/how-to-measure" element={<HowToMeasure />} />
        <Route path="/about" element={<About />} />
        <Route path="/printers" element={<Printers />} />
        <Route path="/printing-services" element={<PrintingServices />} />
        <Route path="/request-product" element={<RequestProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
