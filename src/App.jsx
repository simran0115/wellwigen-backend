import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
// import WhatLookingFor from './components/WhatLookingFor';
// import Statistics from './components/Statistics';
// import GoalsExpertise from './components/GoalsExpertise';
// import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Metrics from './components/Metrics';
// import CallToAction from './components/CallToAction';
// import About from './components/About';
// import Trainer from './components/Trainer';
// import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
// import FloatingSocials from './components/FloatingSocials';
import TermsAndConditions from './components/TermsAndConditions';
// import AdminPanel from './components/AdminPanel';
// import TrainerForm from './components/TrainerForm';
import SectionWrapper from './components/SectionWrapper';
import ContactUs from './components/ContactUs';
import NotFound from './components/NotFound';
import Ecosystem from "./components/Ecosystem";

import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Dashboard from "./components/Dashboard";
import Diet from "./components/Diet";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <ParticlesBackground />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* ADMIN */}
          {/* <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-dashboard" element={<AdminPanel />} /> */}

          {/* TRAINER */}
          <Route path="/join-as-trainer" element={
            <PageWrapper>
              <Helmet>
                <title>Join as a Trainer | Wellwigen</title>
              </Helmet>
              <Header />
              {/* <TrainerForm /> */}
              <Footer />
            </PageWrapper>
          } />

          {/* TERMS */}
          <Route path="/terms-and-conditions" element={
            <PageWrapper>
              {/* <Header /> */}
              <TermsAndConditions />
              <Footer />
            </PageWrapper>
          } />

          {/* HOME */}
          <Route path="/" element={
            <PageWrapper>
              <Helmet>
                <title>Wellwigen | AI Health System</title>
              </Helmet>

              {/* <Header /> */}

              <main>
                <Hero />
                <SectionWrapper><Ecosystem /></SectionWrapper>
                <SectionWrapper><Pricing /></SectionWrapper>
                <SectionWrapper><Dashboard /></SectionWrapper>
                 <SectionWrapper><Diet /></SectionWrapper>

                {/* <SectionWrapper><WhatLookingFor /></SectionWrapper> */}
                {/* <SectionWrapper><Statistics /></SectionWrapper> */}
                {/* <SectionWrapper><GoalsExpertise /></SectionWrapper> */}
                {/* <SectionWrapper><Services /></SectionWrapper> */}
                <SectionWrapper><Testimonials /></SectionWrapper>
                <SectionWrapper><Metrics /></SectionWrapper>
                {/* <SectionWrapper><CallToAction /></SectionWrapper> */}
                {/* <SectionWrapper><About /></SectionWrapper> */}
                {/* <SectionWrapper><Trainer /></SectionWrapper> */}
                {/* <SectionWrapper><TrainerForm /></SectionWrapper> */}
                {/* <SectionWrapper><ConsultationForm /></SectionWrapper> */}
                <SectionWrapper><ContactUs /></SectionWrapper>
              </main>

              <Footer />
              {/* <FloatingSocials /> */}
            </PageWrapper>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;





/* ================= PAGE WRAPPER ================= */

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}