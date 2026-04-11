import React from "react";
import { motion } from "framer-motion";
import InteractiveCard from "./InteractiveCard";
import MagneticButton from "./MagneticButton";
import ParticleEffect from "./ParticleEffect";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      features: [
        "Diet Plan & Nutrition Tips",
        "Workout Plan Library",
        "Daily Activity Tracking",
        "Health Score Tracking",
        "Access via Mobile App",
      ],
    },
    {
      name: "Pro",
      price: "₹1999",
      highlight: true,
      features: [
        "All Basic Features",
        "AI Health Insights",
        "Personalized Workout Plans",
        "Personalized Meal Plans",
        "Sleep & Recovery Tracking",
        "Monthly Progress Reports",
        "Priority Email Support",
      ],
    },
    {
      name: "Elite",
      price: "₹2999",
      features: [
        "All Pro Features",
        "1-on-1 Consultation with Health Coach",
        "Weekly Personalized Workout Adjustments",
        "Advanced Analytics on Health Trends",
        "Meditation & Stress Management Modules",
        "Exclusive Premium Content & Guides",
        "24/7 Chat Support",
        "Early Access to New Features & Rewards",
      ],
    },
  ];

  return (
    <section className="relative px-6 md:px-20 py-24 text-center bg-[#f4f8f9] text-gray-800">
      
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#eef7f8] to-[#f4f8f9] rounded-3xl"></div>

      {/* Light Animated Glow */}
      <motion.div
        className="absolute inset-0 -z-20 pointer-events-none"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,150,136,0.08),rgba(255,255,255,0.9))]"></div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Flexible healthcare & fitness subscriptions designed to help you achieve your wellness goals
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer"
          >
            {/* Highlight Plan */}
            {plan.highlight && (
              <>
                <motion.div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-30 -z-10"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <ParticleEffect count={20} />
              </>
            )}

            <InteractiveCard>
              <motion.div
                className={`relative p-8 rounded-3xl transition-all duration-500 ${
                  plan.highlight
                    ? "bg-white border border-teal-400 shadow-lg"
                    : "bg-white border border-gray-200 shadow-md"
                }`}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0,150,136,0.15)",
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-800">
                  {plan.name}
                </h3>

                <p className="text-4xl font-bold mt-4 text-teal-600">
                  {plan.price}
                  <span className="text-sm text-gray-500"> /month</span>
                </p>

                <ul className="mt-6 space-y-3 text-gray-600 text-sm text-left">
                  {plan.features.map((f, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-teal-500">✔</span> {f}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8">
                  <MagneticButton>
                    <span className="text-white bg-teal-500 px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                      Choose Plan
                    </span>
                  </MagneticButton>
                </div>
              </motion.div>
            </InteractiveCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Pricing;