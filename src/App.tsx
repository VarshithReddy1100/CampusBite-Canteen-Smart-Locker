import { useState } from 'react';
import { ScreenType, FoodItem, CartItem, OrderData, NotificationItem } from './types';
import {
  FOOD_ITEMS,
  INITIAL_CART_ITEMS,
  INITIAL_ORDER,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { ItemCustomizerScreen } from './components/screens/ItemCustomizerScreen';
import { CartScreen } from './components/screens/CartScreen';
import { OrderTrackingScreen } from './components/screens/OrderTrackingScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { StudentIdScreen } from './components/screens/StudentIdScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [selectedItem, setSelectedItem] = useState<FoodItem>(FOOD_ITEMS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [order, setOrder] = useState<OrderData>(INITIAL_ORDER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedCanteen, setSelectedCanteen] = useState<string>('Student Union Canteen 1');
  const [checkoutToast, setCheckoutToast] = useState(false);

  // Cart calculations
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const unreadNotificationsCount = notifications.filter((n) => n.isUnread).length;

  // Handlers
  const handleSelectItem = (item: FoodItem) => {
    setSelectedItem(item);
    setCurrentScreen('customizer');
  };

  const handleQuickAdd = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.itemId === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.itemId === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: 'cart-' + Date.now(),
          itemId: item.id,
          name: item.name,
          summary: 'Standard meal bowl',
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ];
    });
  };

  const handleAddToCart = (customizedItem: CartItem) => {
    setCartItems((prev) => [...prev, customizedItem]);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleCustomizeFromCart = (cartItem: CartItem) => {
    const originalFood = FOOD_ITEMS.find((f) => f.id === cartItem.itemId) || FOOD_ITEMS[0];
    setSelectedItem(originalFood);
    setCurrentScreen('customizer');
  };

  const handleCheckout = () => {
    // Generate new order
    const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const discount = subtotal * 0.1;
    const facilityFee = 0.4;
    const total = subtotal - discount + facilityFee;

    const newOrder: OrderData = {
      orderNumber: 'CB-' + Math.floor(1000 + Math.random() * 9000),
      placedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      canteen: selectedCanteen,
      etaMinutes: 8,
      currentStep: 2,
      totalSteps: 4,
      lockerPod: 'Pod B',
      lockerNumber: '#' + Math.floor(11 + Math.random() * 8),
      pinBackup: String(Math.floor(1000 + Math.random() * 9000)),
      status: 'cooking',
      items: cartItems.map((ci) => ({
        name: ci.name,
        specs: ci.summary || 'Custom order',
        price: ci.price,
        qty: ci.quantity,
      })),
      subtotal,
      discount,
      facilityFee,
      total,
      paidVia: 'CampusCard (Dining Dollars)',
    };

    setOrder(newOrder);

    // Add notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      category: 'orders',
      timeAgo: 'Just now',
      timestampGroup: 'today',
      isUnread: true,
      tag: `Locker ${newOrder.lockerNumber} Assigned`,
      tagClass: 'bg-[#6cf8bb] text-[#00714d]',
      title: `Order #${newOrder.orderNumber} placed successfully`,
      description: `Target locker ${newOrder.lockerPod} ${newOrder.lockerNumber} assigned. Estimated prep: ~${newOrder.etaMinutes} mins.`,
      icon: 'lock_clock',
      iconBg: 'bg-[#ffdbd0]',
      iconColor: 'text-[#ab3500]',
      actionText: 'View Smart Pass',
      actionType: 'view-smart-pass',
    };

    setNotifications((prev) => [newNotif, ...prev]);

    setCheckoutToast(true);
    setTimeout(() => {
      setCheckoutToast(false);
      setCurrentScreen('orders');
    }, 1200);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <div className="min-h-screen bg-[#eaedff]/40 flex flex-col items-center justify-start text-[#131b2e]">
      {/* Desktop Quick Screen Navigator Bar (Subtle top helper for testing) */}
      <div className="w-full bg-[#283044] text-white/90 text-xs py-1.5 px-4 hidden md:flex items-center justify-between z-50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[#ff6b35] tracking-wider uppercase text-[11px]">
            CampusBite
          </span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">Interactive Screen Switcher:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['explore', 'customizer', 'cart', 'orders', 'notifications', 'student-id'] as ScreenType[]).map(
            (scr) => (
              <button
                key={scr}
                onClick={() => setCurrentScreen(scr)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  currentScreen === scr
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {scr === 'explore' && '1. Explore Menu'}
                {scr === 'customizer' && '2. Item Customizer'}
                {scr === 'cart' && '3. Campus Tray'}
                {scr === 'orders' && '4. Locker Pass (Orders)'}
                {scr === 'notifications' && '5. Notifications'}
                {scr === 'student-id' && '6. Student ID'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Smartphone Shell / Viewport Frame */}
      <div className="w-full max-w-md min-h-screen bg-[#faf8ff] flex flex-col relative shadow-2xl overflow-x-hidden">
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          unreadCount={unreadNotificationsCount}
          selectedCanteen={selectedCanteen}
          onSelectCanteen={setSelectedCanteen}
          onBack={() => setCurrentScreen('explore')}
        />

        {/* Screen Container */}
        <main className="flex-1 w-full pt-16 md:pt-20">
          {currentScreen === 'explore' && (
            <ExploreScreen
              onSelectItem={handleSelectItem}
              onQuickAdd={handleQuickAdd}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onViewTray={() => setCurrentScreen('cart')}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'customizer' && (
            <ItemCustomizerScreen
              item={selectedItem}
              onAddToCart={handleAddToCart}
              onViewTray={() => setCurrentScreen('cart')}
              onBack={() => setCurrentScreen('explore')}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveCartItem}
              onCustomizeItem={handleCustomizeFromCart}
              onAddMoreItems={() => setCurrentScreen('explore')}
              onCheckout={handleCheckout}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'orders' && (
            <OrderTrackingScreen
              order={order}
              onNavigateToExplore={() => setCurrentScreen('explore')}
            />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'student-id' && (
            <StudentIdScreen
              onNavigate={setCurrentScreen}
              onTopUp={() => {}}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          cartCount={cartCount}
          hasActiveOrder={order.status === 'cooking' || order.status === 'ready'}
        />

        {/* Checkout Confirmation Overlay */}
        {checkoutToast && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 text-center max-w-xs shadow-2xl border border-[#eaedff] animate-fade-in flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#6cf8bb] text-[#00714d] flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-[32px]">task_alt</span>
              </div>
              <h3 className="text-lg font-black text-[#131b2e]">Order Confirmed!</h3>
              <p className="text-xs text-[#594139] mt-1">
                Allocating heated locker in Pod B... Loading your Contactless Smart Pass.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
