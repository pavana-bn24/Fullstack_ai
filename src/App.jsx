import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { usePaymentGuard } from './hooks/usePaymentGuard';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import HeroSection from './components/HeroSection';
import ProblemOpportunitySection from './components/ProblemOpportunitySection';
import ProgramSection from './components/ProgramSection';
import ProjectsSection from './components/ProjectsSection';
import DifferenceSection from './components/DifferenceSection';
import AudienceSection from './components/AudienceSection';
import TransformationSection from './components/TransformationSection';
import FinalCTASection from './components/FinalCTASection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import PreBookingModal from './components/PreBookingModal';
import FreeResourcesModal from './components/FreeResourcesModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import PaymentFailedModal from './components/PaymentFailedModal';

export default function App() {
  useSmoothScroll();
  const { paymentSuccess, paymentFailed, leadSession, dismissPaymentStatus } = usePaymentGuard();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('whatsapp');
  const [preBookingOpen, setPreBookingOpen] = useState(false);
  const [freeResourcesOpen, setFreeResourcesOpen] = useState(false);

  const openWhatsAppModal = () => {
    setModalType('whatsapp');
    setModalOpen(true);
  };

  const openEarlyAccessModal = () => {
    setModalType('early_access');
    setModalOpen(true);
  };

  const openPreBookingModal = () => {
    setPreBookingOpen(true);
  };

  const openFreeResourcesModal = () => {
    setFreeResourcesOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="site-root w-full max-w-full overflow-x-hidden min-h-screen bg-[#f7f1df] text-[#382c25] selection:bg-[#234d3b] selection:text-white relative">
        <LanguageToggle />

        <HeroSection
          onOpenWhatsApp={openWhatsAppModal}
          onOpenEarlyAccess={openEarlyAccessModal}
          onOpenPreBooking={openPreBookingModal}
          onOpenFreeResources={openFreeResourcesModal}
        />

        <ProblemOpportunitySection />

        <ProgramSection />

        <ProjectsSection />

        <DifferenceSection />

        <AudienceSection />

        <TransformationSection />

        <FeaturedVideoSection />

        <FinalCTASection
          onOpenWhatsApp={openWhatsAppModal}
          onOpenEarlyAccess={openEarlyAccessModal}
          onOpenPreBooking={openPreBookingModal}
          onOpenFreeResources={openFreeResourcesModal}
        />

        <Footer />

        {preBookingOpen && (
          <PreBookingModal
            pageSource="fullstack-landing"
            onClose={() => setPreBookingOpen(false)}
          />
        )}

        {freeResourcesOpen && (
          <FreeResourcesModal
            onClose={() => setFreeResourcesOpen(false)}
          />
        )}

        {paymentSuccess && (
          <PaymentSuccessModal
            leadSession={leadSession}
            onClose={dismissPaymentStatus}
          />
        )}

        {paymentFailed && (
          <PaymentFailedModal
            leadSession={leadSession}
            onClose={dismissPaymentStatus}
            onRetry={openPreBookingModal}
          />
        )}

        {modalOpen && (
          <ContactModal
            modalType={modalType}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </LanguageProvider>
  );
}
