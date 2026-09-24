import React, { useState } from 'react';
import { OrderData } from '../../types';

interface OrderTrackingScreenProps {
  order: OrderData;
  onNavigateToExplore: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ order }) => {
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState<string | null>(null);

  const copyOrderCode = () => {
    navigator.clipboard?.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerBluetoothUnlock = () => {
    if (isUnlocking || isUnlocked) return;
    setIsUnlocking(true);

    setTimeout(() => {
      setIsUnlocking(false);
      setIsUnlocked(true);

      setTimeout(() => {
        setIsUnlocked(false);
      }, 5000);
    }, 1400);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-1">
      {/* Top Order Identity & Countdown Badge */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold text-[#131b2e]">
              Order #{order.orderNumber}
            </span>
            <button
              aria-label="Copy order number"
              onClick={copyOrderCode}
              className="flex items-center justify-center p-1 rounded-full hover:bg-[#eaedff] active:scale-95 transition-transform text-[#8d7168]"
            >
              <span className={`material-symbols-outlined text-[18px] ${copied ? 'text-[#006c49]' : ''}`}>
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
          <span className="text-xs text-[#594139]">
            Placed today at {order.placedTime} · Canteen 1
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6cf8bb] text-[#00714d] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c49]"></span>
          </span>
          <span className="text-xs font-bold">~{order.etaMinutes}m left</span>
        </div>
      </div>

      {/* Live Kitchen Status Module */}
      <div className="flex flex-col p-4 rounded-2xl bg-white shadow-sm border border-[#eaedff] gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ab3500] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              skillet
            </span>
            <span className="text-sm font-extrabold text-[#131b2e]">Live Kitchen Status</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#ab3500] font-bold">
            Step 2 of 4
          </span>
        </div>

        {/* Stepper Pipeline */}
        <div className="relative flex flex-col gap-4 pt-1">
          {/* Step 1: Confirmed */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#006c49] flex items-center justify-center text-white flex-shrink-0 z-10 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="absolute left-4 top-8 w-0.5 h-7 bg-[#006c49] z-0"></div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#131b2e]">
                  Order Received &amp; Confirmed
                </span>
                <span className="text-[11px] text-[#594139]">{order.placedTime}</span>
              </div>
              <span className="text-[11px] text-[#594139]">CampusCard balance verified</span>
            </div>
          </div>

          {/* Step 2: In Kitchen (Active) */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#ff6b35] flex items-center justify-center text-white flex-shrink-0 z-10 shadow-md ring-4 ring-[#ffdbd0]/60">
              <span
                className="material-symbols-outlined text-[18px] animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                cooking
              </span>
            </div>
            <div className="absolute left-4 top-8 w-0.5 h-7 bg-[#e2e7ff] z-0"></div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#ab3500]">Sautéing &amp; Packing</span>
                <span className="text-[10px] text-[#ab3500] px-2 py-0.5 rounded-full bg-[#ffdbd0] font-bold">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-[#594139]">Golden Wok Station 3 · Chef Marco</span>
            </div>
          </div>

          {/* Step 3: Pod Transfer */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#8d7168] flex-shrink-0 z-10">
              <span className="material-symbols-outlined text-[18px]">move_to_inbox</span>
            </div>
            <div className="absolute left-4 top-8 w-0.5 h-7 bg-[#eaedff] z-0"></div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <span className="text-xs font-semibold text-[#594139]">
                Dispatch to Locker Pod B
              </span>
              <span className="text-[11px] text-[#8d7168]">Autonomous runner en route</span>
            </div>
          </div>

          {/* Step 4: Ready */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#8d7168] flex-shrink-0 z-10">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </div>
            <div className="flex flex-col min-w-0 pt-0.5">
              <span className="text-xs font-semibold text-[#594139]">
                Ready for Scan &amp; Unlock
              </span>
              <span className="text-[11px] text-[#8d7168]">Compartment #14</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Pickup Pass Card (Focal Hero) */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-[#eaedff] flex flex-col p-5 gap-4">
        {/* Top badge ribbon inside card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b35] animate-pulse"></div>
            <span className="text-[11px] uppercase tracking-wider text-[#594139] font-bold">
              Contactless Smart Pass
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#855300] text-xs font-bold bg-[#ffddb8]/80 px-2.5 py-1 rounded-full">
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              whatshot
            </span>
            <span>Heated Bay</span>
          </div>
        </div>

        {/* Locker ID Highlights */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#594139]">Target Locker</span>
            <span className="text-lg font-extrabold text-[#131b2e]">
              {order.lockerPod} · <span className="text-[#ab3500]">{order.lockerNumber}</span>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-[#594139]">PIN Backup</span>
            <div className="flex items-center gap-1 text-base text-[#131b2e] font-extrabold tracking-widest bg-white px-2.5 py-0.5 rounded-xl shadow-xs border border-[#eaedff]">
              {order.pinBackup.split('').map((digit, i) => (
                <span key={i}>{digit}</span>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Scanner Area */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#eaedff]/40 gap-3 border border-[#eaedff]">
          <div className="p-3 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#eaedff]">
            {/* SVG Vector QR Code with Campus Logo Centerpiece */}
            <svg
              className="w-44 h-44"
              fill="none"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background QR Modules Pattern */}
              <rect fill="#FFFFFF" height="160" rx="8" width="160" />
              {/* Position Marks: Top-Left */}
              <rect fill="#131B2E" height="40" rx="4" width="40" x="12" y="12" />
              <rect fill="#FFFFFF" height="28" rx="2" width="28" x="18" y="18" />
              <rect fill="#AB3500" height="16" rx="2" width="16" x="24" y="24" />
              {/* Position Marks: Top-Right */}
              <rect fill="#131B2E" height="40" rx="4" width="40" x="108" y="12" />
              <rect fill="#FFFFFF" height="28" rx="2" width="28" x="114" y="18" />
              <rect fill="#AB3500" height="16" rx="2" width="16" x="120" y="24" />
              {/* Position Marks: Bottom-Left */}
              <rect fill="#131B2E" height="40" rx="4" width="40" x="12" y="108" />
              <rect fill="#FFFFFF" height="28" rx="2" width="28" x="18" y="114" />
              <rect fill="#AB3500" height="16" rx="2" width="16" x="24" y="120" />
              {/* Data dots & decorative matrix blocks */}
              <rect fill="#131B2E" height="8" rx="1.5" width="8" x="60" y="16" />
              <rect fill="#131B2E" height="8" rx="1.5" width="16" x="72" y="16" />
              <rect fill="#131B2E" height="16" rx="1.5" width="8" x="60" y="28" />
              <rect fill="#AB3500" height="8" rx="1.5" width="8" x="76" y="32" />
              <rect fill="#131B2E" height="8" rx="1.5" width="12" x="88" y="28" />
              <rect fill="#131B2E" height="8" rx="1.5" width="16" x="16" y="60" />
              <rect fill="#131B2E" height="8" rx="1.5" width="8" x="24" y="72" />
              <rect fill="#131B2E" height="16" rx="1.5" width="8" x="16" y="84" />
              <rect fill="#131B2E" height="16" rx="1.5" width="16" x="36" y="64" />
              <rect fill="#131B2E" height="8" rx="1.5" width="8" x="36" y="88" />
              {/* Center Emblem Housing */}
              <rect className="shadow-sm" fill="#FF6B35" height="36" rx="8" width="36" x="62" y="62" />
              <path d="M80 69L92 75.5L80 82L68 75.5L80 69Z" fill="#FFFFFF" />
              <path
                d="M72 79.5V85.5C72 87.7 75.6 89.5 80 89.5C84.4 89.5 88 87.7 88 85.5V79.5"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <circle cx="92" cy="79" fill="#FFFFFF" r="1.5" />
              {/* Data lower sections */}
              <rect fill="#131B2E" height="24" rx="1.5" width="8" x="60" y="108" />
              <rect fill="#131B2E" height="8" rx="1.5" width="16" x="76" y="108" />
              <rect fill="#AB3500" height="20" rx="1.5" width="8" x="80" y="124" />
              <rect fill="#131B2E" height="8" rx="1.5" width="8" x="68" y="136" />
              <rect fill="#131B2E" height="16" rx="1.5" width="8" x="108" y="60" />
              <rect fill="#131B2E" height="8" rx="1.5" width="20" x="124" y="60" />
              <rect fill="#131B2E" height="16" rx="1.5" width="12" x="120" y="76" />
              <rect fill="#131B2E" height="24" rx="1.5" width="8" x="140" y="80" />
              <rect fill="#131B2E" height="8" rx="1.5" width="16" x="108" y="108" />
              <rect fill="#131B2E" height="16" rx="1.5" width="16" x="128" y="112" />
              <rect fill="#131B2E" height="12" rx="1.5" width="8" x="108" y="124" />
              <rect fill="#131B2E" height="8" rx="1.5" width="24" x="120" y="136" />
            </svg>
          </div>
          <p className="text-xs text-[#594139] text-center px-4">
            Hold this code directly up to the optical reader on{' '}
            <span className="font-bold text-[#131b2e]">Locker Pod B</span> upon arrival.
          </p>
        </div>

        {/* Bluetooth One-Tap Unlock CTA */}
        <button
          onClick={triggerBluetoothUnlock}
          disabled={isUnlocking}
          className={`w-full h-12 rounded-full flex items-center justify-center gap-2 text-sm font-bold shadow-md transition-all active:scale-[0.98] ${
            isUnlocked
              ? 'bg-[#006c49] text-white'
              : 'bg-[#ff6b35] hover:bg-[#ab3500] text-white'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isUnlocking ? 'animate-spin' : ''
            }`}
          >
            {isUnlocking
              ? 'sync'
              : isUnlocked
              ? 'lock_open'
              : 'bluetooth_searching'}
          </span>
          <span>
            {isUnlocking
              ? 'Searching for Pod B signal...'
              : isUnlocked
              ? 'Compartment #14 Unlocked!'
              : 'Tap to Unlock via Bluetooth'}
          </span>
        </button>

        {/* Location Wayfinding Guidance */}
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#eaedff]/40 border border-[#eaedff]">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#ab3500] flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">pin_drop</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#131b2e]">Student Union · North Hall</span>
            <span className="text-[11px] text-[#594139]">
              2nd Floor, beside Library Bridge walkway &amp; Lounge
            </span>
          </div>
          <button
            onClick={() => setShowMapModal(true)}
            className="ml-auto text-[#ab3500] text-xs font-bold flex items-center gap-0.5 self-center hover:underline"
          >
            <span>Map</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Collapsible Order Contents Drawer */}
      <div className="rounded-2xl bg-white shadow-sm border border-[#eaedff] overflow-hidden">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f2f3ff] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#594139] text-[20px]">receipt</span>
            <span className="text-sm font-bold text-[#131b2e]">
              Order Items ({order.items.length})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-[#ab3500]">
              ${order.total.toFixed(2)}
            </span>
            <span
              className={`material-symbols-outlined text-[#8d7168] text-[20px] transition-transform duration-200 ${
                accordionOpen ? '' : '-rotate-90'
              }`}
            >
              expand_more
            </span>
          </div>
        </button>

        {accordionOpen && (
          <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#eaedff]/50 pt-2">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-xs text-[#ab3500] font-extrabold">
                    {it.qty}×
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">{it.name}</span>
                    <span className="text-[11px] text-[#594139]">{it.specs}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#131b2e]">
                  ${it.price.toFixed(2)}
                </span>
              </div>
            ))}

            {/* Payment Summary Pill */}
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-[18px]">
                  credit_card
                </span>
                <span className="text-[11px] text-[#594139] font-medium">{order.paidVia}</span>
              </div>
              <span className="text-[10px] text-[#006c49] font-extrabold uppercase tracking-wider bg-[#6cf8bb]/40 px-2 py-0.5 rounded-full">
                PAID
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Help & Canteen Concierge Shortcuts */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => setShowSupportModal('station')}
          className="flex-1 py-3 px-3 rounded-2xl bg-[#f2f3ff] text-[#131b2e] flex items-center justify-center gap-2 hover:bg-[#eaedff] active:scale-98 transition-all text-xs font-bold border border-[#eaedff]"
        >
          <span className="material-symbols-outlined text-[#ab3500] text-[18px]">support_agent</span>
          <span>Call Station 3</span>
        </button>

        <button
          onClick={() => setShowSupportModal('locker')}
          className="flex-1 py-3 px-3 rounded-2xl bg-[#f2f3ff] text-[#131b2e] flex items-center justify-center gap-2 hover:bg-[#eaedff] active:scale-98 transition-all text-xs font-bold border border-[#eaedff]"
        >
          <span className="material-symbols-outlined text-[#855300] text-[18px]">help_outline</span>
          <span>Locker Issue?</span>
        </button>
      </div>

      {/* Campus Map Wayfinding Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl border border-[#eaedff] animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ab3500]">map</span>
                <h3 className="text-base font-bold text-[#131b2e]">Campus Locker Wayfinding</h3>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3">
              <div className="w-full h-48 bg-[#eaedff]/60 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-[#dae2fd]">
                {/* Visual Architectural Floorplan schematic */}
                <div className="absolute inset-4 border-2 border-dashed border-[#8d7168]/40 rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center text-center p-2">
                    <span className="text-xs font-bold text-[#131b2e]">Student Union 2nd Floor</span>
                    <span className="text-[10px] text-[#594139]">Beside Library Bridge Entrance</span>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#ab3500] text-white flex items-center justify-center shadow-lg animate-bounce">
                    <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-white px-2 py-0.5 rounded-full shadow-md text-[#ab3500] mt-1 border border-[#eaedff]">
                    POD B · #14
                  </span>
                </div>
              </div>

              <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs text-[#594139] leading-relaxed">
                Take the central spiral stairs to Level 2. Head toward North Quad walkway. Pod B is
                illuminated in orange with heated bays #12–#18.
              </div>
            </div>

            <button
              onClick={() => setShowMapModal(false)}
              className="w-full py-3 rounded-full bg-[#131b2e] text-white text-xs font-bold"
            >
              Got it, close map
            </button>
          </div>
        </div>
      )}

      {/* Support Dialog */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl border border-[#eaedff] animate-fade-in text-center">
            <div className="w-12 h-12 rounded-full bg-[#ffdbd0] text-[#ab3500] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">
                {showSupportModal === 'station' ? 'support_agent' : 'help_center'}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">
              {showSupportModal === 'station' ? 'Call Golden Wok Bar' : 'Locker Support Assistance'}
            </h3>
            <p className="text-xs text-[#594139] mt-2 leading-relaxed">
              {showSupportModal === 'station'
                ? 'Connecting to Station 3 dispatch desk... Chef Marco will be notified about Order #CB-8492.'
                : `Locker PIN ${order.pinBackup} is active. If compartment fails to release via Bluetooth/QR, enter PIN on keypad or request staff assistance at Counter 1.`}
            </p>
            <button
              onClick={() => setShowSupportModal(null)}
              className="mt-4 w-full py-2.5 rounded-full bg-[#ff6b35] text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
