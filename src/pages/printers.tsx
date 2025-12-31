import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Printers() {
  const { t } = useTranslation();
  const cards = [
    {
      title: t("printersCards.distributed.title"),
      subtitle: t("printersCards.distributed.subtitle"),
      image: "/preview-images/distributed.jpg",
      source: {
        url: "https://www.curitiba.pr.gov.br/noticias/fab-lab-da-prefeitura-faz-evento-on-line-para-falar-de-tecnologia-e-inovacao-em-curitiba/65930",
        label: "Fonte/Source: Prefeitura de Curitiba",
      },
      paragraphs: [
        t("printersCards.distributed.p1"),
        t("printersCards.distributed.p2"),
        t("printersCards.distributed.p3"),
        t("printersCards.distributed.p4"),
      ],
    },
    {
      title: t("printersCards.decentralization.title"),
      subtitle: t("printersCards.decentralization.subtitle"),
      image: "/preview-images/decentralization.jpg",
      source: {
        url: "https://www.curitiba.pr.gov.br/noticias/farol-do-saber-e-inovacao-tem-espaco-maker-com-impressora-3d-para-comunidade-usar/50532",
        label: "Fonte/Source: Prefeitura de Curitiba",
      },
      paragraphs: [
        t("printersCards.decentralization.p1"),
        t("printersCards.decentralization.p2"),
        t("printersCards.decentralization.p3"),
        t("printersCards.decentralization.p4"),
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-8 space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-3">{t("printersCards.distributed.title")}</h1>
          <p className="text-xl text-gray-700">{t("printersCards.distributed.subtitle")}</p>
        </div>

        <div className="space-y-8">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
              <div className="h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {card.source ? (
                <div className="px-6 pt-3 text-xs text-gray-500">
                  <a
                    href={card.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-purple-600"
                  >
                    {card.source.label}
                  </a>
                </div>
              ) : null}
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">{card.subtitle}</div>
                <h2 className="text-2xl font-bold text-black">{card.title}</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  {card.paragraphs.map((paragraph, idx) => (
                    <p key={`${card.title}-${idx}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to print locally?</h3>
          <p className="leading-relaxed mb-6 opacity-90">
            Explore the products, customize measurements, and generate files ready for FDM printing.
          </p>
          <Link
            to="/devices"
            className="inline-block bg-white text-purple-700 px-8 py-4 rounded-xl hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
