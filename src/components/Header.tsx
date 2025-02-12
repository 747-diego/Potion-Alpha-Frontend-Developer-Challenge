
import { Twitter, Sparkles, Share2, Trophy, Rocket } from "lucide-react";
import { mockTraders } from "../data/mockTraders";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

const Header = () => {
  const userProfile = mockTraders.find(trader => trader.name === "NomadEngineer");
  const [showAlert, setShowAlert] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: true,
  });

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Rotate every 3 seconds

      return () => {
        clearInterval(autoplay);
      };
    }
  }, [emblaApi]);

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

  return (
    <div>
      {showAlert && (
        <Carousel
          ref={emblaRef}
          className="w-full"
        >
          <CarouselContent className="-mt-1">
            <CarouselItem>
              <Alert className="mb-4 bg-primary/5 border-primary/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <AlertDescription className="text-white flex items-center gap-2">
                    <span>Share your trading journey on</span>
                    <Twitter className="h-4 w-4 inline" />
                    <span className="font-medium">X</span>
                    <Share2 className="h-4 w-4 text-primary inline" />
                  </AlertDescription>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleConnectX}
                    className="text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-colors"
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
      <header className="glass-card px-6 py-4 flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          <img src="/lovable-uploads/240c5e93-4b1a-442b-bdf6-5dd94c16e354.png" alt="Potion Leaderboard" className="h-10" />
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
          <button className="glass-card p-0.5 rounded-full hover:bg-secondary/80 transition-colors">
            <img 
              src={userProfile?.profilePicture} 
              alt="Profile" 
              className="h-7 w-7 rounded-full object-cover"
            />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
