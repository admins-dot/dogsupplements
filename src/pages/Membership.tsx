import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMembership, MEMBERSHIP_PRICE, MEMBERSHIP_DISCOUNT } from '@/hooks/useMembership';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Check, Crown, Sparkles, Truck, RefreshCcw, Shield, Loader2 } from 'lucide-react';

const Membership = () => {
  const { user, loading: authLoading } = useAuth();
  const { membership, loading: membershipLoading, isMember, createMembership, cancelMembership } = useMembership();
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!user) {
      toast.info('Please sign in to join membership');
      navigate('/auth');
      return;
    }

    try {
      await createMembership();
      toast.success('Welcome to .day Membership!', {
        description: `You now get ${MEMBERSHIP_DISCOUNT}% off all products.`,
      });
    } catch (error) {
      console.error('Error creating membership:', error);
      toast.error('Failed to create membership');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMembership();
      toast.success('Membership cancelled');
    } catch (error) {
      console.error('Error cancelling membership:', error);
      toast.error('Failed to cancel membership');
    }
  };

  const benefits = [
    { icon: Sparkles, title: `${MEMBERSHIP_DISCOUNT}% Off Everything`, description: 'Save on every purchase, every time' },
    { icon: Truck, title: 'Free Priority Shipping', description: 'Fast delivery on all orders' },
    { icon: RefreshCcw, title: 'Easy Returns', description: '30-day hassle-free returns' },
    { icon: Shield, title: 'Member-Only Products', description: 'Access to exclusive formulas' },
  ];

  const loading = authLoading || membershipLoading;

  return (
    <>
      <Helmet>
        <title>Membership | .day</title>
        <meta name="description" content="Join .day Membership and save 20% on all premium dog supplements." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-8 pb-16 md:pb-20 bg-accent">
            <div className="container-narrow mx-auto text-center">
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
                <Crown className="w-3 h-3 mr-1" />
                Exclusive Membership
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                .day Membership
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Unlock {MEMBERSHIP_DISCOUNT}% savings on every order plus exclusive member benefits. 
                Give your dog the best while saving more.
              </p>

              {/* Pricing Card */}
              <Card className="max-w-md mx-auto border-2 border-secondary shadow-gold">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-2xl">Monthly Membership</CardTitle>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">${MEMBERSHIP_PRICE}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    Cancel anytime. No commitment required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-left">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-foreground">{benefit.title}</span>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {loading ? (
                    <Button variant="gold" size="xl" className="w-full" disabled>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </Button>
                  ) : isMember ? (
                    <div className="space-y-3">
                      <Badge variant="default" className="w-full py-2 justify-center bg-affirmative">
                        <Check className="w-4 h-4 mr-2" />
                        Active Member
                      </Badge>
                      <Button variant="outline" className="w-full" onClick={handleCancel}>
                        Cancel Membership
                      </Button>
                    </div>
                  ) : (
                    <Button variant="gold" size="xl" className="w-full" onClick={handleJoin}>
                      <Crown className="w-5 h-5 mr-2" />
                      Join Membership
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="section-padding">
            <div className="container-wide mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Member Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                        <benefit.icon className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Membership;
