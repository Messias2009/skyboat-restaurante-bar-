import React, { useState } from 'react';
import { Star, Flame, Clock, Check, Plus, UtensilsCrossed } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const SpecialtySpotlight: React.FC = () => {
  const { products, addToCart, setIsCartOpen } = useRestaurant();
  const [added, setAdded] = useState(false);

  const vaziaProduct = products.find((p) => p.id === 'vazia-moda-da-casa') || products[0];

  const handleOrderVazia = () => {
    if (vaziaProduct) {
      addToCart(vaziaProduct, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const formattedPrice = new Intl.NumberFormat('pt-AO').format(vaziaProduct?.price || 14500);

  return (
    <section className="py-16 bg-gradient-to-b from-[#091522] via-[#07111C] to-[#091522] relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0B1A2B] via-[#08131E] to-[#07111C] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/80 relative overflow-hidden">
          
          {/* Subtle gold ribbon tag */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D4AF37] to-[#B89628] text-[#07111C] font-bold text-[11px] uppercase tracking-widest py-1.5 px-6 rounded-bl-xl shadow-md">
            Destaque da Casa
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Premium Plate Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 border-2 border-[#D4AF37]/50 shadow-2xl">
                <img
                  src={vaziaProduct?.image || '/src/assets/images/skyboat_vazia_signature_1791149288060.jpg'}
                  alt="Vazia à moda da casa SkyBoat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#E5C158]">
                    <Star className="w-3.5 h-3.5 fill-[#E5C158]" />
                    <Star className="w-3.5 h-3.5 fill-[#E5C158]" />
                    <Star className="w-3.5 h-3.5 fill-[#E5C158]" />
                    <Star className="w-3.5 h-3.5 fill-[#E5C158]" />
                    <Star className="w-3.5 h-3.5 fill-[#E5C158]" />
                  </div>
                  <span className="text-xs text-slate-300 font-mono">100% Corte Nobre</span>
                </div>
              </div>
            </div>

            {/* Right: Description & CTA */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#06B6D4]">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span>Especialidade Exclusiva</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
                Vazia à moda da casa
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                O prato mais aclamado pelos nossos clientes no Huambo. Um corte nobre de carne de vaca maturada, grelhado com maestria à temperatura ideal, coroado com a nossa aromática manteiga de ervas da quinta, dentes de alho confitados e batatas rústicas douradas ao alecrim.
              </p>

              {/* Dish specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#07111C]/60 border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Tempo de preparo</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-[#D4AF37]" /> 25-30 min
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#07111C]/60 border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Harmonização</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block truncate">
                    Vinho Tinto Douro / Dão
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#07111C]/60 border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[11px]">Serviço</span>
                  <span className="font-semibold text-[#06B6D4] mt-0.5 block">
                    Almoço & Jantar
                  </span>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Preço</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                    {formattedPrice} <span className="text-base font-sans font-medium text-slate-300">Kz</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleOrderVazia}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Adicionar ao Pedido</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      handleOrderVazia();
                      setIsCartOpen(true);
                    }}
                    className="p-3 rounded-lg bg-[#0E2A42] hover:bg-[#123654] border border-[#D4AF37]/30 text-white hover:text-[#D4AF37] transition-colors"
                    title="Adicionar e ver pedido"
                    aria-label="Adicionar e abrir pedido"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
