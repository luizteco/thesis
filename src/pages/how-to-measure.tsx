import { Link } from "react-router-dom";

export function HowToMeasure() {
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
            How to Measure Your Hand
          </h1>
          <p className="text-xl text-gray-700">
            Simple guide to get accurate measurements and customize your device
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Required Materials
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Ruler or measuring tape (in centimeters)</li>
                <li>Paper and pen to note measurements</li>
                <li>Someone to help with measurement (recommended)</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="mb-6">
                <div className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full mb-3 font-semibold">
                  Measurement 1
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Hand Length
                </h3>
                <p className="text-gray-700 mb-4">
                  Measure from the tip of the middle finger to the first wrist
                  line (where the palm begins).
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">Tip:</strong> Keep the hand
                    relaxed and flat on a surface. The hand should not be
                    clenched or fully stretched.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full mb-3 font-semibold">
                  Measurement 2
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Hand Width
                </h3>
                <p className="text-gray-700 mb-4">
                  Measure the palm width at its widest part, usually at the base
                  of the fingers, from the outer edge of the index finger to the
                  outer edge of the little finger.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">Tip:</strong> Don't force the
                    fingers. Leave the hand in a natural and comfortable
                    position.
                  </p>
                </div>
              </div>

              <div>
                <div className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full mb-3 font-semibold">
                  Measurement 3
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Grip Diameter
                </h3>
                <p className="text-gray-700 mb-4">
                  Ask the person to hold a cylindrical object comfortably (such
                  as a bottle or tube) and measure the object's diameter. This
                  is the ideal grip for comfort.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-700">
                    <strong className="text-black">Tip:</strong> The grip should
                    be comfortable. If there are tremors, test different
                    diameters to find the most stable one.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-black mb-3">
                Important Considerations
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  • All measurements should be in <strong>centimeters</strong>{" "}
                  with one decimal place (e.g. 18.5 cm)
                </p>
                <p>
                  • Always measure the dominant hand (the hand that will be used
                  to hold the device)
                </p>
                <p>
                  • If there is edema (swelling), consider the hand measurements
                  in normal state
                </p>
                <p>
                  • When in doubt between two measurements, prefer the larger
                  one to ensure comfort
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-500/20 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Have questions about measurements?
          </p>
          <Link
            to="/faq"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            See Frequently Asked Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
