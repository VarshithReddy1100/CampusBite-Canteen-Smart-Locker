import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  hasActiveOrder: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  hasActiveOrder,
}) => {
  // Hide bottom nav on customizer to give room for sticky CTA
  if (currentScreen === 'customizer') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(19,27,46,0.06)] rounded-t-2xl border-t border-[#eaedff] md:hidden">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">
        {/* Tab 1: Explore */}
        <button
          onClick={() => onNavigate('explore')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors group relative ${
            currentScreen === 'explore'
              ? 'text-[#ab3500]'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[24px] transition-transform ${
                currentScreen === 'explore' ? 'scale-110 font-bold' : ''
              }`}
            >
              restaurant_menu
            </span>
            {currentScreen === 'explore' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff6b35]"></span>
            )}
          </div>
          <span className="text-[0.6875rem] font-bold mt-1 tracking-tight">Explore</span>
        </button>

        {/* Tab 2: Cart */}
        <button
          onClick={() => onNavigate('cart')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors group relative ${
            currentScreen === 'cart'
              ? 'text-[#ab3500]'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[24px] transition-transform ${
                currentScreen === 'cart' ? 'scale-110 font-bold' : ''
              }`}
            >
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-[#ff6b35] text-white font-bold text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[0.6875rem] font-bold mt-1 tracking-tight">Cart</span>
        </button>

        {/* Tab 3: Orders */}
        <button
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors group relative ${
            currentScreen === 'orders'
              ? 'text-[#ab3500]'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[24px] transition-transform ${
                currentScreen === 'orders' ? 'scale-110 font-bold' : ''
              }`}
            >
              receipt_long
            </span>
            {hasActiveOrder && (
              <>
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#006c49]"></span>
              </>
            )}
          </div>
          <span className="text-[0.6875rem] font-bold mt-1 tracking-tight">Orders</span>
        </button>

        {/* Tab 4: Student ID */}
        <button
          onClick={() => onNavigate('student-id')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors group relative ${
            currentScreen === 'student-id'
              ? 'text-[#ab3500]'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[24px] transition-transform ${
                currentScreen === 'student-id' ? 'scale-110 font-bold' : ''
              }`}
            >
              badge
            </span>
            {currentScreen === 'student-id' && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#ab3500]"></span>
            )}
          </div>
          <span className="text-[0.6875rem] font-bold mt-1 tracking-tight">Student ID</span>
        </button>
      </div>
    </nav>
  );
};
