import React from 'react';
import { Bell, X, Check, Calendar, Award, Briefcase, Bot } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (linkTab?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white dark:bg-[#1E293B] shadow-2xl border-l border-slate-200 dark:border-[#334155] flex flex-col text-left">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-[#334155] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">Placement Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-[#111827] border-b border-slate-100 dark:border-[#334155] flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-[#94A3B8]">{notifications.filter(n => !n.read).length} unread updates</span>
            <button
              onClick={onMarkAllAsRead}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#334155] p-2">
            {notifications.map((notif) => {
              const icon = 
                notif.type === 'drive' ? <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" /> :
                notif.type === 'interview' ? <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" /> :
                notif.type === 'readiness' ? <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> :
                <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />;

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    onSelectNotification(notif.linkTab);
                    onClose();
                  }}
                  className={`p-3 rounded-lg transition-colors cursor-pointer text-xs ${
                    notif.read ? 'bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'bg-blue-50/40 dark:bg-blue-950/40 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-100/60 dark:border-blue-900/40'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] shadow-xs shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-[#F8FAFC] truncate">{notif.title}</span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-[#94A3B8] mt-0.5 leading-relaxed">{notif.message}</p>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{notif.timestamp}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-100 dark:border-[#334155] text-center text-xs text-slate-400 dark:text-slate-500">
            Automated Campus Notification Service
          </div>

        </div>
      </div>
    </div>
  );
};
