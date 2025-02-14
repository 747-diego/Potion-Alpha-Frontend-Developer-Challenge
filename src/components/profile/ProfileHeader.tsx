
import { formatWalletAddress } from "../../utils/format";
import { ExternalLink } from "lucide-react";
import { Trader } from "../../types/trader";

interface ProfileHeaderProps {
  trader: Trader;
}

const ProfileHeader = ({ trader }: ProfileHeaderProps) => {
  return (
    <div className="w-[320px] flex flex-col">
      <div className="flex gap-6 mb-8">
        <img 
          src={trader.profilePicture} 
          alt={trader.name} 
          className="w-28 h-28 rounded-full border-2 border-primary/20"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">Orangie</h1>
          <span className="text-muted-foreground text-base">
            {formatWalletAddress(trader.walletAddress)}
          </span>
        </div>
      </div>
      <div className="space-y-4 mt-auto">
        <div className="glass-card p-4 h-[76px] rounded-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <span className="text-lg">X Account</span>
              <span>@orangie</span>
            </div>
            <div className="flex justify-end mt-auto">
              <span className="text-muted-foreground text-sm">279K followers</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 h-[76px] rounded-lg">
          <div className="flex items-center justify-between h-full">
            <span className="text-lg">Last Trade</span>
            <div className="flex items-center gap-2">
              <span>30 min ago</span>
              <ExternalLink className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
