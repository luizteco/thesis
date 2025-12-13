import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Devices } from "./pages/devices";
import { Device } from "./pages/devices/[id]/device";
import { Welcome } from "./pages/welcome";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
    <nav className="flex m-8 gap-8 text-purple-300 text-xs">
      {!isHome && (
        <button className="hover:underline" onClick={() => navigate(-1)}>
          ←
        </button>
      )}
      <Link className="hover:underline" to="/">
        Home
      </Link>
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
