
import { useWallet } from "../contexts/WalletContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import { useState } from "react";
import { mockTraders } from "../data/mockTraders";
import { toast } from "sonner";
import { AlertCarousel } from "./header/AlertCarousel";
import { Navigation } from "./header/Navigation";
import { MobileMenu } from "./header/MobileMenu";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const userProfile = mockTraders.find(trader => trader.name === "NomadEngineer");
  const [showAlert, setShowAlert] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isConnected, 
    isXConnected, 
    xUsername,
    connectWallet, 
    connectX 
  } = useWallet();

  const handleNovaClick = () => {
    window.open("https://tradeonnova.net/", "_blank");
  };

  const handleNewFeature = () => {
    const event = new CustomEvent(
      location.pathname === '/' ? 'openLeaderboardFilters' : 'openTradeFilters'
    );
    window.dispatchEvent(event);

    toast("🎯 Smart Filtering", {
      description: location.pathname === '/' ? 
        "Find the best traders with our advanced filters!" :
        "Filter trades by performance and metrics!",
      duration: 2000,
    });
  };

  const handleSponsorClick = () => {
    if (userProfile) {
      navigate(`/profile/${userProfile.walletAddress}`);
      toast("🏆 Featured Trader!", {
        description: "Follow NomadEngineer for daily trading insights!",
        duration: 2000,
      });
    }
  };

  const handleProfileClick = () => {
    if (isConnected && isXConnected && userProfile) {
      navigate(`/profile/${userProfile.walletAddress}`);
      setIsOpen(false);
    }
  };

  const defaultProfilePicture = "https://api.dicebear.com/7.x/pixel-art/svg?seed=potion-trader&colors=8B5CF6,9B87F5,D946EF";

  return (
    <div className="pt-2">
      {isConnected && showAlert && (
        <AlertCarousel 
          onDismiss={() => setShowAlert(false)}
          handleNovaClick={handleNovaClick}
          handleNewFeature={handleNewFeature}
          handleSponsorClick={handleSponsorClick}
          connectX={connectX}
        />
      )}
      <header className="glass-card px-8 py-6 flex items-center justify-between mb-8 rounded-2xl border border-white/10 hover:border-primary/20 transition-colors duration-300 bg-card/80 shadow-[inset_-12px_-12px_24px_rgba(255,255,255,0.04),inset_12px_12px_24px_rgba(0,0,0,0.2)] hover:shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.06),inset_8px_8px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img 
              src="/lovable-uploads/72b222aa-ea1a-43f5-acb1-b2ce7eda0713.png" 
              alt="Potion Leaderboard" 
              className="h-20 animate-fade-in hover:scale-105 transition-transform duration-300" 
            />
          </Link>
          {!isMobile && <Navigation isMobile={false} />}
        </div>

        <div className="flex items-center gap-6">
          {isMobile ? (
            <MobileMenu 
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              isConnected={isConnected}
              isXConnected={isXConnected}
              xUsername={xUsername}
              userProfilePicture={userProfile?.profilePicture || ''}
              defaultProfilePicture={defaultProfilePicture}
              onConnectWallet={connectWallet}
              onConnectX={connectX}
              onProfileClick={handleProfileClick}
            />
          ) : (
            <>
              {isConnected && (
                isXConnected ? (
                  <a 
                    href="https://x.com/_NomadEngineer" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    {xUsername}
                  </a>
                ) : (
                  <Button 
                    onClick={connectX}
                    variant="outline" 
                    className="text-white"
                  >
                    Connect X
                  </Button>
                )
              )}
              {isConnected ? (
                <button 
                  onClick={handleProfileClick}
                  className="glass-card p-1 rounded-full hover:bg-secondary/80 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <img 
                    src={isXConnected ? userProfile?.profilePicture : defaultProfilePicture} 
                    alt="Profile" 
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300" 
                  />
                </button>
              ) : (
                <Button 
                  onClick={connectWallet}
                  className="bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  Connect Wallet
                </Button>
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
