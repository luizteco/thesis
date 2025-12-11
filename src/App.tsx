import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Products } from "./pages/products";
import { CupStabiliser } from "./pages/products/cup-stabiliser";
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
        <Route path="/products" element={<Products />} />
        <Route path="/product/cup-stabiliser" element={<CupStabiliser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
