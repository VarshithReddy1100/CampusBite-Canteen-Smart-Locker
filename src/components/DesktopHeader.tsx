import React, { useState } from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS, STUDENT_PROFILE } from '../data/mockData';

interface DesktopHeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadCount: number;
  cartCount: number;
  cartTotal: number;
  hasActiveOrder: boolean;
  selectedCanteen: string;
  onSelectCanteen: (canteen: string) => void;
  onBack?: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  currentScreen,
  onNavigate,
  unreadCount,
  cartCount,
  cartTotal,
  hasActiveOrder,
  selectedCanteen,
  onSelectCanteen,
  onBack,
}) => {
  const [showCanteenDropdown, setShowCanteenDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const canteens = [
    { name: 'Student Union Canteen 1', location: 'Table / Locker Pickup', availablePods: 'Pods A & B', status: 'Low queue' },
    { name: 'North Quad Dining Hall', location: 'Locker Pods C1-C6', availablePods: 'Pods C & D', status: 'Fast lane' },
    { name: 'Engineering Quad Hub', location: 'Express Grab & Go', availablePods: 'Pod E', status: 'Normal' },
  ];

  const isCustomizer = currentScreen === 'customizer';

  return (
    <header className="sticky top-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Left Section: Brand & Canteen Switcher */}
        <div className="flex items-center gap-6 min-w-0">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('explore')}>
            <img
              alt="CampusBite Logo"
              className="h-10 w-auto object-contain transition-transform hover:scale-105"
              src={APP_ASSETS.logo}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#131b2e] tracking-tight">
                  Campus<span className="text-[#ab3500]">Bite</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] text-[10px] font-extrabold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] inline-block mr-1 animate-pulse"></span>
                  Live Dining
                </span>
              </div>
              <span className="text-[11px] text-[#594139] hidden sm:inline">
                Smart Locker Pickup &amp; Campus Canteens
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-[#eaedff] hidden lg:block"></div>

          {/* Canteen Location Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowCanteenDropdown(!showCanteenDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-left transition-colors border border-[#eaedff]/60 group"
              aria-expanded={showCanteenDropdown}
            >
              <span className="material-symbols-outlined text-[#ab3500] text-[20px]">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#8d7168] uppercase tracking-wider">
                  Pickup Hub
                </span>
                <span className="text-xs font-bold text-[#131b2e] truncate max-w-[180px] group-hover:text-[#ab3500]">
                  {selectedCanteen}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#594139] text-[18px]">
                {showCanteenDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showCanteenDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#eaedff] p-2 z-50 animate-fade-in">
                <div className="text-[11px] font-bold text-[#8d7168] px-3 py-2 uppercase tracking-wider border-b border-[#eaedff] mb-1">
                  Select Campus Canteen
                </div>
                {canteens.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      onSelectCanteen(c.name);
                      setShowCanteenDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedCanteen === c.name
                        ? 'bg-[#ffdbd0]/60 text-[#ab3500] font-bold'
                        : 'hover:bg-[#f2f3ff] text-[#131b2e]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-[#594139] text-[11px]">{c.availablePods}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49]">
                      {c.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center / Navigation Links for Desktop */}
        <nav className="flex items-center gap-1.5 lg:gap-2">
          {/* Back button if customizer */}
          {isCustomizer && (
            <button
              onClick={onBack || (() => onNavigate('explore'))}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#131b2e] bg-[#eaedff] hover:bg-[#dae2fd] transition-all mr-2"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Menu</span>
            </button>
          )}

          {/* Explore Menu Tab */}
          <button
            onClick={() => onNavigate('explore')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'explore'
                ? 'bg-[#ff6b35] text-white shadow-sm'
                : 'text-[#594139] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            <span>Explore Menu</span>
          </button>

          {/* Orders & Locker Pass Tab */}
          <button
            onClick={() => onNavigate('orders')}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'orders'
                ? 'bg-[#ff6b35] text-white shadow-sm'
                : 'text-[#594139] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>Orders &amp; Lockers</span>
            {hasActiveOrder && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c49]"></span>
              </span>
            )}
          </button>

          {/* Student ID & Wallet Tab */}
          <button
            onClick={() => onNavigate('student-id')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'student-id'
                ? 'bg-[#ff6b35] text-white shadow-sm'
                : 'text-[#594139] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Student Pass</span>
          </button>
        </nav>

        {/* Right Section: Campus Balance, Cart Button, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Dining Dollars Pill */}
          <button
            onClick={() => onNavigate('student-id')}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eaedff]/70 hover:bg-[#eaedff] border border-[#eaedff] transition-all"
            title="Campus Dining Balance"
          >
            <span className="material-symbols-outlined text-[#006c49] text-[18px]">
              account_balance_wallet
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-[#594139] uppercase tracking-wider">
                Dining Dollars
              </span>
              <span className="text-xs font-bold text-[#131b2e]">
                ${STUDENT_PROFILE.campusCardBalance.toFixed(2)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#ab3500] ml-1">+ Top Up</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => onNavigate('notifications')}
            aria-label="Notifications"
            className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              currentScreen === 'notifications'
                ? 'bg-[#eaedff] text-[#ab3500]'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff6b35] ring-2 ring-white animate-pulse"></span>
            )}
          </button>

          {/* Tray / Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              currentScreen === 'cart'
                ? 'bg-[#ab3500] text-white ring-2 ring-[#ff6b35]/40'
                : 'bg-[#ff6b35] hover:bg-[#ab3500] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Tray</span>
            {cartCount > 0 && (
              <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[11px] font-extrabold">
                {cartCount} · ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[#f2f3ff] transition-all"
            >
              <img
                alt="Student Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs"
                src={APP_ASSETS.avatar}
              />
              <span className="material-symbols-outlined text-[#594139] text-[16px] hidden sm:block">
                arrow_drop_down
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#eaedff] p-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-[#eaedff]">
                  <p className="text-xs font-bold text-[#131b2e]">{STUDENT_PROFILE.name}</p>
                  <p className="text-[11px] text-[#594139]">ID: {STUDENT_PROFILE.studentId}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                    {STUDENT_PROFILE.mealPlanTier}
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onNavigate('student-id');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ab3500]">badge</span>
                    <span>Digital Student Pass</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('orders');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ab3500]">lock_clock</span>
                    <span>Locker Pickups &amp; History</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
