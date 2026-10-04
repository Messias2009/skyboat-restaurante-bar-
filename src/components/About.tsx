import React from 'react';
import { ChefHat, Wine, Award, Building2, Compass } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#091522] relative overflow-hidden border-t border-b border-white/5">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with real photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary main image: Restaurant Interior */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-black/80 aspect-4/3 group">
                <SafeImage
                  src="/images/skyboat-salao.jpg"
                  alt="Salão nobre e ambiente noturno do SKYBOAT em Huambo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackSrc="/images/skyboat-placeholder.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block">
                    Ambiente Exclusivo
                  </span>
                  <p className="text-sm font-medium text-white">
                    Conforto, requinte e atmosfera envolvente na Cidade Alta
                  </p>
                </div>
              </div>

              {/* Secondary overlapping image: Signature dish */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl shadow-black/90 aspect-4/3 group bg-[#07111C]">
                <SafeImage
                  src="/images/pratos/vazia-moda-da-casa.jpg"
                  alt="Vazia à moda da casa no SkyBoat"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackSrc="/images/skyboat-placeholder.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111C]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158] block">
                    Assinatura do Chef
                  </span>
                  <p className="text-xs font-semibold text-slate-100 truncate">
                    Vazia à moda da casa
                  </p>
                </div>
              </div>

              {/* Nautical compass ornament badge */}
              <div className="absolute -top-5 -left-5 bg-[#07111C] border border-[#D4AF37]/40 rounded-xl p-3 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0E2A42] flex items-center justify-center text-[#D4AF37]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wider">HUAMBO</div>
                  <div className="text-[10px] text-slate-400">Cidade Alta / Centro Cultural</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Sobre o SkyBoat
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
                Uma experiência além da gastronomia
              </h2>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Nascido no coração do Huambo, na nobre Cidade Alta junto ao Centro Cultural, o <strong className="text-white font-medium">SKYBOAT | Restaurante & Bar</strong> foi concebido para elevar a experiência culinária da região a um novo patamar de requinte, prazer e sofisticação.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Combinamos o melhor da <span className="text-white font-medium">cozinha internacional contemporânea</span> com ingredientes seleccionados, corte de carnes de primeira linha — com destaque para a nossa célebre <em>Vazia à moda da casa</em> —, mixologia de vanguarda e um serviço acolhedor e atencioso.
            </p>

            {/* Experience Pill Grid (Clean, unboxed icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0B1A2B] border border-white/5">
                <div className="p-2.5 rounded-lg bg-[#0E2A42] text-[#D4AF37] shrink-0">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Cozinha Internacional</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Receitas consagradas preparadas com técnicas modernas e ingredientes frescos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0B1A2B] border border-white/5">
                <div className="p-2.5 rounded-lg bg-[#0E2A42] text-[#06B6D4] shrink-0">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Bar & Cocktails de Autor</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Carta exclusiva de cocktails artesanais, licores premium e garrafeira criteriosa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0B1A2B] border border-white/5">
                <div className="p-2.5 rounded-lg bg-[#0E2A42] text-[#D4AF37] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Ambiente Sofisticado</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Decoração intimista em azul petróleo e dourado, ideal para jantares e celebrações.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0B1A2B] border border-white/5">
                <div className="p-2.5 rounded-lg bg-[#0E2A42] text-[#06B6D4] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Localização Privilegiada</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Localizado na Cidade Alta, próximo ao Centro Cultural, com fácil acesso e segurança.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote / Assurance */}
            <div className="p-4 rounded-xl bg-[#0E2A42]/40 border-l-4 border-[#D4AF37] flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-200 italic">
                  “Aqui cada prato conta uma história e cada brinde celebra um momento especial.”
                </p>
                <span className="text-[11px] font-semibold text-[#D4AF37] block mt-1">
                  — Equipa SkyBoat Restaurante & Bar
                </span>
              </div>
              <a
                href="/#reservas"
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-[#D4AF37] text-[#07111C] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C158] transition-colors whitespace-nowrap ml-4 shrink-0"
              >
                Conheça-nos
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
