import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#f5f7f8]">

      {/* ================= ECOSYSTEM SECTION ================= */}
      <section className="px-6 md:px-16 py-16">

        {/* Heading */}
        <p className="text-center text-xs tracking-[0.3em] text-gray-400 mb-3">
          SMART CONNECT CARE
        </p>

        <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-800">
          Complete Integrated <br />Ecosystem
        </h2>

        <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Seamlessly connecting every facet of your clinical journey through a
          single intelligent portal.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {/* LEFT BIG CARD */}
          <div className="md:col-span-2 bg-gradient-to-br from-teal-200 to-teal-500 rounded-2xl p-6 flex flex-col justify-end text-white h-[260px] shadow-sm">
            <h3 className="text-xl font-semibold">Doctors Consultation</h3>
            <p className="text-sm mt-2 text-white/80 max-w-md">
              24/7 access to board-certified specialists via secure, lag-free
              clinical uplinks. Instant prescriptions and referrals.
            </p>

            <button className="mt-4 text-sm flex items-center gap-2 hover:gap-3 transition-all">
              CONNECT NOW →
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col justify-end text-white h-[260px] shadow-sm">
            <p className="text-xs text-teal-300 mb-2">BIOMETRIC LINKED</p>
            <h3 className="text-lg font-semibold">Fitness Training</h3>
            <p className="text-xs text-gray-300 mt-2">
              Movement protocols that adapt dynamically to your morning HRV and recovery metrics.
            </p>
          </div>

          {/* BOTTOM LEFT */}
          <div className="bg-teal-100 rounded-2xl p-6 flex flex-col justify-end h-[200px] shadow-sm">
            <h3 className="text-gray-800 font-medium">Lab Tests</h3>
            <p className="text-xs text-gray-500 mt-2">
              Advanced diagnostics powered by AI.
            </p>
          </div>

          {/* MIDDLE CARD */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-[200px] shadow-sm">
            <div>
              <h3 className="text-gray-800 font-medium">Medicine Delivery</h3>
              <p className="text-xs text-gray-500 mt-2">
                Cold-chain pharmaceutical delivery tracked in real-time to your door.
              </p>
            </div>

            <div className="bg-teal-500 text-white text-xs px-4 py-2 rounded-lg w-fit">
              PREMIUM
            </div>
          </div>

          {/* RIGHT SMALL STACK */}
          <div className="flex flex-col gap-4">
            
            <div className="bg-teal-50 rounded-xl p-4 shadow-sm">
              <h4 className="text-gray-800 text-sm font-medium">
                Nutrition & Food
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Macronutrient-aligned meal planning
              </p>
            </div>

            <div className="bg-teal-50 rounded-xl p-4 shadow-sm">
              <h4 className="text-gray-800 text-sm font-medium">
                Fruit Marketplace
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Fresh organic supply chain
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;