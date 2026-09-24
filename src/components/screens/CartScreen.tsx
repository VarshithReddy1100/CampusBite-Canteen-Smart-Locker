import React, { useState } from 'react';
import { CartItem, ScreenType } from '../../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCustomizeItem: (cartItem: CartItem) => void;
  onAddMoreItems: () => void;
  onCheckout: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCustomizeItem,
  onAddMoreItems,
  onCheckout,
}) => {
  const [includeCutlery, setIncludeCutlery] = useState(true);
  const [pickupMode, setPickupMode] = useState<'immediate' | 'schedule'>('schedule');
  const [selectedSlot, setSelectedSlot] = useState('12:15 PM');
  const [selectedLocker, setSelectedLocker] = useState('SU North Hall · Pod B');
  const [showLockerModal, setShowLockerModal] = useState(false);
  const [splitPayModal, setSplitPayModal] = useState(false);

  // Available lockers
  const lockers = [
    { name: 'SU North Hall · Pod B', desc: 'Automated Smart Lockers #12-#18', status: 'Optimal' },
    { name: 'SU South Entrance · Pod A', desc: 'Lockers #1-#10', status: 'Moderate queue' },
    { name: 'Library Bridge Pod C', desc: 'Quick Heated Deck', status: 'Available' },
  ];

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const studentDiscount = subtotal > 0 ? subtotal * 0.1 : 0;
  const facilityFee = subtotal > 0 ? 0.4 : 0;
  const finalTotal = Math.max(0, subtotal - studentDiscount + facilityFee);

  const totalItemsCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pb-24 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#eaedff] flex items-center justify-center text-[#ab3500] mb-4 shadow-sm">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h2 className="text-xl font-bold text-[#131b2e]">Your campus tray is empty</h2>
        <p className="text-sm text-[#594139] mt-1 max-w-xs">
          Explore today's campus stalls and add delicious warm grain bowls, burgers, or fresh lattes.
        </p>
        <button
          onClick={onAddMoreItems}
          className="mt-6 px-6 py-3 rounded-full bg-[#ff6b35] hover:bg-[#ab3500] text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Explore Canteen Stalls</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 md:px-6 pb-28 md:pb-16 max-w-6xl mx-auto pt-2 gap-4">
      {/* Top Header Breadcrumb on Tablet & Desktop */}
      <div className="hidden md:flex items-center justify-between pb-1 border-b border-[#eaedff]">
        <div className="flex items-center gap-2">
          <button
            onClick={onAddMoreItems}
            className="flex items-center gap-1 text-xs font-bold text-[#594139] hover:text-[#ab3500] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Menu</span>
          </button>
          <span className="text-xs text-[#8d7168]">/</span>
          <span className="text-xs font-bold text-[#131b2e]">Campus Tray &amp; Checkout</span>
        </div>
        <button
          onClick={onAddMoreItems}
          className="text-xs font-bold text-[#ab3500] hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Add more dishes</span>
        </button>
      </div>

      {/* Main Responsive Grid: 1 col on mobile, 2 cols on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column (Tray Items & Preferences) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Top Location & Locker Anchor */}
          <div className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-[#eaedff] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#006c49]/10 flex items-center justify-center flex-shrink-0 text-[#006c49]">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  meeting_room
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.6875rem] font-bold text-[#006c49] uppercase tracking-wider">
                    Assigned Locker Hub
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                </div>
                <p className="text-sm md:text-base font-bold text-[#131b2e] truncate">{selectedLocker}</p>
                <p className="text-xs text-[#594139] truncate">Automated Smart Lockers #12-#18</p>
              </div>
            </div>
            <button
              onClick={() => setShowLockerModal(true)}
              className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#ab3500] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0"
            >
              Change Hub
            </button>
          </div>

          {/* Order Items Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-extrabold text-[#131b2e]">Your Tray Items</h2>
              <span className="bg-[#ff6b35]/15 text-[#ab3500] font-bold text-xs px-2.5 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'dish' : 'dishes'}
              </span>
            </div>
            <button
              onClick={onAddMoreItems}
              className="text-[#ab3500] text-xs font-bold hover:underline md:hidden"
            >
              + Add items
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex flex-col gap-3">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem.id}
                className="bg-white rounded-2xl md:rounded-3xl p-4 shadow-sm border border-[#eaedff] flex gap-3 relative group"
              >
                <img
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover flex-shrink-0 bg-[#eaedff]"
                  alt={cartItem.name}
                  src={cartItem.image}
                />
                <div className="flex flex-col flex-1 min-w-0 justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-sm md:text-base font-bold text-[#131b2e] leading-snug truncate">
                        {cartItem.name}
                      </h3>
                      <span className="text-sm md:text-base font-extrabold text-[#ab3500] flex-shrink-0">
                        ${(cartItem.price * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#594139] mt-0.5 line-clamp-2">
                      {cartItem.summary || 'Custom ingredients & sides'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onCustomizeItem(cartItem)}
                        className="text-xs font-bold text-[#ab3500] hover:underline flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>Customize</span>
                      </button>
                      <span className="text-[#eaedff]">•</span>
                      <button
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="text-xs font-semibold text-[#8d7168] hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center bg-[#eaedff] rounded-2xl px-1.5 py-0.5 shadow-inner">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(cartItem.id, -1)}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-[#131b2e] hover:bg-white transition-colors active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#131b2e]">
                        {cartItem.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(cartItem.id, 1)}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-[#131b2e] hover:bg-white transition-colors active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Eco Utensils Toggle */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#594139]">
                  <span className="material-symbols-outlined text-[20px]">restaurant</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">Include Cutlery &amp; Napkins</p>
                  <p className="text-xs text-[#594139]">Zero-waste bamboo kit included free</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={includeCutlery}
                  onChange={(e) => setIncludeCutlery(e.target.checked)}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006c49]"></div>
              </label>
            </div>
          </div>

          {/* Scheduled Pickup Slot Picker */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ab3500] text-[20px]">schedule</span>
                <h3 className="text-sm font-bold text-[#131b2e]">Scheduled Pickup Slot</h3>
              </div>
              <span className="text-[10px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                Avoid lecture rush
              </span>
            </div>

            <div className="grid grid-cols-2 bg-[#eaedff] p-1 rounded-2xl gap-1">
              <button
                onClick={() => setPickupMode('immediate')}
                className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  pickupMode === 'immediate'
                    ? 'bg-white text-[#ab3500] shadow-xs'
                    : 'text-[#594139] hover:text-[#131b2e]'
                }`}
              >
                Immediate (~8 min prep)
              </button>
              <button
                onClick={() => setPickupMode('schedule')}
                className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  pickupMode === 'schedule'
                    ? 'bg-white text-[#ab3500] shadow-xs'
                    : 'text-[#594139] hover:text-[#131b2e]'
                }`}
              >
                Class Break Timing
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { slot: '12:15 PM', badge: 'Post-Lecture 2', speed: 'Fast prep', color: '#ab3500' },
                { slot: '12:30 PM', badge: 'Peak Shift', speed: 'High crowd', color: '#d68900' },
                { slot: '12:45 PM', badge: 'Passing Window', speed: 'Moderate', color: '#006c49' },
                { slot: '1:00 PM', badge: 'Quiet Hall', speed: 'Zero line', color: '#006c49' },
              ].map((time) => (
                <button
                  key={time.slot}
                  onClick={() => setSelectedSlot(time.slot)}
                  className={`flex flex-col items-start p-3 rounded-2xl transition-transform active:scale-95 text-left border ${
                    selectedSlot === time.slot
                      ? 'bg-[#ffdbd0]/50 border-[#ff6b35] shadow-xs'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-extrabold text-[#131b2e]">{time.slot}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: time.color }}></span>
                  </div>
                  <span className="text-[10px] font-bold text-[#832600] mt-1">{time.badge}</span>
                  <span className="text-[10px] font-semibold text-[#006c49] mt-0.5">{time.speed}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Payment & Checkout Summary - Sticky on Desktop) */}
        <div className="md:col-span-5 md:sticky md:top-28 flex flex-col gap-4">
          {/* CampusCard Balance & Payment Row */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#ff6b35] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">badge</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#131b2e] truncate">CampusCard Dining Dollars</p>
                  <p className="text-xs text-[#006c49] font-bold">Balance: $48.50 · Active</p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-[#006c49] text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-[#594139]">
              <span className="text-xs">Need to split with friends?</span>
              <button
                onClick={() => setSplitPayModal(true)}
                className="text-xs font-bold text-[#ab3500] hover:underline"
              >
                Split Payment
              </button>
            </div>
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#131b2e] pb-1 border-b border-[#eaedff]">
              Payment Summary
            </h4>
            <div className="flex justify-between items-center text-xs text-[#594139]">
              <span>Subtotal ({totalItemsCount} items)</span>
              <span className="text-[#131b2e] font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-[#006c49]">
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px]">school</span>
                Student Campus Discount (-10%)
              </span>
              <span className="font-bold">-${studentDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-[#594139]">
              <span>Campus Locker Facility Fee</span>
              <span className="text-[#131b2e] font-semibold">${facilityFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-[#eaedff] my-1"></div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-base font-extrabold text-[#131b2e]">Total Amount</span>
                <p className="text-[11px] text-[#594139]">Charged to Student Account</p>
              </div>
              <span className="text-2xl md:text-3xl font-black text-[#ab3500]">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Trigger */}
            <div className="pt-2">
              <button
                onClick={onCheckout}
                className="w-full h-13 bg-[#ff6b35] hover:bg-[#ab3500] text-white rounded-2xl shadow-md flex items-center justify-between px-6 active:scale-[0.98] transition-all font-bold"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span className="text-xs uppercase tracking-wider">CONFIRM &amp; ASSIGN LOCKER</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-extrabold">
                  <span>${finalTotal.toFixed(2)}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </button>
              <p className="text-[11px] text-center text-[#594139] mt-3 flex items-center justify-center gap-1">
                <span
                  className="material-symbols-outlined text-[14px] text-[#006c49]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                Locker QR &amp; Bluetooth pass issued instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Locker Picker Modal */}
      {showLockerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in border border-[#eaedff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">Select Smart Locker Pod</h3>
              <button
                onClick={() => setShowLockerModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
              {lockers.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocker(loc.name);
                    setShowLockerModal(false);
                  }}
                  className={`p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                    selectedLocker === loc.name
                      ? 'border-[#ff6b35] bg-[#ffdbd0]/20 shadow-xs ring-1 ring-[#ff6b35]/30'
                      : 'border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131b2e]">{loc.name}</span>
                    <span className="text-xs text-[#594139]">{loc.desc}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#6cf8bb]/40 text-[#005236]">
                    {loc.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Split Pay Modal */}
      {splitPayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in border border-[#eaedff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">Split Payment Method</h3>
              <button
                onClick={() => setSplitPayModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex justify-between text-xs">
                <span>CampusCard Balance:</span>
                <span className="font-bold text-[#006c49]">$48.50 Available</span>
              </div>
              <button
                onClick={() => setSplitPayModal(false)}
                className="w-full py-3.5 rounded-2xl bg-[#131b2e] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span> Pay with Apple Pay</span>
              </button>
              <button
                onClick={() => setSplitPayModal(false)}
                className="w-full py-3.5 rounded-2xl bg-[#eaedff] text-[#131b2e] font-bold text-xs"
              >
                Credit / Debit Card ($0.00 split)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
