import { About } from "@pages/about";
import { Devices } from "@pages/devices";
import { Device } from "@pages/devices/[id]/device";
import { FAQ } from "@pages/faq";
import { HowToMeasure } from "@pages/how-to-measure";
import { Printers } from "@pages/printers";
import { Welcome } from "@pages/welcome";
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
  const isHome = location.pathname === "/";

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
        <Link
          className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
          to="/faq"
        >
          FAQ
        </Link>
        <Link
          className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
          to="/how-to-measure"
        >
          How to Measure
        </Link>
        <Link
          className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
          to="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-semibold text-purple-500 hover:text-purple-700 transition-colors"
          to="/printers"
        >
          3D Printers
        </Link>
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
