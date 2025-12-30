import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link as ScrollLink } from "react-scroll";

interface MobileMenuProps {
  isPortal: boolean;
  handleLogout: () => void;
}

export const MobileMenu = ({ isPortal, handleLogout }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <nav className="flex flex-col gap-6 mt-8">
          {isPortal ? (
            <>
              <NavLink to="/portal" end onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2" activeClassName="text-foreground font-medium">Dashboard</NavLink>
              <NavLink to="/portal/data-quality" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2" activeClassName="text-foreground font-medium">Data Quality</NavLink>
              <NavLink to="/portal/ai-insights" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2" activeClassName="text-foreground font-medium">AI Insights</NavLink>
              <NavLink to="/portal/roi-calculator" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2" activeClassName="text-foreground font-medium">ROI Calculator</NavLink>
              <NavLink to="/portal/chat" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2" activeClassName="text-foreground font-medium">Chat Assistant</NavLink>
            </>
          ) : (
            <>
              <ScrollLink to="services" smooth={true} duration={500} onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer">Services</ScrollLink>
              <NavLink to="/demo-request" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2">About Us</NavLink>
              <NavLink to="/demo-request" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2">Contact</NavLink>
              <NavLink to="/auth" onClick={() => setOpen(false)} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2">Login</NavLink>
            </>
          )}

          <div className="pt-6 border-t border-border">
            {isPortal && (
              <Button
                className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Log Out
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
