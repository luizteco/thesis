import { Devices } from "@pages/devices";
import { Device } from "@pages/devices/[id]/device";
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
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-purple-50 text-purple-500 font-medium transition-colors"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
