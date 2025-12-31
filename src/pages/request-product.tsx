import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ProductRequest {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  likes: number;
  userLiked: boolean;
}

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

  const storageKey = "productRequests";
  const likedKey = "productRequestsLiked";

  // Load requests from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const likedIds = new Set(
      JSON.parse(localStorage.getItem(likedKey) || "[]") as string[]
    );

    if (stored) {
      const parsed = JSON.parse(stored) as ProductRequest[];
      const withLikeStatus = parsed.map((req) => ({
        ...req,
        userLiked: likedIds.has(req.id),
      }));
      setRequests(
        withLikeStatus.sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp)
      );
    }
  }, []);

  // Save requests to localStorage
  const saveRequests = (updatedRequests: ProductRequest[]) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedRequests));
    setRequests(updatedRequests.sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }

    const newRequest: ProductRequest = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      timestamp: Date.now(),
      likes: 0,
      userLiked: false,
    };

    const updatedRequests = [newRequest, ...requests];
    saveRequests(updatedRequests);

    setFormData({ name: "", description: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id: string) => {
    const likedIds = new Set(
      JSON.parse(localStorage.getItem(likedKey) || "[]") as string[]
    );

    const updatedRequests = requests.map((req) => {
      if (req.id === id) {
        if (req.userLiked) {
          likedIds.delete(id);
          return { ...req, likes: Math.max(0, req.likes - 1), userLiked: false };
        } else {
          likedIds.add(id);
          return { ...req, likes: req.likes + 1, userLiked: true };
        }
      }
      return req;
    });

    localStorage.setItem(likedKey, JSON.stringify(Array.from(likedIds)));
    saveRequests(updatedRequests);
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

          {requests.length === 0 ? (
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
