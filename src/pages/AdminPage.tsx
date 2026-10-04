import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  RotateCcw,
  Download,
  Upload,
  Calendar,
  UtensilsCrossed,
  Settings,
  MessageSquare,
  AlertCircle,
  LogOut,
  ExternalLink,
  Compass,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { ProductCategory, ProductItem, EventCategory, EventItem } from '../types/restaurant';
import { SafeImage } from '../components/SafeImage';

export const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    reservations,
    updateReservationStatus,
    deleteReservation,
    orders,
    config,
    updateConfig,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useRestaurant();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'produtos' | 'eventos' | 'reservas' | 'pedidos' | 'config' | 'backup'
  >('produtos');

  // Product modal form state
  const [isEditingProduct, setIsEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'Pratos principais' as ProductCategory,
    price: 12000,
    description: '',
    image: '/src/assets/images/skyboat_vazia_signature_1791149288060.jpg',
    isSpecialty: false,
    badge: '',
    prepTime: '20 min',
  });

  // Event modal form state
  const [isEditingEvent, setIsEditingEvent] = useState<EventItem | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Música ao vivo' as EventCategory,
    date: 'Sexta-feira, 21h00',
    time: '21h00 – 01h00',
    description: '',
    image: '/src/assets/images/skyboat_live_events_1791149322575.jpg',
    highlight: '',
    active: true,
  });

  // Config form state
  const [configForm, setConfigForm] = useState({ ...config });
  const [configSaved, setConfigSaved] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setPinError(false);

    try {
      const success = await loginAdmin(pinInput);
      if (!success) {
        setPinError(true);
      } else {
        setPinInput('');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOpenAddProduct = () => {
    setProdForm({
      name: '',
      category: 'Pratos principais',
      price: 10000,
      description: '',
      image: '/images/pratos/vazia-moda-da-casa.jpg',
      isSpecialty: false,
      badge: '',
      prepTime: '20 min',
    });
    setIsAddingProduct(true);
    setIsEditingProduct(null);
  };

  const handleOpenEditProduct = (p: ProductItem) => {
    setProdForm({
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      image: p.image,
      isSpecialty: !!p.isSpecialty,
      badge: p.badge || '',
      prepTime: p.prepTime || '20 min',
    });
    setIsEditingProduct(p);
    setIsAddingProduct(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    if (isEditingProduct) {
      updateProduct(isEditingProduct.id, {
        name: prodForm.name,
        category: prodForm.category,
        price: Number(prodForm.price),
        description: prodForm.description,
        image: prodForm.image,
        isSpecialty: prodForm.isSpecialty,
        badge: prodForm.badge || undefined,
        prepTime: prodForm.prepTime,
      });
      setIsEditingProduct(null);
    } else if (isAddingProduct) {
      addProduct({
        name: prodForm.name,
        category: prodForm.category,
        price: Number(prodForm.price),
        description: prodForm.description,
        image: prodForm.image,
        isSpecialty: prodForm.isSpecialty,
        badge: prodForm.badge || undefined,
        prepTime: prodForm.prepTime,
        isAvailable: true,
      });
      setIsAddingProduct(false);
    }
  };

  const handleOpenAddEvent = () => {
    setEventForm({
      title: '',
      category: 'Música ao vivo',
      date: 'Sexta-feira, 21h00',
      time: '21h00 – 01h00',
      description: '',
      image: '/images/skyboat-musica-ao-vivo.jpg',
      highlight: '',
      active: true,
    });
    setIsAddingEvent(true);
    setIsEditingEvent(null);
  };

  const handleOpenEditEvent = (ev: EventItem) => {
    setEventForm({
      title: ev.title,
      category: ev.category,
      date: ev.date,
      time: ev.time,
      description: ev.description,
      image: ev.image,
      highlight: ev.highlight || '',
      active: ev.active,
    });
    setIsEditingEvent(ev);
    setIsAddingEvent(false);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    if (isEditingEvent) {
      updateEvent(isEditingEvent.id, {
        title: eventForm.title,
        category: eventForm.category,
        date: eventForm.date,
        time: eventForm.time,
        description: eventForm.description,
        image: eventForm.image,
        highlight: eventForm.highlight || undefined,
        active: eventForm.active,
      });
      setIsEditingEvent(null);
    } else if (isAddingEvent) {
      addEvent({
        title: eventForm.title,
        category: eventForm.category,
        date: eventForm.date,
        time: eventForm.time,
        description: eventForm.description,
        image: eventForm.image,
        highlight: eventForm.highlight || undefined,
        active: eventForm.active,
      });
      setIsAddingEvent(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(configForm);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2000);
  };

  const handleDownloadBackup = () => {
    const json = exportDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skyboat-gestao-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataJson(content);
        if (ok) {
          alert('Dados restaurados com sucesso!');
        } else {
          alert('Ficheiro inválido.');
        }
      }
    };
    reader.readAsText(file);
  };

  // If unauthenticated: Dedicated Staff Authentication Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07111C] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0B1A2B] border border-[#D4AF37]/35 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-[#0E2A42] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#D4AF37]">
            <KeyRound className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[11px] font-semibold text-[#06B6D4] uppercase tracking-widest block">
              Huambo • Cidade Alta
            </span>
            <h1 className="font-display text-2xl font-bold text-white mt-1">
              SKYBOAT | Gestão
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Autenticação necessária para acesso ao painel de controlo interno.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Código de Acesso"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                disabled={isVerifying}
                className="w-full px-4 py-3 rounded-xl bg-[#07111C] border border-white/10 text-white text-center text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              {pinError && (
                <div className="p-2.5 mt-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Código de acesso inválido.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50"
            >
              {isVerifying ? 'A verificar...' : 'Entrar na Gestão'}
            </button>
          </form>

          <div className="pt-2 border-t border-white/5">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Website do SkyBoat</span>
            </a>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#07111C] text-slate-100 flex flex-col font-sans">
      {/* Top Bar for Admin */}
      <header className="bg-[#0B1A2B] border-b border-[#D4AF37]/25 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#D4AF37] bg-[#0E2A42] flex items-center justify-center text-[#D4AF37]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white tracking-wider block leading-none">
              SKYBOAT
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#06B6D4] font-semibold">
              Painel de Gestão
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>Ver Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none mb-6">
          <button
            onClick={() => setActiveTab('produtos')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'produtos'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Ementa & Preços ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservas')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'reservas'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservas ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'pedidos'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('eventos')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'eventos'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Eventos ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'config'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurações & Horários</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-[#D4AF37] text-[#07111C]'
                : 'bg-[#0B1A2B] text-slate-300 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Cópia de Segurança</span>
          </button>
        </div>

        {/* Tab 1: Menu & Prices */}
        {activeTab === 'produtos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Gestão da Ementa & Preços
                </h2>
                <p className="text-xs text-slate-400">
                  Adicione novos pratos, actualize preços em Kz e controle a disponibilidade.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#E5C158] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Prato / Bebida</span>
              </button>
            </div>

            {/* Add / Edit Sub-form */}
            {(isAddingProduct || isEditingProduct) && (
              <div className="p-6 rounded-2xl bg-[#0B1A2B] border border-[#D4AF37]/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {isEditingProduct ? 'Editar Prato / Bebida' : 'Adicionar Prato à Ementa'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingProduct(false);
                      setIsEditingProduct(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Nome *</label>
                    <input
                      type="text"
                      required
                      value={prodForm.name}
                      onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Categoria *</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) =>
                        setProdForm({ ...prodForm, category: e.target.value as ProductCategory })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    >
                      <option value="Pratos principais">Pratos principais</option>
                      <option value="Entradas">Entradas</option>
                      <option value="Hambúrgueres">Hambúrgueres</option>
                      <option value="Massas">Massas</option>
                      <option value="Acompanhamentos">Acompanhamentos</option>
                      <option value="Sobremesas">Sobremesas</option>
                      <option value="Cocktails">Cocktails</option>
                      <option value="Bebidas">Bebidas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Preço (Kwanzas - Kz) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="100"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Tempo de Preparo</label>
                    <input
                      type="text"
                      value={prodForm.prepTime}
                      onChange={(e) => setProdForm({ ...prodForm, prepTime: e.target.value })}
                      placeholder="Ex: 25 min"
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2 p-3 rounded-xl bg-[#07111C] border border-white/10 space-y-2">
                    <label className="block text-[11px] font-semibold text-slate-200">
                      Fotografia do Prato / Bebida
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="w-16 h-16 rounded-lg bg-black border border-white/10 overflow-hidden shrink-0">
                        {prodForm.image ? (
                          <SafeImage
                            src={prodForm.image}
                            alt="Pré-visualização"
                            className="w-full h-full object-cover"
                            fallbackSrc="/images/skyboat-placeholder.jpg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                            Sem foto
                          </div>
                        )}
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          value={prodForm.image}
                          onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                          placeholder="Caminho ou link da imagem"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                        />
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 rounded bg-[#0E2A42] hover:bg-[#123654] border border-[#D4AF37]/40 text-white text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer">
                            <Upload className="w-3.5 h-3.5 text-[#06B6D4]" />
                            <span>Carregar do Telemóvel / Computador</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target?.result as string;
                                    if (result) {
                                      setProdForm((prev) => ({ ...prev, image: result }));
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[10px] text-slate-400">
                            PNG, JPG ou WebP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Destaque / Badge (Opcional)</label>
                    <input
                      type="text"
                      value={prodForm.badge}
                      onChange={(e) => setProdForm({ ...prodForm, badge: e.target.value })}
                      placeholder="Ex: Favorito, Mais Pedido"
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-300 mb-1">Descrição Culinária</label>
                    <textarea
                      rows={2}
                      value={prodForm.description}
                      onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prodForm.isSpecialty}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, isSpecialty: e.target.checked })
                        }
                        className="rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>Especialidade de Assinatura da Casa</span>
                    </label>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors"
                    >
                      Salvar Prato
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0B1A2B] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#07111C] text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Foto</th>
                    <th className="p-3.5">Nome</th>
                    <th className="p-3.5">Categoria</th>
                    <th className="p-3.5">Preço (Kz)</th>
                    <th className="p-3.5">Disponibilidade</th>
                    <th className="p-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => {
                    const formattedPrice = new Intl.NumberFormat('pt-AO').format(p.price);

                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <SafeImage
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-black"
                            fallbackSrc="/images/skyboat-placeholder.jpg"
                          />
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          {p.name}
                          {p.isSpecialty && (
                            <span className="ml-2 text-[10px] text-[#D4AF37] font-normal">
                              ★ Especialidade
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-400">{p.category}</td>
                        <td className="p-3.5 font-mono font-bold text-[#D4AF37]">
                          {formattedPrice} Kz
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() =>
                              updateProduct(p.id, { isAvailable: !p.isAvailable })
                            }
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.isAvailable
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {p.isAvailable ? 'Disponível' : 'Esgotado'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-400 hover:text-white"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remover "${p.name}" da ementa?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Reservations */}
        {activeTab === 'reservas' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white">
              Reservas Recebidas
            </h2>
            <p className="text-xs text-slate-400">
              Controle de reservas enviadas pelos clientes do Huambo.
            </p>

            {reservations.length === 0 ? (
              <div className="text-center py-14 bg-[#0B1A2B] rounded-2xl border border-white/5">
                <p className="text-slate-400 text-xs">
                  Nenhuma reserva registada no momento.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((res) => {
                  const cleanPhone = res.phone.replace(/[^0-9]/g, '');
                  const responseMsg = encodeURIComponent(
                    `Olá ${res.name}, confirmamos com muito gosto a sua reserva no SKYBOAT para ${res.guests} pessoas no dia ${res.date} às ${res.time}. Até breve!`
                  );
                  const whatsappReplyUrl = `https://wa.me/${cleanPhone}?text=${responseMsg}`;

                  return (
                    <div
                      key={res.id}
                      className="p-4 rounded-xl bg-[#0B1A2B] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{res.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              res.status === 'Confirmada'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : res.status === 'Cancelada'
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                          <span>📞 {res.phone}</span>
                          <span>👥 {res.guests} pessoa(s)</span>
                          <span>📅 {res.date} às {res.time}</span>
                          {res.occasion && <span className="text-[#D4AF37]">🎉 {res.occasion}</span>}
                        </div>

                        {res.notes && (
                          <p className="text-xs text-slate-400 italic">
                            Obs: {res.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Responder WhatsApp</span>
                        </a>

                        <select
                          value={res.status}
                          onChange={(e) =>
                            updateReservationStatus(
                              res.id,
                              e.target.value as 'Pendente' | 'Confirmada' | 'Cancelada'
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-[#07111C] border border-white/10 text-xs text-white"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Confirmada">Confirmada</option>
                          <option value="Cancelada">Cancelada</option>
                        </select>

                        <button
                          onClick={() => deleteReservation(res.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'pedidos' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white">
              Histórico de Pedidos
            </h2>
            <p className="text-xs text-slate-400">
              Registos de pedidos submetidos no website.
            </p>

            {orders.length === 0 ? (
              <div className="text-center py-14 bg-[#0B1A2B] rounded-2xl border border-white/5">
                <p className="text-slate-400 text-xs">
                  Nenhum pedido registado ainda.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => {
                  const formattedTotal = new Intl.NumberFormat('pt-AO').format(ord.total);

                  return (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#0B1A2B] border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#D4AF37]">
                          #{ord.id} • {ord.createdAt}
                        </span>
                        <span className="font-bold text-sm text-[#D4AF37] tabular-nums">
                          {formattedTotal} Kz
                        </span>
                      </div>

                      <div className="text-xs text-white font-semibold">
                        Cliente: {ord.customerName} (📞 {ord.customerPhone})
                      </div>

                      <div className="text-xs text-slate-300 divide-y divide-white/5 bg-[#07111C] p-2.5 rounded-lg">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-1 flex justify-between">
                            <span>{item.name} (x{item.quantity})</span>
                            <span className="font-mono text-slate-400">
                              {new Intl.NumberFormat('pt-AO').format(item.subtotal)} Kz
                            </span>
                          </div>
                        ))}
                      </div>

                      {ord.notes && (
                        <p className="text-xs text-slate-400">
                          <strong>Obs:</strong> {ord.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Events */}
        {activeTab === 'eventos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Programação de Eventos
                </h2>
                <p className="text-xs text-slate-400">
                  Gerencie noites musicais, sunsets e celebrações no SkyBoat.
                </p>
              </div>

              <button
                onClick={handleOpenAddEvent}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#E5C158]"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Evento</span>
              </button>
            </div>

            {(isAddingEvent || isEditingEvent) && (
              <form onSubmit={handleSaveEvent} className="p-6 rounded-2xl bg-[#0B1A2B] border border-[#D4AF37]/50 space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-bold uppercase text-[#D4AF37]">
                    {isEditingEvent ? 'Editar Evento' : 'Novo Evento'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingEvent(false);
                      setIsEditingEvent(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Título do Evento *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Categoria *</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, category: e.target.value as EventCategory })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    >
                      <option value="Música ao vivo">Música ao vivo</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Festas">Festas</option>
                      <option value="Aniversários">Aniversários</option>
                      <option value="Momentos especiais">Momentos especiais</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Data / Dia *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Horário *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-300 mb-1">Descrição</label>
                    <textarea
                      rows={2}
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#07111C] border border-white/10 text-white text-xs focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#D4AF37] text-[#07111C] font-bold text-xs uppercase hover:bg-[#E5C158]"
                    >
                      Salvar Evento
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-[#0B1A2B] border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src={ev.image}
                      alt={ev.title}
                      className="w-12 h-12 rounded-lg object-cover bg-black"
                      fallbackSrc="/images/skyboat-placeholder.jpg"
                    />
                    <div>
                      <span className="text-[10px] text-[#06B6D4] uppercase font-bold">
                        {ev.category} • {ev.date}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{ev.title}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditEvent(ev)}
                      className="p-2 text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remover evento "${ev.title}"?`)) deleteEvent(ev.id);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'config' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Contactos & Horários Oficiais
              </h2>
              <p className="text-xs text-slate-400">
                Informações apresentadas na secção de localização e rodapé.
              </p>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Nome do Estabelecimento</label>
                  <input
                    type="text"
                    value={configForm.name}
                    onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={configForm.subtitle}
                    onChange={(e) => setConfigForm({ ...configForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Telefone & WhatsApp</label>
                  <input
                    type="text"
                    value={configForm.phone}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        phone: e.target.value,
                        whatsapp: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Instagram (@)</label>
                  <input
                    type="text"
                    value={configForm.instagram}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        instagram: e.target.value,
                        instagramUrl: `https://instagram.com/${e.target.value.replace('@', '')}`,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-300 mb-1">Localização Curta</label>
                  <input
                    type="text"
                    value={configForm.locationName}
                    onChange={(e) => setConfigForm({ ...configForm, locationName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-300 mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    value={configForm.fullAddress}
                    onChange={(e) => setConfigForm({ ...configForm, fullAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2 border-t border-white/10 pt-3">
                  <span className="text-xs font-bold text-white block mb-2">Horários de Funcionamento</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={configForm.openingHours.weekdays}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          openingHours: {
                            ...configForm.openingHours,
                            weekdays: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs"
                    />
                    <input
                      type="text"
                      value={configForm.openingHours.weekends}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          openingHours: {
                            ...configForm.openingHours,
                            weekends: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1A2B] border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#07111C] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Dados</span>
                </button>
                {configSaved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Gravado com sucesso!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 6: Backup */}
        {activeTab === 'backup' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Cópia de Segurança & Restauro
              </h2>
              <p className="text-xs text-slate-400">
                Exporte todos os pratos, preços e configurações para um arquivo JSON seguro.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1A2B] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Descarregar Cópia JSON</h3>
                  <p className="text-[11px] text-slate-400">
                    Guarda os dados actuais da ementa no seu computador.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBackup}
                  className="px-4 py-2 rounded-lg bg-[#0E2A42] hover:bg-[#123654] border border-[#D4AF37]/40 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Exportar</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <h3 className="text-xs font-bold text-white">Importar Ficheiro JSON</h3>
                  <p className="text-[11px] text-slate-400">
                    Substitui os dados actuais pelos do ficheiro.
                  </p>
                </div>
                <label className="px-4 py-2 rounded-lg bg-[#0E2A42] hover:bg-[#123654] border border-[#D4AF37]/40 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4 text-[#06B6D4]" />
                  <span>Importar</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJsonFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <h3 className="text-xs font-bold text-rose-300">Restaurar Ementa Original</h3>
                  <p className="text-[11px] text-slate-400">
                    Repõe os pratos e valores originais do SkyBoat.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Tem a certeza que deseja restaurar as configurações originais?')) {
                      resetToDefaults();
                      alert('Dados originais restaurados!');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restaurar</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
