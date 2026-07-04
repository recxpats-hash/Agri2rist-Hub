/**
 * Agri2rist Hub – Product Editor
 * Create or edit a marketplace product with auto-populated category/subcategory.
 */
import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft, Save, Package, ChevronRight, Image, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { PageLayout } from "@/components/layout/PageLayout";
import { useCatalog } from "@/lib/catalog-store";
import { useToast } from "@/hooks/use-toast";
import type { MarketplaceProduct } from "@/types/marketplace";

// ─── VALIDATION SCHEMA ───────────────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(200).optional().default(""),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().min(1, "Subcategory is required"),
  productType: z.enum(["fresh", "processed", "organic", "value_added", "byproduct", "service", "equipment", "seedling"]),
  grade: z.enum(["premium", "grade_a", "grade_b", "grade_c", "ungraded"]),
  unitOfSale: z.string().min(1, "Unit of sale is required"),
  minimumOrderQty: z.coerce.number().min(1, "Min order must be at least 1"),
  farmGatePrice: z.coerce.number().min(0),
  wholesalePrice: z.coerce.number().min(0),
  retailPrice: z.coerce.number().min(0, "Retail price is required"),
  exportPrice: z.coerce.number().optional(),
  currency: z.string().default("UGX"),
  countryOfOrigin: z.string().default("Uganda"),
  region: z.string().default("Central"),
  farmerId: z.string().default("farmer-01"),
  farmName: z.string().default("Agri2rist Demo Farm"),
  organicStatus: z.enum(["certified_organic", "transitional", "conventional"]),
  storageCondition: z.enum(["ambient", "refrigerated", "frozen", "dry_cool", "controlled_atmosphere"]),
  packagingType: z.string().default("bag"),
  stockQty: z.coerce.number().min(0),
  reorderLevel: z.coerce.number().min(0),
  availability: z.enum(["in_stock", "out_of_stock", "pre_order", "seasonal", "limited"]),
  listingStatus: z.enum(["draft", "pending_review", "active", "suspended", "archived"]),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  tags: z.string().optional(),
  images: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

// ─── OPTIONS ─────────────────────────────────────────────────────────────────

const PRODUCT_TYPES = [
  { value: "fresh", label: "Fresh" },
  { value: "processed", label: "Processed" },
  { value: "organic", label: "Organic" },
  { value: "value_added", label: "Value Added" },
  { value: "byproduct", label: "By-product" },
  { value: "service", label: "Service" },
  { value: "equipment", label: "Equipment" },
  { value: "seedling", label: "Seedling" },
];

const GRADES = [
  { value: "premium", label: "Premium" },
  { value: "grade_a", label: "Grade A" },
  { value: "grade_b", label: "Grade B" },
  { value: "grade_c", label: "Grade C" },
  { value: "ungraded", label: "Ungraded" },
];

const ORGANIC_STATUSES = [
  { value: "conventional", label: "Conventional" },
  { value: "certified_organic", label: "Certified Organic" },
  { value: "transitional", label: "Transitional" },
];

const STORAGE_CONDITIONS = [
  { value: "ambient", label: "Ambient" },
  { value: "refrigerated", label: "Refrigerated" },
  { value: "frozen", label: "Frozen" },
  { value: "dry_cool", label: "Dry / Cool" },
  { value: "controlled_atmosphere", label: "Controlled Atmosphere" },
];

const AVAILABILITY_OPTIONS = [
  { value: "in_stock", label: "In Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
  { value: "pre_order", label: "Pre-Order" },
  { value: "seasonal", label: "Seasonal" },
  { value: "limited", label: "Limited Stock" },
];

const LISTING_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "pending_review", label: "Pending Review" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "archived", label: "Archived" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ProductEditorPage() {
  const { productId } = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    getProductById, addProduct, updateProduct,
    getTopCategories, getSubcategories, getCategoryById,
  } = useCatalog();

  const isEditing = !!productId;
  const existingProduct = productId ? getProductById(productId) : undefined;

  // Pre-populated values from URL params
  const preCategoryId = searchParams.get("categoryId") || "";
  const preSubcategoryId = searchParams.get("subcategoryId") || "";
  const preProductName = searchParams.get("productName") || "";
  const preCategoryName = searchParams.get("categoryName") || "";
  const preSubcategoryName = searchParams.get("subcategoryName") || "";

  const topCategories = getTopCategories();
  const [selectedCatId, setSelectedCatId] = useState(preCategoryId);
  const subcategories = useMemo(
    () => (selectedCatId ? getSubcategories(selectedCatId) : []),
    [selectedCatId, getSubcategories]
  );

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: existingProduct?.name || preProductName || "",
      description: existingProduct?.description || "",
      shortDescription: existingProduct?.shortDescription || "",
      categoryId: existingProduct?.categoryId || preCategoryId,
      subcategoryId: existingProduct?.subcategoryId || preSubcategoryId,
      productType: existingProduct?.productType || "fresh",
      grade: existingProduct?.grade || "grade_a",
      unitOfSale: existingProduct?.unitOfSale || "kg",
      minimumOrderQty: existingProduct?.minimumOrderQty || 1,
      farmGatePrice: existingProduct?.farmGatePrice || 0,
      wholesalePrice: existingProduct?.wholesalePrice || 0,
      retailPrice: existingProduct?.retailPrice || 0,
      exportPrice: existingProduct?.exportPrice,
      currency: existingProduct?.currency || "UGX",
      countryOfOrigin: existingProduct?.countryOfOrigin || "Uganda",
      region: existingProduct?.region || "Central",
      farmerId: existingProduct?.farmerId || "farmer-01",
      farmName: existingProduct?.farmName || "Agri2rist Demo Farm",
      organicStatus: existingProduct?.organicStatus || "conventional",
      storageCondition: existingProduct?.storageCondition || "ambient",
      packagingType: existingProduct?.packagingType || "bag",
      stockQty: existingProduct?.stockQty || 100,
      reorderLevel: existingProduct?.reorderLevel || 20,
      availability: existingProduct?.availability || "in_stock",
      listingStatus: existingProduct?.listingStatus || "draft",
      isFeatured: existingProduct?.isFeatured || false,
      isTrending: existingProduct?.isTrending || false,
      tags: existingProduct?.tags?.join(", ") || "",
      images: existingProduct?.images?.join(", ") || "",
    },
  });

  // Sync category selection with form
  useEffect(() => {
    const catId = form.watch("categoryId");
    if (catId && catId !== selectedCatId) setSelectedCatId(catId);
  }, [form.watch, selectedCatId]);

  // When category changes, reset subcategory
  useEffect(() => {
    if (selectedCatId && !subcategories.find((s) => s.id === form.getValues("subcategoryId"))) {
      form.setValue("subcategoryId", "");
    }
  }, [selectedCatId, subcategories, form]);

  const onSubmit = (data: ProductFormData) => {
    const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const images = data.images ? data.images.split(",").map((i) => i.trim()).filter(Boolean) : ["/locale/Marketplace/farm-produce-tomato-farm.jpg"];

    if (isEditing && existingProduct) {
      updateProduct(existingProduct.id, {
        ...data,
        tags,
        images,
      });
      toast({ title: "Product updated", description: `${data.name} has been saved.` });
    } else {
      addProduct({
        ...data,
        tags,
        images,
        sku: "",
        slug: "",
        barcode: undefined,
        qrCode: undefined,
        scientificName: undefined,
        commonName: data.name,
        localNames: {},
        variety: undefined,
        exportPrice: data.exportPrice,
        gpsCoordinates: undefined,
        certifications: [],
        grade2: undefined,
        harvestDate: undefined,
        expiryDate: undefined,
        shelfLifeDays: 7,
        bestBefore: undefined,
        handlingInstructions: undefined,
        packagingWeight: undefined,
        seasonalMonths: undefined,
        leadTimeDays: 2,
        videoUrl: undefined,
        documents: undefined,
        viewCount: 0,
        orderCount: 0,
        rating: 0,
        reviewCount: 0,
      });
      toast({ title: "Product created", description: `${data.name} has been added to the catalog.` });
    }
    navigate("/marketplace/catalog");
  };

  const categoryLabel = preCategoryId
    ? preCategoryName || getCategoryById(preCategoryId)?.name || ""
    : "";
  const subcategoryLabel = preSubcategoryId
    ? preSubcategoryName || getCategoryById(preSubcategoryId)?.name || ""
    : "";

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft size={14} /> Back
          </button>
          <span>/</span>
          <Link to="/marketplace/catalog" className="hover:text-primary">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{isEditing ? "Edit Product" : "New Product"}</span>
        </div>
      </div>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground">
              {isEditing ? "Edit Product" : "New Product"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing
                ? `Editing ${existingProduct?.name || "product"}`
                : "Fill in the product details. Category and subcategory are pre-populated from the catalog."
              }
            </p>
            {(categoryLabel || subcategoryLabel) && (
              <div className="flex items-center gap-2 mt-3">
                {categoryLabel && <Badge variant="outline" className="gap-1"><Package size={10} /> {categoryLabel}</Badge>}
                {categoryLabel && subcategoryLabel && <ChevronRight size={12} className="text-muted-foreground" />}
                {subcategoryLabel && <Badge variant="outline" className="gap-1"><Package size={10} /> {subcategoryLabel}</Badge>}
                {preProductName && <Badge className="bg-primary text-primary-foreground">{preProductName}</Badge>}
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl><Input placeholder="e.g. Fresh Maize" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="categoryId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {topCategories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="subcategoryId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCatId}>
                          <FormControl><SelectTrigger><SelectValue placeholder={selectedCatId ? "Select subcategory" : "Select category first"} /></SelectTrigger></FormControl>
                          <SelectContent>
                            {subcategories.map((sub) => (
                              <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea placeholder="Detailed product description..." className="min-h-[120px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="shortDescription" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl><Input placeholder="Brief one-liner (max 200 chars)" maxLength={200} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="productType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {PRODUCT_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="grade" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {GRADES.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="unitOfSale" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit of Sale</FormLabel>
                        <FormControl><Input placeholder="kg, ton, crate, piece..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="tags" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl><Input placeholder="organic, fresh, local" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="images" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URLs (comma-separated)</FormLabel>
                        <FormControl><Input placeholder="/path/to/image1.jpg, /path/to/image2.jpg" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField control={form.control} name="retailPrice" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retail Price (UGX)</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="wholesalePrice" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wholesale Price</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="farmGatePrice" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Gate Price</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="exportPrice" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Export Price (optional)</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField control={form.control} name="minimumOrderQty" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Order Qty</FormLabel>
                        <FormControl><Input type="number" min={1} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="currency" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              {/* Inventory & Logistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inventory & Logistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField control={form.control} name="stockQty" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="reorderLevel" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reorder Level</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="availability" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {AVAILABILITY_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="organicStatus" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organic Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {ORGANIC_STATUSES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="storageCondition" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Storage Condition</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {STORAGE_CONDITIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="packagingType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Packaging Type</FormLabel>
                        <FormControl><Input placeholder="bag, box, crate..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              {/* Origin & Listing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Origin & Listing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField control={form.control} name="countryOfOrigin" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Origin</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="region" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="farmName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="listingStatus" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {LISTING_STATUSES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.watch("isFeatured")}
                        onChange={(e) => form.setValue("isFeatured", e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm font-medium">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.watch("isTrending")}
                        onChange={(e) => form.setValue("isTrending", e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm font-medium">Trending Product</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => navigate("/marketplace/catalog")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground">
                  <Save size={16} className="mr-2" />
                  {isEditing ? "Save Changes" : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </PageLayout>
  );
}
