import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">{t("about.title")}</h1>
          <p className="text-lg sm:text-xl text-gray-700">{t("about.subtitle")}</p>
        </div>

        <div className="space-y-6">
          <Section title={t("about.mission.title")} icon="check">
            {t("about.mission.description")}
          </Section>

          <Section title={t("about.problem.title")} icon="alert">
            <>{t("about.problem.p1")}<br /><br />{t("about.problem.p2")}</>
          </Section>

          <Section title={t("about.solution.title")} icon="people">
            <>{t("about.solution.p1")}<br /><br />{t("about.solution.p2")}</>
          </Section>

          <Section title={t("about.design.title")} icon="leaf">
            <div className="space-y-3">
              <p>{t("about.design.intro")}</p>
              <ul className="space-y-2 ml-4">
                <li><strong>{t("about.design.ergonomic")}</strong> {t("about.design.ergonomicDesc")}</li>
                <li><strong>{t("about.design.functional")}</strong> {t("about.design.functionalDesc")}</li>
                <li><strong>{t("about.design.accessible")}</strong> {t("about.design.accessibleDesc")}</li>
                <li><strong>{t("about.design.respectful")}</strong> {t("about.design.respectfulDesc")}</li>
              </ul>
            </div>
          </Section>

          <Section title={t("about.important.title")} icon="alert">
            {t("about.important.description")}
          </Section>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">{t("about.cta.title")}</h3>
            <Link
              to="/devices"
              className="inline-block bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              {t("about.cta.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type IconKind = "check" | "alert" | "people" | "leaf" | "group";

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon: IconKind }) {
  const icons: Record<IconKind, React.ReactElement> = {
    check: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    alert: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.428 5.428l13.144 13.144M4.222 4.222l15.556 15.556" />
    ),
    people: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    leaf: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    group: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-3">{title}</h2>
          <div className="text-gray-700 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ListItem({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-purple-500 mt-1">•</span>
      <span>
        <strong className="text-black">{title}:</strong> {body}
      </span>
    </li>
  );
}
