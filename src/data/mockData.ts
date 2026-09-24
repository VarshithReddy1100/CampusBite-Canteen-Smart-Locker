import { FoodItem, CartItem, OrderData, NotificationItem, StudentProfile } from '../types';

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UEcSjgv1ebVCYo3dIkfrUygsperm4HiKl_c8--zGvMiHW-FOBUfGPSilPfaFmv5BTP1uEZ5vRkjSrr-FI-IAtrcaJa2NB8Fyr81bARSz5vi1M9XPM90scB1lj8fIb2D9IB_ZuR0xHtbuKceAlnfTVwAaBIqswJxf5l-OrwzIwFmC2R4ZK8lBzvw3F92hIMvnp2lWF6wF4dq9wABcB8ZnMTd9f5vV1IxLBuoH6bnyoS04jYQg4y_P3YttHg',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM7T9p7hH4Y5ffF1LFZ5HPXex6DF6dZ7fHGlSMExhshbNpL10TQdWH3Y-TQsupteTycLc_Fd1M4OLWmelXorCME8tXFmnBVo7NPXtbi4Aa3aXKuhrdx6_zYe_GqRogZK_ki5aNJy_1lRdd1VIX5glZMgwa0B2UoNdSyXybLwbWOS9pQj8CPI1wHzo-cnPrmxrXfNkSPhRLpohlnuoVJ3273aHDmF2SANZBrT9EJiDcI9UyD1mwaLsFDQ',
  teriyakiBowlHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpNXs5shZxIAKi9bOF2hTQ0Y-BagTvUiLDzqwosnFdlz3hZkfigBhvgOKClUYE0jhXtHvOSpFptr2-uB61bEvpjpcchBVROGdd7kHSXHrNa8JOnoMXTOH1YoZN6Bhe6_rN6m5VH-AnPyCzGbQPIpPg7Vtj9AemUglmeKisdzUyH4Ab0SXB7xCjnHYI3QtqMgnmz5UDNFMLQwdTsziuKDyqxe-iYj3LaKAqHkG15M5UqBtpp1Mf664Hng',
  teriyakiBowlList: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn_yRHMaYoyzrbk91bb0SHsadOEPhrjRGgRqKZGy9CixZh7cohxeyYeprEVkpQ86uzVWGBluEwNYYpp7kf2seU02keIGbfrWQvBHc5tMhGir6fpTYkYM4SbdHShu7180p6qdq9AkfViMMLh5cLEv-SYVpiglPYOZZpfnbv1gOSJVXLnNaiTVJ2cgK7Zjmt-iMo6GzIE9Z1MCeqBPhCGo0INWnvrykqlCYF4zA4VeJB3QUuY_WgxlgDMA',
  burgerList: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDccqU0E4Mwwkz0O7Q44L8ONsrx-6ZCKg_QaS5rdsrTckpOytVDdV561OVDussxeLJe8hXjlRiisfxNTtLw8JIVLtIkbDl7NT6HQzu-NOryjbaHSNibqdQ5ljxdOsLl15bwnf6J2vL1Hd8gZGIHrMTXrdfa1119Y4xtz2PkQCprieZN74LT4rHMmsLeiepfjNWC-ePgZYmA1cKQ1VMjzkdIAqdi9W4-SyIGlO9_jeuU6hWrihIcCQOKYQ',
  saladList: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTwZtzMlp6Ed6yR8C31kwjYUhqvZHcIFn4Ifw1eC0MsTxIQ3I81XBF48Tc7tNqWNsSV0jLoD-_nP4bLDYgjzhMRujbjMzPCigQbeEwdDbM80j1-mpCazqgxMWfVgDrgjCcSmyXD-WuGiVNT5BuZQIyhNIQ45ExHY97ecr8UI2vxfP6y2Be7L2oVG-DL4CnLiAFvrdZmq8ghNVeBLtXmygKp1pNPgwArWZ8OSpNLVMaYeNrVMP3K_BGxQ',
  cartTeriyakiBowl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOlDg8B4cXYyXt5Qaqy4bGThzimDoECJmv_IBe5ET0PrqWqEVkEOErWigkyl6IhuZjrNDQkW5kqYmztFDnufEBDkQIFOF5U9cvJ-NcnHGaKmfUlh6IXP1u3DbYwAkbsgMiKBplN4XZur_ZDnTCxNPWZkFyn1Fhmp4SkpBOeieCJbiHwagXca0shVCMHsfE5EzYjjYloInOsCc2fxUe1sWReIHQmiFL5H5UJPKZuXbwW64ZeHFAiFpagg',
  cartMatcha: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRiWvYBeBzY-7jd59mf09a8Qy3D5LkuhG4lBoELTzX9O7cxrT1-ZnebflX62471Be_F4wOnOH3CVxRDw1ImTm7GnDFp_kMGx44LDeyqTUrnBMvvhDK0kiBNZqHU0uI2DXygixy8luoki3Fu_pbid-LDFbpInqfp8AmbeAdN99XEK5O_wJ-a0JR5rIzBxzliOqCsXHB6Pe_ma44ZnN1gC2Hc3JIO9bivOvb6gCBTUUaTOYJ_OzQOa6tBg',
};

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'teriyaki-bowl',
    station: 'Golden Wok Express',
    stationTag: 'Stn 3',
    name: 'Teriyaki Chicken Grain Bowl',
    description: 'Tender grilled chicken thigh glazed in authentic mirin-teriyaki, resting over your choice of hearty whole grains with fresh, quick-prepped crisp seasonal toppings.',
    price: 6.80,
    regularPrice: 8.50,
    calories: 620,
    protein: '38g Protein',
    tag: 'High Energy',
    image: APP_ASSETS.teriyakiBowlHero,
    rating: 4.8,
    reviewsCount: 420,
    prepTime: '8-12 min',
    badge: 'Popular',
    dietary: ['Halal Certified', 'Student Meal Plan Tier 1'],
  },
  {
    id: 'smash-burger',
    station: 'Campus Grill & Smash',
    stationTag: 'Stn 1',
    name: 'Smash Double & Fries',
    description: 'Angus smashed patties, melted cheddar dripping, house secret burger sauce in a glossy brioche bun & skin-on crispy seasoned fries.',
    price: 7.50,
    regularPrice: 9.20,
    calories: 780,
    protein: '42g Protein',
    tag: 'Free Drink Upgrade',
    image: APP_ASSETS.burgerList,
    rating: 4.9,
    reviewsCount: 610,
    prepTime: '10-15 min',
    badge: 'Best Seller',
    dietary: ['Fresh Beef', 'Combo Eligible'],
  },
  {
    id: 'chickpea-salad',
    station: 'Green Sprouts Bar',
    stationTag: 'Stn 5',
    name: 'Chickpea & Avocado Bowl',
    description: 'Crisp baby spinach, organic spiced chickpeas, creamy sliced avocado, cherry tomatoes, quinoa & lemon tahini drizzle.',
    price: 6.20,
    regularPrice: 7.50,
    calories: 440,
    protein: '18g Protein',
    tag: '100% Plant Based',
    image: APP_ASSETS.saladList,
    rating: 4.7,
    reviewsCount: 290,
    prepTime: '5 min prep',
    badge: 'Fast Prep',
    dietary: ['Vegan', 'Gluten-Free', 'Low GI'],
  },
  {
    id: 'matcha-latte',
    station: 'Matcha & Bakery Station',
    stationTag: 'Stn 2',
    name: 'Iced Oat Matcha Latte',
    description: 'Ceremonial grade Uji matcha layered over creamy oat milk with light sweetness and filtered ice.',
    price: 3.50,
    regularPrice: 4.25,
    calories: 140,
    protein: '4g Protein',
    tag: 'Antioxidant Boost',
    image: APP_ASSETS.cartMatcha,
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '3 min prep',
    badge: 'Staff Pick',
    dietary: ['Dairy Free', 'Vegetarian'],
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    itemId: 'teriyaki-bowl',
    name: 'Teriyaki Chicken Bowl',
    summary: 'Brown Rice, Extra Egg, Sauce on side',
    price: 6.80,
    quantity: 1,
    image: APP_ASSETS.cartTeriyakiBowl,
    customization: {
      grainBase: { name: 'Warm Steamed Brown Rice', price: 0, desc: 'Toasted nutty aroma • Low GI' },
      proteinLevel: { name: 'Standard (150g Cutlet)', price: 0, desc: 'Included' },
      freeAddins: ['Onsen Jammy Egg'],
      sauceChoice: 'Signature Garlic Teriyaki',
      specialNotes: 'Light sauce, extra scallions please',
      quantity: 1
    }
  },
  {
    id: 'cart-2',
    itemId: 'matcha-latte',
    name: 'Iced Matcha Latte',
    summary: 'Oat milk, 50% sugar',
    price: 3.50,
    quantity: 1,
    image: APP_ASSETS.cartMatcha,
    customization: {
      grainBase: { name: 'Regular Ice', price: 0, desc: 'Standard cold' },
      proteinLevel: { name: 'Oat Milk', price: 0, desc: 'Plant based' },
      freeAddins: ['50% Sugar'],
      sauceChoice: 'Default',
      specialNotes: 'Extra cold with paper straw',
      quantity: 1
    }
  }
];

export const INITIAL_ORDER: OrderData = {
  orderNumber: 'CB-8492',
  placedTime: '12:08 PM',
  canteen: 'Student Union Canteen 1',
  etaMinutes: 4,
  currentStep: 2,
  totalSteps: 4,
  lockerPod: 'Pod B',
  lockerNumber: '#14',
  pinBackup: '4821',
  status: 'cooking',
  items: [
    {
      name: 'Crispy Tofu Teriyaki Bowl',
      specs: 'Brown rice · Extra sesame · Warm',
      price: 6.75,
      qty: 1
    },
    {
      name: 'Iced Oat Matcha Latte',
      specs: 'Oat milk · 50% sweet · 16 oz',
      price: 2.92,
      qty: 1
    }
  ],
  subtotal: 10.30,
  discount: 1.03,
  facilityFee: 0.40,
  total: 9.67,
  paidVia: 'CampusCard (Dining Dollars)'
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'orders',
    timeAgo: '4m ago',
    timestampGroup: 'today',
    isUnread: true,
    tag: 'Locker #14 Ready',
    tagClass: 'bg-[#6cf8bb] text-[#00714d]',
    title: 'Order #CB-8492 is ready in Locker Pod B',
    description: 'Your Teriyaki Chicken Bowl has been deposited in heated locker #14. Claim within 20 mins using your Smart Pass.',
    icon: 'lock_clock',
    iconBg: 'bg-[#ffdbd0]',
    iconColor: 'text-[#ab3500]',
    actionText: 'View Smart Pass',
    actionType: 'view-smart-pass'
  },
  {
    id: 'notif-2',
    category: 'orders',
    timeAgo: '18m ago',
    timestampGroup: 'today',
    isUnread: true,
    tag: 'In The Wok',
    tagClass: 'bg-[#ffddb8] text-[#653e00]',
    title: 'Golden Wok Station 3 is preparing your meal',
    description: 'Order confirmed and sautéing fresh. Estimated locker transfer: 12:18 PM.',
    icon: 'skillet',
    iconBg: 'bg-[#ffddb8]',
    iconColor: 'text-[#855300]',
    progressPercent: 68,
    footerNote: '~6 mins left'
  },
  {
    id: 'notif-3',
    category: 'promos',
    timeAgo: '1h ago',
    timestampGroup: 'today',
    isUnread: true,
    tag: 'Dining Dollars Special',
    tagClass: 'bg-[#ffdbd0] text-[#390c00]',
    title: 'Midday Campus Rush: 15% off at North Dining Hall',
    description: 'Beat the post-lecture line! Order between 1:30 PM – 3:00 PM with coupon code applied automatically.',
    icon: 'local_offer',
    iconBg: 'bg-[#ffb59d]/40',
    iconColor: 'text-[#832600]',
    promoCode: 'AFTERNOON15',
    actionText: 'Copy Code',
    actionType: 'copy-promo'
  },
  {
    id: 'notif-4',
    category: 'orders',
    timeAgo: '6:45 PM',
    timestampGroup: 'yesterday',
    isUnread: false,
    tag: 'Completed',
    tagClass: 'bg-[#6ffbbe]/40 text-[#005236]',
    title: 'Order #CB-8120 picked up successfully',
    description: 'Green Sprouts Bar • Student Union North Pod A. Thanks for dining sustainably and recycling your meal crate!',
    icon: 'check_circle',
    iconBg: 'bg-[#6ffbbe]',
    iconColor: 'text-[#006c49]',
    footerNote: '+20 Eco-Points added to Student ID',
    actionText: 'Reorder',
    actionType: 'reorder'
  },
  {
    id: 'notif-5',
    category: 'campus',
    timeAgo: '2 days ago',
    timestampGroup: 'earlier',
    isUnread: false,
    tag: 'Campus Facility Update',
    tagClass: 'bg-[#eaedff] text-[#131b2e]',
    title: 'Library Cafe Holiday Hours Updated',
    description: 'Open until 11:00 PM during exam prep week. Midnight express cold-brew & pastry mobile pre-ordering is now active.',
    icon: 'campaign',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#131b2e]'
  }
];

export const STUDENT_PROFILE: StudentProfile = {
  name: 'Maya Lin',
  studentId: 'STU-920418',
  major: 'Computer Science & Cognitive AI',
  year: 'Junior · Class of 2027',
  campusCardBalance: 48.50,
  ecoPoints: 340,
  mealPlanTier: 'Tier 1 Unlimited Weekday Lunch',
  photoUrl: APP_ASSETS.avatar,
  qrToken: 'CAMPUS-ID-920418-SECURE'
};
