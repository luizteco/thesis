import { About } from "@pages/about";
import { Devices } from "@pages/devices";
import { Device } from "@pages/devices/[id]/device";
import { FAQ } from "@pages/faq";
import { HowToMeasure } from "@pages/how-to-measure";
import { Printers } from "@pages/printers";
import { Welcome } from "@pages/welcome";
import { useTranslation } from "react-i18next";
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

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-6">
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
        <Link className={getLinkClassName("/about")} to="/about">
          {t("nav.about")}
        </Link>
        <Link
          className={getLinkClassName("/how-to-measure")}
          to="/how-to-measure"
        >
          {t("nav.howToMeasure")}
        </Link>
        <Link className={getLinkClassName("/printers")} to="/printers">
          {t("nav.printers")}
        </Link>
        <Link className={getLinkClassName("/faq")} to="/faq">
          {t("nav.faq")}
        </Link>
        <div className="ml-auto">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-semibold text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            {i18n.language === "en" ? "PT" : "EN"}
          </button>
        </div>
      </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
