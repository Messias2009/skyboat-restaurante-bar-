import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, UtensilsCrossed, Send, AlertCircle, Clock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    submitWhatsAppOrder,
    config,
  } = useRestaurant();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMsg('Seleccione pelo menos um prato ou bebida antes de enviar o pedido.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Por favor, informe o seu nome para identificação do pedido.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 8) {
      setErrorMsg('Por favor, informe um número de telefone válido.');
      return;
    }

    setErrorMsg('');
    const whatsappUrl = submitWhatsAppOrder(customerName, customerPhone, notes);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsCartOpen(false);
  };

  const formattedTotal = new Intl.NumberFormat('pt-AO').format(cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#07111C] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1A2B]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0E2A42] text-[#D4AF37]">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  O Seu Pedido
                </h3>
                <span className="text-[11px] text-[#06B6D4] font-medium">
                  {cart.length} {cart.length === 1 ? 'item seleccionado' : 'itens seleccionados'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Fechar resumo do pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0E2A42] border border-white/5 flex items-center justify-center text-slate-400">
                  <UtensilsCrossed className="w-7 h-7 text-[#D4AF37]/70" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-white">
                    Nenhum prato seleccionado
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                    Consulte a ementa do SkyBoat e adicione pratos gastronómicos ou bebidas ao seu pedido.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#07111C] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C158] transition-colors"
                >
                  Consultar Ementa
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-medium text-slate-400">Pratos e Bebidas</span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpar selecção
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => {
                    const itemSubtotal = new Intl.NumberFormat('pt-AO').format(
                      item.product.price * item.quantity
                    );

                    return (
                      <div
                        key={item.product.id}
                        className="p-3 rounded-xl bg-[#0B1A2B] border border-white/5 flex gap-3 items-center justify-between"
                      >
                        <SafeImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-black/40 shrink-0"
                          fallbackSrc="/images/skyboat-placeholder.jpg"
                        />

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-[#D4AF37] font-medium block tabular-nums">
                            {itemSubtotal} Kz
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-[#07111C] p-1 rounded-lg border border-white/10 shrink-0">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                            aria-label="Diminuir dose"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1.5 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                            aria-label="Aumentar dose"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors shrink-0"
                          title="Remover"
                          aria-label={`Remover ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Customer Information Form */}
                <form id="order-form" onSubmit={handleCheckoutWhatsApp} className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                    Dados do Cliente
                  </span>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      O seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Manuel Silva"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 923 123 456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Observações (Número de Mesa, Ponto da Carne, Take-away)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Mesa 4; Vazia média-passada; Sem gelo na bebida..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Checkout Module */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#0B1A2B] border-t border-[#D4AF37]/20 space-y-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total do Pedido:</span>
                <span className="font-display text-xl font-bold text-[#D4AF37] tabular-nums">
                  {formattedTotal} <span className="text-xs font-sans font-medium text-slate-300">Kz</span>
                </span>
              </div>

              <button
                type="submit"
                form="order-form"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Enviar pedido pelo WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-snug">
                O pedido será encaminhado directamente ao balcão do SkyBoat ({config.phone}) para confirmação imediata.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
