/**
 * Agri2rist Hub – Catalog Explorer Page
 * Page wrapper with hero section and breadcrumb around the CatalogExplorer component.
 */
import { Link } from "react-router-dom";
import { ChevronLeft, FolderTree, Package, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { CatalogExplorer } from "@/components/marketplace/CatalogExplorer";
import { useCatalog } from "@/lib/catalog-store";

export default function CatalogExplorerPage() {
  const { getTopCategories, categories, products } = useCatalog();
  const topCats = getTopCategories();
  const subCount = categories.filter((c) => c.parentId).length;

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft size={14} /> Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Catalog Explorer</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Badge className="mb-3 bg-secondary text-secondary-foreground">
                <FolderTree size={12} className="mr-1" /> Product Catalog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground max-w-3xl leading-tight">
                Master Catalog Explorer
              </h1>
              <p className="mt-3 text-white text-lg max-w-2xl font-medium">
                Browse the complete product hierarchy. Expand categories to discover subcategories and products.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-primary-foreground border border-primary-foreground/20 rounded-xl p-5 bg-primary-foreground/10 min-w-[280px]">
              <div>
                <div className="text-2xl font-extrabold">{topCats.length}</div>
                <div className="text-xs text-primary-foreground/70">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{subCount}</div>
                <div className="text-xs text-primary-foreground/70">Subcategories</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{products.length}</div>
                <div className="text-xs text-primary-foreground/70">Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Explorer */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <CatalogExplorer />
        </div>
      </section>

      {/* Footer strip */}
      <section className="py-10 bg-muted border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Manage the Catalog</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Add categories, subcategories and products from the Admin panel.
              </p>
            </div>
            <Link to="/admin">
              <Button variant="outline">
                <Layers size={16} className="mr-2" /> Open Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
