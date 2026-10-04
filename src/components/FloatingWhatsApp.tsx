import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useRestaurant();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    'Olá SKYBOAT! Gostaria de consultar a ementa ou fazer uma reserva no restaurante.'
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="mb-3 max-w-[240px] p-3 rounded-2xl bg-[#0B1A2B] border border-[#D4AF37]/40 text-white text-xs shadow-2xl shadow-black relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-[#07111C] text-slate-400 hover:text-white border border-white/10"
            aria-label="Fechar mensagem"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>WhatsApp SkyBoat</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Mesa para hoje ou dúvidas? Fale connosco directamente pelo WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 relative group border-2 border-white/20"
        aria-label="Conversar pelo WhatsApp oficial do SkyBoat"
      >
        <WhatsAppIcon className="w-8 h-8 text-white drop-shadow" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-[#07111C]" />
      </a>
    </div>
  );
};
