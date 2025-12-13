import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-black tracking-tight">
            Personalized assistive technology for Parkinson's
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Ergonomic devices 3D printed and adapted to each patient's anatomy.
          </p>
          <div className="pt-8">
            <Link
              to="/devices"
              className="inline-flex items-center px-8 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Explore Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
