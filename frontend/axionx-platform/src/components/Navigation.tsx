import { NavLink } from "@/components/NavLink";
import { MobileMenu } from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPortal = location.pathname.startsWith("/portal");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 safe-top">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-12">
            <div className="text-xl sm:text-2xl font-bold gradient-text">
              axionX
            </div>

            <div className="hidden md:flex items-center gap-8">
              {isPortal ? (
                <>
                  <NavLink to="/portal" end className="text-sm text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-foreground font-medium">Dashboard</NavLink>
                  <NavLink to="/portal/data-quality" className="text-sm text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-foreground font-medium">Data Quality</NavLink>
                  <NavLink to="/portal/ai-insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-foreground font-medium">AI Insights</NavLink>
                  <NavLink to="/portal/roi-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-foreground font-medium">ROI Calculator</NavLink>
                  <NavLink to="/portal/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors" activeClassName="text-foreground font-medium">Chat Assistant</NavLink>
                </>
              ) : (
                <>
                  <ScrollLink to="services" smooth={true} duration={500} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-opensans">Services</ScrollLink>
                  <NavLink to="/demo-request" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-opensans">About Us</NavLink>
                  <NavLink to="/demo-request" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-opensans">Contact</NavLink>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isPortal ? (
              <Button onClick={handleLogout} variant="ghost" className="hidden sm:flex hover:bg-destructive/10 hover:text-destructive">
                Log Out
              </Button>
            ) : (
              <NavLink to="/auth">
                <Button className="hidden sm:flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/20">
                  Login
                </Button>
              </NavLink>
            )}
            <div className="hidden sm:flex items-center gap-2">
              <Avatar className="h-9 w-9 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary">{isPortal ? "U" : "G"}</AvatarFallback>
              </Avatar>
            </div>
            <MobileMenu isPortal={isPortal} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};
