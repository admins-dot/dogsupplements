import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionManagement } from "@/components/account/SubscriptionManagement";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, User, Package, Settings, LogOut, Truck, CreditCard } from "lucide-react";

// Validation schemas
const profileSchema = z.object({
  full_name: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  address_line1: z.string().trim().max(255).optional(),
  address_line2: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  postal_code: z.string().trim().max(20).optional(),
  delivery_notes: z.string().trim().max(500).optional(),
});

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  delivery_frequency: string | null;
  delivery_notes: string | null;
}

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !user) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      address_line1: formData.get("address_line1") as string,
      address_line2: formData.get("address_line2") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
    };

    const validation = profileSchema.safeParse(updates);
    if (!validation.success) {
      toast.error("Please check your input and try again.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
      setProfile({ ...profile, ...updates });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeliveryUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !user) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      delivery_frequency: formData.get("delivery_frequency") as string,
      delivery_notes: formData.get("delivery_notes") as string,
    };

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
      setProfile({ ...profile, ...updates });
      toast.success("Delivery preferences updated!");
    } catch (error) {
      console.error("Error updating delivery preferences:", error);
      toast.error("Failed to update. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Account | VitalCanine</title>
        <meta name="description" content="Manage your VitalCanine account, subscriptions, and delivery preferences." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 section-padding">
          <div className="container-wide mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Account</h1>
                <p className="text-muted-foreground mt-1">
                  {profile?.email || user?.email}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="delivery" className="gap-2">
                  <Truck className="h-4 w-4" />
                  <span className="hidden sm:inline">Delivery</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscription</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="card-elevated p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="h-5 w-5 text-secondary" />
                    <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          defaultValue={profile?.full_name || ""}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          defaultValue={profile?.phone || ""}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line1">Street Address</Label>
                      <Input
                        id="address_line1"
                        name="address_line1"
                        defaultValue={profile?.address_line1 || ""}
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line2">Apartment, suite, etc.</Label>
                      <Input
                        id="address_line2"
                        name="address_line2"
                        defaultValue={profile?.address_line2 || ""}
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          defaultValue={profile?.city || ""}
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          defaultValue={profile?.state || ""}
                          placeholder="NY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal_code">ZIP Code</Label>
                        <Input
                          id="postal_code"
                          name="postal_code"
                          defaultValue={profile?.postal_code || ""}
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="gold" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="card-elevated p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="h-5 w-5 text-secondary" />
                    <h2 className="text-xl font-semibold text-foreground">Order History</h2>
                  </div>
                  
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">
                      When you make a purchase, your orders will appear here.
                    </p>
                    <Button variant="gold" onClick={() => navigate("/shop")}>
                      Start Shopping
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Delivery Tab */}
              <TabsContent value="delivery">
                <div className="card-elevated p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-5 w-5 text-secondary" />
                    <h2 className="text-xl font-semibold text-foreground">Delivery Preferences</h2>
                  </div>
                  
                  <form onSubmit={handleDeliveryUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="delivery_frequency">Delivery Frequency</Label>
                      <Select 
                        name="delivery_frequency" 
                        defaultValue={profile?.delivery_frequency || "4_weeks"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2_weeks">Every 2 weeks</SelectItem>
                          <SelectItem value="4_weeks">Every 4 weeks</SelectItem>
                          <SelectItem value="6_weeks">Every 6 weeks</SelectItem>
                          <SelectItem value="8_weeks">Every 8 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Choose how often you want your supplements delivered.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery_notes">Delivery Notes</Label>
                      <Textarea
                        id="delivery_notes"
                        name="delivery_notes"
                        defaultValue={profile?.delivery_notes || ""}
                        placeholder="Leave packages at the front door, etc."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" variant="gold" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <div className="card-elevated p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-5 w-5 text-secondary" />
                    <h2 className="text-xl font-semibold text-foreground">Subscriptions</h2>
                  </div>
                  
                  <SubscriptionManagement />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Account;
