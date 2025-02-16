
import { Bot, Sparkles, Trophy, Rocket } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import { useLocation } from "react-router-dom";

interface AlertContentProps {
  icon: any;
  description: string;
  actionLabel: string;
  onAction: () => void;
  color: string;
  onDismiss: () => void;
}

const AlertContent = ({ 
  icon: Icon, 
  description, 
  actionLabel, 
  onAction, 
  color,
  onDismiss
}: AlertContentProps) => {
  const isMobile = useIsMobile();
  
  return (
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
          onClick={onDismiss}
          className="text-muted-foreground hover:text-white transition-colors text-xs"
        >
          {isMobile ? '×' : 'Dismiss'}
        </button>
      </div>
    </Alert>
  );
};

interface AlertCarouselProps {
  onDismiss: () => void;
  handleNovaClick: () => void;
  handleNewFeature: () => void;
  handleSponsorClick: () => void;
  connectX: () => void;
}

export const AlertCarousel = ({ 
  onDismiss,
  handleNovaClick,
  handleNewFeature,
  handleSponsorClick,
  connectX
}: AlertCarouselProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();

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

  const alerts = [
    {
      icon: Bot,
      description: isMobile ? "Trade on Nova" : "The Fastest All-In-One Trading Platform on Solana",
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

  return (
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
            <AlertContent {...alert} onDismiss={onDismiss} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
