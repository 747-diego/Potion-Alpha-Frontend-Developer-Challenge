import { X, Sparkles, Share2, Trophy, Rocket, Bot, Menu } from "lucide-react";
import { mockTraders } from "../data/mockTraders";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWallet } from "../contexts/WalletContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "../hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import confetti from 'canvas-confetti';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const autoplayOptions = Autoplay({
    delay: 3000,
    playOnInit: true,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  });

  const [emblaRef] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    duration: 20,
    skipSnaps: false,
  }, [autoplayOptions]);

  const AlertContent = ({ 
    icon: Icon, 
    description, 
    actionLabel, 
    onAction, 
    color 
  }: { 
    icon: any, 
    description: string, 
    actionLabel: string, 
    onAction: () => void,
    color: string 
  }) => (
    <Alert className={`mb-4 bg-${color}/5 border-${color}/20 flex items-center justify-between ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} animate-fade-in`}>
      <div className="flex items-center gap-2">
        <Icon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-${color} animate-pulse`} />
        <AlertDescription className="text-white flex items-center gap-2">
          <span className={isMobile ? 'text-xs' : 'text-sm'}>{description}</span>
        </AlertDescription>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onAction}
          className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-${color}/20 hover:bg-${color}/30 text-${color} rounded-full transition-colors`}
        >
          {actionLabel}
        </button>
        <button
          onClick={() => setShowAlert(false)}
          className="text-muted-foreground hover:text-white transition-colors text-xs"
        >
          {isMobile ? '×' : 'Dismiss'}
        </button>
      </div>
    </Alert>
  );

  const alerts = [
    {
      icon: Bot,
      description: "Seamlessly trade any token on Solana with total control.",
      actionLabel: isMobile ? "Trade" : "Trade on Nova",
      onAction: handleNovaClick,
      color: "primary"
    },
    {
      icon: Sparkles,
      description: "Share your trading journey on X",
      actionLabel: "Connect X",
      onAction: connectX,
      color: "[#0EA5E9]"
    },
    {
      icon: Rocket,
      description: `New Feature: Smart Filtering ${isMobile ? '' : '🎯 Find what matters most!'}`,
      actionLabel: "Try",
      onAction: handleNewFeature,
      color: "[#F97316]"
    },
    {
      icon: Trophy,
      description: `Weekly Featured: ${isMobile ? 'NomadEngineer' : 'NomadEngineer - Follow for daily trading insights!'}`,
      actionLabel: "View",
      onAction: handleSponsorClick,
      color: "[#22c55e]"
    }
  ];

  const handleProfileClick = () => {
    if (isConnected && isXConnected && userProfile) {
      navigate(`/profile/${userProfile.walletAddress}`);
      setIsOpen(false);
    }
  };

  const handleLearn = () => {
    window.open('http://docs.potionleaderboard.com/', '_blank', 'noopener,noreferrer');
    
    toast("📚 Documentation opened in new tab", {
      description: "Continue browsing while reading the docs!",
      duration: 2000,
    });
  };

  const handlePrizes = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.1 },
      colors: ['#8B5CF6', '#D946EF', '#22c55e', '#0EA5E9', '#F97316'],
    });

    toast("🪅 Coming Soon! 🎊", {
      description: "The Prizes section will be available in the next update. 🎯🎉",
      duration: 2000,
    });
  };

  const defaultProfilePicture = "https://api.dicebear.com/7.x/pixel-art/svg?seed=potion-trader&colors=8B5CF6,9B87F5,D946EF";

  const navigationItems = [
    { label: "Leaderboards", path: "/", onClick: () => setIsOpen(false) },
    { label: "Learn", onClick: () => { handleLearn(); setIsOpen(false); } },
    { label: "Prizes", onClick: () => { handlePrizes(); setIsOpen(false); } },
  ];

  return (
    <div className="pt-2">
      {isConnected && showAlert && (
        <Carousel
          ref={emblaRef}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            duration: 20,
            skipSnaps: false,
          }}
        >
          <CarouselContent>
            {alerts.map((alert, index) => (
              <CarouselItem key={index}>
                <AlertContent {...alert} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
          {!isMobile && (
            <nav>
              <ul className="flex gap-8">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    {item.path ? (
                      <Link 
                        to={item.path} 
                        className="text-white hover:text-primary transition-colors"
                        onClick={item.onClick}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button 
                        onClick={item.onClick}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  {navigationItems.map((item, index) => (
                    <div key={index} className="px-2">
                      {item.path ? (
                        <Link 
                          to={item.path} 
                          className="text-lg text-white hover:text-primary transition-colors"
                          onClick={item.onClick}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button 
                          onClick={item.onClick}
                          className="text-lg text-muted-foreground hover:text-white transition-colors"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                  
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
                            onClick={() => { connectX(); setIsOpen(false); }}
                            variant="outline" 
                            className="text-white"
                          >
                            Connect X
                          </Button>
                        )}
                        <button 
                          onClick={handleProfileClick}
                          className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                          <img 
                            src={isXConnected ? userProfile?.profilePicture : defaultProfilePicture} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20" 
                          />
                          <span className="text-white">Profile</span>
                        </button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => { connectWallet(); setIsOpen(false); }}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
