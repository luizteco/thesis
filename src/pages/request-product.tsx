import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ProductRequest {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  likes: number;
  userLiked?: boolean;
}

// Get or create a persistent client ID
function getClientId(): string {
  const key = "thesis_client_id";
  let clientId = localStorage.getItem(key);
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, clientId);
  }
  return clientId;
}

const API_BASE = import.meta.env.DEV ? "http://localhost:3001" : "/api";

function ProductRequestCard({
  request,
  onLike,
}: {
  request: ProductRequest;
  onLike: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(request.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">
        {request.description}
      </p>
      <button
        onClick={() => onLike(request.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${
          request.userLiked
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <svg
          className={`w-5 h-5 ${request.userLiked ? "fill-current" : ""}`}
          fill={request.userLiked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {request.likes}
      </button>
    </div>
  );
}

export function RequestProduct() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientId = getClientId();

  // Fetch all requests from server
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/requests`);
      if (!response.ok) throw new Error("Failed to fetch requests");

      const data = await response.json();

      // Check which requests the user has liked
      const requestsWithLikeStatus = await Promise.all(
        data.map(async (req: ProductRequest) => {
          const likeResponse = await fetch(
            `${API_BASE}/api/requests/${req.id}/likes/${clientId}`
          );
          const likeData = await likeResponse.json();
          return { ...req, userLiked: likeData.userLiked };
        })
      );

      setRequests(requestsWithLikeStatus);
      setError(null);
    } catch (err) {
      setError("Failed to load requests. Make sure the server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // Refresh requests every 10 seconds to see updates from other users
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      if (!response.ok) throw new Error("Failed to create request");

      const newRequest = await response.json();
      setRequests([{ ...newRequest, userLiked: false }, ...requests]);
      setFormData({ name: "", description: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError("Failed to submit request. Make sure the server is running.");
      console.error(err);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/requests/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, clientId }),
      });

      if (!response.ok) throw new Error("Failed to update like");

      const { likes, userLiked } = await response.json();

      setRequests(
        requests
          .map((req) =>
            req.id === id ? { ...req, likes, userLiked } : req
          )
          .sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp)
      );
    } catch (err) {
      setError("Failed to like request. Make sure the server is running.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("requestProduct.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("requestProduct.subtitle")}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("requestProduct.productName")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("requestProduct.namePlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("requestProduct.description")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder={t("requestProduct.descriptionPlaceholder")}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t("requestProduct.submit")}
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {t("requestProduct.submitted")}
            </div>
          )}
        </div>

        {/* Requests List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("requestProduct.requests")} ({requests.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t("requestProduct.noRequests")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((request) => (
                <ProductRequestCard
                  key={request.id}
                  request={request}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
