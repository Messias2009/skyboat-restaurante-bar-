import React, { useState, useMemo } from 'react';
import { ProductCategory, ProductItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { Plus, Check, Search, Star, Clock } from 'lucide-react';
import { SafeImage } from './SafeImage';

const CATEGORIES: ProductCategory[] = [
  'Pratos principais',
  'Entradas',
  'Hambúrgueres',
  'Massas',
  'Acompanhamentos',
  'Sobremesas',
  'Cocktails',
  'Bebidas',
];

export const MenuCatalog: React.FC = () => {
  const { products, addToCart, setIsCartOpen } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#07111C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Cardápio Gastronómico
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Carta & Especialidades SkyBoat
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Selecção refinada de carnes nobres, peixes frescos, massas artesanais e mixologia de alto padrão para momentos inesquecíveis no Huambo.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar prato, cocktail, bebida..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1A2B] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Quick Helper Text */}
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span>{filteredProducts.length} itens disponíveis na carta</span>
            </div>
          </div>

          {/* Category Tabs (Interactive Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wider transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'Todos'
                  ? 'bg-[#D4AF37] text-[#07111C] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0B1A2B] text-slate-300 hover:text-white hover:bg-[#0E2A42] border border-white/5'
              }`}
            >
              Todos os Itens
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#07111C] shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#0B1A2B] text-slate-300 hover:text-white hover:bg-[#0E2A42] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#0B1A2B]/40 border border-white/5">
            <p className="text-slate-400 text-base mb-3">
              Nenhum prato ou produto encontrado para &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-[#07111C] bg-[#D4AF37] rounded-lg uppercase tracking-wider hover:bg-[#E5C158]"
            >
              Ver Menu Completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = !!addedIds[product.id];
              const formattedPrice = new Intl.NumberFormat('pt-AO').format(product.price);

              return (
                <article
                  key={product.id}
                  className={`group rounded-2xl bg-[#0B1A2B] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1 ${
                    product.isSpecialty
                      ? 'border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/30'
                      : 'border-white/5 hover:border-[#D4AF37]/30'
                  }`}
                >
                  {/* Card Header & Visual Media */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#07111C]">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      fallbackSrc="/images/skyboat-placeholder.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2B] via-transparent to-black/20" />

                    {/* Unboxed subtle badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.isSpecialty && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#D4AF37] text-[#07111C] font-bold text-[10px] tracking-wider uppercase shadow-md">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Especialidade da Casa</span>
                        </div>
                      )}
                      {product.badge && !product.isSpecialty && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#06B6D4] text-[#07111C] font-bold text-[10px] tracking-wider uppercase shadow-md">
                          <span>{product.badge}</span>
                        </div>
                      )}
                    </div>

                    {product.prepTime && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{product.prepTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
                        <span className="text-[#06B6D4] uppercase tracking-wider text-[11px]">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Huambo</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action Footer */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider block">
                          Preço
                        </span>
                        <span className="font-display text-xl font-bold text-[#D4AF37] tabular-nums">
                          {formattedPrice} <span className="text-xs font-sans font-medium text-slate-300">Kz</span>
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#0E2A42] hover:bg-[#D4AF37] text-white hover:text-[#07111C] border border-[#D4AF37]/30 hover:border-transparent active:scale-95'
                        }`}
                        aria-label={`Adicionar ${product.name} ao pedido`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
