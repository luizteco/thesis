import { Link } from "react-router-dom";

export function Products() {
  return (
    <div className="m-8">
      <h1 className="font-bold">Products</h1>
      <p className="text-gray-300">This is the products page.</p>
      <nav className="mt-4">
        <Link
          to="/product/cup-stabiliser"
          className="text-purple-300 hover:underline"
        >
          Cup stabiliser
        </Link>
      </nav>
    </div>
  );
}
