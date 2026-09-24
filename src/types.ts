export type ScreenType = 'explore' | 'cart' | 'orders' | 'student-id' | 'notifications' | 'customizer';

export interface FoodItem {
  id: string;
  station: string;
  stationTag: string;
  name: string;
  description: string;
  price: number;
  regularPrice?: number;
  calories: number;
  protein: string;
  tag: string;
  image: string;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  badge?: string;
  dietary: string[];
}

export interface CustomizationOption {
  grainBase: { name: string; price: number; desc: string };
  proteinLevel: { name: string; price: number; desc: string };
  freeAddins: string[];
  sauceChoice: string;
  specialNotes: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  summary: string;
  price: number;
  quantity: number;
  image: string;
  customization?: Partial<CustomizationOption>;
}

export interface OrderTimelineStep {
  step: number;
  title: string;
  time?: string;
  subtitle: string;
  active: boolean;
  completed: boolean;
}

export interface OrderData {
  orderNumber: string;
  placedTime: string;
  canteen: string;
  etaMinutes: number;
  currentStep: number;
  totalSteps: number;
  lockerPod: string;
  lockerNumber: string;
  pinBackup: string;
  status: 'confirmed' | 'cooking' | 'dispatched' | 'ready' | 'completed';
  items: {
    name: string;
    specs: string;
    price: number;
    qty: number;
  }[];
  subtotal: number;
  discount: number;
  facilityFee: number;
  total: number;
  paidVia: string;
}

export interface NotificationItem {
  id: string;
  category: 'orders' | 'promos' | 'campus';
  timeAgo: string;
  timestampGroup: 'today' | 'yesterday' | 'earlier';
  isUnread: boolean;
  tag: string;
  tagClass?: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  actionText?: string;
  actionType?: 'view-smart-pass' | 'copy-promo' | 'reorder';
  promoCode?: string;
  progressPercent?: number;
  footerNote?: string;
}

export interface StudentProfile {
  name: string;
  studentId: string;
  major: string;
  year: string;
  campusCardBalance: number;
  ecoPoints: number;
  mealPlanTier: string;
  photoUrl: string;
  qrToken: string;
}
