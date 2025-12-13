import { Link } from "react-router-dom";
import { useGetAllDevices } from "./devices/[id]/use-get-device";

export function Devices() {
  const devices = useGetAllDevices();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-black mb-3">Our Products</h1>
          <p className="text-lg text-gray-700">
            Each device is designed to provide autonomy and comfort in daily
            life
          </p>
        </div>
        {!devices.length && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-700">Loading devices...</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {devices.map((device) => (
            <Link key={device.id} to={`/device/${device.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 hover:border-purple-500">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={device.previewImagePath}
                    alt={device.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-black group-hover:text-purple-500 transition-colors">
                    {device.name}
                  </h2>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {device.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
