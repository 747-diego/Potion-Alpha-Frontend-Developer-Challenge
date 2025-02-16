
import { Bot, Sparkles, Trophy, Rocket } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          text: "text-primary",
          button: "bg-primary/20 hover:bg-primary/30 text-primary"
        };
      case "[#0EA5E9]":
        return {
          bg: "bg-[#0EA5E9]/5",
          border: "border-[#0EA5E9]/20",
          text: "text-[#0EA5E9]",
          button: "bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9]"
        };
      case "[#F97316]":
        return {
          bg: "bg-[#F97316]/5",
          border: "border-[#F97316]/20",
          text: "text-[#F97316]",
          button: "bg-[#F97316]/20 hover:bg-[#F97316]/30 text-[#F97316]"
        };
      case "[#22c55e]":
        return {
          bg: "bg-[#22c55e]/5",
          border: "border-[#22c55e]/20",
          text: "text-[#22c55e]",
          button: "bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e]"
        };
      default:
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          text: "text-primary",
          button: "bg-primary/20 hover:bg-primary/30 text-primary"
        };
    }
  };

  const colorClasses = getColorClasses(color);
  
  return (
    <Alert className={`mb-4 ${colorClasses.bg} ${colorClasses.border} flex items-center justify-between ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3.5'} animate-fade-in`}>
      <div className="flex items-center gap-2">
        <Icon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${colorClasses.text} animate-pulse`} />
        <AlertDescription className="text-white flex items-center gap-2">
          <span className={isMobile ? 'text-base' : 'text-lg'}>{description}</span>
          {description.includes("Weekly Featured Trader") && (
            <Avatar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}>
              <AvatarImage src="https://pbs.twimg.com/profile_images/581598147119480832/XG7Qa1hr_400x400.jpg" />
              <AvatarFallback>NE</AvatarFallback>
            </Avatar>
          )}
        </AlertDescription>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onAction}
          className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 ${colorClasses.button} rounded-full transition-colors`}
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
      actionLabel: "Try Feature",
      onAction: handleNewFeature,
      color: "[#F97316]"
    },
    {
      icon: Trophy,
      description: `Weekly Featured Trader: ${isMobile ? 'NomadEngineer' : 'NomadEngineer'}`,
      actionLabel: "View Profile",
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
