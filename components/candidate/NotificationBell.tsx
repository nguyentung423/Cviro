"use client";

import { useState, useEffect } from "react";
import { Bell, X, CheckCircle, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface NotificationData {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  application: {
    id: string;
    job: {
      id: string;
      title: string;
      location: string | null;
      agency: {
        phone: string | null;
        agency_name: string | null;
      };
    };
  };
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = async (notification: NotificationData) => {
    // Mark as read
    if (!notification.read) {
      try {
        await fetch(`/api/notifications/${notification.id}`, {
          method: "PUT",
        });
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        );
      } catch (error) {
        console.error("Mark as read error:", error);
      }
    }

    // Navigate to Zalo if approved
    if (
      notification.type === "application_approved" &&
      notification.application?.job?.agency?.phone
    ) {
      const agencyName =
        notification.application.job.agency.agency_name || "nhà tuyển dụng";
      const confirmed = window.confirm(
        `Bạn sẽ được chuyển đến Zalo để liên hệ với ${agencyName}. Tiếp tục?`
      );

      if (confirmed) {
        const phone = notification.application.job.agency.phone.replace(
          /^0/,
          "84"
        );
        window.open(`https://zalo.me/${phone}`, "_blank");
      }
    }

    setIsOpen(false);
  };

  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const confirmed = window.confirm("Bạn có chắc muốn xóa thông báo này?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        setSwipedId(null);
      }
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (notificationId: string) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;

    if (isLeftSwipe) {
      setSwipedId(notificationId);
    } else if (distance < -10) {
      setSwipedId(null);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Thông báo</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Đang tải...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Chưa có thông báo nào</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="relative overflow-hidden"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd(notification.id)}
                    >
                      {/* Notification Item */}
                      <button
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${
                          !notification.read ? "bg-blue-50" : ""
                        } ${
                          swipedId === notification.id
                            ? "-translate-x-20"
                            : "translate-x-0"
                        }`}
                        style={{ transition: "transform 0.3s ease" }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              notification.type === "application_approved"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            <CheckCircle
                              className={`w-5 h-5 ${
                                notification.type === "application_approved"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDistanceToNow(
                                new Date(notification.created_at),
                                { addSuffix: true, locale: vi }
                              )}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
                          )}
                        </div>
                      </button>

                      {/* Delete Button (revealed on swipe) */}
                      <div className="absolute right-0 top-0 h-full w-20 bg-red-500 flex items-center justify-center">
                        <button
                          onClick={(e) => handleDelete(notification.id, e)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
