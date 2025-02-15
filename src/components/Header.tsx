
import { Twitter, Sparkles, Share2, Trophy, Rocket, Bot } from "lucide-react";
import { mockTraders } from "../data/mockTraders";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';

const Header = () => {
  const userProfile = mockTraders.find(trader => trader.name === "NomadEngineer");
  const [showAlert, setShowAlert] = useState(true);
  
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

  const handleConnectX = () => {
    toast("🎉 Coming Soon!", {
      description: "X account integration will be available shortly!",
      duration: 2000,
    });
  };

  const handleNewFeature = () => {
    toast("🚀 Try it now!", {
      description: "Check out our new trading analytics dashboard!",
      duration: 2000,
    });
  };

  const handleSponsorClick = () => {
    toast("🏆 Featured Trader!", {
      description: "Follow NomadEngineer for daily trading insights!",
      duration: 2000,
    });
  };

  const handleNovaClick = () => {
    window.open("https://tradeonnova.net/", "_blank");
  };

  return (
    <div className="pt-2">
      {showAlert && (
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
            <CarouselItem>
              <Alert className="mb-4 bg-primary/5 border-primary/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                  <AlertDescription className="text-white flex items-center gap-2">
                    <span>Seamlessly trade any token on Solana with total control.</span>
                    <span>🤖</span>
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleNovaClick}
                    className="text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-colors"
                  >
                    Trade on Nova
                  </button>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-muted-foreground hover:text-white transition-colors text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </Alert>
            </CarouselItem>

            <CarouselItem>
              <Alert className="mb-4 bg-[#0EA5E9]/5 border-[#0EA5E9]/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#0EA5E9] animate-pulse" />
                  <AlertDescription className="text-white flex items-center gap-2">
                    <span>Share your trading journey on</span>
                    <Twitter className="h-4 w-4 inline" />
                    <span className="font-medium">X</span>
                    <Share2 className="h-4 w-4 text-[#0EA5E9] inline" />
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleConnectX}
                    className="text-xs px-3 py-1.5 bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9] rounded-full transition-colors"
                  >
                    Connect X
                  </button>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-muted-foreground hover:text-white transition-colors text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </Alert>
            </CarouselItem>

            <CarouselItem>
              <Alert className="mb-4 bg-[#F97316]/5 border-[#F97316]/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#F97316] animate-pulse" />
                  <AlertDescription className="text-white flex items-center gap-2">
                    <span>New Feature:</span>
                    <span className="font-medium">Advanced Trading Analytics</span>
                    <span>is now live! 📊</span>
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleNewFeature}
                    className="text-xs px-3 py-1.5 bg-[#F97316]/20 hover:bg-[#F97316]/30 text-[#F97316] rounded-full transition-colors"
                  >
                    Try Now
                  </button>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-muted-foreground hover:text-white transition-colors text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </Alert>
            </CarouselItem>

            <CarouselItem>
              <Alert className="mb-4 bg-[#22c55e]/5 border-[#22c55e]/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#22c55e] animate-pulse" />
                  <AlertDescription className="text-white flex items-center gap-2">
                    <span>Weekly Featured Trader:</span>
                    <span className="font-medium">NomadEngineer</span>
                    <img 
                      src={userProfile?.profilePicture}
                      alt="NomadEngineer"
                      className="h-5 w-5 rounded-full inline-block"
                    />
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSponsorClick}
                    className="text-xs px-3 py-1.5 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] rounded-full transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-muted-foreground hover:text-white transition-colors text-xs"
                  >
                    Dismiss
                  </button>
                </div>
              </Alert>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )}
      <header className="glass-card px-8 py-6 flex items-center justify-between mb-8 rounded-2xl border border-white/10 hover:border-primary/20 transition-colors duration-300 bg-card/80 shadow-[inset_-12px_-12px_24px_rgba(255,255,255,0.04),inset_12px_12px_24px_rgba(0,0,0,0.2)] hover:shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.06),inset_8px_8px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-10">
          <img 
            src="/lovable-uploads/72b222aa-ea1a-43f5-acb1-b2ce7eda0713.png" 
            alt="Potion Leaderboard" 
            className="h-20 animate-fade-in hover:scale-105 transition-transform duration-300" 
          />
          <nav>
            <ul className="flex gap-8">
              <li>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  Leaderboards
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Learn
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Prizes
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <button className="glass-card p-1 rounded-full hover:bg-secondary/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <img 
              src={userProfile?.profilePicture} 
              alt="Profile" 
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300" 
            />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
