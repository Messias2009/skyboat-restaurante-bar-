export type ProductCategory =
  | 'Entradas'
  | 'Pratos principais'
  | 'Hambúrgueres'
  | 'Massas'
  | 'Acompanhamentos'
  | 'Sobremesas'
  | 'Bebidas'
  | 'Cocktails';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in Kz
  image: string;
  isSpecialty?: boolean;
  badge?: string;
  isAvailable: boolean;
  prepTime?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  note?: string;
}

export type EventCategory =
  | 'Eventos'
  | 'Música ao vivo'
  | 'Aniversários'
  | 'Festas'
  | 'Momentos especiais';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  description: string;
  image: string;
  highlight?: string;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pratos' | 'Bebidas' | 'Restaurante' | 'Eventos' | 'Ambiente';
  image: string;
  caption?: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  occasion?: string;
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
  createdAt: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  total: number;
  createdAt: string;
  status: 'Enviado WhatsApp' | 'Em Preparo' | 'Concluído';
}

export interface RestaurantConfig {
  name: string;
  subtitle: string;
  locationName: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    closed: string;
  };
}
