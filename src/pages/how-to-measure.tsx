import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function HowToMeasure() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-black mb-4">
            {t("howToMeasure.title")}
          </h1>
          <p className="text-xl text-gray-700">
            {t("howToMeasure.subtitle")}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-3">
                {t("howToMeasure.requiredMaterials")}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t("howToMeasure.materials.ruler")}</li>
                <li>{t("howToMeasure.materials.paper")}</li>
                <li>{t("howToMeasure.materials.helper")}</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-8 space-y-8">
              <img
                src="/preview-images/mesurements.png"
                alt="Hand measurement guide showing length, width, and thickness"
                className="w-full rounded-xl border border-gray-200 shadow-sm"
              />

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-3">{t("howToMeasure.measurement1.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("howToMeasure.measurement1.description")}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">{t("howToMeasure.tipLabel")}:</strong> {t("howToMeasure.measurement1.tip")}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-3">{t("howToMeasure.measurement2.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("howToMeasure.measurement2.description")}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">{t("howToMeasure.tipLabel")}:</strong> {t("howToMeasure.measurement2.tip")}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-black mb-3">{t("howToMeasure.measurement3.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("howToMeasure.measurement3.description")}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">{t("howToMeasure.tipLabel")}:</strong> {t("howToMeasure.measurement3.tip")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-black mb-3">
                {t("howToMeasure.considerations.title")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>• {t("howToMeasure.considerations.c1")}</p>
                <p>• {t("howToMeasure.considerations.c2")}</p>
                <p>• {t("howToMeasure.considerations.c3")}</p>
                <p>• {t("howToMeasure.considerations.c4")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-500/20 text-center">
          <p className="text-lg text-gray-700 mb-4">
            {t("howToMeasure.questionsPrompt")}
          </p>
          <Link
            to="/faq"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            {t("howToMeasure.seeFAQ")}
          </Link>
        </div>
      </div>
    </div>
  );
}
