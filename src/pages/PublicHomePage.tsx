import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { SpecialtySpotlight } from '../components/SpecialtySpotlight';
import { MenuCatalog } from '../components/MenuCatalog';
import { ReservationsSection } from '../components/ReservationsSection';
import { EventsSection } from '../components/EventsSection';
import { GallerySection } from '../components/GallerySection';
import { LocationAndContact } from '../components/LocationAndContact';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

interface PublicHomePageProps {
  initialScrollSection?: string;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ initialScrollSection }) => {
  const location = useLocation();

  useEffect(() => {
    // If a hash or section prop is provided, scroll smoothly to it
    const targetId = initialScrollSection || location.hash.replace('#', '');
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, initialScrollSection]);

  return (
    <div className="min-h-screen bg-[#07111C] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#E5C158] overflow-x-hidden">
      {/* Navigation Bar (No locks, pure restaurant branding) */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero / Início */}
        <Hero />

        {/* 2. Sobre o SkyBoat & Diferenciais */}
        <About />

        {/* 3. Destaque Especial: Vazia à moda da casa */}
        <SpecialtySpotlight />

        {/* 4. Menu / Ementa */}
        <MenuCatalog />

        {/* 5. Reservas com WhatsApp integrado */}
        <ReservationsSection />

        {/* 6. Eventos & Música ao Vivo */}
        <EventsSection />

        {/* 7. Galeria com Lightbox */}
        <GallerySection />

        {/* 9 & 10. Localização & Contactos */}
        <LocationAndContact />
      </main>

      {/* 11. Rodapé (Alinhamento corrigido, sem qualquer link administrativo) */}
      <Footer />

      {/* Official WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Restaurant Order Drawer */}
      <CartDrawer />
    </div>
  );
};
