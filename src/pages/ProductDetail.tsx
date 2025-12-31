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
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, ShoppingBag, ArrowLeft, Shield, Truck, RefreshCcw, 
  Sparkles, Star, Heart, Zap, Award, Gift, Check
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroProduct from "@/assets/hero-product.jpg";

// Floating decorative elements
const FloatingElement = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Reward badge component for gamification
const RewardBadge = ({ 
  icon: Icon, 
  label, 
  unlocked = false,
  delay = 0
}: { 
  icon: React.ElementType; 
  label: string; 
  unlocked?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
      unlocked 
        ? 'bg-secondary/20 border border-secondary/40' 
        : 'bg-muted/50 border border-border opacity-60'
    }`}
  >
    <div className={`p-2 rounded-full ${unlocked ? 'bg-secondary/30' : 'bg-muted'}`}>
      <Icon className={`h-4 w-4 ${unlocked ? 'text-secondary' : 'text-muted-foreground'}`} />
    </div>
    <span className={`text-[10px] font-medium text-center ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
      {label}
    </span>
  </motion.div>
);

// Interactive ingredient card
const IngredientPill = ({ 
  name, 
  benefit,
  delay = 0 
}: { 
  name: string; 
  benefit: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-full bg-secondary/15 border border-secondary/30 cursor-pointer flex items-center gap-2 transition-colors hover:bg-secondary/25"
      >
        <Sparkles className="h-3.5 w-3.5 text-secondary" />
        <span className="text-sm font-medium text-foreground">{name}</span>
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-10 px-3 py-2 bg-card rounded-lg shadow-elevated border border-border whitespace-nowrap"
          >
            <p className="text-xs text-muted-foreground">{benefit}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Sample ingredients data (would come from product in real implementation)
const sampleIngredients = [
  { name: "Omega-3", benefit: "Supports healthy skin & coat" },
  { name: "Glucosamine", benefit: "Promotes joint mobility" },
  { name: "Probiotics", benefit: "Aids digestive health" },
  { name: "Vitamin E", benefit: "Powerful antioxidant" },
];

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [selectedFrequency, setSelectedFrequency] = useState<SubscriptionFrequency>('monthly');
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-8 w-8 text-secondary" />
          </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Button variant="outline" asChild>
              <Link to="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
          </motion.div>
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
        <title>{product.node.title} | .day</title>
        <meta name="description" content={product.node.description || "Premium dog health supplement"} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/30">
        <Navbar />
        
        <main className="flex-1 relative">
          {/* Decorative floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/5 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-40 right-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <section className="section-padding relative">
            <div className="container-wide mx-auto">
              {/* Breadcrumb */}
              <FloatingElement delay={0.1}>
                <div className="mb-8">
                  <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors">
                    <Link to="/shop">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shop
                    </Link>
                  </Button>
                </div>
              </FloatingElement>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Product Images - Sticky on desktop */}
                <div className="lg:sticky lg:top-24">
                  <FloatingElement delay={0.2}>
                    <div className="relative">

                    {product.node.images.edges.length > 1 ? (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {product.node.images.edges.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated bg-muted relative">
                                {/* Shimmer effect on load */}
                                {!imageLoaded && (
                                  <div className="absolute inset-0 animate-shimmer" />
                                )}
                                <img
                                  src={image.node.url}
                                  alt={image.node.altText || `${product.node.title} - Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onLoad={() => setImageLoaded(true)}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    ) : (
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated bg-muted relative">
                        {!imageLoaded && (
                          <div className="absolute inset-0 animate-shimmer" />
                        )}
                        <img
                          src={product.node.images.edges[0]?.node.url || heroProduct}
                          alt={product.node.images.edges[0]?.node.altText || product.node.title}
                          className="w-full h-full object-cover"
                          onLoad={() => setImageLoaded(true)}
                        />
                      </div>
                    )}

                    {/* Best Seller badge - only on stick pack */}
                    {handle === 'daily-essential-vitamin' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full shadow-gold flex items-center gap-1.5"
                      >
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs font-semibold">Best Seller</span>
                      </motion.div>
                    )}

                    </div>
                  </FloatingElement>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <FloatingElement delay={0.3}>
                    <div>
                      <motion.h1 
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {product.node.title}
                      </motion.h1>
                      <motion.div 
                        className="text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none
                          [&>p]:mb-4 [&>p:last-child]:mb-0
                          [&>strong]:text-foreground [&>strong]:font-semibold
                          [&_strong]:text-foreground [&_strong]:font-semibold
                          [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-muted-foreground [&_h1]:mb-4 [&_h1]:mt-6
                          [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-muted-foreground [&_h2]:mb-4 [&_h2]:mt-6
                          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-muted-foreground [&_h3]:mb-4 [&_h3]:mt-6
                          [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-muted-foreground [&_h4]:mb-4 [&_h4]:mt-6
                          [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-muted-foreground [&_h5]:mb-4 [&_h5]:mt-6
                          [&_h6]:text-base [&_h6]:font-semibold [&_h6]:text-muted-foreground [&_h6]:mb-4 [&_h6]:mt-6
                          [&_ul+p]:mt-6 [&_ol+p]:mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        dangerouslySetInnerHTML={{ 
                          __html: product.node.descriptionHtml || product.node.description || "Premium daily supplement crafted with clean, science-backed ingredients for your dog's optimal health." 
                        }}
                      />
                    </div>
                  </FloatingElement>

                  {/* Key Ingredients - Interactive */}
                  <FloatingElement delay={0.35}>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4 text-secondary" />
                        Key Ingredients
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sampleIngredients.map((ingredient, index) => (
                          <IngredientPill 
                            key={ingredient.name}
                            name={ingredient.name}
                            benefit={ingredient.benefit}
                            delay={0.4 + index * 0.1}
                          />
                        ))}
                      </div>
                    </div>
                  </FloatingElement>

                  {/* Variants */}
                  {hasMultipleVariants && (
                    <FloatingElement delay={0.4}>
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Select Option</label>
                        <div className="flex flex-wrap gap-3">
                          {product.node.variants.edges.map((variant, index) => (
                            <motion.div
                              key={variant.node.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant={selectedVariantIndex === index ? "gold" : "outline"}
                                onClick={() => setSelectedVariantIndex(index)}
                                disabled={!variant.node.availableForSale}
                                className="relative overflow-hidden"
                              >
                                {selectedVariantIndex === index && (
                                  <motion.div
                                    layoutId="variant-highlight"
                                    className="absolute inset-0 bg-secondary/10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                                <span className="relative">{variant.node.title}</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </FloatingElement>
                  )}

                  {/* Subscription Options */}
                  <FloatingElement delay={0.45}>
                    <SubscriptionOptions
                      price={basePrice}
                      isMember={isMember}
                      purchaseType={purchaseType}
                      selectedFrequency={selectedFrequency}
                      onPurchaseTypeChange={setPurchaseType}
                      onFrequencyChange={setSelectedFrequency}
                    />
                  </FloatingElement>

                  {/* Add to Cart */}
                  <FloatingElement delay={0.5}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="hero"
                        size="xl"
                        className="w-full relative overflow-hidden group"
                        onClick={handleAddToCart}
                        disabled={!selectedVariant?.availableForSale}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <ShoppingBag className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        {purchaseType === 'subscribe' ? 'Subscribe & Add to Cart' : 'Add to Cart'}
                      </Button>
                    </motion.div>
                  </FloatingElement>

                  {/* Subscription Rewards Preview */}
                  {purchaseType === 'subscribe' && (
                    <FloatingElement delay={0.55}>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/15 border border-secondary/20"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Gift className="h-4 w-4 text-secondary" />
                          <p className="text-sm font-semibold text-foreground">Subscriber Rewards</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <RewardBadge icon={Check} label="20% Off" unlocked delay={0.6} />
                          <RewardBadge icon={Truck} label="Free Ship" unlocked delay={0.7} />
                          <RewardBadge icon={Award} label="VIP Access" unlocked={false} delay={0.8} />
                          <RewardBadge icon={Gift} label="Free Gift" unlocked={false} delay={0.9} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Stay subscribed to unlock more rewards!
                        </p>
                      </motion.div>
                    </FloatingElement>
                  )}

                  {/* Membership CTA */}
                  {!isMember && purchaseType === 'one-time' && (
                    <FloatingElement delay={0.55}>
                      <motion.div 
                        className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm text-foreground">
                          <Link to="/membership" className="font-semibold text-secondary hover:underline">
                            Join Membership
                          </Link>{' '}
                          to save {MEMBERSHIP_DISCOUNT}% on all one-time purchases
                        </p>
                      </motion.div>
                    </FloatingElement>
                  )}

                  {/* Trust badges */}
                  <FloatingElement delay={0.6}>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                      {[
                        { icon: Shield, label: "Vet Approved" },
                        { icon: Truck, label: "Free Shipping" },
                        { icon: RefreshCcw, label: "30-Day Returns" },
                      ].map((badge, index) => (
                        <motion.div 
                          key={badge.label}
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <badge.icon className="h-6 w-6 mx-auto text-secondary mb-2" />
                          </motion.div>
                          <p className="text-xs text-muted-foreground">{badge.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </FloatingElement>
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