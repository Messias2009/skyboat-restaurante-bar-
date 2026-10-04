import React from 'react';
import { Compass, Phone, Instagram, ArrowUp } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { config } = useRestaurant();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050D15] text-slate-400 border-t border-[#D4AF37]/20 pt-16 pb-10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Presentation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-[#0E2A42] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-wider block leading-none">
                  SKYBOAT
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mt-1">
                  Restaurante & Bar
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-light">
              Uma experiência gastronómica que merece ser vivida no Huambo. Cozinha internacional contemporânea, carnes nobres grelhadas, cocktails de autor e momentos memoráveis na Cidade Alta.
            </p>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0B1A2B] border border-white/10 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center transition-colors"
                title="Conversar no WhatsApp"
                aria-label="Abrir WhatsApp oficial"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0B1A2B] border border-white/10 hover:border-pink-400 text-pink-400 hover:bg-pink-400/10 flex items-center justify-center transition-colors"
                title="Siga no Instagram"
                aria-label="Abrir Instagram oficial"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="w-10 h-10 rounded-xl bg-[#0B1A2B] border border-white/10 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors"
                title="Ligar para o restaurante"
                aria-label="Ligar para o restaurante"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="/#sobre" className="hover:text-white transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="/#menu" className="hover:text-white transition-colors">Ementa & Carta</a>
              </li>
              <li>
                <a href="/#eventos" className="hover:text-white transition-colors">Eventos & Noites</a>
              </li>
              <li>
                <a href="/#galeria" className="hover:text-white transition-colors">Galeria</a>
              </li>
              <li>
                <a href="/#reservas" className="hover:text-white transition-colors">Reservar Mesa</a>
              </li>
              <li>
                <a href="/#localizacao" className="hover:text-white transition-colors">Localização</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="text-white font-medium">Vazia à moda da casa</li>
              <li>Tornedó com Pimenta Verde</li>
              <li>Camarão Salteado ao Alho</li>
              <li>Hambúrguer SkyBoat</li>
              <li>Cocktails de Autor</li>
              <li>Petit Gâteau Dourado</li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Huambo • Angola
            </h4>
            <p className="text-xs text-slate-300 leading-snug">
              Cidade Alta / Centro Cultural
            </p>
            <p className="text-xs font-mono text-[#D4AF37] font-semibold">
              {config.phone}
            </p>
            <div className="text-[11px] text-slate-400 pt-1 space-y-1">
              <p>Terça a Quinta: 12h00 – 23h00</p>
              <p>Sexta a Domingo: 12h00 – 02h00</p>
              <p className="text-slate-500">Segunda-feira: Encerrado</p>
            </div>
          </div>

        </div>

        {/* Clean Copyright & Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left leading-normal">
            &copy; 2026 SKYBOAT | Restaurante & Bar. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="px-3.5 py-1.5 rounded-lg bg-[#0B1A2B] hover:bg-[#0E2A42] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 border border-white/5"
            aria-label="Voltar ao topo da página"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] tracking-wider uppercase font-semibold">Topo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
