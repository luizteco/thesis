import { Link } from "react-router-dom";

export function Printers() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">3D Printers</h1>
          <p className="text-xl text-gray-700">
            The transformative power of production decentralization
          </p>
        </div>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-8 border border-purple-500/20">
            <p className="text-lg text-black leading-relaxed">
              3D printers are revolutionizing how we produce, distribute and
              access products. More than a technology, they represent a
              fundamental shift: from the centralized manufacturing model to a
              decentralized, democratic, and sustainable future.
            </p>
          </div>

          {/* From Industrial Revolution to Digital Revolution */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1632914146475-bfe6fa6b2a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFudWZhY3R1cmluZyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY1ODk3MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Industrial factory manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    From Industrial Revolution to Digital Revolution
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For centuries, mass production required giant factories,
                    complex supply chains, and global distribution. Standardized
                    products were manufactured by the millions, but
                    personalization was impossible or prohibitively expensive.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    3D printers reverse this paradigm:{" "}
                    <strong className="text-black">
                      the factory comes to the user
                    </strong>
                    , not the other way around. Anyone with access to a printer
                    can produce locally, on-demand, and personalized.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decentralization: Power in the Hands of Many */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1761293877320-d78bffe24b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBuZXR3b3JrJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3NjU4NDIzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Global network connection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    Decentralization: Power in the Hands of Many
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Production decentralization means communities, schools,
                    libraries and even families can manufacture what they need,
                    when they need it:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong className="text-black">
                          Elimination of intermediaries:
                        </strong>
                        No distributors, wholesalers, or importers — drastically
                        reducing costs
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong className="text-black">
                          Geographic independence:
                        </strong>
                        Remote communities or developing countries can produce
                        locally
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong className="text-black">
                          On-demand production:
                        </strong>
                        No inventory, no waste — only what's necessary is
                        manufactured
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong className="text-black">
                          Personalization at scale:
                        </strong>
                        Each product can be unique, adapted to individual needs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGRldmljZXN8ZW58MXx8fHwxNzY1ODk3MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Healthcare medical devices"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
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
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    Social Impact and Democratization
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    3D printers have transformative potential especially in
                    areas like healthcare, education, and accessibility:
                  </p>
                  <div className="space-y-4">
                    <div className="pl-4 border-l-2 border-purple-500/30">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Accessible Healthcare
                      </h3>
                      <p className="text-gray-700">
                        Prosthetics, orthotics, assistive devices, and medical
                        tools can be personalized and produced at a fraction of
                        traditional costs, democratizing access to quality
                        healthcare.
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-purple-500/30">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Education and Innovation
                      </h3>
                      <p className="text-gray-700">
                        Schools and universities can teach design, engineering,
                        and manufacturing hands-on, empowering the next
                        generation of inventors.
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-purple-500/30">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Sustainability
                      </h3>
                      <p className="text-gray-700">
                        Local production drastically reduces transportation
                        emissions. Materials can be recycled or biodegradable,
                        creating a circular economy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Challenges and Future */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGZ1dHVyZXxlbnwxfHx8fDE3NjU4MjA5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Innovation technology future"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    Speed of Transformation
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    What once took weeks of international shipping now takes
                    hours of local printing. What cost thousands in tooling now
                    costs pennies in plastic material. What required engineering
                    teams can now be done by a single person with free software.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    This speed of transformation is just beginning. New
                    materials (metals, ceramics, biocompatible), faster
                    printers, and smarter software will further expand
                    possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Makerspaces and Community */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1646579886741-12b59840c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtlcnNwYWNlJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc2NTg5NzI0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Makerspace collaboration workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    Makerspaces and Collaboration
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You don't need to own a 3D printer to benefit from this
                    revolution. Makerspaces, FabLabs, public libraries, and
                    specialized cafés offer shared access to this technology.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Even more important: online communities share designs for
                    free. Millions of 3D models are available for download,
                    adaptation, and immediate printing.{" "}
                    <strong className="text-black">
                      Open knowledge + local manufacturing = decentralized
                      power.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Platform */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NTg2OTQ3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="3D printer technology"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-3">
                    Our Platform: Decentralization in Action
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This project is a practical example of the power of
                    decentralization. Instead of manufacturing assistive devices
                    in a factory and shipping them to customers:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>You measure your own hand at home</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>
                        Our software generates a personalized 3D model instantly
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>
                        You print locally — at home, library, or makerspace
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>The device is ready in hours, not weeks</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    This is the future of manufacturing:{" "}
                    <strong className="text-black">
                      decentralized, personalized, accessible, and human.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">A New Era of Production</h3>
            <p className="leading-relaxed mb-6 opacity-90">
              3D printers are not just tools — they are catalysts for social
              transformation. By decentralizing production, we democratize
              access, empower communities, and create a future where technology
              truly serves humanity.
            </p>
            <Link
              to="/devices"
              className="inline-block bg-white text-purple-500 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-lg"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
