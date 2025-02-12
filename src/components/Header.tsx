
import { Twitter, User } from "lucide-react";

const Header = () => {
  return (
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
        <button className="glass-card p-1 rounded-full hover:bg-secondary/80 transition-colors">
          <User className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
