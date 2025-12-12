import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { useMembership, MEMBERSHIP_DISCOUNT, SUBSCRIPTION_DISCOUNT } from "@/hooks/useMembership";
import { useProductSubscriptions, SubscriptionFrequency, FREQUENCY_OPTIONS } from "@/hooks/useProductSubscriptions";
import { useAuth } from "@/hooks/useAuth";
import { SubscriptionOptions } from "@/components/product/SubscriptionOptions";
import { sendPurchaseConfirmation } from "@/lib/emailService";
import { toast } from "sonner";
import { Loader2, ShoppingBag, ArrowLeft, Shield, Truck, RefreshCcw } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [selectedFrequency, setSelectedFrequency] = useState<SubscriptionFrequency>('monthly');
  
  const addItem = useCartStore(state => state.addItem);
  const setCartOpen = useCartStore(state => state.setOpen);
  const { user } = useAuth();
  const { isMember } = useMembership();
  const { createSubscription } = useProductSubscriptions();

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

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.node.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;

    const basePrice = parseFloat(variant.price.amount);

    if (purchaseType === 'subscribe') {
      if (!user) {
        toast.info('Please sign in to subscribe');
        navigate('/auth');
        return;
      }

      try {
        const subscriptionPrice = basePrice * (1 - SUBSCRIPTION_DISCOUNT / 100);
        
        await createSubscription({
          productId: product.node.id,
          variantId: variant.id,
          productTitle: product.node.title,
          variantTitle: variant.title,
          frequency: selectedFrequency,
          price: subscriptionPrice,
        });

        // Send subscription confirmation email
        if (user?.email) {
          const frequencyLabel = FREQUENCY_OPTIONS.find(f => f.value === selectedFrequency)?.label || selectedFrequency;
          sendPurchaseConfirmation({
            email: user.email,
            customerName: user.user_metadata?.full_name || 'Valued Customer',
            items: [{
              title: product.node.title,
              variantTitle: variant.title !== 'Default Title' ? variant.title : undefined,
              quantity: 1,
              price: subscriptionPrice,
            }],
            subtotal: basePrice,
            discount: basePrice - subscriptionPrice,
            total: subscriptionPrice,
            isSubscription: true,
            subscriptionFrequency: frequencyLabel,
          }).catch(err => console.error('Email send failed:', err));
        }

        // Also add to cart with discounted price
        const cartItem: CartItem = {
          product,
          variantId: variant.id,
          variantTitle: variant.title,
          price: {
            amount: subscriptionPrice.toFixed(2),
            currencyCode: variant.price.currencyCode,
          },
          quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        };

        addItem(cartItem);
        toast.success(`Subscribed to ${product.node.title}!`, {
          description: user?.email 
            ? `${SUBSCRIPTION_DISCOUNT}% discount applied. Confirmation sent to ${user.email}.`
            : `${SUBSCRIPTION_DISCOUNT}% subscription discount applied.`,
          position: "top-center",
        });
        setCartOpen(true);
      } catch (error) {
        console.error('Failed to create subscription:', error);
        toast.error('Failed to create subscription');
      }
    } else {
      // One-time purchase
      const discountedPrice = isMember 
        ? basePrice * (1 - MEMBERSHIP_DISCOUNT / 100) 
        : basePrice;

      const cartItem: CartItem = {
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: {
          amount: discountedPrice.toFixed(2),
          currencyCode: variant.price.currencyCode,
        },
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      };

      addItem(cartItem);
      toast.success(`${product.node.title} added to cart`, {
        description: isMember ? `${MEMBERSHIP_DISCOUNT}% member discount applied!` : undefined,
        position: "top-center",
      });
      setCartOpen(true);
    }
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
  const basePrice = parseFloat(selectedVariant?.price.amount || "0");

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
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {product.node.title}
                    </h1>
                    <div 
                      className="text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none
                        [&>p]:mb-4 [&>p:last-child]:mb-0
                        [&>strong]:text-foreground [&>strong]:font-semibold
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-muted-foreground [&_h1]:mb-4 [&_h1]:mt-6
                        [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-muted-foreground [&_h2]:mb-4 [&_h2]:mt-6
                        [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-muted-foreground [&_h3]:mb-4 [&_h3]:mt-6
                        [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-muted-foreground [&_h4]:mb-4 [&_h4]:mt-6
                        [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-muted-foreground [&_h5]:mb-4 [&_h5]:mt-6
                        [&_h6]:text-base [&_h6]:font-semibold [&_h6]:text-muted-foreground [&_h6]:mb-4 [&_h6]:mt-6"
                      dangerouslySetInnerHTML={{ 
                        __html: product.node.descriptionHtml || product.node.description || "Premium daily supplement crafted with clean, science-backed ingredients for your dog's optimal health." 
                      }}
                    />
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

                  {/* Subscription Options */}
                  <SubscriptionOptions
                    price={basePrice}
                    isMember={isMember}
                    purchaseType={purchaseType}
                    selectedFrequency={selectedFrequency}
                    onPurchaseTypeChange={setPurchaseType}
                    onFrequencyChange={setSelectedFrequency}
                  />

                  {/* Add to Cart */}
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {purchaseType === 'subscribe' ? 'Subscribe & Add to Cart' : 'Add to Cart'}
                  </Button>

                  {/* Membership CTA */}
                  {!isMember && purchaseType === 'one-time' && (
                    <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                      <p className="text-sm text-foreground">
                        <Link to="/membership" className="font-semibold text-secondary hover:underline">
                          Join Membership
                        </Link>{' '}
                        to save {MEMBERSHIP_DISCOUNT}% on all one-time purchases
                      </p>
                    </div>
                  )}

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
