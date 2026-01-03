import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetAllDevices } from "./devices/[id]/use-get-device";

export function Devices() {
  const { t } = useTranslation();
  const devices = useGetAllDevices();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-black mb-3">
            {t("devices.title")}
          </h1>
          <p className="text-lg text-gray-700">{t("devices.subtitle")}</p>
        </div>
        {!devices.length && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-700">{t("devices.loading")}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {devices.map((device, index) => (
            <Link 
              key={device.id} 
              to={`/device/${device.id}`} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-purple-400 relative flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none z-10"></div>
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative flex-shrink-0">
                  <img
                    src={device.previewImagePath}
                    alt={t(`devices.${device.id}.name`, { defaultValue: device.name })}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.dataset.fallback !== "true") {
                        img.dataset.fallback = "true";
                        img.src = device.previewImagePath.replace(/\.png$/i, ".svg");
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 relative z-20 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-black group-hover:text-purple-600 transition-colors duration-300 mb-2">
                    {t(`devices.${device.id}.name`, { defaultValue: device.name })}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-grow">
                    {t(`devices.${device.id}.description`, { defaultValue: device.description })}
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
