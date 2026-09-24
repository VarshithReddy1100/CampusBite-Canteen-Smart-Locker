import React, { useState } from 'react';
import { NotificationItem, ScreenType } from '../../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigate: (screen: ScreenType) => void;
  onApplyPromo?: (code: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'orders' | 'promos' | 'campus'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const handleCopyPromo = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const todayList = filteredNotifications.filter((n) => n.timestampGroup === 'today');
  const yesterdayList = filteredNotifications.filter((n) => n.timestampGroup === 'yesterday');
  const earlierList = filteredNotifications.filter((n) => n.timestampGroup === 'earlier');

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-1">
      {/* Top Bar / Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-extrabold text-[#131b2e]">Notifications</h1>
          <span
            className={`font-bold text-xs px-2.5 py-0.5 rounded-full shadow-xs transition-colors ${
              unreadCount > 0
                ? 'bg-[#ab3500] text-white'
                : 'bg-[#eaedff] text-[#594139]'
            }`}
          >
            {unreadCount} New
          </span>
        </div>
        <button
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className={`flex items-center gap-1 text-xs font-bold py-1 px-2.5 rounded-xl transition-all ${
            unreadCount > 0
              ? 'text-[#ab3500] hover:bg-[#ffdbd0]/50 active:scale-95'
              : 'text-[#8d7168] opacity-50 cursor-default'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">done_all</span>
          <span>{unreadCount > 0 ? 'Mark all as read' : 'All caught up'}</span>
        </button>
      </div>

      {/* Filter Pills Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#131b2e] text-white shadow-sm'
              : 'bg-[#f2f3ff] text-[#594139] hover:bg-[#eaedff]'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter('orders')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'orders'
              ? 'bg-[#131b2e] text-white shadow-sm'
              : 'bg-[#f2f3ff] text-[#594139] hover:bg-[#eaedff]'
          }`}
        >
          Orders &amp; Lockers
        </button>
        <button
          onClick={() => setActiveFilter('promos')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'promos'
              ? 'bg-[#131b2e] text-white shadow-sm'
              : 'bg-[#f2f3ff] text-[#594139] hover:bg-[#eaedff]'
          }`}
        >
          Promos
        </button>
        <button
          onClick={() => setActiveFilter('campus')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'campus'
              ? 'bg-[#131b2e] text-white shadow-sm'
              : 'bg-[#f2f3ff] text-[#594139] hover:bg-[#eaedff]'
          }`}
        >
          Campus Alerts
        </button>
      </div>

      {/* Notification Feed */}
      <div className="flex flex-col gap-6 mt-1">
        {/* Group: TODAY */}
        {todayList.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#594139] uppercase tracking-wider">
                Today
              </span>
              <span className="text-[11px] font-bold text-[#006c49] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                Live Sync
              </span>
            </div>

            {todayList.map((notif) => (
              <article
                key={notif.id}
                className="relative bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] transition-all hover:shadow-md"
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-xs text-[#8d7168]">{notif.timeAgo}</span>
                  {notif.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#ff6b35] ring-4 ring-[#ffdbd0]/60"></span>
                  )}
                </div>

                <div className="flex items-start gap-3.5 pr-14">
                  <div
                    className={`w-11 h-11 rounded-2xl ${notif.iconBg} flex items-center justify-center ${notif.iconColor} flex-shrink-0 shadow-xs`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{notif.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${notif.tagClass}`}>
                        {notif.tag}
                      </span>
                    </div>

                    <h2 className="text-sm font-extrabold text-[#131b2e] mt-1 leading-snug">
                      {notif.title}
                    </h2>

                    <p className="text-xs text-[#594139] mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>

                {/* Locker Quick Access Banner */}
                {notif.actionType === 'view-smart-pass' && (
                  <div className="mt-3.5 pt-3 bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between gap-2 border border-[#eaedff]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[#ab3500] shadow-xs">
                        <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-[#594139]">Tap-to-Unlock Ready</span>
                        <span className="text-xs font-bold text-[#131b2e] truncate">
                          POD-B • Heat Deck 2
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('orders')}
                      className="flex-shrink-0 bg-[#ff6b35] hover:bg-[#ab3500] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>View Smart Pass</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                )}

                {/* Timeline Progress Bar */}
                {notif.progressPercent && (
                  <div className="mt-3 pt-2.5 flex items-center gap-2">
                    <div className="flex-1 bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#ff6b35] h-full rounded-full transition-all"
                        style={{ width: `${notif.progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-[#ab3500] font-bold">
                      {notif.footerNote}
                    </span>
                  </div>
                )}

                {/* Promo Code Box */}
                {notif.promoCode && (
                  <div className="mt-3.5 flex items-center justify-between bg-[#f2f3ff] rounded-xl p-2.5 px-3 border border-[#eaedff]">
                    <div className="flex items-center gap-1.5 text-[#131b2e]">
                      <span className="material-symbols-outlined text-[18px] text-[#ab3500]">
                        sell
                      </span>
                      <code className="text-xs font-extrabold tracking-wide">
                        {notif.promoCode}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyPromo(notif.promoCode!)}
                      className="text-xs text-[#ab3500] hover:text-[#832600] font-bold transition-colors"
                    >
                      {copiedCode === notif.promoCode ? (
                        <span className="text-[#006c49] flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Copied!
                        </span>
                      ) : (
                        'Copy Code'
                      )}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Group: YESTERDAY */}
        {yesterdayList.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#594139] uppercase tracking-wider">
                Yesterday
              </span>
            </div>

            {yesterdayList.map((notif) => (
              <article
                key={notif.id}
                className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-[#eaedff] transition-all hover:shadow-md"
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-[#8d7168]">{notif.timeAgo}</span>
                </div>

                <div className="flex items-start gap-3.5 pr-14">
                  <div
                    className={`w-11 h-11 rounded-2xl ${notif.iconBg} flex items-center justify-center ${notif.iconColor} flex-shrink-0 shadow-xs`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{notif.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${notif.tagClass}`}>
                        {notif.tag}
                      </span>
                    </div>

                    <h2 className="text-sm font-extrabold text-[#131b2e] mt-1 leading-snug">
                      {notif.title}
                    </h2>

                    <p className="text-xs text-[#594139] mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#eaedff]/60">
                  <span className="text-xs text-[#006c49] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">eco</span>
                    {notif.footerNote}
                  </span>
                  <button
                    onClick={() => onNavigate('explore')}
                    className="text-xs font-bold text-[#594139] hover:text-[#131b2e] transition-colors flex items-center gap-0.5"
                  >
                    <span>Reorder</span>
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Group: EARLIER THIS WEEK */}
        {earlierList.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#594139] uppercase tracking-wider">
                Earlier This Week
              </span>
            </div>

            {earlierList.map((notif) => (
              <article
                key={notif.id}
                className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-[#eaedff] transition-all hover:shadow-md"
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-[#8d7168]">{notif.timeAgo}</span>
                </div>

                <div className="flex items-start gap-3.5 pr-14">
                  <div
                    className={`w-11 h-11 rounded-2xl ${notif.iconBg} flex items-center justify-center ${notif.iconColor} flex-shrink-0 shadow-xs`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{notif.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${notif.tagClass}`}>
                        {notif.tag}
                      </span>
                    </div>

                    <h2 className="text-sm font-extrabold text-[#131b2e] mt-1 leading-snug">
                      {notif.title}
                    </h2>

                    <p className="text-xs text-[#594139] mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* End of Feed State / Delight Footer */}
      <div className="mt-4 py-8 flex flex-col items-center justify-center text-center px-4 bg-[#f2f3ff]/70 rounded-3xl border border-[#eaedff]">
        <div className="w-12 h-12 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006c49] mb-2 shadow-xs">
          <span className="material-symbols-outlined text-[26px]">task_alt</span>
        </div>
        <h3 className="text-sm font-bold text-[#131b2e]">You're all caught up!</h3>
        <p className="text-xs text-[#594139] mt-1 max-w-xs">
          No earlier notifications. New locker passes and meal milestones will chime here immediately.
        </p>
      </div>
    </div>
  );
};
