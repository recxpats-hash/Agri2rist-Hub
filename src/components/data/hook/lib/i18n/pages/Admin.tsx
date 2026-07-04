/**
 * Agri2rist Hub – Admin Management Dashboard
 * Full operations center: analytics, catalog, products, farmers, orders, settings.
 */
import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, ShoppingCart, TrendingUp, Settings,
  Star, BadgeCheck, AlertTriangle, Download, Upload, RefreshCw,
  Eye, Edit, Trash2, Check, X, Search, Filter, BarChart3,
  Leaf, MapPin, ArrowRight, Plus, ToggleLeft, ToggleRight,
  Layers, FolderTree, Bell, Shield, Globe, ChevronRight,
  Activity, DollarSign, Box, Truck, Clock, Zap, PieChart,
  CalendarDays, UserCog, Ban, UserCheck, Mail, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/layout/PageLayout";
import { MASTER_CATALOG } from "@/data/products";
import { FARMER_PROFILES } from "@/data/farmers";
import { TOP_CATEGORIES } from "@/data/categories";
import { useCatalog } from "@/lib/catalog-store";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { MarketplaceCategory, MarketplaceProduct } from "@/types/marketplace";
import { cn } from "@/lib/utils";

// ─── SIDEBAR NAV ITEMS ───────────────────────────────────────────────────────

type Section = "dashboard" | "catalog" | "products" | "farmers" | "orders" | "bookings" | "users" | "notifications" | "settings";

const SIDEBAR_ITEMS: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "catalog", label: "Catalog Manager", icon: FolderTree },
  { id: "products", label: "Products", icon: Package },
  { id: "farmers", label: "Farmers", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "users", label: "Users", icon: UserCog },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── COMPUTED STATS ──────────────────────────────────────────────────────────

const recentOrders = JSON.parse(localStorage.getItem("agri2rist_marketplace_orders") || "[]");
const totalRevenue = recentOrders.reduce((s: number, o: Record<string, unknown>) => s + ((o.total as number) ?? 0), 0);

const registeredUsers = JSON.parse(localStorage.getItem("agri2rist_users") || "[]");
const farmStayBookings = JSON.parse(localStorage.getItem("agri2rist_bookings") || "[]");
const restaurantBookings = JSON.parse(localStorage.getItem("agri2rist_restaurant_bookings") || "[]");
const allBookings = [...farmStayBookings, ...restaurantBookings];

const stats = {
  totalProducts: MASTER_CATALOG.length,
  activeProducts: MASTER_CATALOG.filter((p) => p.listingStatus === "active").length,
  draftProducts: MASTER_CATALOG.filter((p) => p.listingStatus === "draft").length,
  featuredProducts: MASTER_CATALOG.filter((p) => p.isFeatured).length,
  trendingProducts: MASTER_CATALOG.filter((p) => p.isTrending).length,
  totalFarmers: FARMER_PROFILES.length,
  verifiedFarmers: FARMER_PROFILES.filter((f) => f.isVerified).length,
  pendingFarmers: FARMER_PROFILES.filter((f) => f.listingStatus === "pending_review").length,
  totalCategories: TOP_CATEGORIES.length,
  organicProducts: MASTER_CATALOG.filter((p) => p.organicStatus === "certified_organic").length,
  totalOrders: recentOrders.length,
  totalRevenue,
  totalUsers: registeredUsers.length,
  adminUsers: registeredUsers.filter((u: Record<string, unknown>) => u.role === "admin").length,
  buyerUsers: registeredUsers.filter((u: Record<string, unknown>) => u.role === "buyer").length,
  totalBookings: allBookings.length,
  pendingBookings: allBookings.filter((b: Record<string, unknown>) => b.status === "pending").length,
  avgRating: MASTER_CATALOG.length ? (MASTER_CATALOG.reduce((s, p) => s + p.rating, 0) / MASTER_CATALOG.length) : 0,
  lowStockProducts: MASTER_CATALOG.filter((p) => p.stockQty <= p.reorderLevel).length,
  outOfStockProducts: MASTER_CATALOG.filter((p) => p.availability === "out_of_stock").length,
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-primary-foreground"
              >
                <LayoutDashboard size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-primary-foreground flex items-center gap-2">
                  <Shield size={24} className="text-secondary" />
                  Admin Command Center
                </h1>
                <p className="text-primary-foreground/70 text-sm mt-0.5">Agri2rist Hub — Full Operations Management</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/marketplace">
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground">
                  <Eye size={14} className="mr-1" /> View Store
                </Button>
              </Link>
              <Link to="/marketplace/catalog">
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground">
                  <FolderTree size={14} className="mr-1" /> Catalog Explorer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body: Sidebar + Content */}
      <div className="bg-muted/30 min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className={cn(
              "flex-shrink-0 transition-all duration-300",
              sidebarOpen ? "w-56" : "w-0 overflow-hidden md:w-14"
            )}>
              <nav className="space-y-1 sticky top-24">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = section === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon size={18} className={isActive ? "text-secondary" : ""} />
                      <span className="hidden md:inline">{item.label}</span>
                      {item.id === "orders" && stats.totalOrders > 0 && (
                        <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground">{stats.totalOrders}</Badge>
                      )}
                      {item.id === "bookings" && stats.pendingBookings > 0 && (
                        <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-orange-500 text-white">{stats.pendingBookings}</Badge>
                      )}
                      {item.id === "users" && stats.totalUsers > 0 && (
                        <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-blue-500 text-white">{stats.totalUsers}</Badge>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {section === "dashboard" && <DashboardOverview />}
              {section === "catalog" && <CatalogManager />}
              {section === "products" && <ProductsManager />}
              {section === "farmers" && <FarmersManager />}
              {section === "orders" && <OrdersManager />}
              {section === "bookings" && <BookingsManager />}
              {section === "users" && <UsersManager />}
              {section === "notifications" && <NotificationsPanel />}
              {section === "settings" && <SettingsPanel />}
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// ─── DASHBOARD OVERVIEW ──────────────────────────────────────────────────────

function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Total Products" value={stats.totalProducts} icon={Package} color="bg-primary/10 text-primary" trend="+12%" />
        <KpiCard label="Active Listings" value={stats.activeProducts} icon={Check} color="bg-green-100 text-green-700" trend="+5%" />
        <KpiCard label="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-100 text-blue-700" trend="" />
        <KpiCard label="Revenue" value={`UGX ${(totalRevenue / 1000000).toFixed(1)}M`} icon={DollarSign} color="bg-secondary/20 text-secondary" trend="+18%" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <MiniKpi label="Categories" value={stats.totalCategories} icon={Layers} />
        <MiniKpi label="Bookings" value={stats.totalBookings} icon={CalendarDays} alert={stats.pendingBookings > 0} />
        <MiniKpi label="Featured" value={stats.featuredProducts} icon={Star} />
        <MiniKpi label="Organic" value={stats.organicProducts} icon={Leaf} />
        <MiniKpi label="Verified" value={stats.verifiedFarmers} icon={BadgeCheck} />
        <MiniKpi label="Low Stock" value={stats.lowStockProducts} icon={AlertTriangle} alert={stats.lowStockProducts > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-xl p-5 lg:col-span-2">
          <h3 className="font-extrabold text-foreground mb-4 flex items-center gap-2">
            <PieChart size={16} className="text-primary" /> Products by Category
          </h3>
          <div className="space-y-2.5">
            {TOP_CATEGORIES.map((cat) => {
              const count = MASTER_CATALOG.filter((p) => p.categoryId === cat.id).length;
              const pct = Math.round((count / stats.totalProducts) * 100);
              return (
                <div key={cat.id} className="flex items-center gap-3 text-sm group">
                  <span className="w-36 text-muted-foreground truncate group-hover:text-foreground transition-colors">{cat.name}</span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary/80 h-3 rounded-full transition-all duration-500 group-hover:bg-primary"
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-foreground text-xs">{count}</span>
                  <span className="w-10 text-right text-muted-foreground text-xs">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-extrabold text-foreground mb-4 flex items-center gap-2">
            <Zap size={16} className="text-secondary" /> Quick Actions
          </h3>
          <div className="space-y-1.5">
            {[
              { label: "Browse Catalog", href: "/marketplace/catalog", icon: FolderTree },
              { label: "Add New Product", href: "/marketplace/catalog/editor", icon: Plus },
              { label: "View Marketplace", href: "/marketplace", icon: Eye },
              { label: "Farmer Applications", href: "/get-listed", icon: Users },
              { label: "Community Panel", href: "/community", icon: Globe },
              { label: "Site Analytics", href: "/about", icon: BarChart3 },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors text-sm text-foreground/80 hover:text-primary group"
              >
                <action.icon size={15} className="text-primary group-hover:scale-110 transition-transform" />
                {action.label}
                <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Alerts */}
          <div className="mt-5 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              <AlertTriangle size={12} /> Alerts
            </h4>
            <div className="space-y-1.5">
              {stats.lowStockProducts > 0 && (
                <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 rounded-lg px-3 py-2">
                  <Box size={12} /> {stats.lowStockProducts} products below reorder level
                </div>
              )}
              {stats.outOfStockProducts > 0 && (
                <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/5 rounded-lg px-3 py-2">
                  <X size={12} /> {stats.outOfStockProducts} products out of stock
                </div>
              )}
              {stats.pendingFarmers > 0 && (
                <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
                  <Clock size={12} /> {stats.pendingFarmers} farmer applications pending
                </div>
              )}
              {stats.lowStockProducts === 0 && stats.outOfStockProducts === 0 && stats.pendingFarmers === 0 && (
                <p className="text-xs text-muted-foreground">No active alerts</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-extrabold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" /> Top Rated Products
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left p-3 rounded-l-lg">Product</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Farmer</th>
                <th className="text-right p-3">Price</th>
                <th className="text-right p-3">Rating</th>
                <th className="text-center p-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {MASTER_CATALOG
                .filter((p) => p.isFeatured)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 10)
                .map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-muted" />
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground text-xs line-clamp-1 truncate max-w-[200px]">{p.name}</div>
                          <div className="text-[10px] text-muted-foreground font-mono">{p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{TOP_CATEGORIES.find((c) => c.id === p.categoryId)?.name}</td>
                    <td className="p-3 text-muted-foreground text-xs">{p.farmName}</td>
                    <td className="p-3 text-right font-bold text-primary text-xs">{p.retailPrice.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <span className="flex items-center gap-1 justify-end">
                        <Star size={11} className="fill-secondary text-secondary" />
                        <span className="font-semibold text-xs">{p.rating.toFixed(1)}</span>
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={p.listingStatus === "active" ? "default" : "outline"} className="text-[10px]">
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
  );
}

// ─── CATALOG MANAGER ─────────────────────────────────────────────────────────

function CatalogManager() {
  const {
    categories, products,
    addCategory, updateCategory, deleteCategory, toggleCategory,
    getTopCategories, getSubcategories, getProductsBySubcategory,
    exportCategories, importCategories, exportProductsCSV, importProducts,
  } = useCatalog();
  const { toast } = useToast();

  const [catSearch, setCatSearch] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [prodFilter, setProdFilter] = useState("");
  const [prodCatFilter, setProdCatFilter] = useState("");
  const [editingCat, setEditingCat] = useState<MarketplaceCategory | null>(null);
  const [editingSub, setEditingSub] = useState<MarketplaceCategory | null>(null);
  const [showAddCat, setShowAddCat] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const topCats = getTopCategories();
  const filteredSubs = subFilter
    ? getSubcategories(subFilter)
    : categories.filter((c) => c.parentId);
  const filteredProds = products.filter((p) => {
    if (prodCatFilter && prodCatFilter !== "__all__" && p.categoryId !== prodCatFilter) return false;
    if (prodFilter) {
      const q = prodFilter.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  }).slice(0, 100);
  const searchedCats = catSearch
    ? topCats.filter((c) => c.name.toLowerCase().includes(catSearch.toLowerCase()))
    : topCats;

  const handleExportCats = () => {
    const data = exportCategories();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "categories.json"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Categories exported" });
  };

  const handleExportProductsCSV = () => {
    const data = exportProductsCSV();
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "products.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Products CSV exported" });
  };

  const handleImport = () => {
    try {
      const cats = JSON.parse(importText) as MarketplaceCategory[];
      if (Array.isArray(cats)) {
        importCategories(cats);
        toast({ title: "Imported", description: `${cats.length} categories loaded.` });
        setShowImport(false); setImportText("");
      }
    } catch { toast({ title: "Import failed", description: "Invalid JSON.", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap bg-card border border-border rounded-xl p-4">
        <Button variant="outline" size="sm" onClick={handleExportCats}><Download size={14} className="mr-1" /> Export Categories</Button>
        <Button variant="outline" size="sm" onClick={handleExportProductsCSV}><Download size={14} className="mr-1" /> Export Products CSV</Button>
        <Dialog open={showImport} onOpenChange={setShowImport}>
          <DialogTrigger asChild><Button variant="outline" size="sm"><Upload size={14} className="mr-1" /> Import JSON</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Import Categories (JSON)</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste JSON array..." className="min-h-[120px] font-mono text-xs" />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleImport}>Import</Button>
                <span className="text-xs text-muted-foreground">or</span>
                <input ref={fileRef} type="file" accept=".json" onChange={(e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => { try { const c = JSON.parse(ev.target?.result as string); if (Array.isArray(c)) { importCategories(c); toast({ title: "File imported" }); } } catch { toast({ title: "Invalid file", variant: "destructive" }); } };
                  reader.readAsText(file);
                }} className="text-xs" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Link to="/marketplace/catalog" className="ml-auto">
          <Button variant="ghost" size="sm" className="text-xs"><Eye size={12} className="mr-1" /> Preview Explorer</Button>
        </Link>
      </div>

      {/* Master Categories */}
      <SectionHeader
        title={`Master Categories (${topCats.length})`}
        icon={Layers}
        searchValue={catSearch}
        onSearchChange={setCatSearch}
        searchPlaceholder="Search categories..."
        actionLabel="Add Category"
        onAction={() => setShowAddCat(true)}
      />
      <DataTable
        columns={["Name", "Slug", "Subcategories", "Active", "Actions"]}
        rows={searchedCats.map((cat) => ({
          key: cat.id,
          cells: [
            <span className="font-medium text-foreground">{cat.name}</span>,
            <span className="text-xs text-muted-foreground font-mono hidden md:table-cell">{cat.slug}</span>,
            <span className="text-muted-foreground hidden md:table-cell">{getSubcategories(cat.id).length}</span>,
            <button onClick={() => toggleCategory(cat.id)} className="text-primary hover:text-primary/80">
              {cat.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} className="text-muted-foreground" />}
            </button>,
            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <button onClick={() => setEditingCat(cat)} className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary" title="Edit"><Edit size={12} /></button>
                </DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
                  <CategoryForm initial={editingCat} onSave={(d) => { if (editingCat) { updateCategory(editingCat.id, d); toast({ title: "Updated" }); } setEditingCat(null); }} onCancel={() => setEditingCat(null)} />
                </DialogContent>
              </Dialog>
              <button onClick={() => { deleteCategory(cat.id); toast({ title: "Deleted", description: cat.name }); }} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive" title="Delete"><Trash2 size={12} /></button>
            </div>,
          ],
        }))}
      />
      <Dialog open={showAddCat} onOpenChange={setShowAddCat}>
        <DialogContent><DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <CategoryForm onSave={(d) => { addCategory(d); setShowAddCat(false); toast({ title: "Category added", description: d.name }); }} onCancel={() => setShowAddCat(false)} />
        </DialogContent>
      </Dialog>

      {/* Subcategories */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2"><FolderTree size={16} /> Subcategories ({filteredSubs.length})</h3>
        <div className="ml-auto flex items-center gap-2">
          <Select value={subFilter} onValueChange={setSubFilter}>
            <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="Filter parent..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Parents</SelectItem>
              {topCats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button size="sm" className="text-xs" onClick={() => setShowAddSub(true)}><Plus size={12} className="mr-1" /> Add</Button>
        </div>
      </div>
      <DataTable
        columns={["Name", "Parent", "Products", "Active", "Actions"]}
        rows={filteredSubs.map((sub) => {
          const parent = categories.find((c) => c.id === sub.parentId);
          return {
            key: sub.id,
            cells: [
              <span className="font-medium text-foreground">{sub.name}</span>,
              <span className="text-xs text-muted-foreground hidden md:table-cell">{parent?.name ?? "—"}</span>,
              <span className="text-muted-foreground hidden md:table-cell">{getProductsBySubcategory(sub.id).length}</span>,
              <button onClick={() => toggleCategory(sub.id)} className="text-primary hover:text-primary/80">
                {sub.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} className="text-muted-foreground" />}
              </button>,
              <div className="flex items-center gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <button onClick={() => setEditingSub(sub)} className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary"><Edit size={12} /></button>
                  </DialogTrigger>
                  <DialogContent><DialogHeader><DialogTitle>Edit Subcategory</DialogTitle></DialogHeader>
                    <SubcategoryForm topCategories={topCats} initial={editingSub} onSave={(d) => { if (editingSub) { updateCategory(editingSub.id, d); toast({ title: "Updated" }); } setEditingSub(null); }} onCancel={() => setEditingSub(null)} />
                  </DialogContent>
                </Dialog>
                <button onClick={() => { deleteCategory(sub.id); toast({ title: "Deleted", description: sub.name }); }} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
              </div>,
            ],
          };
        })}
      />
      <Dialog open={showAddSub} onOpenChange={setShowAddSub}>
        <DialogContent><DialogHeader><DialogTitle>Add Subcategory</DialogTitle></DialogHeader>
          <SubcategoryForm topCategories={topCats} onSave={(d) => { addCategory(d); setShowAddSub(false); toast({ title: "Added", description: d.name }); }} onCancel={() => setShowAddSub(false)} />
        </DialogContent>
      </Dialog>

      {/* Products in Catalog */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2"><Package size={16} /> Products ({filteredProds.length})</h3>
        <div className="ml-auto flex items-center gap-2">
          <Select value={prodCatFilter} onValueChange={setProdCatFilter}>
            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="All cats" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All</SelectItem>
              {topCats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input value={prodFilter} onChange={(e) => setProdFilter(e.target.value)} placeholder="Search..." className="w-36 h-8 text-xs" />
          <Link to="/marketplace/catalog/editor"><Button size="sm" className="text-xs"><Plus size={12} className="mr-1" /> New</Button></Link>
        </div>
      </div>
      <DataTable
        columns={["Product", "Category", "Price", "Stock", "Status", "Actions"]}
        rows={filteredProds.map((p) => {
          const cat = categories.find((c) => c.id === p.categoryId);
          return {
            key: p.id,
            cells: [
              <div><div className="font-medium text-foreground text-xs line-clamp-1">{p.name}</div><div className="text-[10px] text-muted-foreground font-mono">{p.sku}</div></div>,
              <span className="text-xs text-muted-foreground hidden md:table-cell">{cat?.name ?? "—"}</span>,
              <span className="font-semibold text-primary text-xs">{p.retailPrice.toLocaleString()}</span>,
              <span className={cn("text-xs hidden md:table-cell", p.stockQty <= p.reorderLevel ? "text-orange-600 font-semibold" : "text-muted-foreground")}>{p.stockQty}</span>,
              <Badge className={`text-[10px] ${p.listingStatus === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{p.listingStatus}</Badge>,
              <div className="flex items-center gap-1">
                <Link to={`/marketplace/catalog/editor/${p.id}`}><button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary"><Edit size={12} /></button></Link>
                <button onClick={() => { /* delete handled via store */ }} className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
              </div>,
            ],
          };
        })}
      />
    </div>
  );
}

// ─── PRODUCTS MANAGER ────────────────────────────────────────────────────────

function ProductsManager() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filtered = MASTER_CATALOG.filter((p) => {
    const q = search.toLowerCase();
    if (q && !(p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.farmName.toLowerCase().includes(q))) return false;
    if (statusFilter && statusFilter !== "__all__" && p.listingStatus !== statusFilter) return false;
    return true;
  }).slice(0, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap bg-card border border-border rounded-xl p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, SKU, farm..." className="pl-8 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-xs"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_review">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> Export</Button>
        <Link to="/marketplace/catalog/editor"><Button size="sm"><Plus size={14} className="mr-1" /> New Product</Button></Link>
      </div>

      <DataTable
        columns={["Product", "SKU", "Farmer", "Price", "Grade", "Stock", "Status", "Actions"]}
        rows={filtered.map((p) => ({
          key: p.id,
          cells: [
            <div className="flex items-center gap-2">
              <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-muted" />
              <div className="min-w-0"><div className="font-semibold text-foreground text-xs line-clamp-1">{p.name}</div>
                {p.organicStatus === "certified_organic" && <span className="text-[10px] text-green-600 flex items-center gap-0.5"><Leaf size={8} /> Organic</span>}
              </div>
            </div>,
            <span className="text-xs text-muted-foreground font-mono hidden md:table-cell">{p.sku}</span>,
            <span className="text-xs text-muted-foreground hidden lg:table-cell"><MapPin size={10} className="inline mr-0.5" />{p.farmName}</span>,
            <span className="font-bold text-primary text-xs">{p.retailPrice.toLocaleString()}</span>,
            <Badge variant="outline" className="text-[10px] hidden md:table-cell">{p.grade.replace(/_/g, " ")}</Badge>,
            <span className={cn("text-xs hidden md:table-cell", p.stockQty <= p.reorderLevel ? "text-orange-600 font-bold" : "text-muted-foreground")}>{p.stockQty}</span>,
            <Badge className={`text-[10px] ${p.listingStatus === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{p.listingStatus}</Badge>,
            <div className="flex items-center gap-1">
              <Link to={`/marketplace/product/${p.id}`}><button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary" title="View"><Eye size={12} /></button></Link>
              <Link to={`/marketplace/catalog/editor/${p.id}`}><button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary" title="Edit"><Edit size={12} /></button></Link>
            </div>,
          ],
        }))}
      />
      <p className="text-xs text-muted-foreground">Showing {filtered.length} of {MASTER_CATALOG.length} products</p>
    </div>
  );
}

// ─── FARMERS MANAGER ─────────────────────────────────────────────────────────

function FarmersManager() {
  const [search, setSearch] = useState("");
  const filtered = FARMER_PROFILES.filter((f) => {
    const q = search.toLowerCase();
    return !q || f.businessName.toLowerCase().includes(q) || f.ownerName.toLowerCase().includes(q) || f.district.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search farmers by name, owner, district..." className="pl-8 h-9" />
        </div>
        <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> Export</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((farmer) => {
          const prodCount = MASTER_CATALOG.filter((p) => p.farmerId === farmer.id).length;
          return (
            <div key={farmer.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <img src={farmer.profileImage ?? "/locale/dairy.webp"} alt={farmer.businessName} className="w-12 h-12 rounded-full object-cover border-2 border-border flex-shrink-0" />
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
                <div className="bg-muted rounded-lg p-2"><div className="font-bold text-sm">{prodCount}</div><div className="text-[10px] text-muted-foreground">Products</div></div>
                <div className="bg-muted rounded-lg p-2"><div className="font-bold text-sm">{farmer.rating.toFixed(1)}</div><div className="text-[10px] text-muted-foreground">Rating</div></div>
                <div className="bg-muted rounded-lg p-2"><div className="font-bold text-sm capitalize">{farmer.membershipTier}</div><div className="text-[10px] text-muted-foreground">Tier</div></div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {farmer.certifications.slice(0, 3).map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
              </div>
              <div className="flex gap-2">
                <Link to={`/marketplace/farmer/${farmer.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full text-xs"><Eye size={11} className="mr-1" /> View</Button></Link>
                <Button variant="outline" size="sm" className="text-xs"><Edit size={11} className="mr-1" /> Manage</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ORDERS MANAGER ──────────────────────────────────────────────────────────

function OrdersManager() {
  const orders = JSON.parse(localStorage.getItem("agri2rist_marketplace_orders") || "[]") as Record<string, unknown>[];

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-card border border-border rounded-xl">
        <ShoppingCart size={48} className="mx-auto mb-4 text-muted-foreground/20" />
        <p className="text-lg font-semibold text-foreground mb-1">No orders yet</p>
        <p className="text-sm text-muted-foreground">Marketplace orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Total Orders" value={orders.length} icon={ShoppingCart} color="bg-primary/10 text-primary" />
        <KpiCard label="Revenue" value={`UGX ${(orders.reduce((s, o) => s + ((o.total as number) ?? 0), 0) / 1000000).toFixed(1)}M`} icon={DollarSign} color="bg-green-100 text-green-700" />
        <KpiCard label="Pending" value={orders.filter((o) => (o.status as string) === "pending").length} icon={Clock} color="bg-orange-100 text-orange-700" />
        <KpiCard label="Avg Order" value={`UGX ${orders.length ? Math.round(orders.reduce((s, o) => s + ((o.total as number) ?? 0), 0) / orders.length).toLocaleString() : 0}`} icon={Activity} color="bg-blue-100 text-blue-700" />
      </div>
      <DataTable
        columns={["Order Ref", "Total", "Payment", "Status", "Date"]}
        rows={orders.slice(0, 30).map((order, i) => ({
          key: String(i),
          cells: [
            <span className="font-mono text-xs">{(order.orderRef as string) ?? `ORD-${i + 1}`}</span>,
            <span className="font-bold text-primary text-xs">UGX {((order.total as number) ?? 0).toLocaleString()}</span>,
            <span className="text-xs text-muted-foreground">{(order.paymentMethod as string) ?? "—"}</span>,
            <Badge variant="outline" className="text-[10px]">{(order.status as string) ?? "pending"}</Badge>,
            <span className="text-xs text-muted-foreground">{new Date((order.createdAt as string) ?? Date.now()).toLocaleDateString()}</span>,
          ],
        }))}
      />
    </div>
  );
}

// ─── NOTIFICATIONS PANEL ─────────────────────────────────────────────────────

function NotificationsPanel() {
  const notifications = useMemo(() => {
    const items: { id: string; type: string; message: string; time: string }[] = [];
    if (stats.lowStockProducts > 0) items.push({ id: "1", type: "warning", message: `${stats.lowStockProducts} products below reorder level`, time: "Just now" });
    if (stats.outOfStockProducts > 0) items.push({ id: "2", type: "error", message: `${stats.outOfStockProducts} products are out of stock`, time: "Just now" });
    if (stats.pendingFarmers > 0) items.push({ id: "3", type: "info", message: `${stats.pendingFarmers} farmer applications awaiting review`, time: "Today" });
    items.push({ id: "4", type: "success", message: `${stats.activeProducts} products actively listed`, time: "Ongoing" });
    items.push({ id: "5", type: "info", message: `${stats.verifiedFarmers} verified farmers on platform`, time: "Ongoing" });
    return items;
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2"><Bell size={18} /> Notifications</h3>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={cn(
            "flex items-center gap-3 p-4 rounded-xl border transition-colors",
            n.type === "warning" && "bg-orange-50 border-orange-200 text-orange-800",
            n.type === "error" && "bg-destructive/5 border-destructive/20 text-destructive",
            n.type === "info" && "bg-blue-50 border-blue-200 text-blue-800",
            n.type === "success" && "bg-green-50 border-green-200 text-green-800",
          )}>
            {n.type === "warning" && <AlertTriangle size={16} />}
            {n.type === "error" && <X size={16} />}
            {n.type === "info" && <Bell size={16} />}
            {n.type === "success" && <Check size={16} />}
            <span className="flex-1 text-sm font-medium">{n.message}</span>
            <span className="text-xs opacity-60">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL ──────────────────────────────────────────────────────────

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2"><Settings size={18} /> Platform Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-foreground text-sm">Marketplace</h4>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Enable marketplace</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Allow self-registration</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Require admin approval</span><Switch /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Service fee (%)</span><Input defaultValue="2.5" className="w-20 h-8 text-xs text-right" /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-foreground text-sm">Notifications</h4>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Email on new order</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Email on new farmer</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Low stock alerts</span><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Weekly digest</span><Switch /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-foreground text-sm">Data Management</h4>
          <Button variant="outline" size="sm" className="w-full" onClick={() => { localStorage.removeItem("a2r_catalog_categories"); localStorage.removeItem("a2r_catalog_products"); window.location.reload(); }}>
            <RefreshCw size={14} className="mr-1" /> Reset Catalog to Defaults
          </Button>
          <Button variant="outline" size="sm" className="w-full" onClick={() => { localStorage.removeItem("agri2rist_marketplace_orders"); window.location.reload(); }}>
            <Trash2 size={14} className="mr-1" /> Clear All Orders
          </Button>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-foreground text-sm">System Info</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Version: 1.0.0</p>
            <p>Products: {stats.totalProducts}</p>
            <p>Categories: {stats.totalCategories}</p>
            <p>Farmers: {stats.totalFarmers}</p>
            <p>Storage: localStorage</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── USERS MANAGER ────────────────────────────────────────────────────────────

function UsersManager() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState<Record<string, unknown>[]>(() =>
    JSON.parse(localStorage.getItem("agri2rist_users") || "[]")
  );
  const { toast } = useToast();

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const name = (u.name as string) ?? "";
    const email = (u.email as string) ?? "";
    if (q && !name.toLowerCase().includes(q) && !email.toLowerCase().includes(q)) return false;
    if (roleFilter && roleFilter !== "__all__" && u.role !== roleFilter) return false;
    return true;
  });

  const refreshUsers = () => {
    const fresh = JSON.parse(localStorage.getItem("agri2rist_users") || "[]");
    setUsers(fresh);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem("agri2rist_users", JSON.stringify(updated));
    setUsers(updated);
    toast({ title: "Role updated", description: `User role changed to ${newRole}` });
  };

  const handleSuspendToggle = (userId: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, suspended: !u.suspended } : u
    );
    localStorage.setItem("agri2rist_users", JSON.stringify(updated));
    setUsers(updated);
    const user = updated.find((u) => u.id === userId);
    toast({ title: user?.suspended ? "User suspended" : "User reactivated" });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user?.role === "admin") {
      toast({ title: "Cannot delete admin", variant: "destructive" });
      return;
    }
    const updated = users.filter((u) => u.id !== userId);
    localStorage.setItem("agri2rist_users", JSON.stringify(updated));
    setUsers(updated);
    toast({ title: "User removed" });
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Total Users" value={users.length} icon={Users} color="bg-primary/10 text-primary" />
        <KpiCard label="Admins" value={users.filter((u) => u.role === "admin").length} icon={Shield} color="bg-purple-100 text-purple-700" />
        <KpiCard label="Buyers" value={users.filter((u) => u.role === "buyer").length} icon={ShoppingCart} color="bg-blue-100 text-blue-700" />
        <KpiCard label="Suspended" value={users.filter((u) => u.suspended).length} icon={Ban} color="bg-red-100 text-red-700" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap bg-card border border-border rounded-xl p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="pl-8 h-9" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-36 h-9 text-xs"><SelectValue placeholder="All roles" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="farmer">Farmer</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={refreshUsers}><RefreshCw size={14} className="mr-1" /> Refresh</Button>
      </div>

      {/* Users Table */}
      <DataTable
        columns={["User", "Email", "Role", "Tier", "Joined", "Status", "Actions"]}
        rows={filtered.map((u) => ({
          key: u.id as string,
          cells: [
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {((u.name as string) ?? "?").charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-foreground text-xs">{u.name as string}</span>
            </div>,
            <span className="text-xs text-muted-foreground font-mono">{u.email as string}</span>,
            <Select value={(u.role as string) ?? "buyer"} onValueChange={(v) => handleRoleChange(u.id as string, v)}>
              <SelectTrigger className="w-24 h-7 text-[10px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
              </SelectContent>
            </Select>,
            <Badge variant="outline" className="text-[10px] capitalize">{(u.membershipTier as string) ?? "free"}</Badge>,
            <span className="text-xs text-muted-foreground">{u.joinedAt ? new Date(u.joinedAt as string).toLocaleDateString() : "—"}</span>,
            u.suspended
              ? <Badge className="text-[10px] bg-red-100 text-red-800">Suspended</Badge>
              : <Badge className="text-[10px] bg-green-100 text-green-800">Active</Badge>,
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSuspendToggle(u.id as string)}
                className={cn("w-7 h-7 rounded flex items-center justify-center text-xs", u.suspended ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-orange-50 text-orange-700 hover:bg-orange-100")}
                title={u.suspended ? "Reactivate" : "Suspend"}
              >
                {u.suspended ? <UserCheck size={12} /> : <Ban size={12} />}
              </button>
              <button
                onClick={() => handleDeleteUser(u.id as string)}
                className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"
                title="Delete user"
              >
                <Trash2 size={12} />
              </button>
            </div>,
          ],
        }))}
      />
      <p className="text-xs text-muted-foreground">Showing {filtered.length} of {users.length} registered users</p>
    </div>
  );
}

// ─── BOOKINGS MANAGER ─────────────────────────────────────────────────────────

function BookingsManager() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Record<string, unknown>[]>(() => {
    const farm = JSON.parse(localStorage.getItem("agri2rist_bookings") || "[]") as Record<string, unknown>[];
    const rest = JSON.parse(localStorage.getItem("agri2rist_restaurant_bookings") || "[]") as Record<string, unknown>[];
    return [
      ...farm.map((b) => ({ ...b, _type: "farm_stay" })),
      ...rest.map((b) => ({ ...b, _type: "restaurant" })),
    ];
  });

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const name = (b.name as string) ?? (b.guestName as string) ?? "";
    const email = (b.email as string) ?? "";
    if (q && !name.toLowerCase().includes(q) && !email.toLowerCase().includes(q)) return false;
    if (statusFilter && statusFilter !== "__all__" && b.status !== statusFilter) return false;
    if (typeFilter && typeFilter !== "__all__" && b._type !== typeFilter) return false;
    return true;
  });

  const updateBookingStatus = (idx: number, newStatus: string, sourceType: string) => {
    const updated = [...bookings];
    updated[idx] = { ...updated[idx], status: newStatus };
    setBookings(updated);

    // Persist back to correct localStorage key
    if (sourceType === "farm_stay") {
      const farmBookings = updated.filter((b) => b._type === "farm_stay").map(({ _type, ...rest }) => rest);
      localStorage.setItem("agri2rist_bookings", JSON.stringify(farmBookings));
    } else {
      const restBookings = updated.filter((b) => b._type === "restaurant").map(({ _type, ...rest }) => rest);
      localStorage.setItem("agri2rist_restaurant_bookings", JSON.stringify(restBookings));
    }
    toast({ title: `Booking ${newStatus}` });
  };

  const deleteBooking = (idx: number, sourceType: string) => {
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    if (sourceType === "farm_stay") {
      const farmBookings = updated.filter((b) => b._type === "farm_stay").map(({ _type, ...rest }) => rest);
      localStorage.setItem("agri2rist_bookings", JSON.stringify(farmBookings));
    } else {
      const restBookings = updated.filter((b) => b._type === "restaurant").map(({ _type, ...rest }) => rest);
      localStorage.setItem("agri2rist_restaurant_bookings", JSON.stringify(restBookings));
    }
    toast({ title: "Booking deleted" });
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Total Bookings" value={bookings.length} icon={CalendarDays} color="bg-primary/10 text-primary" />
        <KpiCard label="Pending" value={bookings.filter((b) => b.status === "pending").length} icon={Clock} color="bg-orange-100 text-orange-700" />
        <KpiCard label="Confirmed" value={bookings.filter((b) => b.status === "confirmed").length} icon={Check} color="bg-green-100 text-green-700" />
        <KpiCard label="Farm Stays" value={bookings.filter((b) => b._type === "farm_stay").length} icon={MapPin} color="bg-blue-100 text-blue-700" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap bg-card border border-border rounded-xl p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest name or email..." className="pl-8 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-xs"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36 h-9 text-xs"><SelectValue placeholder="All types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Types</SelectItem>
            <SelectItem value="farm_stay">Farm Stay</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <CalendarDays size={48} className="mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-lg font-semibold text-foreground mb-1">No bookings yet</p>
          <p className="text-sm text-muted-foreground">Farm stay and restaurant bookings will appear here.</p>
        </div>
      ) : (
        <>
          <DataTable
            columns={["Guest", "Type", "Date", "Guests", "Status", "Actions"]}
            rows={filtered.map((b, idx) => {
              const realIdx = bookings.indexOf(b);
              const guestName = (b.name as string) ?? (b.guestName as string) ?? "Unknown";
              const guestEmail = (b.email as string) ?? "";
              const date = (b.date as string) ?? (b.checkIn as string) ?? "—";
              const guests = (b.guests as number) ?? (b.partySize as number) ?? 1;
              const status = (b.status as string) ?? "pending";
              return {
                key: `${realIdx}`,
                cells: [
                  <div>
                    <div className="font-medium text-foreground text-xs">{guestName}</div>
                    {guestEmail && <div className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Mail size={8} />{guestEmail}</div>}
                  </div>,
                  <Badge variant="outline" className={cn("text-[10px]", b._type === "farm_stay" ? "border-blue-300 text-blue-700" : "border-purple-300 text-purple-700")}>
                    {b._type === "farm_stay" ? "Farm Stay" : "Restaurant"}
                  </Badge>,
                  <span className="text-xs text-muted-foreground">{date}</span>,
                  <span className="text-xs font-semibold text-foreground">{guests}</span>,
                  <Badge className={cn("text-[10px]",
                    status === "confirmed" && "bg-green-100 text-green-800",
                    status === "pending" && "bg-orange-100 text-orange-800",
                    status === "cancelled" && "bg-red-100 text-red-800",
                    status === "completed" && "bg-blue-100 text-blue-800",
                    !['confirmed','pending','cancelled','completed'].includes(status) && "bg-muted text-muted-foreground",
                  )}>{status}</Badge>,
                  <div className="flex items-center gap-1">
                    {status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(realIdx, "confirmed", b._type as string)}
                          className="w-7 h-7 rounded bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center"
                          title="Confirm"
                        ><Check size={12} /></button>
                        <button
                          onClick={() => updateBookingStatus(realIdx, "cancelled", b._type as string)}
                          className="w-7 h-7 rounded bg-red-50 text-red-700 hover:bg-red-100 flex items-center justify-center"
                          title="Reject"
                        ><X size={12} /></button>
                      </>
                    )}
                    <button
                      onClick={() => deleteBooking(realIdx, b._type as string)}
                      className="w-7 h-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"
                      title="Delete"
                    ><Trash2 size={12} /></button>
                  </div>,
                ],
              };
            })}
          />
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {bookings.length} bookings</p>
        </>
      )}
    </div>
  );
}

// ─── SHARED UI COMPONENTS ────────────────────────────────────────────────────

function KpiCard({ label, value, icon: Icon, color, trend }: { label: string; value: string | number; icon: typeof Package; color: string; trend?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0", color)}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-extrabold text-foreground leading-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
      {trend && <span className="ml-auto text-xs font-semibold text-green-600 flex-shrink-0">{trend}</span>}
    </div>
  );
}

function MiniKpi({ label, value, icon: Icon, alert }: { label: string; value: string | number; icon: typeof Package; alert?: boolean }) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-3 text-center", alert && "border-orange-300 bg-orange-50")}>
      <Icon size={14} className={cn("mx-auto mb-1", alert ? "text-orange-600" : "text-muted-foreground")} />
      <div className="text-lg font-extrabold text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon, searchValue, onSearchChange, searchPlaceholder, actionLabel, onAction }: {
  title: string; icon: typeof Package; searchValue: string; onSearchChange: (v: string) => void;
  searchPlaceholder: string; actionLabel: string; onAction: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <h3 className="text-base font-extrabold text-foreground flex items-center gap-2"><Icon size={16} /> {title}</h3>
      <div className="flex items-center gap-2">
        <Input value={searchValue} onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder} className="w-44 h-8 text-xs" />
        <Button size="sm" className="text-xs" onClick={onAction}><Plus size={12} className="mr-1" /> {actionLabel}</Button>
      </div>
    </div>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: { key: string; cells: React.ReactNode[] }[] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>{columns.map((col, i) => <th key={i} className="text-left p-3 text-xs font-medium">{col}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-border hover:bg-muted/30 transition-colors">
                {row.cells.map((cell, i) => <td key={i} className="p-3">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FORMS ───────────────────────────────────────────────────────────────────

function CategoryForm({ initial, onSave, onCancel }: {
  initial?: MarketplaceCategory | null;
  onSave: (data: Omit<MarketplaceCategory, "id" | "slug">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [icon, setIcon] = useState(initial?.icon || "Package");
  const [image, setImage] = useState(initial?.image || "");
  return (
    <div className="space-y-3">
      <div><label className="text-xs font-medium">Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" /></div>
      <div><label className="text-xs font-medium">Description</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[60px]" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium">Icon</label><Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g. Sprout" /></div>
        <div><label className="text-xs font-medium">Image path</label><Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/locale/..." /></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" disabled={!name} onClick={() => onSave({ name, description, icon, image, parentId: null, sortOrder: initial?.sortOrder ?? 99, isActive: initial?.isActive ?? true })}>{initial ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
}

function SubcategoryForm({ topCategories, initial, onSave, onCancel }: {
  topCategories: MarketplaceCategory[];
  initial?: MarketplaceCategory | null;
  onSave: (data: Omit<MarketplaceCategory, "id" | "slug">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [icon, setIcon] = useState(initial?.icon || "Package");
  const [image, setImage] = useState(initial?.image || "");
  const [parentId, setParentId] = useState(initial?.parentId || "");
  return (
    <div className="space-y-3">
      <div><label className="text-xs font-medium">Parent</label>
        <Select value={parentId} onValueChange={setParentId}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>{topCategories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><label className="text-xs font-medium">Name</label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div><label className="text-xs font-medium">Description</label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[60px]" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium">Icon</label><Input value={icon} onChange={(e) => setIcon(e.target.value)} /></div>
        <div><label className="text-xs font-medium">Image</label><Input value={image} onChange={(e) => setImage(e.target.value)} /></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" disabled={!name || !parentId} onClick={() => onSave({ name, description, icon, image, parentId, sortOrder: initial?.sortOrder ?? 99, isActive: initial?.isActive ?? true })}>{initial ? "Update" : "Create"}</Button>
      </div>
    </div>
  );
}
