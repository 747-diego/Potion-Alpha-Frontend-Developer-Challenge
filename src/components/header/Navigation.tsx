
import { Link } from "react-router-dom";
import { toast } from "sonner";
import confetti from 'canvas-confetti';

interface NavigationProps {
  isMobile: boolean;
  onItemClick?: () => void;
}

export const Navigation = ({ isMobile, onItemClick }: NavigationProps) => {
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

  const navigationItems = [
    { label: "Leaderboards", path: "/", onClick: onItemClick },
    { label: "Learn", onClick: () => { handleLearn(); onItemClick?.(); } },
    { label: "Prizes", onClick: () => { handlePrizes(); onItemClick?.(); } },
  ];

  if (isMobile) {
    return (
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
      </div>
    );
  }

  return (
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
  );
};
