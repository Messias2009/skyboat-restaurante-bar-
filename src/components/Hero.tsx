import React from 'react';
import { Utensils, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const { config } = useRestaurant();

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#07111C]"
    >
      {/* Background Image with Layered Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/skyboat_hero_ambiance_1791149275895.jpg"
          alt="Ambiente exclusivo SKYBOAT Restaurante e Bar no Huambo"
          className="w-full h-full object-cover object-center scale-105 transform animate-fade-in duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Deep petroleum & dark nautical gradient scrim for WCAG AA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111C] via-[#07111C]/80 to-[#07111C]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111C]/90 via-[#07111C]/60 to-[#07111C]/80" />
        {/* Subtle geometric nautical compass accent */}
        <div className="absolute inset-0 bg-nautical-grid opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Small location indication */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2A42]/80 border border-[#D4AF37]/30 text-xs text-[#E5C158] font-medium tracking-widest uppercase mb-6 backdrop-blur-sm shadow-md animate-fade-in">
          <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Huambo • Cidade Alta</span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 text-balance leading-none">
          <span className="block drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300">
            SKYBOAT
          </span>
          <span className="block font-sans text-xl sm:text-2xl md:text-3xl font-light tracking-[0.25em] text-[#D4AF37] uppercase mt-2">
            Restaurante & Bar
          </span>
        </h1>

        {/* Brand Tagline */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-200 font-light max-w-2xl leading-relaxed text-balance drop-shadow">
          “Uma experiência gastronómica que merece ser vivida.”
        </p>

        <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
          Cozinha internacional requintada, cocktails de autor e noites memoráveis na Cidade Alta do Huambo.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="/#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase text-[#07111C] bg-[#D4AF37] hover:bg-[#E5C158] transition-all duration-200 shadow-xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Utensils className="w-4 h-4" />
            <span>Ver Menu</span>
          </a>

          <a
            href="/#reservas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase text-white bg-[#0E2A42]/80 hover:bg-[#0E2A42] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-200 shadow-lg hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Reservar Mesa</span>
          </a>
        </div>

        {/* Key Features Banner Bar */}
        <div className="mt-14 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/10 text-left">
          <div className="p-3 rounded-lg bg-black/30 border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Localização</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 block truncate">Cidade Alta / Centro</span>
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Gastronomia</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 block truncate">Internacional & Grill</span>
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Mixologia</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 block truncate">Cocktails de Autor</span>
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Reservas</span>
            <span className="text-xs sm:text-sm font-semibold text-[#D4AF37] block truncate">WhatsApp Directo</span>
          </div>
        </div>

        {/* Gentle scroll indicator */}
        <a
          href="/#sobre"
          className="mt-10 text-slate-400 hover:text-[#D4AF37] transition-colors flex flex-col items-center gap-1 group"
          aria-label="Rolar para a secção Sobre"
        >
          <span className="text-[10px] tracking-widest uppercase">Descubra</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </a>
      </div>
    </section>
  );
};
