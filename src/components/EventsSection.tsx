import React, { useState } from 'react';
import { EventCategory, EventItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { Calendar, Clock, Music, Award, ArrowRight } from 'lucide-react';

const EVENT_CATEGORIES: (EventCategory | 'Todos')[] = [
  'Todos',
  'Eventos',
  'Música ao vivo',
  'Festas',
  'Aniversários',
  'Momentos especiais',
];

export const EventsSection: React.FC = () => {
  const { events, config } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'Todos'>('Todos');

  const filteredEvents = events.filter((ev) => {
    if (!ev.active) return false;
    if (selectedCategory === 'Todos') return true;
    return ev.category === selectedCategory;
  });

  const handleReserveEvent = (event: EventItem) => {
    // Open WhatsApp pre-filled with the event name
    const cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
    const message = `🎉 *RESERVA PARA EVENTO - SKYBOAT HUAMBO*\n\nOlá, gostaria de reservar uma mesa para o evento:\n*${event.title}*\n📅 Data: ${event.date}\n⏰ Horário: ${event.time}\n\nPor favor, confirmem os detalhes de acesso e disponibilidade. Obrigado!`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="eventos" className="py-24 bg-[#07111C] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Noites & Experiências
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Eventos & Música ao Vivo
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Descubra as noites de jazz, sunsets gastronómicos, apresentações musicais acústicas e momentos memoráveis no SkyBoat.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#07111C] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0B1A2B] text-slate-300 hover:text-white hover:bg-[#0E2A42] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl bg-[#0B1A2B] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-[#07111C]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2B] via-transparent to-black/30" />

                {/* Event Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded bg-[#0E2A42]/90 border border-[#D4AF37]/40 text-[#E5C158] font-bold text-[10px] tracking-wider uppercase backdrop-blur-xs">
                    {event.category}
                  </span>
                </div>

                {event.highlight && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#D4AF37] text-[#07111C] font-bold text-[10px] tracking-wider uppercase shadow-md">
                    {event.highlight}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Time Clean Metadata */}
                  <div className="flex items-center gap-3 text-xs text-[#06B6D4] font-medium mb-2.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {event.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Huambo • Cidade Alta
                  </span>

                  <button
                    onClick={() => handleReserveEvent(event)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#D4AF37]/15"
                  >
                    <span>Reservar para este evento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Private Event CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B1A2B] via-[#0E2A42] to-[#0B1A2B] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              Planeia um Evento Privado ou Aniversário?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Oferecemos áreas reservadas, menús personalizados de degustação e atendimento exclusivo para grupos e empresas.
            </p>
          </div>

          <a
            href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'Olá SkyBoat, gostaria de informações sobre realização de um evento privado/aniversário no restaurante.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            Falar com a Gerência
          </a>
        </div>

      </div>
    </section>
  );
};
