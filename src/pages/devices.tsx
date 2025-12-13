import { Link } from "react-router-dom";
import { useGetAllDevices } from "./devices/[id]/use-get-device";

export function Devices() {
  const devices = useGetAllDevices();

  return (
    <div className="m-8">
      <h1 className="font-bold">Products</h1>
      <p className="text-gray-300">This is the products page.</p>
      {!devices.length && <p className="mt-4">Loading devices...</p>}
      <nav>
        {devices.map((device) => (
          <div key={device.id}>
            <Link
              to={`/device/${device.id}`}
              className="text-purple-300 hover:underline"
            >
              {device.name}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
