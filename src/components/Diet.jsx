import React from "react";

const Diet = () => {
  return (
    <section className="w-full bg-[#f5f7f8] px-6 md:px-16 py-16">

      {/* TOP HEADING */}
      <p className="text-center text-xs tracking-[0.3em] text-gray-400 mb-3">
        AUTONOMOUS SUSTENANCE
      </p>

      <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-800">
        Smart Food & <span className="text-teal-500">Fruit System</span>
      </h2>

      <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
        AI-Powered Nutrition. Automatically Optimized for You.
      </p>

      {/* SUB HEADING */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">
        
        <div>
          <p className="text-xs text-teal-500 mb-1">PRECISION NUTRITION</p>
          <h3 className="text-xl font-semibold text-gray-800">
            AI-Powered Meal Recommendations
          </h3>
        </div>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 text-xs bg-teal-100 text-teal-600 rounded-full">
            Diabetic-Friendly
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            High Protein
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            Vitamin-Rich
          </span>
        </div>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* CARD 1 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="salmon bowl"
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h4 className="text-gray-800 font-medium">
              Omega Salmon Bowl
            </h4>
            <p className="text-xs text-teal-500 mt-1">480 kcal</p>

            <p className="text-xs text-gray-500 mt-2">
              High in healthy fats and lean protein to support your active recovery phase.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt="salad"
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h4 className="text-gray-800 font-medium">
              Zen Garden Salad
            </h4>
            <p className="text-xs text-teal-500 mt-1">320 kcal</p>

            <p className="text-xs text-gray-500 mt-2">
              A nutrient-dense blend of leafy greens designed to stabilize glucose levels.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1604908176997-43197b7c5c78"
            alt="grill"
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h4 className="text-gray-800 font-medium">
              Protein Power Grill
            </h4>
            <p className="text-xs text-teal-500 mt-1">540 kcal</p>

            <p className="text-xs text-gray-500 mt-2">
              Lean poultry with mineral-rich roasted roots for sustained metabolic energy.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Diet;