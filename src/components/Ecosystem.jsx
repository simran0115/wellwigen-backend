import React from "react";
import { motion } from "framer-motion";

const Ecosystem = () => {
  return (
    <section className="w-full min-h-screen bg-[#f5f7f8] px-6 md:px-16 py-16">
      
      {/* TOP TEXT */}
      <p className="text-center text-xs tracking-[0.3em] text-gray-400 mb-4">
        INTELLIGENCE CORE
      </p>

      <h1 className="text-center text-3xl md:text-5xl font-semibold text-gray-800">
        The Wellwigen <span className="text-teal-500">Health Engine</span>
      </h1>

      <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
        Beyond monitoring. Our neural architecture decodes biological markers in
        real-time to predict health trajectories before they manifest.
      </p>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        
        {/* LEFT SIDE */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* GRAPH CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-gray-800 font-medium">
                  Weekly Neuro-Vascular Load
                </h3>
                <p className="text-xs text-gray-400">
                  Synthetic analysis based on circadian alignment
                </p>
              </div>

              <span className="text-xs px-3 py-1 bg-teal-100 text-teal-600 rounded-full">
                OPTIMAL RANGE
              </span>
            </div>

            {/* GRAPH */}
            <div className="flex items-end gap-4 h-40">
            {[40, 60, 90, 55, 70, 50, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`w-10 rounded-lg ${
                  i === 2
                    ? "bg-teal-400"
                    : i === 6
                    ? "bg-green-300"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

            {/* STATS */}
            <div className="flex justify-between text-sm text-gray-600 mt-6">
              <div>
                <p className="text-xs text-gray-400">AVG HRV</p>
                <p className="font-semibold">72 ms</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">DEEP SLEEP</p>
                <p className="font-semibold">2.4 hrs</p>
              </div>
            </div>

            <div className="text-right mt-4">
              <button className="text-teal-500 text-sm hover:underline">
                View Detailed Report →
              </button>
            </div>
          </div>

          {/* BOTTOM CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Cognitive */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-2">
                Cognitive Efficiency
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                AI detected a 12% increase in beta-wave patterns during your
                morning work cycle. Focus state is peaking.
              </p>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-teal-400 h-2 rounded-full w-[85%]" />
              </div>

              <p className="text-right text-xs text-gray-400 mt-1">85%</p>
            </div>

            {/* Recovery */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-2">
                Recovery Gradient
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Metabolic recovery is accelerating. Recommendation:
                High-intensity interval training session tomorrow.
              </p>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-green-400 h-2 rounded-full w-[84%]" />
              </div>

              <p className="text-right text-xs text-gray-400 mt-1">84%</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          
          {/* ALERT */}
          <div className="bg-white border border-red-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-red-400 mb-2">
              ▲ CRITICAL RISK VECTOR
            </p>

            <h3 className="text-gray-800 font-medium mb-2">
              Hydration Anomaly
            </h3>

            <p className="text-xs text-gray-500 mb-4">
              Plasma osmality sensors indicate a trend toward cellular
              dehydration. Cognitive fatigue predicted within 45 minutes.
            </p>

            <button className="w-full bg-red-100 text-red-500 py-2 rounded-lg text-sm hover:bg-red-200 transition">
              Acknowledge Warning
            </button>
          </div>
          <div>
          {/* AI PROTOCOL */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-teal-400 mb-2">✦ AI Protocol</p>
            

            <ul className="text-sm text-gray-700 space-y-2">
              <li>💧 Intake 500ml H2O</li>
              <li>🌙 Blue Light Shield</li>
              <li>💊 Magnesium L-Threonate</li>
            </ul>

            <p className="text-xs text-gray-400 mt-3">
              Immediate stabilization required
            </p>
          </div>

          {/* ENGINE STATUS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-3">ENGINE STATUS</p>

            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-teal-100 to-gray-100 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-teal-300 animate-pulse"></div>
            </div>
          </div>
        </div>
        </div>

      </div>
      {/* ================= PREDICTIVE SECTION ================= */}
<div className="grid md:grid-cols-2 gap-8 items-center mt-12">

  {/* LEFT SIDE */}
  <div className="bg-[#eef4f4] rounded-2xl p-8 md:p-12">
    
    <p className="text-xs tracking-[0.3em] text-teal-500 mb-4">
      ADVANCED AI
    </p>

    <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 leading-snug">
      Predictive Analysis for Longevity
    </h2>

    <p className="text-gray-500 mt-4 text-sm md:text-base max-w-md">
      Our neural network analyzes over 4,000 data points daily
      to identify potential health risks before symptoms arise.
    </p>

    <button className="mt-8 text-teal-500 text-sm flex items-center gap-2 hover:gap-3 transition-all">
      Explore our Whitepaper →
    </button>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col gap-8">
    
    {/* Medical Accuracy */}
    <div>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-3">
        <div className="h-1 bg-teal-400 rounded-full w-[85%]" />
      </div>

      <h3 className="text-gray-800 font-medium">
        Medical Accuracy
      </h3>

      <p className="text-xs text-gray-500 mt-1 max-w-sm">
        Validated by top clinical researchers from Stanford and MIT Health Labs.
      </p>
    </div>

    {/* Privacy First */}
    <div>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-3">
        <div className="h-1 bg-teal-400 rounded-full w-[70%]" />
      </div>

      <h3 className="text-gray-800 font-medium">
        Privacy First
      </h3>

      <p className="text-xs text-gray-500 mt-1 max-w-sm">
        Your health data is encrypted end-to-end. We never sell your personal information.
      </p>
    </div>

  </div>
</div>
    </section>

    
  );
};

export default Ecosystem;