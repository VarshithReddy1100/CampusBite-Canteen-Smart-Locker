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
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pb-24">
        <div className="w-16 h-16 rounded-full bg-[#eaedff] flex items-center justify-center text-[#ab3500] mb-4">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h2 className="text-xl font-bold text-[#131b2e]">Your tray is empty</h2>
        <p className="text-sm text-[#594139] mt-1 max-w-xs">
          Explore today's campus stalls and add delicious warm grain bowls, burgers, or fresh lattes.
        </p>
        <button
          onClick={onAddMoreItems}
          className="mt-6 px-6 py-3 rounded-full bg-[#ff6b35] text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Explore Stalls</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-1">
      {/* Top Location & Locker Anchor */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#006c49]/10 flex items-center justify-center flex-shrink-0 text-[#006c49]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              meeting_room
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[0.6875rem] font-bold text-[#006c49] uppercase tracking-wider">
                Pickup Point
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
            </div>
            <p className="text-sm font-bold text-[#131b2e] truncate">{selectedLocker}</p>
            <p className="text-xs text-[#594139] truncate">Automated Smart Lockers #12-#18</p>
          </div>
        </div>
        <button
          onClick={() => setShowLockerModal(true)}
          className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#ab3500] px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex-shrink-0"
        >
          Change
        </button>
      </div>

      {/* Order Items Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-[#131b2e]">Your Tray</h2>
          <span className="bg-[#ff6b35]/15 text-[#ab3500] font-bold text-xs px-2.5 py-0.5 rounded-full">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <button
          onClick={onAddMoreItems}
          className="text-[#ab3500] text-xs font-bold hover:underline"
        >
          Add more items
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-3">
        {cartItems.map((cartItem) => (
          <div
            key={cartItem.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex gap-3 relative"
          >
            <img
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-[#eaedff]"
              alt={cartItem.name}
              src={cartItem.image}
            />
            <div className="flex flex-col flex-1 min-w-0 justify-between">
              <div>
                <div className="flex justify-between items-start gap-1">
                  <h3 className="text-sm font-bold text-[#131b2e] leading-tight truncate">
                    {cartItem.name}
                  </h3>
                  <span className="text-sm font-bold text-[#131b2e] flex-shrink-0">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#594139] mt-0.5 line-clamp-1">
                  {cartItem.summary || 'Custom ingredients & sides'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onCustomizeItem(cartItem)}
                  className="text-xs font-bold text-[#ab3500] hover:underline flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Customize
                </button>

                <div className="flex items-center bg-[#eaedff] rounded-full px-1 py-0.5 shadow-inner">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => onUpdateQuantity(cartItem.id, -1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#131b2e] hover:bg-white transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#131b2e]">
                    {cartItem.quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => onUpdateQuantity(cartItem.id, 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#131b2e] hover:bg-white transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Eco Utensils Toggle */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#594139]">
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#131b2e]">Include Cutlery &amp; Napkins</p>
              <p className="text-xs text-[#594139]">Zero-waste bamboo kit included</p>
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
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ab3500] text-[20px]">schedule</span>
            <h3 className="text-sm font-bold text-[#131b2e]">Scheduled Pickup Slot</h3>
          </div>
          <span className="text-[10px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
            Avoid lecture rush
          </span>
        </div>

        {/* Segmented Mode Selector */}
        <div className="grid grid-cols-2 bg-[#eaedff] p-1 rounded-full gap-1">
          <button
            onClick={() => setPickupMode('immediate')}
            className={`py-2 rounded-full text-xs font-bold transition-all text-center ${
              pickupMode === 'immediate'
                ? 'bg-white text-[#ab3500] shadow-sm'
                : 'text-[#594139] hover:text-[#131b2e]'
            }`}
          >
            Immediate (~12 min)
          </button>
          <button
            onClick={() => setPickupMode('schedule')}
            className={`py-2 rounded-full text-xs font-bold transition-all text-center ${
              pickupMode === 'schedule'
                ? 'bg-white text-[#ab3500] shadow-sm'
                : 'text-[#594139] hover:text-[#131b2e]'
            }`}
          >
            Class Break Timing
          </button>
        </div>

        {/* Time Slot Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 pt-1 -mx-1 px-1 no-scrollbar">
          {/* Slot 1 */}
          <button
            onClick={() => setSelectedSlot('12:15 PM')}
            className={`flex flex-col items-start p-3 rounded-xl min-w-[130px] flex-shrink-0 transition-transform active:scale-95 text-left border ${
              selectedSlot === '12:15 PM'
                ? 'bg-[#ffdbd0]/50 border-[#ff6b35] shadow-xs'
                : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-extrabold text-[#131b2e]">12:15 PM</span>
              <span className="w-2 h-2 rounded-full bg-[#ab3500]"></span>
            </div>
            <span className="text-[11px] font-bold text-[#832600] mt-1">Post-Lecture 2</span>
            <span className="text-[11px] font-bold text-[#006c49] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">bolt</span> Fast prep
            </span>
          </button>

          {/* Slot 2 */}
          <button
            onClick={() => setSelectedSlot('12:30 PM')}
            className={`flex flex-col items-start p-3 rounded-xl min-w-[130px] flex-shrink-0 transition-transform active:scale-95 text-left border ${
              selectedSlot === '12:30 PM'
                ? 'bg-[#ffdbd0]/50 border-[#ff6b35] shadow-xs'
                : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-extrabold text-[#131b2e]">12:30 PM</span>
              <span className="w-2 h-2 rounded-full bg-[#d68900]"></span>
            </div>
            <span className="text-[11px] text-[#594139] mt-1 font-medium">Peak Shift</span>
            <span className="text-[11px] font-semibold text-[#855300] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">group</span> High crowd
            </span>
          </button>

          {/* Slot 3 */}
          <button
            onClick={() => setSelectedSlot('12:45 PM')}
            className={`flex flex-col items-start p-3 rounded-xl min-w-[130px] flex-shrink-0 transition-transform active:scale-95 text-left border ${
              selectedSlot === '12:45 PM'
                ? 'bg-[#ffdbd0]/50 border-[#ff6b35] shadow-xs'
                : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-extrabold text-[#131b2e]">12:45 PM</span>
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            </div>
            <span className="text-[11px] text-[#594139] mt-1 font-medium">Passing Window</span>
            <span className="text-[11px] font-semibold text-[#006c49] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">check_circle</span> Moderate
            </span>
          </button>

          {/* Slot 4 */}
          <button
            onClick={() => setSelectedSlot('1:00 PM')}
            className={`flex flex-col items-start p-3 rounded-xl min-w-[130px] flex-shrink-0 transition-transform active:scale-95 text-left border ${
              selectedSlot === '1:00 PM'
                ? 'bg-[#ffdbd0]/50 border-[#ff6b35] shadow-xs'
                : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-extrabold text-[#131b2e]">1:00 PM</span>
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            </div>
            <span className="text-[11px] text-[#594139] mt-1 font-medium">Quiet Hall</span>
            <span className="text-[11px] font-semibold text-[#006c49] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">sentiment_satisfied</span> Zero line
            </span>
          </button>
        </div>
      </div>

      {/* CampusCard Balance & Payment Row */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">badge</span>
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
        <div className="flex items-center justify-between pt-1 text-[#594139]">
          <span className="text-xs">Need to split? Use Apple Pay or Card</span>
          <button
            onClick={() => setSplitPayModal(true)}
            className="text-xs font-bold text-[#ab3500] hover:underline"
          >
            Split Pay
          </button>
        </div>
      </div>

      {/* Price Breakdown Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-2">
        <h4 className="text-sm font-bold text-[#131b2e] pb-1">Payment Summary</h4>
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
          <span>Campus Facility Fee</span>
          <span className="text-[#131b2e] font-semibold">${facilityFee.toFixed(2)}</span>
        </div>
        <div className="h-px bg-[#eaedff] my-1"></div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-base font-extrabold text-[#131b2e]">Total</span>
            <p className="text-[11px] text-[#594139]">Charged to Student Account</p>
          </div>
          <span className="text-2xl font-black text-[#ab3500]">
            ${finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Trigger */}
      <div className="pt-1">
        <button
          onClick={onCheckout}
          className="w-full h-12 bg-[#ff6b35] hover:bg-[#ab3500] text-white rounded-full shadow-md flex items-center justify-between px-6 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span className="text-xs font-bold uppercase tracking-wider">PROCEED TO CHECKOUT</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-extrabold">
            <span>${finalTotal.toFixed(2)}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>
        <p className="text-[11px] text-center text-[#594139] mt-2 flex items-center justify-center gap-1">
          <span
            className="material-symbols-outlined text-[14px] text-[#006c49]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          Locker unlock code generated immediately after order
        </p>
      </div>

      {/* Locker Picker Modal */}
      {showLockerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl animate-fade-in border border-[#eaedff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">Select Smart Locker Pod</h3>
              <button
                onClick={() => setShowLockerModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2.5 mt-3">
              {lockers.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocker(loc.name);
                    setShowLockerModal(false);
                  }}
                  className={`p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                    selectedLocker === loc.name
                      ? 'border-[#ff6b35] bg-[#ffdbd0]/20 shadow-xs'
                      : 'border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131b2e]">{loc.name}</span>
                    <span className="text-xs text-[#594139]">{loc.desc}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#005236]">
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl animate-fade-in border border-[#eaedff]">
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
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex justify-between text-xs">
                <span>CampusCard Balance:</span>
                <span className="font-bold text-[#006c49]">$48.50 Available</span>
              </div>
              <button
                onClick={() => setSplitPayModal(false)}
                className="w-full py-3 rounded-xl bg-[#131b2e] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span> Pay with Apple Pay</span>
              </button>
              <button
                onClick={() => setSplitPayModal(false)}
                className="w-full py-3 rounded-xl bg-[#eaedff] text-[#131b2e] font-bold text-xs"
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
