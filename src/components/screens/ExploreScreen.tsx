import React, { useState } from 'react';
import { FoodItem, ScreenType, CartItem } from '../../types';
import { FOOD_ITEMS } from '../../data/mockData';

interface ExploreScreenProps {
  onSelectItem: (item: FoodItem) => void;
  onQuickAdd: (item: FoodItem) => void;
  cartCount: number;
  cartTotal: number;
  cartItems?: CartItem[];
  onUpdateQuantity?: (cartItemId: string, delta: number) => void;
  onViewTray: () => void;
  onNavigate: (screen: ScreenType) => void;
  isDesktopView?: boolean;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectItem,
  onQuickAdd,
  cartCount,
  cartTotal,
  cartItems = [],
  onUpdateQuantity,
  onViewTray,
  onNavigate,
  isDesktopView = false,
}) => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteStalls, setFavoriteStalls] = useState<Record<string, boolean>>({});
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const toggleFavorite = (stallId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteStalls((prev) => ({ ...prev, [stallId]: !prev[stallId] }));
  };

  const handleQuickAdd = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(item);
    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  // Filter items based on category & search
  const filteredItems = FOOD_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'fast') {
      return item.prepTime.includes('5') || item.prepTime.includes('3') || item.prepTime.includes('8');
    }
    if (activeCategory === 'healthy') {
      return item.dietary.some((d) => d.includes('Halal') || d.includes('Vegan') || d.includes('Gluten'));
    }
    if (activeCategory === 'coffee') {
      return item.id === 'matcha-latte';
    }
    if (activeCategory === 'combos') {
      return item.price < 7.0;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 md:pb-16 max-w-7xl mx-auto px-4 md:px-6">
      {/* Top Banner Grid: Rush Hour Alert & Live Queue Status */}
      <section className="pt-3 pb-2 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-stretch">
        {/* Campus Rush Hour Live Alert Banner */}
        <div className="md:col-span-8 relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#ff6b35] via-[#ff8243] to-[#d68900] p-4 md:p-5 shadow-sm text-white flex flex-col justify-between">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                <span className="material-symbols-outlined text-[24px] animate-bounce">bolt</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[0.6875rem] md:text-xs text-white uppercase tracking-wider font-extrabold bg-black/15 px-2 py-0.5 rounded-full">
                    Rush Hour Live Feed
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] md:text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] inline-block mr-1.5 animate-pulse"></span>
                    Fast Lane Active
                  </span>
                </div>
                <h2 className="text-base md:text-lg font-bold mt-1 text-white leading-snug">
                  North Dining Hall prep time is under{' '}
                  <span className="underline decoration-white/70 decoration-2 font-black">
                    8 minutes
                  </span>
                  !
                </h2>
                <p className="text-xs text-white/90 hidden sm:block mt-0.5">
                  Order ahead to skip counter queues — meals are automatically placed in heated locker pods.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const teriyaki = FOOD_ITEMS[0];
                onSelectItem(teriyaki);
              }}
              className="flex-shrink-0 px-4 py-2 bg-white text-[#ab3500] hover:bg-[#faf8ff] rounded-xl md:rounded-full text-xs md:text-sm font-extrabold shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
              type="button"
            >
              <span>Quick Order</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          {/* Subtle ambient decorative circle */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>

        {/* Live Campus Queue Status & Locker Telemetry Strip */}
        <div className="md:col-span-4 bg-white rounded-2xl md:rounded-3xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider">
              Smart Lockers
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
              94% Available
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#ab3500] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">lock_clock</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#131b2e] truncate">Student Union Pods A &amp; B</p>
              <p className="text-[11px] text-[#594139] truncate">Average pickup delay: 0 sec (Contactless)</p>
            </div>
          </div>
          <div className="w-full bg-[#f2f3ff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#006c49] h-full rounded-full w-3/4"></div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Left Dishes Grid + (on Desktop) Right Sticky Tray/Promo Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* Left Column: Search, Categories, and Food Grid */}
        <div className={`${isDesktopView || cartCount > 0 ? 'lg:col-span-8 xl:col-span-8' : 'lg:col-span-12'} flex flex-col gap-4`}>
          {/* Search Bar & Category Controls */}
          <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 flex items-center bg-white md:bg-[#f2f3ff] rounded-2xl px-4 py-3 shadow-xs border border-[#eaedff] md:border-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff6b35]/30 focus-within:border-[#ff6b35]/30 transition-all">
              <span className="material-symbols-outlined text-[#8d7168] text-[22px] mr-2">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-sm text-[#131b2e] placeholder:text-[#8d7168]/70 font-medium min-w-0"
                placeholder="Search grain bowls, ramen, smash burgers, vegan, halal..."
                type="search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#8d7168] hover:text-[#131b2e] p-1 mr-1"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <button
                aria-label="Voice search"
                onClick={() => setSearchQuery('grain bowl')}
                className="text-[#8d7168] hover:text-[#ab3500] transition-colors pl-1"
                type="button"
                title="Search 'grain bowl'"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'trending', label: 'Trending', icon: '🔥' },
                { id: 'fast', label: '< 10 Min', icon: '⚡' },
                { id: 'healthy', label: 'Healthy & Halal', icon: '🥗' },
                { id: 'combos', label: 'Student Combos', icon: '🍱' },
                { id: 'coffee', label: 'Coffee & Drinks', icon: '☕' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                    activeCategory === cat.id
                      ? 'bg-[#ff6b35] text-white shadow-xs'
                      : 'bg-white md:bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] border border-[#eaedff] md:border-transparent'
                  }`}
                  type="button"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Canteen Stalls Title & Count Header */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-[#131b2e] tracking-tight">
                Canteen Stalls &amp; Chef Picks
              </h2>
              <p className="text-xs text-[#594139]">
                Live station prep times updated automatically · Guaranteed hot in lockers
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#eaedff] text-[#131b2e] font-bold">
              {filteredItems.length} Available
            </span>
          </div>

          {/* Stalls & Food Grid: 1 col mobile, 2 col tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isStallFav = favoriteStalls[item.station];
              const isRecentlyAdded = addedItemEffect === item.id;

              return (
                <article
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="bg-white rounded-2xl md:rounded-3xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between gap-3 relative overflow-hidden group cursor-pointer hover:border-[#ff6b35]/50 transition-all hover:shadow-md"
                >
                  {/* Stall Header Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-lg flex-shrink-0">
                        {item.id === 'teriyaki-bowl' && '🍜'}
                        {item.id === 'smash-burger' && '🍔'}
                        {item.id === 'chickpea-salad' && '🥑'}
                        {item.id === 'matcha-latte' && '🍵'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-[#131b2e] truncate">{item.station}</h3>
                          <span className="px-1.5 py-0.5 rounded bg-[#eaedff] text-[#594139] text-[10px] font-bold">
                            {item.stationTag}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#594139] flex-wrap mt-0.5">
                          <span className="flex items-center text-[#855300] font-bold gap-0.5">
                            <span
                              className="material-symbols-outlined text-[14px] text-[#ffb95f]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            {item.rating}
                          </span>
                          <span className="text-[#8d7168]">({item.reviewsCount}+)</span>
                          <span className="text-[#e1bfb5]">•</span>
                          <span className="flex items-center gap-0.5 text-[#006c49] font-semibold text-[11px]">
                            <span className="material-symbols-outlined text-[13px]">timer</span>
                            {item.prepTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      aria-label="Favorite stall"
                      onClick={(e) => toggleFavorite(item.station, e)}
                      className={`w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center transition-colors flex-shrink-0 ${
                        isStallFav ? 'text-[#ab3500]' : 'text-[#8d7168]'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={isStallFav ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Food Item Content Card */}
                  <div className="bg-[#f2f3ff]/60 rounded-2xl p-3 flex items-center gap-3">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#eaedff]">
                      <img
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        alt={item.name}
                        src={item.image}
                        loading="lazy"
                      />
                      {item.badge && (
                        <span className="absolute bottom-1 left-1 bg-black/65 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0 h-24 sm:h-28 py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#131b2e] leading-snug line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-base font-extrabold text-[#ab3500] flex-shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-[#594139] line-clamp-2 mt-0.5">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[11px] text-[#8d7168] font-medium">
                            {item.calories} kcal
                          </span>
                          <span className="text-[#e1bfb5] text-[10px]">•</span>
                          <span className="text-[11px] text-[#006c49] font-bold">
                            {item.protein}
                          </span>
                          {item.dietary.length > 0 && (
                            <>
                              <span className="text-[#e1bfb5] text-[10px]">•</span>
                              <span className="text-[10px] font-bold text-[#005236] bg-[#6cf8bb]/40 px-1.5 py-0.5 rounded">
                                {item.dietary[0]}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#855300] flex items-center gap-0.5 font-bold">
                          <span className="material-symbols-outlined text-[14px]">
                            local_fire_department
                          </span>
                          {item.tag}
                        </span>

                        {/* Quick Add or Customize Button */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleQuickAdd(item, e)}
                            className={`h-8 px-3 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all ${
                              isRecentlyAdded
                                ? 'bg-[#006c49] text-white'
                                : 'bg-[#ff6b35] hover:bg-[#ab3500] text-white'
                            }`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {isRecentlyAdded ? 'check' : 'add'}
                            </span>
                            <span>{isRecentlyAdded ? 'Added' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Column: Desktop Sticky Tray & Locker Info Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-4">
          <div className="sticky top-28 flex flex-col gap-4">
            {/* Live Tray Panel */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff]">
              <div className="flex items-center justify-between border-b border-[#eaedff] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ab3500] text-[20px]">
                    shopping_bag
                  </span>
                  <h3 className="font-extrabold text-[#131b2e] text-base">Campus Tray</h3>
                </div>
                {cartCount > 0 ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ff6b35]/15 text-[#ab3500]">
                    {cartCount} items
                  </span>
                ) : (
                  <span className="text-xs text-[#8d7168]">Empty</span>
                )}
              </div>

              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-3 py-3">
                  <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col gap-2.5">
                    {cartItems.map((cItem) => (
                      <div
                        key={cItem.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#f2f3ff]/60 border border-[#eaedff]/60 gap-2"
                      >
                        <img
                          src={cItem.image}
                          alt={cItem.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#131b2e] truncate">{cItem.name}</p>
                          <p className="text-[10px] text-[#594139] truncate">{cItem.summary}</p>
                          <p className="text-xs font-extrabold text-[#ab3500]">
                            ${(cItem.price * cItem.quantity).toFixed(2)}
                          </p>
                        </div>
                        {onUpdateQuantity && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onUpdateQuantity(cItem.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-[#eaedff] text-xs font-bold flex items-center justify-center text-[#131b2e]"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {cItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cItem.id, 1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-[#eaedff] text-xs font-bold flex items-center justify-center text-[#131b2e]"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary row */}
                  <div className="pt-2 border-t border-[#eaedff] space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#594139]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#131b2e]">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#006c49]">
                      <span>Student Card Discount (10%)</span>
                      <span className="font-bold">-${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#131b2e] font-extrabold text-sm pt-1">
                      <span>Total Estimated</span>
                      <span className="text-[#ab3500]">
                        ${(cartTotal * 0.9 + 0.4).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onViewTray}
                    className="w-full mt-2 py-3 bg-[#ff6b35] hover:bg-[#ab3500] text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Proceed to Smart Locker Checkout</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#ab3500] mb-2">
                    <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
                  </div>
                  <p className="text-xs font-bold text-[#131b2e]">Your tray is waiting</p>
                  <p className="text-[11px] text-[#594139] mt-0.5 max-w-[200px]">
                    Click "+ Add" on any bowl or burger to start building your campus order.
                  </p>
                </div>
              )}
            </div>

            {/* Smart Locker Guidance Box */}
            <div className="bg-[#eaedff]/50 rounded-3xl p-5 border border-[#eaedff] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  verified_user
                </span>
                <h4 className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
                  Contactless Pickup Guarantee
                </h4>
              </div>
              <ul className="text-xs text-[#594139] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#006c49] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Kitchen cooks your bowl fresh to order in under 8 mins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#006c49] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Meal is placed into heated locker pod at Student Union.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#006c49] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Scan QR code from phone or enter 4-digit PIN to open door.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Cart Summary Bar (Only on Mobile screens when items in cart) */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none lg:hidden">
          <div className="pointer-events-auto mx-auto max-w-md bg-[#283044] text-[#eef0ff] rounded-full p-2 pl-4 pr-2.5 flex items-center justify-between shadow-2xl transition-all duration-300 transform translate-y-0 active:scale-[0.99] border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ff6b35] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <span>{cartCount}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-white leading-tight">
                    {cartCount} items · ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <span className="text-[11px] text-[#dae2fd] truncate">
                  North Canteen Locker Pickup
                </span>
              </div>
            </div>
            <button
              onClick={onViewTray}
              className="h-10 px-4 bg-[#ff6b35] hover:bg-[#ab3500] text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-transform flex-shrink-0"
              type="button"
            >
              <span>View Tray</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
