
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Navigation } from "./Navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isConnected: boolean;
  isXConnected: boolean;
  xUsername: string;
  userProfilePicture: string;
  defaultProfilePicture: string;
  onConnectWallet: () => void;
  onConnectX: () => void;
  onProfileClick: () => void;
}

export const MobileMenu = ({
  isOpen,
  onOpenChange,
  isConnected,
  isXConnected,
  xUsername,
  userProfilePicture,
  defaultProfilePicture,
  onConnectWallet,
  onConnectX,
  onProfileClick,
}: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white">Navigation</SheetTitle>
        </SheetHeader>
        <Navigation isMobile onItemClick={() => onOpenChange(false)} />
        <div className="border-t border-white/10 pt-6">
          {isConnected ? (
            <div className="flex flex-col gap-4">
              {isXConnected ? (
                <a 
                  href="https://x.com/_NomadEngineer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-white transition-colors text-sm px-2"
                >
                  {xUsername}
                </a>
              ) : (
                <Button 
                  onClick={() => { onConnectX(); onOpenChange(false); }}
                  variant="outline" 
                  className="text-white"
                >
                  Connect X
                </Button>
              )}
              <button 
                onClick={onProfileClick}
                className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <img 
                  src={isXConnected ? userProfilePicture : defaultProfilePicture} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20" 
                />
                <span className="text-white">Profile</span>
              </button>
            </div>
          ) : (
            <Button 
              onClick={() => { onConnectWallet(); onOpenChange(false); }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
