import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8 space-y-8">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-black mb-4">About the Project</h1>
          <p className="text-xl text-gray-700">
            Combining technology, empathy, and sustainability to make everyday life a little easier
          </p>
        </div>

        <div className="space-y-6">
          <Section title="Our Mission" icon="check">
            Living with Parkinson’s is a daily battle. Simple actions like eating, writing, or holding objects can become constant challenges. Our mission is to make everyday life just a little easier through personalized assistive technologies, developed as a Sustainable Product–Service System (SPSS) that combines open-source design, local fabrication, and 3D printing—enabling accessible, customizable solutions that can be produced anywhere while supporting local communities and economies.
          </Section>

          <Section title="The Problem" icon="alert">
            Parkinson’s disease affects more than 10 million people worldwide. Tremors, muscle rigidity, and motor impairments turn everyday tasks into significant obstacles. Most low-cost assistive technology devices are mass-produced and offer little to no personalization, often failing to adapt to individual anatomies. Truly personalized solutions, on the other hand, are frequently expensive and inaccessible.
          </Section>

          <Section title="Our Solution" icon="people">
            We use parametric design and 3D printing to create personalized assistive devices at low cost. Our platform transforms simple user measurements into adjustable 3D models tailored to each person. All design files are free and open-source, allowing anyone to download, modify, and print the devices. Users can customize measurements, shape, grip thickness, and even color, adapting each device to personal preferences and functional needs. Devices can be produced anywhere—at home, in schools, libraries, makerspaces, clinics, or associations—removing barriers related to cost, distribution, and centralized manufacturing.
          </Section>

          <Section title="A Sustainable Product–Service System (SPSS)" icon="leaf">
            This project operates as an SPSS by integrating open digital products with local services and community-based production.
            Sustainability is achieved by: Using locally available materials; Enabling decentralized, on-demand manufacturing; Reducing transportation and production costs; Strengthening local economies and social initiatives. By shifting production to the local level, the platform empowers institutions and patient associations to fabricate devices, distribute them ethically, and potentially generate income.
          </Section>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">Human-Centered Design</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our work follows principles of human-centered and universal design. Each device is:
            </p>
            <ul className="space-y-3 text-gray-700">
              <ListItem title="Ergonomic" body="Adapted to individual anatomy and comfort" />
              <ListItem title="Functional" body="Designed to reduce tremors and support movement" />
              <ListItem title="Accessible" body="Low cost through open files and local production" />
              <ListItem title="Customizable" body="Adjustable in size, form, and appearance" />
            </ul>
          </div>

          <Section title="Who Is This Platform For?" icon="group">
            This platform supports: Individuals with Parkinson’s for personal use; Occupational therapists and healthcare professionals; Rehabilitation centers and institutions; Patient associations and community organizations; Makers, educators, and researchers.
          </Section>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Ready to get started?</h3>
            <Link
              to="/devices"
              className="inline-block bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type IconKind = "check" | "alert" | "people" | "leaf" | "group";

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon: IconKind }) {
  const icons: Record<IconKind, JSX.Element> = {
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
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black mb-3">{title}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{children}</p>
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
