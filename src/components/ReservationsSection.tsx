import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MessageSquare, CheckCircle, Award, Send } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ReservationsSection: React.FC = () => {
  const { submitReservation, config } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [occasion, setOccasion] = useState('Jantar Especial');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) return;

    const whatsappUrl = submitReservation({
      name,
      phone,
      guests,
      date,
      time,
      occasion,
      notes,
    });

    setSubmitted(true);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const timeslots = [
    '12:30', '13:00', '13:30', '14:00',
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <section id="reservas" className="py-24 bg-[#091522] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Mesas & Celebrações
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Reserve a Sua Mesa no SkyBoat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Garanta o seu lugar na Cidade Alta do Huambo para um almoço requintado, um jantar romântico ou uma celebração inesquecível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Hospitality perks */}
          <div className="lg:col-span-5 space-y-6 bg-[#07111C] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              Atendimento Exclusivo
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Ao solicitar a sua reserva, a nossa equipa de hospitalidade recebe a confirmação imediata via WhatsApp para organizar a mesa de acordo com a sua preferência.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0E2A42] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Ambiente Climatizado & Aconchegante</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Salão principal intimista com música ambiente suave ou noites de jazz ao vivo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0E2A42] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Celebrações de Aniversário</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Indique a celebração para podermos preparar uma surpresa com o nosso chef de pastelaria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0E2A42] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Tolerância de 15 Minutos</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    A sua mesa ficará assegurada até 15 minutos após a hora estipulada.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1A2B] border border-[#D4AF37]/20">
              <span className="text-[11px] text-[#D4AF37] font-semibold block uppercase tracking-wider">
                Linha Direta de Reservas
              </span>
              <p className="text-base font-bold text-white mt-1">
                {config.phone}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Huambo – Cidade Alta / Centro Cultural
              </span>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7 bg-[#0B1A2B] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Reserva Encaminhada!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  A mensagem com os dados da sua reserva foi estruturada e aberta no WhatsApp do SkyBoat. Se a aplicação não abriu automaticamente, clique no botão abaixo.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const url = submitReservation({ name, phone, guests, date, time, occasion, notes });
                      window.open(url, '_blank');
                    }}
                    className="px-6 py-3 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors"
                  >
                    Reabrir WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-lg bg-[#07111C] text-slate-300 font-semibold text-xs uppercase tracking-wider hover:text-white border border-white/10"
                  >
                    Nova Solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Baptista"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111C] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Número de Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: +244 923 333 234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111C] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#06B6D4]" />
                      Pessoas *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Data *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                      Hora *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      {timeslots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Tipo de Ocasião (Opcional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Jantar Especial', 'Aniversário', 'Negócios', 'Romântico'].map((occ) => (
                      <button
                        type="button"
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-medium text-center transition-colors ${
                          occasion === occ
                            ? 'bg-[#D4AF37] text-[#07111C] font-semibold'
                            : 'bg-[#07111C] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    Observações ou Preferências (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Preferência de mesa junto à janela, restrições alimentares, celebração surpresa..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07111C] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Solicitar reserva</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    A solicitação abrirá o WhatsApp do SkyBoat com os dados pré-preenchidos.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
