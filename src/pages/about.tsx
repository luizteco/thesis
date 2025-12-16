import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">
            About the Project
          </h1>
          <p className="text-xl text-gray-700">
            Combining technology and empathy to create accessible solutions
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black mb-3">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  To democratize access to personalized assistive technologies
                  through 3D printing. We believe that every person with
                  Parkinson's deserves devices adapted to their unique anatomy,
                  enabling greater autonomy and quality of life in daily
                  activities.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black mb-3">
                  The Problem
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Parkinson's affects more than 10 million people worldwide.
                  Tremors, muscle rigidity and motor difficulties turn simple
                  activities like eating, writing and holding objects into real
                  challenges.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Generic assistive devices rarely meet individual needs. Each
                  person has different anatomy, and personalized solutions are
                  often expensive and inaccessible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
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
                  Our Solution
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Through 3D printing and parametric design, we create
                  personalized assistive devices affordably. Our platform
                  transforms simple hand measurements into 3D models optimized
                  for each patient.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Anyone with access to a 3D printer — at home, libraries,
                  schools or makerspaces — can create personalized devices,
                  eliminating cost and distribution barriers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">
              Human-Centered Design
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our work is guided by principles of universal and user-centered
              design. Each device is:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>
                  <strong className="text-black">Ergonomic:</strong> Adapted to
                  individual anatomy and comfort
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>
                  <strong className="text-black">Functional:</strong> Designed
                  to reduce tremors and facilitate movements
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>
                  <strong className="text-black">Accessible:</strong> Reduced
                  cost through local manufacturing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>
                  <strong className="text-black">Respectful:</strong> Discreet
                  and dignified design, not stigmatizing
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-black mb-3">Important</h3>
            <p className="text-gray-700 leading-relaxed">
              The devices on this platform are auxiliary and do not replace
              professional medical treatment. Always consult a doctor or
              occupational therapist about the best solutions for each specific
              case.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to get started?
            </h3>
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
