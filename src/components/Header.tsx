import React, { useState } from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadCount: number;
  selectedCanteen: string;
  onSelectCanteen: (canteen: string) => void;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  unreadCount,
  selectedCanteen,
  onSelectCanteen,
  onBack,
}) => {
  const [showCanteenDropdown, setShowCanteenDropdown] = useState(false);

  const canteens = [
    { name: 'Student Union Canteen 1', location: 'Table / Locker Pickup', availablePods: 'Pods A & B' },
    { name: 'North Quad Dining Hall', location: 'Locker Pods C1-C6', availablePods: 'Pods C & D' },
    { name: 'Engineering Quad Hub', location: 'Express Grab & Go', availablePods: 'Pod E' },
  ];

  const isCustomizer = currentScreen === 'customizer';

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]/70">
      <div className="max-w-md mx-auto h-16 md:h-20 px-4 flex items-center justify-between gap-2">
        {isCustomizer ? (
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              aria-label="Go back"
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#eaedff] transition-colors text-[#131b2e] active:scale-95"
              onClick={onBack || (() => onNavigate('explore'))}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="CampusBite Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={APP_ASSETS.logo}
            />
            <h1 className="font-bold text-[1.125rem] text-[#131b2e] truncate ml-1">
              Item Customizer
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              onClick={() => onNavigate('explore')}
              className="flex-shrink-0 hover:opacity-90 transition-opacity"
              aria-label="Home"
            >
              <img
                alt="CampusBite Logo"
                className="h-8 w-auto object-contain"
                src={APP_ASSETS.logo}
              />
            </button>

            <div className="flex flex-col min-w-0 relative">
              <div className="flex items-center gap-1.5">
                <span className="text-[0.6875rem] font-bold text-[#ab3500] uppercase tracking-wider">
                  CampusBite
                </span>
                <span className="text-[#e1bfb5] text-[10px]">•</span>
                <span className="text-[0.6875rem] font-bold text-[#006c49] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] inline-block animate-pulse"></span>
                  Open
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowCanteenDropdown(!showCanteenDropdown)}
                  className="flex items-center gap-0.5 text-left group min-w-0 py-0.5"
                  aria-expanded={showCanteenDropdown}
                >
                  <span className="text-[1.05rem] font-bold text-[#131b2e] truncate group-hover:text-[#ab3500] transition-colors">
                    {selectedCanteen}
                  </span>
                  <span className="material-symbols-outlined text-[#594139] text-[18px] flex-shrink-0 transition-transform duration-200">
                    {showCanteenDropdown ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {showCanteenDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#eaedff] p-2 z-50">
                    <div className="text-[11px] font-bold text-[#8d7168] px-3 py-1.5 uppercase tracking-wider">
                      Select Campus Canteen
                    </div>
                    {canteens.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          onSelectCanteen(c.name);
                          setShowCanteenDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex flex-col ${
                          selectedCanteen === c.name
                            ? 'bg-[#ffdbd0]/60 text-[#ab3500] font-bold'
                            : 'hover:bg-[#f2f3ff] text-[#131b2e]'
                        }`}
                      >
                        <span className="font-semibold text-sm">{c.name}</span>
                        <span className="text-[#594139] text-[11px]">{c.location}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-[0.75rem] text-[#594139] truncate">
                Table / Locker Pickup
              </span>
            </div>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            aria-label="Notifications"
            onClick={() => onNavigate('notifications')}
            className={`relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#eaedff] transition-colors ${
              currentScreen === 'notifications' ? 'bg-[#eaedff] text-[#ab3500]' : 'text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ff6b35] ring-2 ring-[#faf8ff] animate-pulse"></span>
            )}
          </button>

          <button
            aria-label="Profile"
            onClick={() => onNavigate('student-id')}
            className={`relative w-11 h-11 flex items-center justify-center rounded-full hover:opacity-90 transition-all ${
              currentScreen === 'student-id' ? 'ring-2 ring-[#ab3500]' : ''
            }`}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-sm border border-white"
              src={APP_ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
