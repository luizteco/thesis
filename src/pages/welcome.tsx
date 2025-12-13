import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-black tracking-tight">
            Welcome
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Customize and download 3D models for your devices
          </p>
          <div className="pt-8">
            <Link
              to="/devices"
              className="inline-flex items-center px-8 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Browse Devices →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
