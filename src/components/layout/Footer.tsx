import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-secondary">.day</h3>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed">
              Science-backed daily nutrition for a healthier, happier dog. 
              Premium soft chews crafted with clean ingredients for immunity, 
              joints, digestion & vitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Ingredients
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Shipping Info
              </Link>
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} VitalCanine. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <Link to="/" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};