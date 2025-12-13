import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

export const ProductPreview = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setOpen);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(4);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
    setCartOpen(true);
  };

  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Premium formulas crafted with clean, science-backed ingredients.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border/50">
            <div className="max-w-md mx-auto">
              <img
                src={heroProduct}
                alt=".day product"
                className="w-48 h-48 object-cover rounded-2xl mx-auto mb-6 shadow-medium"
              />
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Products Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                We're preparing our premium dog health supplements. Check back soon or tell us what product you'd like to see!
              </p>
              <p className="text-sm text-muted-foreground/70">
                Tell us in the chat what product you want to create!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {products.map((product, index) => (
              <div
                key={product.node.id}
                className="group card-elevated overflow-hidden opacity-0 animate-fade-in-up w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <Link to={`/product/${product.node.handle}`} className="block aspect-square overflow-hidden">
                  <img
                    src={product.node.images.edges[0]?.node.url || heroProduct}
                    alt={product.node.images.edges[0]?.node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link to={`/product/${product.node.handle}`}>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {product.node.title}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.node.description || "Premium daily supplement for dogs"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-secondary font-medium">
                        Subscribe & save 20%
                      </p>
                    </div>
                    
                    <Button
                      variant="gold"
                      size="icon"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
