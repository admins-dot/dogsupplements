import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingBag, Star } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setOpen);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
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
    <>
      <Helmet>
        <title>Shop Dog Supplements | .day</title>
        <meta 
          name="description" 
          content="Browse our collection of premium dog health supplements. Science-backed formulas for immunity, joints, digestion & vitality." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Header */}
          <section className="pt-8 pb-8 bg-muted/30">
            <div className="container-wide mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Shop All Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Premium formulas crafted with clean, science-backed ingredients for your dog's daily health.
              </p>
            </div>
          </section>

          {/* Products Grid */}
          <section className="section-padding pt-8">
            <div className="container-wide mx-auto">
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
                      No Products Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We're preparing our premium dog health supplements. Tell us what you'd like to see!
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      Create a product by telling us in the chat what the product is and what the price should be.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-8">
                  {products.map((product, index) => (
                    <div
                      key={product.node.id}
                      className="group card-elevated overflow-hidden opacity-0 animate-fade-in-up w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[300px]"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image */}
                      <Link to={`/product/${product.node.handle}`} className="block aspect-square overflow-hidden relative">
                        {product.node.handle === 'daily-essential-vitamin' && (
                          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full shadow-gold flex items-center gap-1.5">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs font-semibold">Best Seller</span>
                          </div>
                        )}
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
                              Subscribe & save up to 20%
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
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
