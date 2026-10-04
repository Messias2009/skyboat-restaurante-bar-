import React, { useState, useEffect } from 'react';
import { Calendar, Menu as MenuIcon, X, UtensilsCrossed, Phone } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Navbar: React.FC = () => {
  const { cartItemsCount, setIsCartOpen, config } = useRestaurant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Sobre', href: '/#sobre' },
    { name: 'Ementa', href: '/#menu' },
    { name: 'Eventos', href: '/#eventos' },
    { name: 'Galeria', href: '/#galeria' },
    { name: 'Contactos', href: '/#localizacao' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07111C]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-[#07111C]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand Element */}
          <a
            href="/#inicio"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="SKYBOAT Restaurante & Bar - Início"
          >
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-gradient-to-br from-[#0E2A42] to-[#07111C] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-105 transition-all shadow-inner">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-[1.8]"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 20h20" />
                <path d="M5 20c1-3 4-5 7-5s6 2 7 5" />
                <path d="M12 4v11" />
                <path d="M12 4l7 7h-7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors leading-none">
                SKYBOAT
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mt-1 font-semibold">
                Restaurante & Bar
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-slate-200 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (No Lock icon, no admin traces) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Restaurant Order Button with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-lg bg-[#0E2A42]/80 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all flex items-center gap-2 shadow-sm"
              title="Ver meu pedido"
              aria-label="Abrir resumo do pedido"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                Meu Pedido
              </span>
              {cartItemsCount > 0 && (
                <span className="ml-1 bg-[#D4AF37] text-[#07111C] font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Quick Reservation CTA */}
            <a
              href="/#reservas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg text-[#07111C] bg-[#D4AF37] hover:bg-[#E5C158] transition-all shadow-md shadow-[#D4AF37]/15 hover:shadow-[#D4AF37]/25 hover:translate-y-[-1px] active:translate-y-[0px] whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar Mesa</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none hover:bg-white/5"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07111C]/98 backdrop-blur-xl border-b border-[#D4AF37]/20 px-6 pt-4 pb-6 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="text-base font-medium text-slate-200 hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="/#reservas"
              onClick={handleNavClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-[#D4AF37] text-[#07111C]"
            >
              <Calendar className="w-4 h-4" />
              Reservar Mesa
            </a>

            <a
              href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: {config.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
