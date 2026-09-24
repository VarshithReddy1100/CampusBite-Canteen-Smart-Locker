import React, { useState } from 'react';
import { FoodItem, ScreenType } from '../../types';
import { FOOD_ITEMS } from '../../data/mockData';

interface ExploreScreenProps {
  onSelectItem: (item: FoodItem) => void;
  onQuickAdd: (item: FoodItem) => void;
  cartCount: number;
  cartTotal: number;
  onViewTray: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectItem,
  onQuickAdd,
  cartCount,
  cartTotal,
  onViewTray,
  onNavigate,
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
    <div className="flex flex-col w-full pb-32">
      {/* Campus Rush Hour Live Alert Banner */}
      <section className="px-4 pt-3 pb-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#d68900] p-4 shadow-sm text-white">
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                <span className="material-symbols-outlined text-[20px] animate-bounce">bolt</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[0.6875rem] text-white uppercase tracking-wider font-extrabold">
                    Rush Hour Alert
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] inline-block mr-1 animate-pulse"></span>
                    Fast Lane
                  </span>
                </div>
                <p className="text-sm font-semibold mt-0.5 leading-snug">
                  North Dining Hall wait time is currently{' '}
                  <span className="underline decoration-white/60 decoration-2 font-bold">
                    under 8 mins
                  </span>
                  !
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const teriyaki = FOOD_ITEMS[0];
                onSelectItem(teriyaki);
              }}
              className="flex-shrink-0 px-3 py-1.5 bg-white text-[#ab3500] rounded-full text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1 hover:bg-[#faf8ff]"
              type="button"
            >
              <span>Pre-Order</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          {/* Subtle ambient decorative circle */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/15 blur-lg pointer-events-none"></div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-[#f2f3ff] rounded-2xl px-3.5 py-2.5 shadow-xs focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff6b35]/30 transition-all">
            <span className="material-symbols-outlined text-[#8d7168] text-[22px] mr-2">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-sm text-[#131b2e] placeholder:text-[#8d7168]/70 font-medium min-w-0"
              placeholder="Search bowls, ramen, burgers, vegan stalls..."
              type="search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#8d7168] hover:text-[#131b2e] p-0.5 mr-1"
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
              title="Voice search demo"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <button
            aria-label="Filter menu"
            onClick={() => setActiveCategory(activeCategory === 'healthy' ? 'trending' : 'healthy')}
            className="w-11 h-11 flex-shrink-0 rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#131b2e] transition-transform active:scale-95 shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>
      </section>

      {/* Live Campus Queue Status Strip */}
      <section className="px-4 py-1">
        <div className="flex items-center justify-between bg-white rounded-xl p-2.5 shadow-xs border border-[#eaedff]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006c49]"></span>
            </span>
            <span className="text-xs text-[#131b2e] truncate">
              <strong className="text-[#006c49] font-bold">Low Queue:</strong> North Hall Pods A1–A8
              (Locker pickup ready)
            </span>
          </div>
          <span className="material-symbols-outlined text-[#8d7168] text-[18px] flex-shrink-0">
            meeting_room
          </span>
        </div>
      </section>

      {/* Scrollable Category Filter Pills */}
      <section className="pt-2 pb-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 w-max">
          <button
            onClick={() => setActiveCategory('trending')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all ${
              activeCategory === 'trending'
                ? 'bg-[#ff6b35] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span>🔥</span>
            <span>Trending</span>
          </button>

          <button
            onClick={() => setActiveCategory('fast')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold active:scale-95 transition-all ${
              activeCategory === 'fast'
                ? 'bg-[#ff6b35] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span className="text-[#855300] font-bold">⚡</span>
            <span>&lt; 10 Min Prep</span>
          </button>

          <button
            onClick={() => setActiveCategory('healthy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold active:scale-95 transition-all ${
              activeCategory === 'healthy'
                ? 'bg-[#006c49] text-white'
                : 'bg-[#6cf8bb]/30 text-[#005236] hover:bg-[#6cf8bb]/50'
            }`}
            type="button"
          >
            <span>🥗</span>
            <span>Healthy &amp; Halal</span>
          </button>

          <button
            onClick={() => setActiveCategory('coffee')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold active:scale-95 transition-all ${
              activeCategory === 'coffee'
                ? 'bg-[#ff6b35] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span>☕</span>
            <span>Coffee &amp; Bakes</span>
          </button>

          <button
            onClick={() => setActiveCategory('combos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold active:scale-95 transition-all ${
              activeCategory === 'combos'
                ? 'bg-[#ff6b35] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span>🍱</span>
            <span>Student Combos ($5.99)</span>
          </button>
        </div>
      </section>

      {/* Canteen Stalls & Popular Food Items */}
      <section className="px-4 flex flex-col gap-4 pb-6">
        {/* Section Title & Live Count */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="text-xl font-bold text-[#131b2e] tracking-tight">
              Canteen Stalls &amp; Picks
            </h2>
            <p className="text-xs text-[#594139]">Live station prep times updated 30s ago</p>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#131b2e] font-bold">
            {filteredItems.length} Available
          </span>
        </div>

        {/* Stall & Item Cards */}
        {filteredItems.map((item) => {
          const isStallFav = favoriteStalls[item.station];
          const isRecentlyAdded = addedItemEffect === item.id;

          return (
            <article
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]/80 flex flex-col gap-3 relative overflow-hidden group cursor-pointer hover:border-[#ff6b35]/40 transition-all hover:shadow-md"
            >
              {/* Stall Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-xl flex-shrink-0">
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
                          className="material-symbols-outlined text-[15px] text-[#ffb95f]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        {item.rating}
                      </span>
                      <span className="text-[#8d7168]">({item.reviewsCount}+)</span>
                      <span className="text-[#e1bfb5]">•</span>
                      <span className="flex items-center gap-0.5 text-[#006c49] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        {item.prepTime}
                      </span>
                      {item.dietary.length > 0 && (
                        <>
                          <span className="text-[#e1bfb5]">•</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#6ffbbe]/40 text-[#005236] text-[10px] font-bold">
                            {item.dietary[0]}
                          </span>
                        </>
                      )}
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

              {/* Featured Item Detail Row */}
              <div className="bg-[#f2f3ff]/70 rounded-xl p-3 flex items-center gap-3">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#eaedff]">
                  <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt={item.name}
                    src={item.image}
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0 h-24 py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-[#131b2e] leading-tight truncate">
                        {item.name}
                      </h4>
                      <span className="text-base font-bold text-[#ab3500] flex-shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#594139] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-[#8d7168] font-medium">
                        {item.calories} kcal
                      </span>
                      <span className="text-[#e1bfb5] text-[10px]">•</span>
                      <span className="text-[11px] text-[#006c49] font-bold">
                        {item.protein}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#855300] flex items-center gap-0.5 font-bold">
                      <span className="material-symbols-outlined text-[14px]">
                        local_fire_department
                      </span>{' '}
                      {item.tag}
                    </span>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all ${
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
            </article>
          );
        })}
      </section>

      {/* Floating Bottom Quick Cart Summary Bar */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
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
