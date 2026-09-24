import { useState } from 'react';
import { ScreenType, FoodItem, CartItem, OrderData, NotificationItem } from './types';
import {
  FOOD_ITEMS,
  INITIAL_CART_ITEMS,
  INITIAL_ORDER,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Header } from './components/Header';
import { DesktopHeader } from './components/DesktopHeader';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { ItemCustomizerScreen } from './components/screens/ItemCustomizerScreen';
import { CartScreen } from './components/screens/CartScreen';
import { OrderTrackingScreen } from './components/screens/OrderTrackingScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { StudentIdScreen } from './components/screens/StudentIdScreen';

type DeviceMode = 'auto' | 'desktop' | 'tablet' | 'mobile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [selectedItem, setSelectedItem] = useState<FoodItem>(FOOD_ITEMS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [order, setOrder] = useState<OrderData>(INITIAL_ORDER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedCanteen, setSelectedCanteen] = useState<string>('Student Union Canteen 1');
  const [checkoutToast, setCheckoutToast] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');

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

  // Determine wrapper container classes based on deviceMode toggle
  const getContainerClasses = () => {
    if (deviceMode === 'mobile') {
      return 'w-full max-w-sm my-6 rounded-[2.5rem] border-[6px] border-[#131b2e] shadow-2xl overflow-hidden min-h-[820px] bg-[#faf8ff]';
    }
    if (deviceMode === 'tablet') {
      return 'w-full max-w-3xl my-6 rounded-3xl border-2 border-[#eaedff] shadow-xl overflow-hidden min-h-[900px] bg-[#faf8ff]';
    }
    if (deviceMode === 'desktop') {
      return 'w-full max-w-7xl my-4 rounded-3xl shadow-sm border border-[#eaedff] min-h-screen bg-[#faf8ff]';
    }
    // Auto: default responsive behavior
    return 'w-full min-h-screen bg-[#faf8ff] flex flex-col relative overflow-x-hidden';
  };

  const isForcedMobile = deviceMode === 'mobile';
  const isForcedDesktopOrTablet = deviceMode === 'desktop' || deviceMode === 'tablet';

  return (
    <div className="min-h-screen bg-[#f0f2fa] flex flex-col items-center justify-start text-[#131b2e]">
      {/* Top Helper Bar: Device View Mode Switcher + Screen Jump Buttons */}
      <div className="w-full bg-[#131b2e] text-white/90 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-3 z-50 border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-extrabold text-[#ff6b35] tracking-wider uppercase text-[11px]">
            <span className="material-symbols-outlined text-[16px]">devices</span>
            <span>CampusBite Multi-Device UI</span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block"></div>

          {/* Device Mode Switcher */}
          <div className="flex items-center bg-white/10 p-0.5 rounded-xl gap-0.5">
            <button
              onClick={() => setDeviceMode('auto')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                deviceMode === 'auto'
                  ? 'bg-[#ff6b35] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">responsive_layout</span>
              <span>Auto (Responsive)</span>
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                deviceMode === 'desktop'
                  ? 'bg-[#ff6b35] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                deviceMode === 'tablet'
                  ? 'bg-[#ff6b35] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">tablet_mac</span>
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                deviceMode === 'mobile'
                  ? 'bg-[#ff6b35] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Quick Screen Selector */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {(['explore', 'customizer', 'cart', 'orders', 'notifications', 'student-id'] as ScreenType[]).map(
            (scr) => (
              <button
                key={scr}
                onClick={() => setCurrentScreen(scr)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  currentScreen === scr
                    ? 'bg-white text-[#131b2e] font-extrabold shadow-xs'
                    : 'bg-white/5 text-white/70 hover:bg-white/15'
                }`}
              >
                {scr === 'explore' && 'Menu'}
                {scr === 'customizer' && 'Customizer'}
                {scr === 'cart' && `Tray (${cartCount})`}
                {scr === 'orders' && 'Locker Pass'}
                {scr === 'notifications' && `Alerts (${unreadNotificationsCount})`}
                {scr === 'student-id' && 'Student Pass'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className={getContainerClasses()}>
        {/* Desktop Header (Shown on desktop & tablet, hidden on mobile) */}
        {!isForcedMobile && (
          <div className={isForcedDesktopOrTablet ? 'block' : 'hidden md:block'}>
            <DesktopHeader
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              unreadCount={unreadNotificationsCount}
              cartCount={cartCount}
              cartTotal={cartTotal}
              hasActiveOrder={order.status === 'cooking' || order.status === 'ready'}
              selectedCanteen={selectedCanteen}
              onSelectCanteen={setSelectedCanteen}
              onBack={() => setCurrentScreen('explore')}
            />
          </div>
        )}

        {/* Mobile Header (Shown on mobile, hidden on tablet & desktop) */}
        {!isForcedDesktopOrTablet && (
          <div className={isForcedMobile ? 'block' : 'md:hidden'}>
            <Header
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              unreadCount={unreadNotificationsCount}
              selectedCanteen={selectedCanteen}
              onSelectCanteen={setSelectedCanteen}
              onBack={() => setCurrentScreen('explore')}
            />
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 w-full ${!isForcedDesktopOrTablet && !isForcedMobile ? 'pt-16 md:pt-4' : isForcedMobile ? 'pt-16' : 'pt-4'}`}>
          {currentScreen === 'explore' && (
            <ExploreScreen
              onSelectItem={handleSelectItem}
              onQuickAdd={handleQuickAdd}
              cartCount={cartCount}
              cartTotal={cartTotal}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onViewTray={() => setCurrentScreen('cart')}
              onNavigate={setCurrentScreen}
              isDesktopView={deviceMode === 'desktop' || deviceMode === 'tablet'}
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

        {/* Mobile Bottom Navigation (Shown only on mobile) */}
        {!isForcedDesktopOrTablet && (
          <div className={isForcedMobile ? 'block' : 'md:hidden'}>
            <BottomNav
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              cartCount={cartCount}
              hasActiveOrder={order.status === 'cooking' || order.status === 'ready'}
            />
          </div>
        )}

        {/* Checkout Confirmation Toast Overlay */}
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
