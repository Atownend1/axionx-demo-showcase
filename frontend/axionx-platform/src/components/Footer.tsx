import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-12 sm:mt-20 safe-bottom">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* CTA Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text px-4">See DataController in Action</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Join leading finance teams who trust AxionX to transform their data quality and governance
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 w-full sm:w-auto min-h-[48px]">
              Schedule Investor Demo
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 w-full sm:w-auto min-h-[48px]">
              Download Investment Deck
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-border/50">
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">£3M Pre-Seed</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Funding Raised</div>
          </div>
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">£9M Valuation</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Current Value</div>
          </div>
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">95%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Customer Retention</div>
          </div>
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">£572K</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Customer LTV</div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center pt-6 sm:pt-8 border-t border-border/50 px-4">
          <div className="text-sm text-muted-foreground">
            Contact: <a href="mailto:hello@axionx.uk" className="text-primary hover:underline break-all">hello@axionx.uk</a>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            © 2024 AxionX. All rights reserved. This is an investor demonstration platform.
          </div>
        </div>
      </div>
    </footer>
  );
};
