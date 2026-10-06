import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductItem,
  CartItem,
  EventItem,
  GalleryItem,
  ReservationData,
  CustomerOrder,
  RestaurantConfig,
} from '../types/restaurant';
import {
  INITIAL_CONFIG,
  INITIAL_PRODUCTS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
} from '../data/initialData';
import { verifyMasterPin } from '../utils/security';

interface RestaurantContextType {
  // Config
  config: RestaurantConfig;
  updateConfig: (updates: Partial<RestaurantConfig>) => void;

  // Products
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Events
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Order & Selection
  cart: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: CustomerOrder[];
  submitWhatsAppOrder: (customerName: string, customerPhone: string, notes?: string) => string;
  updateOrderStatus: (id: string, status: CustomerOrder['status']) => void;

  // Reservations
  reservations: ReservationData[];
  submitReservation: (data: Omit<ReservationData, 'id' | 'status' | 'createdAt'>) => string;
  updateReservationStatus: (id: string, status: ReservationData['status']) => void;
  deleteReservation: (id: string) => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // Utilities
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'skyboat_config_v1',
  PRODUCTS: 'skyboat_products_v3',
  EVENTS: 'skyboat_events_v3',
  GALLERY: 'skyboat_gallery_v3',
  RESERVATIONS: 'skyboat_reservations_v1',
  ORDERS: 'skyboat_orders_v1',
  CART: 'skyboat_cart_v1',
  AUTH: 'skyboat_auth_session_token',
};

// Sanitizes any image URLs to avoid stale local paths or broken references
const sanitizeImageUrl = (url: string | undefined): string => {
  if (!url || typeof url !== 'string') return '/images/skyboat-placeholder.jpg';
  if (url.includes('/src/assets') || url.startsWith('./') || url.includes('file://')) {
    if (url.includes('vazia')) return '/images/pratos/vazia-moda-da-casa.jpg';
    if (url.includes('live') || url.includes('jazz')) return '/images/skyboat-musica-ao-vivo.jpg';
    if (url.includes('sunset')) return '/images/eventos/sunset-sounds.jpg';
    if (url.includes('jantar') || url.includes('wine')) return '/images/eventos/jantar-harmonizado.jpg';
    if (url.includes('interior') || url.includes('salao')) return '/images/skyboat-salao.jpg';
    return '/images/skyboat-placeholder.jpg';
  }
  return url;
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config
  const [config, setConfig] = useState<RestaurantConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!saved) return INITIAL_PRODUCTS;
      const parsed: ProductItem[] = JSON.parse(saved);
      return parsed.map((p) => ({
        ...p,
        image: sanitizeImageUrl(p.image),
      }));
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Events
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (!saved) return INITIAL_EVENTS;
      const parsed: EventItem[] = JSON.parse(saved);
      return parsed.map((ev) => ({
        ...ev,
        image: sanitizeImageUrl(ev.image),
      }));
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (!saved) return INITIAL_GALLERY;
      const parsed: GalleryItem[] = JSON.parse(saved);
      return parsed.map((g) => ({
        ...g,
        image: sanitizeImageUrl(g.image),
      }));
    } catch {
      return INITIAL_GALLERY;
    }
  });

  // Reservations
  const [reservations, setReservations] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart / Order
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'authenticated_valid';
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Order Operations
  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders via WhatsApp
  const submitWhatsAppOrder = (
    customerName: string,
    customerPhone: string,
    notes?: string
  ): string => {
    if (cart.length === 0) return '';

    const newOrder: CustomerOrder = {
      id: `PED-${Date.now().toString().slice(-6)}`,
      customerName,
      customerPhone,
      notes,
      items: cart.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        subtotal: i.product.price * i.quantity,
      })),
      total: cartTotal,
      createdAt: new Date().toLocaleString('pt-PT'),
      status: 'Enviado WhatsApp',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Format WhatsApp message
    const formattedTotal = new Intl.NumberFormat('pt-AO', {
      style: 'decimal',
    }).format(cartTotal);

    let message = `🍽 *NOVO PEDIDO - SKYBOAT RESTAURANTE & BAR*\n`;
    message += `📍 *Huambo – Cidade Alta / Centro Cultural*\n`;
    message += `─────────────────────────\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📞 *Telefone:* ${customerPhone}\n`;
    if (notes) {
      message += `📝 *Observações:* ${notes}\n`;
    }
    message += `─────────────────────────\n`;
    message += `📋 *ITENS DO PEDIDO:*\n`;

    cart.forEach((item, index) => {
      const itemSubtotal = new Intl.NumberFormat('pt-AO').format(item.product.price * item.quantity);
      message += `${index + 1}. *${item.product.name}* (x${item.quantity}) - ${itemSubtotal} Kz\n`;
    });

    message += `─────────────────────────\n`;
    message += `💰 *VALOR TOTAL: ${formattedTotal} Kz*\n`;
    message += `⏰ *Data/Hora:* ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}\n\n`;
    message += `Por favor, confirmem a recepção deste pedido e o tempo estimado para entrega/preparo. Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    clearCart();
    return whatsappUrl;
  };

  const updateOrderStatus = (id: string, status: CustomerOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Reservations
  const submitReservation = (
    data: Omit<ReservationData, 'id' | 'status' | 'createdAt'>
  ): string => {
    const newReservation: ReservationData = {
      ...data,
      id: `RES-${Date.now().toString().slice(-6)}`,
      status: 'Pendente',
      createdAt: new Date().toLocaleString('pt-PT'),
    };

    setReservations((prev) => [newReservation, ...prev]);

    let message = `🍷 *SOLICITAÇÃO DE RESERVA DE MESA*\n`;
    message += `⚓ *SKYBOAT | Restaurante & Bar (Huambo)*\n`;
    message += `─────────────────────────\n`;
    message += `👤 *Nome:* ${data.name}\n`;
    message += `📞 *Telefone:* ${data.phone}\n`;
    message += `👥 *Número de Pessoas:* ${data.guests} pessoa(s)\n`;
    message += `📅 *Data:* ${data.date}\n`;
    message += `⏰ *Hora:* ${data.time}\n`;
    if (data.occasion) {
      message += `🎉 *Ocasião:* ${data.occasion}\n`;
    }
    if (data.notes) {
      message += `📝 *Observações / Preferências:* ${data.notes}\n`;
    }
    message += `─────────────────────────\n`;
    message += `Gostaria de confirmar a disponibilidade para esta reserva. Aguardo a vossa confirmação. Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    return whatsappUrl;
  };

  const updateReservationStatus = (id: string, status: ReservationData['status']) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // Product CRUD
  const addProduct = (newProd: Omit<ProductItem, 'id'>) => {
    const product: ProductItem = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Events CRUD
  const addEvent = (newEvent: Omit<EventItem, 'id'>) => {
    const event: EventItem = {
      ...newEvent,
      id: `event-${Date.now()}`,
    };
    setEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Config
  const updateConfig = (updates: Partial<RestaurantConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Admin Auth via SHA-256
  const loginAdmin = async (pin: string): Promise<boolean> => {
    const isValid = await verifyMasterPin(pin);
    if (isValid) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated_valid');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  // Utilities
  const resetToDefaults = () => {
    setConfig(INITIAL_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  const exportDataJson = () => {
    const data = {
      config,
      products,
      events,
      gallery,
      reservations,
      orders,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.config) setConfig(parsed.config);
      if (parsed.gallery) setGallery(parsed.gallery);
      return true;
    } catch (e) {
      console.error('Falha ao importar dados:', e);
      return false;
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        config,
        updateConfig,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        submitWhatsAppOrder,
        updateOrderStatus,
        reservations,
        submitReservation,
        updateReservationStatus,
        deleteReservation,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant deve ser usado dentro de um RestaurantProvider');
  }
  return context;
};
