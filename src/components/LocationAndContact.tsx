import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Clock, Compass, Navigation, ArrowUpRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LocationAndContact: React.FC = () => {
  const { config } = useRestaurant();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Centro Cultural Huambo Cidade Alta Angola'
  )}`;

  const cleanWhatsappNumber = config.whatsapp.replace(/[^0-9]/g, '');
  const whatsappChatUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Olá SKYBOAT! Gostaria de mais informações sobre o restaurante e localização.'
  )}`;

  return (
    <section id="localizacao" className="py-24 bg-[#07111C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Onde Estamos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Visite-nos na Cidade Alta
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Estamos situados no coração cultural e histórico do Huambo, com fácil acesso, ambiente seguro e estacionamento privativo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Operating Hours */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Identity Card */}
            <div className="p-6 rounded-2xl bg-[#0B1A2B] border border-white/5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-display text-xl font-bold text-white">
                  {config.name}
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#06B6D4] font-medium block -mt-2 mb-3">
                {config.subtitle}
              </span>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Endereço:</span>
                    <p className="text-slate-300 leading-snug">{config.locationName}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{config.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Phone className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Telefone & Reservas:</span>
                    <a
                      href={`tel:${config.phone.replace(/\s+/g, '')}`}
                      className="text-slate-200 hover:text-[#D4AF37] font-mono transition-colors"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">WhatsApp Oficial:</span>
                    <a
                      href={whatsappChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-emerald-400 font-mono transition-colors"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Instagram:</span>
                    <a
                      href={config.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-pink-300 transition-colors"
                    >
                      {config.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-[#0B1A2B] border border-white/5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-display text-base font-bold text-white">
                  Horário de Funcionamento
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Terça a Quinta</span>
                  <span className="font-semibold text-white font-mono">12h00 – 23h00</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Sexta a Domingo</span>
                  <span className="font-semibold text-[#D4AF37] font-mono">12h00 – 02h00</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Segunda-feira</span>
                  <span className="font-medium text-slate-400">Encerrado</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#0E2A42] hover:bg-[#123654] border border-[#D4AF37]/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Obter direções</span>
              </a>

              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#D4AF37]/15"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Map with Modern Dark Styling */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative min-h-[380px] flex flex-col bg-[#0B1A2B]">
            <div className="p-3.5 bg-[#08131E] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-white">
                  Huambo • Centro Cultural / Cidade Alta
                </span>
              </div>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Ver no Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full h-full relative">
              <iframe
                title="Localização do SKYBOAT Restaurante e Bar no Huambo"
                src="https://maps.google.com/maps?q=Centro+Cultural+do+Huambo+Angola&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[360px] border-0 filter contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
