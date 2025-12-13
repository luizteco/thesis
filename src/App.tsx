import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Devices } from "./pages/devices";
import { Device } from "./pages/devices/[id]/device";
import { Welcome } from "./pages/welcome";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="text-purple-300 hover:underline text-xs ml-8">
          Home
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/device/:id" element={<Device />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
