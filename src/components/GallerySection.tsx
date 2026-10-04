import React, { useState } from 'react';
import { GalleryItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { X, ZoomIn } from 'lucide-react';

const CATEGORIES = ['Todos', 'Pratos', 'Bebidas', 'Restaurante', 'Eventos', 'Ambiente'] as const;

export const GallerySection: React.FC = () => {
  const { gallery } = useRestaurant();
  const [activeTab, setActiveTab] = useState<string>('Todos');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredGallery = gallery.filter((item) => {
    if (activeTab === 'Todos') return true;
    return item.category === activeTab;
  });

  return (
    <section id="galeria" className="py-24 bg-[#091522] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Momentos & Atmosfera
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Galeria Visual SkyBoat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Uma amostra visual da nossa gastronomia requintada, mixologia cuidada e ambiente elegante no Huambo.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#D4AF37] text-[#07111C] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0B1A2B] text-slate-300 hover:text-white hover:bg-[#0E2A42] border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer bg-[#07111C] border border-white/5 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-black/60 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#06B6D4] tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight mt-0.5 line-clamp-2">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-1 font-light">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Acompanhe as novidades e momentos em tempo real no nosso Instagram:
          </p>
          <a
            href="https://instagram.com/skyboatretaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-sm font-bold text-[#D4AF37] hover:text-[#E5C158] transition-colors"
          >
            <span>@skyboatretaurant</span>
            <span className="text-xs bg-[#0E2A42] px-2 py-0.5 rounded text-[#06B6D4]">Seguir</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#07111C] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Fechar visualização"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Description */}
            <div className="p-5 bg-[#0B1A2B] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#06B6D4] tracking-widest block">
                  {activeLightbox.category} • SKYBOAT Huambo
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">
                  {activeLightbox.title}
                </h3>
                {activeLightbox.caption && (
                  <p className="text-xs text-slate-300 mt-1 font-light">
                    {activeLightbox.caption}
                  </p>
                )}
              </div>

              <a
                href="/#reservas"
                onClick={() => setActiveLightbox(null)}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors whitespace-nowrap"
              >
                Reservar Mesa
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
