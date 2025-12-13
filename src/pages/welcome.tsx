import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="m-8">
      <h1 className="font-bold">Home</h1>
      <p className="text-gray-300">This is the home page.</p>
      <nav className="mt-4">
        <Link to="/devices" className="text-purple-300 hover:underline">
          Devices
        </Link>
      </nav>
    </div>
  );
}
