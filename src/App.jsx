import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatLookingFor from './components/WhatLookingFor';
import Statistics from './components/Statistics';
import GoalsExpertise from './components/GoalsExpertise';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Metrics from './components/Metrics';
import CallToAction from './components/CallToAction';
import About from './components/About';
import Trainer from './components/Trainer';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import TermsAndConditions from './components/TermsAndConditions';
import AdminPanel from './components/AdminPanel';
import TrainerForm from './components/TrainerForm';
import SectionWrapper from './components/SectionWrapper';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/join-as-trainer" element={<>
          <Header />
          <TrainerForm />
          <Footer />
        </>} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="/terms-and-conditions" element={<>
          <Header />
          <TermsAndConditions />
          <Footer />
        </>} />
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <SectionWrapper><WhatLookingFor /></SectionWrapper>
              <SectionWrapper><Statistics /></SectionWrapper>
              <SectionWrapper><GoalsExpertise /></SectionWrapper>
              <SectionWrapper><Services /></SectionWrapper>
              <SectionWrapper><Testimonials /></SectionWrapper>
              <SectionWrapper><Metrics /></SectionWrapper>
              <SectionWrapper><CallToAction /></SectionWrapper>
              <SectionWrapper><About /></SectionWrapper>
              <SectionWrapper><Trainer /></SectionWrapper>

              <SectionWrapper><ConsultationForm /></SectionWrapper>
              <SectionWrapper><ContactUs /></SectionWrapper>
            </main>
            <Footer />
            <FloatingSocials />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
