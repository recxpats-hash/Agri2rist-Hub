/**
 * Agri2rist Hub – Shopping Cart Sidebar
 */
import { Link } from "react-router-dom";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, count, subtotal, serviceFee, total, remove, update } = useCart();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary" />
            Shopping Cart
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {count} item{count !== 1 ? "s" : ""}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <ShoppingCart size={48} className="text-muted-foreground/30" />
            <div>
              <p className="font-semibold text-foreground mb-1">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Browse the marketplace to add products.</p>
            </div>
            <Link to="/marketplace" onClick={onClose}>
              <Button className="bg-primary text-primary-foreground">Browse Marketplace</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground line-clamp-2 leading-tight mb-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2 truncate" title={item.product.farmName}>{item.product.farmName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => update(item.productId, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => update(item.productId, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-sm">
                          UGX {(item.product.retailPrice * item.qty).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.retailPrice.toLocaleString()} / {item.product.unitOfSale}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start mt-1"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-border space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">UGX {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee (2.5%)</span>
                  <span className="font-medium">UGX {serviceFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-extrabold">
                  <span>Total</span>
                  <span className="text-primary">UGX {total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/marketplace/checkout" onClick={onClose}>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold">
                  Proceed to Checkout
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
