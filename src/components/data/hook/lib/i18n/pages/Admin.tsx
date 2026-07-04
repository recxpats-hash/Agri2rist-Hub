/**
 * Agri2rist Hub – Admin Dashboard
 * Provides full management overview for marketplace, products, farmers, orders.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, ShoppingCart, TrendingUp, Settings,
  Star, BadgeCheck, AlertTriangle, Download, Upload, RefreshCw,
  Eye, Edit, Trash2, Check, X, Search, Filter, BarChart3,
  Leaf, MapPin, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/layout/PageLayout";
import { MASTER_CATALOG } from "@/data/products";
import { FARMER_PROFILES } from "@/data/farmers";
import { TOP_CATEGORIES } from "@/data/categories";

// ─── Dashboard Stats ────────────────────────────────────────────────────────

const stats = {
  totalProducts: MASTER_CATALOG.length,
  activeProducts: MASTER_CATALOG.filter((p) => p.listingStatus === "active").length,
  featuredProducts: MASTER_CATALOG.filter((p) => p.isFeatured).length,
  totalFarmers: FARMER_PROFILES.length,
  verifiedFarmers: FARMER_PROFILES.filter((f) => f.isVerified).length,
  totalCategories: TOP_CATEGORIES.length,
  organicProducts: MASTER_CATALOG.filter((p) => p.organicStatus === "certified_organic").length,
  exportProducts: MASTER_CATALOG.filter((p) => p.categoryId === "cat-16").length,
};

const recentOrders = JSON.parse(localStorage.getItem("agri2rist_marketplace_orders") || "[]");

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [productSearch, setProductSearch] = useState("");
  const [farmerSearch, setFarmerSearch] = useState("");

  const filteredProducts = MASTER_CATALOG.filter((p) => {
    const q = productSearch.toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.farmName.toLowerCase().includes(q);
  }).slice(0, 50);

  const filteredFarmers = FARMER_PROFILES.filter((f) => {
    const q = farmerSearch.toLowerCase();
    if (!q) return true;
    return f.businessName.toLowerCase().includes(q) || f.ownerName.toLowerCase().includes(q);
  });

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-extrabold text-primary-foreground">Admin Dashboard</h1>
              <p className="text-primary-foreground/70 mt-1">Agri2rist Hub Marketplace Management</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground" size="sm">
                <Download size={14} className="mr-1" /> Export Data
              </Button>
              <Button className="bg-secondary text-secondary-foreground" size="sm">
                <Upload size={14} className="mr-1" /> Bulk Import
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <StatCard label="Total Products" value={stats.totalProducts} icon={Package} color="text-primary" />
            <StatCard label="Active" value={stats.activeProducts} icon={Check} color="text-green-600" />
            <StatCard label="Featured" value={stats.featuredProducts} icon={Star} color="text-secondary" />
            <StatCard label="Organic" value={stats.organicProducts} icon={Leaf} color="text-accent" />
            <StatCard label="Farmers" value={stats.totalFarmers} icon={Users} color="text-primary" />
            <StatCard label="Verified" value={stats.verifiedFarmers} icon={BadgeCheck} color="text-green-600" />
            <StatCard label="Categories" value={stats.totalCategories} icon={LayoutDashboard} color="text-primary" />
            <StatCard label="Export Products" value={stats.exportProducts} icon={TrendingUp} color="text-secondary" />
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap gap-1">
              <TabsTrigger value="overview"><BarChart3 size={14} className="mr-1" /> Overview</TabsTrigger>
              <TabsTrigger value="products"><Package size={14} className="mr-1" /> Products ({stats.totalProducts})</TabsTrigger>
              <TabsTrigger value="farmers"><Users size={14} className="mr-1" /> Farmers ({stats.totalFarmers})</TabsTrigger>
              <TabsTrigger value="categories"><LayoutDashboard size={14} className="mr-1" /> Categories</TabsTrigger>
              <TabsTrigger value="orders"><ShoppingCart size={14} className="mr-1" /> Orders ({recentOrders.length})</TabsTrigger>
            </TabsList>

            {/* ── OVERVIEW ── */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category breakdown */}
                <div className="bg-card border border-border rounded-xl p-5 md:col-span-2">
                  <h3 className="font-extrabold text-foreground mb-4">Products by Category</h3>
                  <div className="space-y-2">
                    {TOP_CATEGORIES.map((cat) => {
                      const count = MASTER_CATALOG.filter((p) => p.categoryId === cat.id).length;
                      const pct = Math.round((count / stats.totalProducts) * 100);
                      return (
                        <div key={cat.id} className="flex items-center gap-3 text-sm">
                          <span className="w-40 text-muted-foreground truncate">{cat.name}</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-right font-semibold text-foreground">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-extrabold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: "View Marketplace", href: "/marketplace", icon: Eye },
                      { label: "Manage Listings", href: "/marketplace", icon: Edit },
                      { label: "Farmer Applications", href: "/get-listed", icon: Users },
                      { label: "View Community", href: "/community", icon: BarChart3 },
                      { label: "Site Analytics", href: "/about", icon: TrendingUp },
                    ].map((action) => (
                      <Link
                        key={action.label}
                        to={action.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-foreground/80 hover:text-primary"
                      >
                        <action.icon size={16} className="text-primary" />
                        {action.label}
                        <ArrowRight size={12} className="ml-auto" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Top rated products */}
                <div className="bg-card border border-border rounded-xl p-5 md:col-span-3">
                  <h3 className="font-extrabold text-foreground mb-4">Top Rated Products</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th className="text-left p-3">Product</th>
                          <th className="text-left p-3">Category</th>
                          <th className="text-left p-3">Farmer</th>
                          <th className="text-left p-3">Price (UGX)</th>
                          <th className="text-left p-3">Rating</th>
                          <th className="text-left p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MASTER_CATALOG
                          .filter((p) => p.isFeatured)
                          .sort((a, b) => b.rating - a.rating)
                          .slice(0, 8)
                          .map((p) => (
                            <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded object-cover" />
                                  <div>
                                    <div className="font-semibold text-foreground line-clamp-1">{p.name}</div>
                                    <div className="text-xs text-muted-foreground font-mono">{p.sku}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-muted-foreground">{TOP_CATEGORIES.find((c) => c.id === p.categoryId)?.name}</td>
                              <td className="p-3 text-muted-foreground">{p.farmName}</td>
                              <td className="p-3 font-semibold text-primary">{p.retailPrice.toLocaleString()}</td>
                              <td className="p-3">
                                <span className="flex items-center gap-1">
                                  <Star size={12} className="fill-secondary text-secondary" />
                                  {p.rating.toFixed(1)}
                                </span>
                              </td>
                              <td className="p-3">
                                <Badge variant={p.listingStatus === "active" ? "default" : "outline"} className="text-xs">
                                  {p.listingStatus}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── PRODUCTS ── */}
            <TabsContent value="products">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by name, SKU or farm..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm"><Filter size={14} className="mr-1" /> Filter</Button>
                <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> Export CSV</Button>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="text-left p-3">Product</th>
                        <th className="text-left p-3 hidden md:table-cell">SKU</th>
                        <th className="text-left p-3 hidden lg:table-cell">Farmer</th>
                        <th className="text-left p-3">Price</th>
                        <th className="text-left p-3 hidden md:table-cell">Grade</th>
                        <th className="text-left p-3 hidden md:table-cell">Stock</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-foreground text-xs line-clamp-1">{p.name}</div>
                                {p.organicStatus === "certified_organic" && (
                                  <span className="text-[10px] text-accent flex items-center gap-0.5"><Leaf size={8} /> Organic</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground font-mono text-xs hidden md:table-cell">{p.sku}</td>
                          <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">
                            <div className="flex items-center gap-1"><MapPin size={10} />{p.farmName}</div>
                          </td>
                          <td className="p-3 font-semibold text-primary text-xs">{p.retailPrice.toLocaleString()}</td>
                          <td className="p-3 hidden md:table-cell">
                            <Badge variant="outline" className="text-[10px]">{p.grade.replace(/_/g, " ")}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground text-xs hidden md:table-cell">{p.stockQty}</td>
                          <td className="p-3">
                            <Badge
                              className={`text-[10px] ${p.listingStatus === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}
                            >
                              {p.listingStatus}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Link to={`/marketplace/product/${p.id}`}>
                                <button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary" title="View">
                                  <Eye size={12} />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-muted/50 text-xs text-muted-foreground">
                  Showing {filteredProducts.length} of {MASTER_CATALOG.length} products
                </div>
              </div>
            </TabsContent>

            {/* ── FARMERS ── */}
            <TabsContent value="farmers">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={farmerSearch} onChange={(e) => setFarmerSearch(e.target.value)} placeholder="Search farmers..." className="pl-8" />
                </div>
                <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> Export</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFarmers.map((farmer) => (
                  <div key={farmer.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <img src={farmer.profileImage ?? "/locale/dairy.webp"} alt={farmer.businessName} className="w-12 h-12 rounded-full object-cover border border-border" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-foreground text-sm truncate">{farmer.businessName}</h4>
                          {farmer.isVerified && <BadgeCheck size={14} className="text-accent flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{farmer.ownerName}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin size={10} />{farmer.district}, {farmer.region}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      <div className="bg-muted rounded p-2">
                        <div className="font-bold text-sm text-foreground">{MASTER_CATALOG.filter((p) => p.farmerId === farmer.id).length}</div>
                        <div className="text-[10px] text-muted-foreground">Products</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="font-bold text-sm text-foreground">{farmer.rating.toFixed(1)}</div>
                        <div className="text-[10px] text-muted-foreground">Rating</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="font-bold text-sm text-foreground capitalize">{farmer.membershipTier}</div>
                        <div className="text-[10px] text-muted-foreground">Tier</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {farmer.certifications.slice(0, 3).map((c) => (
                        <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
                      ))}
                    </div>
                    <Link to={`/marketplace/farmer/${farmer.id}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Eye size={11} className="mr-1" /> View Store
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ── CATEGORIES ── */}
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOP_CATEGORIES.map((cat) => {
                  const count = MASTER_CATALOG.filter((p) => p.categoryId === cat.id).length;
                  return (
                    <div key={cat.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{cat.name}</h4>
                          <p className="text-xs text-muted-foreground">{cat.slug}</p>
                        </div>
                        <span className="ml-auto font-extrabold text-primary text-lg">{count}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => { window.location.href = `/marketplace?category=${cat.id}`; }}
                        >
                          <Eye size={11} className="mr-1" /> View Products
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ── ORDERS ── */}
            <TabsContent value="orders">
              {recentOrders.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No marketplace orders yet.</p>
                  <p className="text-sm mt-1">Orders placed through the marketplace will appear here.</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="text-left p-3">Order</th>
                        <th className="text-left p-3">Amount</th>
                        <th className="text-left p-3">Payment</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.slice(0, 20).map((order: Record<string, unknown>, i: number) => (
                        <tr key={i} className="border-t border-border hover:bg-muted/30">
                          <td className="p-3 font-mono text-xs">{(order.orderRef as string) ?? `ORD-${i + 1}`}</td>
                          <td className="p-3 font-semibold text-primary">UGX {((order.total as number) ?? 0).toLocaleString()}</td>
                          <td className="p-3 text-muted-foreground">{(order.paymentMethod as string) ?? "—"}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">{(order.status as string) ?? "pending"}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {new Date((order.createdAt as string) ?? Date.now()).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Package; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <Icon size={20} className={`mx-auto mb-2 ${color}`} />
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
