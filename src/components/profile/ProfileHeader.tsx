
import { formatWalletAddress } from "../../utils/format";
import { ExternalLink } from "lucide-react";
import { Trader } from "../../types/trader";
import { useIsMobile } from "../../hooks/use-mobile";

interface ProfileHeaderProps {
  trader: Trader;
}

const ProfileHeader = ({ trader }: ProfileHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-full' : 'w-[360px]'} flex flex-col`}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8">
        <img 
          src={trader.profilePicture} 
          alt={trader.name} 
          className="w-24 h-24 sm:w-24 sm:h-24 rounded-full border-2 border-primary/20 shrink-0 mx-auto sm:mx-0"
        />
        <div className="flex flex-col justify-center min-w-0 text-center sm:text-left">
          <h1 className="font-bold mb-2 text-[length:var(--dynamic-text-size,36px)] whitespace-nowrap px-2 sm:px-0"
              style={{
                '--dynamic-text-size': 'clamp(20px, 2.5vw, 32px)'
              } as React.CSSProperties}
          >
            {trader.name}
          </h1>
          <span className="text-muted-foreground text-base truncate px-2 sm:px-0">
            {formatWalletAddress(trader.walletAddress)}
          </span>
        </div>
      </div>
      <div className="space-y-4 mt-auto w-full">
        <div className="glass-card p-4 h-[76px] rounded-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <span className="text-lg">X Account</span>
              <span className="truncate ml-2 max-w-[150px]">{trader.twitterHandle}</span>
            </div>
            <div className="flex justify-end mt-auto">
              <span className="text-muted-foreground text-sm">{(trader.followers / 1000).toFixed(0)}K followers</span>
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
