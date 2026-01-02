import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PrintingService {
  id: string;
  name: string;
  postalCode: string;
  printers: string;
  hourlyRate: string;
  email: string;
  timestamp: number;
}

const API_BASE = import.meta.env.DEV 
  ? "http://localhost:3001" 
  : "https://thesis-backend-0dzz.onrender.com";

function ServiceCard({ service }: { service: PrintingService }) {
  const [showContact, setShowContact] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-semibold">{t("printingServices.postalCode")}:</span>
          <span>{service.postalCode}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="font-semibold">{t("printingServices.printers")}:</span>
          <span>{service.printers}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">{t("printingServices.rate")}:</span>
          <span>{service.hourlyRate}</span>
        </div>
      </div>

      {showContact ? (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-1">{t("printingServices.contact")}:</p>
          <a href={`mailto:${service.email}`} className="text-purple-600 hover:text-purple-800 font-medium break-all">
            {service.email}
          </a>
        </div>
      ) : (
        <button
          onClick={() => setShowContact(true)}
          className="w-full mt-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t("printingServices.showContact")}
        </button>
      )}
    </div>
  );
}

export function PrintingServices() {
  const { t } = useTranslation();
  const [services, setServices] = useState<PrintingService[]>([]);
  const [filteredServices, setFilteredServices] = useState<PrintingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPostalCode, setSearchPostalCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    postalCode: "",
    printers: "",
    hourlyRate: "",
    email: "",
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/printing-services`);
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
      setError(null);
    } catch (err) {
      setError("Failed to load printing services.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = () => {
    if (!searchPostalCode.trim()) {
      setFilteredServices(services);
      return;
    }

    const search = searchPostalCode.trim();
    const filtered = services.filter((service) => {
      // Match first 2-3 digits for proximity
      const servicePrefix = service.postalCode.substring(0, 3);
      const searchPrefix = search.substring(0, 3);
      return service.postalCode.includes(search) || servicePrefix === searchPrefix;
    });

    setFilteredServices(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.postalCode.trim() || !formData.printers.trim() || !formData.hourlyRate.trim() || !formData.email.trim()) {
      setError(t("printingServices.allFieldsRequired"));
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/printing-services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register service");

      const newService = await response.json();
      setServices([newService, ...services]);
      setFilteredServices([newService, ...filteredServices]);
      setFormData({ name: "", postalCode: "", printers: "", hourlyRate: "", email: "" });
      setSubmitted(true);
      setShowForm(false);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError("Failed to register service.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("printingServices.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("printingServices.subtitle")}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {t("printingServices.registered")}
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchPostalCode}
              onChange={(e) => setSearchPostalCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder={t("printingServices.searchPlaceholder")}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t("printingServices.search")}
            </button>
            <button
              onClick={() => {
                setSearchPostalCode("");
                setFilteredServices(services);
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              {t("printingServices.clear")}
            </button>
          </div>
        </div>

        {/* Register Service Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            {showForm ? t("printingServices.hideForm") : t("printingServices.registerService")}
          </button>
        </div>

        {/* Registration Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("printingServices.registerTitle")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("printingServices.nameLabel")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("printingServices.namePlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("printingServices.postalCodeLabel")}
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="50670 or 12345-678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("printingServices.printersLabel")}
                </label>
                <input
                  type="text"
                  value={formData.printers}
                  onChange={(e) => setFormData({ ...formData, printers: e.target.value })}
                  placeholder={t("printingServices.printersPlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("printingServices.rateLabel")}
                </label>
                <input
                  type="text"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder={t("printingServices.ratePlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("printingServices.emailLabel")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("printingServices.emailPlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t("printingServices.submit")}
              </button>
            </form>
          </div>
        )}

        {/* Services List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchPostalCode 
              ? `${t("printingServices.servicesNear")} ${searchPostalCode} (${filteredServices.length})`
              : `${t("printingServices.allServices")} (${filteredServices.length})`
            }
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchPostalCode 
                  ? t("printingServices.noServicesFound")
                  : t("printingServices.noServices")
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
