import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, CalendarCheck, CheckCircle2, Clock, LogOut,
  Mail, MapPin, ShoppingCart, Trash2, UserRound, XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";
import { getBookings } from "@/lib/booking-store";
import type { Booking } from "@/types/marketplace";

// ── Status styles ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  confirmed:   "bg-green-100 text-green-700 border-green-200",
  pending:     "bg-amber-100 text-amber-700 border-amber-200",
  processing:  "bg-blue-100 text-blue-700 border-blue-200",
  completed:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled:   "bg-red-100 text-red-700 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  confirmed:  <CheckCircle2 size={13} />,
  pending:    <Clock size={13} />,
  processing: <Clock size={13} />,
  completed:  <CheckCircle2 size={13} />,
  cancelled:  <XCircle size={13} />,
};

const CATEGORY_LABELS: Record<string, string> = {
  agritourism:          "Agritourism",
  farm_stay:            "Farm Stay",
  restaurant:           "Restaurant",
  events_festivals:     "Events & Festivals",
  transportation:       "Transportation",
  digital_products:     "Digital Products",
  education:            "Education",
  agriculture_services: "Agriculture Services",
};

// ── BookingRow ────────────────────────────────────────────────────────────────
function BookingRow({ booking }: { booking: Booking }) {
  const style = STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending;
  const icon  = STATUS_ICONS[booking.status]  ?? STATUS_ICONS.pending;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <p className="font-extrabold text-foreground leading-snug">{booking.itemName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {CATEGORY_LABELS[booking.bookingCategory] ?? booking.bookingCategory}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${style}`}>
          {icon} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CalendarCheck size={12} className="text-primary flex-shrink-0" />
          <span>{booking.date}{booking.time ? ` at ${booking.time}` : ""}</span>
        </div>
        {booking.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-primary flex-shrink-0" />
            <span className="truncate">{booking.location}</span>
          </div>
        )}
        {(booking.guests || booking.nights || booking.tickets) && (
          <div className="flex items-center gap-1.5">
            <UserRound size={12} className="text-primary flex-shrink-0" />
            <span>
              {booking.guests   ? `${booking.guests} guest${booking.guests   > 1 ? "s" : ""}` : ""}
              {booking.nights   ? `${booking.nights} night${booking.nights   > 1 ? "s" : ""}` : ""}
              {booking.tickets  ? `${booking.tickets} ticket${booking.tickets > 1 ? "s" : ""}` : ""}
            </span>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p><span className="font-semibold text-foreground">Ref:</span> {booking.bookingRef}</p>
          <p>
            <span className="font-semibold text-foreground">Total:</span>{" "}
            {booking.currency ?? "UGX"} {booking.total.toLocaleString()}
            {" · "}
            <span className={booking.paymentStatus === "paid" ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
              {booking.paymentStatus === "paid" ? "Paid" : "Payment pending"}
            </span>
          </p>
        </div>
        <Link to="/booking">
          <Button size="sm" variant="outline" className="rounded-xl text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Book Again
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllRead, markRead, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState<"bookings" | "notifications">("bookings");

  const bookings: Booking[] = getBookings();
  const newsletter = JSON.parse(localStorage.getItem("agri2rist_newsletter_subscribers") || "[]");
  const subscribed = user ? newsletter.includes(user.email) : false;

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="bg-primary py-12 px-4">
        <div className="container mx-auto">
          <Badge className="mb-3 bg-secondary text-secondary-foreground">Member Access</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
            Welcome, {user?.name}
          </h1>
          <p className="max-w-2xl text-primary-foreground/85 text-base md:text-lg">
            Manage your bookings, view notifications, and access all your Agri2rist Hub activity.
          </p>
          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: "Total Bookings",    value: bookings.length },
              { label: "Unread Notifications", value: unreadCount },
              { label: "Newsletter",         value: subscribed ? "Subscribed" : "Not subscribed" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-center min-w-[100px]">
                <p className="text-xl font-extrabold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick access cards ── */}
      <section className="bg-muted/40 border-b border-border py-6 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title:"Book an Experience", body:"Explore farm stays, restaurants, tours & more.", icon:CalendarCheck, href:"/booking", action:"Browse" },
            { title:"Farm Contacts",      body:"Unlock verified farm emails and phone numbers.", icon:Mail,          href:"/explore",  action:"Find Farms" },
            { title:"Marketplace",        body:"Shop products, equipment, and digital tools.",  icon:ShoppingCart,  href:"/marketplace", action:"Shop Now" },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.body}</p>
                  <Link to={item.href}>
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary text-xs mt-1">{item.action} →</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-10 bg-background px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

          {/* Left — bookings / notifications tabs */}
          <div>
            {/* Tab bar */}
            <div className="flex gap-1 border-b border-border mb-6">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "bookings" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <CalendarCheck size={15} />
                My Bookings
                {bookings.length > 0 && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">{bookings.length}</span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "notifications" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Bell size={15} />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </button>
            </div>

            {/* Bookings tab */}
            {activeTab === "bookings" && (
              <>
                {bookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <CalendarCheck size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">No bookings yet</h3>
                    <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                      Browse our booking services and make your first reservation.
                    </p>
                    <Link to="/booking">
                      <Button className="mt-4 bg-primary text-primary-foreground rounded-xl">Browse Experiences</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map(b => <BookingRow key={b.id} booking={b} />)}
                  </div>
                )}
              </>
            )}

            {/* Notifications tab */}
            {activeTab === "notifications" && (
              <>
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Bell size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">No notifications</h3>
                    <p className="text-muted-foreground text-sm mt-1">Booking confirmations and updates will appear here.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">{notifications.length} notification{notifications.length !== 1 ? "s" : ""}</p>
                      <div className="flex gap-2">
                        {unreadCount > 0 && (
                          <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={markAllRead}>
                            Mark all read
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="rounded-xl text-xs text-rose-600 border-rose-200 hover:bg-rose-50" onClick={clearAll}>
                          <Trash2 size={12} className="mr-1" /> Clear all
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markRead(n.id)}
                          className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${!n.read ? "bg-primary/5 border-primary/20" : "bg-card border-border hover:bg-muted/30"}`}
                        >
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === "booking_confirmed" ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"}`}>
                            <CalendarCheck size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-bold text-sm text-foreground">{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">
                              {new Date(n.createdAt).toLocaleDateString("en-UG", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Right sidebar — account summary */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserRound size={18} />
                </div>
                <div>
                  <p className="font-extrabold text-foreground text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2.5 text-sm">
                <SummaryRow label="Total bookings"      value={String(bookings.length)} />
                <SummaryRow label="Confirmed"           value={String(bookings.filter(b => b.status === "confirmed" || b.status === "completed").length)} />
                <SummaryRow label="Pending payment"     value={String(bookings.filter(b => b.paymentStatus === "pending").length)} />
                <SummaryRow label="Newsletter"          value={subscribed ? "✓ Subscribed" : "Not subscribed"} />
              </div>
              <Button variant="destructive" className="w-full mt-5 rounded-xl" onClick={logout}>
                <LogOut size={15} className="mr-2" /> Sign Out
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-bold text-foreground mb-2">Need help?</p>
              <p className="text-xs text-muted-foreground mb-3">Contact Agri2rist Hub support for booking issues, refunds, or account questions.</p>
              <a href="mailto:support@agri2risthub.com">
                <Button size="sm" variant="outline" className="w-full rounded-xl text-xs">
                  <Mail size={12} className="mr-1.5" /> support@agri2risthub.com
                </Button>
              </a>
            </div>
          </aside>

        </div>
      </section>
    </PageLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}
