import React, { useState } from 'react';
import { STUDENT_PROFILE } from '../../data/mockData';
import { ScreenType } from '../../types';

interface StudentIdScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTopUp: (amount: number) => void;
}

export const StudentIdScreen: React.FC<StudentIdScreenProps> = ({ onNavigate, onTopUp }) => {
  const [balance, setBalance] = useState(STUDENT_PROFILE.campusCardBalance);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(25);
  const [nfcTapped, setNfcTapped] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'history' | 'dietary'>('card');

  const handleSimulateNfc = () => {
    setNfcTapped(true);
    setTimeout(() => {
      setNfcTapped(false);
    }, 2500);
  };

  const handleAddBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
    onTopUp(amount);
    setShowTopUpModal(false);
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-6 pb-28 md:pb-16 max-w-6xl mx-auto pt-2 gap-4">
      {/* Top Title Banner */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#131b2e]">Campus Pass &amp; Wallet</h1>
          <p className="text-xs text-[#594139]">Contactless Dining Pass, Locker Access &amp; CampusCard</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#6cf8bb]/40 text-[#005236] px-3 py-1 rounded-full text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
          <span>NFC Live</span>
        </div>
      </div>

      {/* Tabs (Mobile Only: On Tablet/Desktop both columns are displayed side-by-side) */}
      <div className="flex items-center bg-[#eaedff] p-1 rounded-2xl gap-1 md:hidden">
        <button
          onClick={() => setActiveTab('card')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'card'
              ? 'bg-white text-[#ab3500] shadow-sm'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          Digital Pass
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-white text-[#ab3500] shadow-sm'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab('dietary')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'dietary'
              ? 'bg-white text-[#ab3500] shadow-sm'
              : 'text-[#594139] hover:text-[#131b2e]'
          }`}
        >
          Dietary Profile
        </button>
      </div>

      {/* Responsive Grid Container: 1 col on mobile (tab-controlled), 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Digital Card, Dining Dollars & Eco Points */}
        <div className={`md:col-span-5 flex flex-col gap-4 ${activeTab !== 'card' ? 'hidden md:flex' : 'flex'}`}>
          {/* Digital Student Identity Card */}
          <div
            onClick={handleSimulateNfc}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131b2e] via-[#283044] to-[#ab3500] p-6 text-white shadow-xl cursor-pointer active:scale-[0.99] transition-all border border-white/10 group"
          >
            {/* Holographic Watermark */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[28px] text-[#ff6b35]">school</span>
                <div>
                  <span className="text-xs font-black tracking-wider uppercase block text-white/90">
                    State University
                  </span>
                  <span className="text-[10px] text-white/60 tracking-tight">
                    Official Student Smart ID
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold">
                <span className="material-symbols-outlined text-[14px]">contactless</span>
                <span>Tap to Scan</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt={STUDENT_PROFILE.name}
                  src={STUDENT_PROFILE.photoUrl}
                />
              </div>

              <div className="flex flex-col min-w-0">
                <h2 className="text-lg font-black tracking-tight truncate">
                  {STUDENT_PROFILE.name}
                </h2>
                <span className="text-xs text-white/80 font-mono tracking-wider">
                  ID: {STUDENT_PROFILE.studentId}
                </span>
                <span className="text-[11px] text-white/70 truncate mt-0.5">
                  {STUDENT_PROFILE.major}
                </span>
              </div>
            </div>

            {/* Bottom ID Barcode & Tier */}
            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 uppercase">Meal Plan</span>
                <span className="text-xs font-bold text-[#6ffbbe]">
                  {STUDENT_PROFILE.mealPlanTier}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-white/80">•••• 9204</span>
                <span className="material-symbols-outlined text-[22px] text-white/80">
                  qr_code_scanner
                </span>
              </div>
            </div>

            {/* NFC Tap confirmation animation overlay */}
            {nfcTapped && (
              <div className="absolute inset-0 bg-[#006c49]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-2 animate-fade-in z-20">
                <div className="w-12 h-12 rounded-full bg-white text-[#006c49] flex items-center justify-center shadow-lg animate-bounce">
                  <span className="material-symbols-outlined text-[28px]">check</span>
                </div>
                <span className="text-sm font-bold text-white">NFC Reader Verified</span>
                <span className="text-xs text-white/80">Access granted to Locker Pods</span>
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Dining Dollars */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#594139] font-semibold">Dining Dollars</span>
                <span className="material-symbols-outlined text-[#ab3500] text-[20px]">
                  account_balance_wallet
                </span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-black text-[#131b2e]">
                  ${balance.toFixed(2)}
                </span>
                <button
                  onClick={() => setShowTopUpModal(true)}
                  className="mt-2 w-full py-2 rounded-xl bg-[#ffdbd0] text-[#ab3500] text-xs font-bold hover:bg-[#ff6b35] hover:text-white transition-colors"
                >
                  + Add Funds
                </button>
              </div>
            </div>

            {/* Eco Points */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#594139] font-semibold">Eco-Reward Points</span>
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">eco</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-black text-[#006c49]">
                  {STUDENT_PROFILE.ecoPoints}
                </span>
                <span className="text-[10px] text-[#594139] block mt-0.5">
                  60 pts to free Matcha Latte
                </span>
                <div className="w-full bg-[#eaedff] rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Locker Pass Quick Tile */}
          <div className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#ff6b35]/15 text-[#ab3500] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">meeting_room</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#131b2e]">Active Locker Pass</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#6cf8bb] text-[#00714d] text-[9px] font-bold">
                    Pod B #14
                  </span>
                </div>
                <p className="text-xs text-[#594139] truncate">
                  Heated bay claim code active for ~16 mins
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('orders')}
              className="px-3.5 py-1.5 rounded-full bg-[#ff6b35] text-white text-xs font-bold shadow-xs hover:bg-[#ab3500] transition-colors flex-shrink-0"
            >
              Open Pass
            </button>
          </div>
        </div>

        {/* Right Column: Transactions Activity & Verified Dietary Profile */}
        <div className={`md:col-span-7 flex flex-col gap-4 ${activeTab === 'card' ? 'hidden md:flex' : 'flex'}`}>
          {/* Recent Locker Transactions */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
              <h3 className="text-sm font-extrabold text-[#131b2e]">Recent Locker Transactions</h3>
              <span className="text-[11px] text-[#594139]">Spring Term 2026</span>
            </div>

            <div className="divide-y divide-[#eaedff] overflow-hidden">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ffdbd0] text-[#ab3500] flex items-center justify-center text-xs font-bold">
                    🍜
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Order #CB-8492</p>
                    <p className="text-[11px] text-[#594139]">Golden Wok • Locker Pod B #14</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-[#ab3500]">-$9.67</span>
                  <span className="text-[10px] text-[#006c49] font-semibold">Ready in Locker</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#6ffbbe]/40 text-[#006c49] flex items-center justify-center text-xs font-bold">
                    🥑
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Order #CB-8120</p>
                    <p className="text-[11px] text-[#594139]">Green Sprouts • Locker Pod A #06</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-[#131b2e]">-$6.20</span>
                  <span className="text-[10px] text-[#594139]">Picked up</span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center text-xs font-bold">
                    💳
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">CampusCard Top-Up</p>
                    <p className="text-[11px] text-[#594139]">Parent Account Direct Transfer</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-[#006c49]">+$50.00</span>
                  <span className="text-[10px] text-[#594139]">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Dietary Profile & Allergens */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <h3 className="text-sm font-extrabold text-[#131b2e] pb-1 border-b border-[#eaedff]">
              Verified Campus Dietary Profile
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#006c49]">verified</span>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Halal Certified Kitchens</p>
                    <p className="text-[10px] text-[#594139]">Filter all meals by campus Halal board certification</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/40 px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ab3500]">warning</span>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Peanut &amp; Tree Nut Alert</p>
                    <p className="text-[10px] text-[#594139]">Warn on cross-contamination menus &amp; stalls</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#ab3500] bg-[#ffdbd0] px-2.5 py-0.5 rounded-full">
                  Alert On
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#006c49]">recycling</span>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Zero-Waste Campus Crate</p>
                    <p className="text-[10px] text-[#594139]">Return reusable bins to locker pods for +20 eco points</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/40 px-2.5 py-0.5 rounded-full">
                  Enrolled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#eaedff] animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">Add Dining Dollars</h3>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 flex flex-col gap-4">
              <p className="text-xs text-[#594139]">
                Instantly credit your Student ID card. Eligible for student campus meal discounts.
              </p>

              <div className="grid grid-cols-3 gap-2">
                {[15, 25, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`py-3 rounded-2xl font-bold text-sm border transition-all ${
                      topUpAmount === amt
                        ? 'bg-[#ffdbd0] border-[#ff6b35] text-[#ab3500]'
                        : 'bg-[#f2f3ff] border-transparent text-[#131b2e]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleAddBalance(topUpAmount)}
                className="w-full py-3 rounded-full bg-[#ff6b35] text-white text-xs font-bold shadow-md hover:bg-[#ab3500] transition-colors"
              >
                Confirm +${topUpAmount}.00 Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
