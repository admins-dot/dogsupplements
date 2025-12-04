import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingBag, ArrowLeft, Shield, Truck, RefreshCcw } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setOpen);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(50);
        const found = products.find(p => p.node.handle === handle);
        setProduct(found || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    const variant = product.node.variants.edges[selectedVariantIndex]?.node;
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Button variant="outline" asChild>
              <Link to="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.node.variants.edges[selectedVariantIndex]?.node;
  const hasMultipleVariants = product.node.variants.edges.length > 1;

  return (
    <>
      <Helmet>
        <title>{product.node.title} | VitalCanine</title>
        <meta name="description" content={product.node.description || "Premium dog health supplement"} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="section-padding">
            <div className="container-wide mx-auto">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                  <Link to="/shop">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shop
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated bg-muted">
                    <img
                      src={product.node.images.edges[0]?.node.url || heroProduct}
                      alt={product.node.images.edges[0]?.node.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {product.node.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {product.node.description || "Premium daily supplement crafted with clean, science-backed ingredients for your dog's optimal health."}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl font-bold text-foreground">
                        ${parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
                      </span>
                      <span className="text-lg text-secondary font-medium">
                        Subscribe & save 20%
                      </span>
                    </div>
                  </div>

                  {/* Variants */}
                  {hasMultipleVariants && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Select Option</label>
                      <div className="flex flex-wrap gap-3">
                        {product.node.variants.edges.map((variant, index) => (
                          <Button
                            key={variant.node.id}
                            variant={selectedVariantIndex === index ? "gold" : "outline"}
                            onClick={() => setSelectedVariantIndex(index)}
                            disabled={!variant.node.availableForSale}
                          >
                            {variant.node.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                    <div className="text-center">
                      <Shield className="h-6 w-6 mx-auto text-secondary mb-2" />
                      <p className="text-xs text-muted-foreground">Vet Approved</p>
                    </div>
                    <div className="text-center">
                      <Truck className="h-6 w-6 mx-auto text-secondary mb-2" />
                      <p className="text-xs text-muted-foreground">Free Shipping</p>
                    </div>
                    <div className="text-center">
                      <RefreshCcw className="h-6 w-6 mx-auto text-secondary mb-2" />
                      <p className="text-xs text-muted-foreground">30-Day Returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
