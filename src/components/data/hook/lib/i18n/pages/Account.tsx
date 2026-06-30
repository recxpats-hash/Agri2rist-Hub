import { Link } from "react-router-dom";
import { CalendarCheck, Mail, ShoppingCart, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/hooks/use-auth";

const accessItems = [
  {
    title: "Real Bookings",
    body: "Reserve farm stays with guest details, activities, payment status, and booking reference.",
    icon: CalendarCheck,
    href: "/explore",
    action: "Book a Stay",
  },
  {
    title: "Farm Contacts",
    body: "Unlock verified farm emails and phone numbers from farm detail pages.",
    icon: Mail,
    href: "/explore",
    action: "Find Farms",
  },
  {
    title: "Marketplace Shopping",
    body: "Add products, services, equipment rentals, tours, and quote requests to your cart.",
    icon: ShoppingCart,
    href: "/marketplace",
    action: "Shop Marketplace",
  },
];

export default function AccountPage() {
  const { user } = useAuth();
  const bookings = JSON.parse(localStorage.getItem("agri2rist_bookings") || "[]");
  const newsletter = JSON.parse(localStorage.getItem("agri2rist_newsletter_subscribers") || "[]");
  const subscribed = user ? newsletter.includes(user.email) : false;

  return (
    <PageLayout>
      <section className="bg-primary py-12 px-4">
        <div className="container mx-auto">
          <Badge className="mb-3 bg-secondary text-secondary-foreground">Member access</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
            Welcome, {user?.name}
          </h1>
          <p className="max-w-2xl text-primary-foreground/75 text-lg">
            Your account unlocks bookings, direct contact, marketplace shopping, quote requests, and saved reservation details.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-card border border-border rounded-lg p-5">
                  <Icon size={22} className="text-primary mb-3" />
                  <h2 className="font-bold text-foreground mb-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{item.body}</p>
                  <Link to={item.href}>
                    <Button variant="outline" className="w-full border-primary text-primary">
                      {item.action}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <UserRound size={20} className="text-primary" />
              <h2 className="font-bold text-foreground">Account Summary</h2>
            </div>
            <div className="space-y-3 text-sm">
              <SummaryRow label="Email" value={user?.email || ""} />
              <SummaryRow label="Saved bookings" value={bookings.length.toString()} />
              <SummaryRow label="Newsletter" value={subscribed ? "Subscribed" : "Not subscribed"} />
              <SummaryRow label="Access" value="Bookings, contacts, shopping" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
