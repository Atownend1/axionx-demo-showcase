import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const FloatingChatButton = () => {
  const handleChatClick = () => {
    // Add your chat logic here
    console.log("Opening chat...");
  };

  return (
    <Button
      onClick={handleChatClick}
      variant="gradient"
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform min-h-[44px] min-w-[44px] touch-manipulation p-0"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};
