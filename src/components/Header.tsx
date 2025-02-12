
import { Twitter, Sparkles, Share2 } from "lucide-react";
import { mockTraders } from "../data/mockTraders";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const Header = () => {
  const userProfile = mockTraders.find(trader => trader.name === "NomadEngineer");
  const [showAlert, setShowAlert] = useState(true);

  const handleConnectX = () => {
    toast("🎉 Coming Soon!", {
      description: "X account integration will be available shortly!",
      duration: 2000,
    });
  };

  return (
    <div>
      {showAlert && (
        <Alert className="mb-4 bg-primary/5 border-primary/20 flex items-center justify-between">
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
