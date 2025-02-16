
import { formatWalletAddress } from "../../utils/format";
import { ExternalLink, Copy } from "lucide-react";
import { Trader } from "../../types/trader";
import { useIsMobile } from "../../hooks/use-mobile";
import { toast } from "sonner";

interface ProfileHeaderProps {
  trader: Trader;
}

const ProfileHeader = ({ trader }: ProfileHeaderProps) => {
  const isMobile = useIsMobile();

  const formatFollowers = (followers: number) => {
    return followers >= 1000 
      ? `${(followers / 1000).toFixed(0)}K` 
      : followers.toString();
  };

  const getTwitterUrl = (handle: string) => {
    // Remove @ symbol if present
    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
    return `https://x.com/${cleanHandle}`;
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(trader.walletAddress);
      toast("Address copied to clipboard!", {
        duration: 2000,
      });
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'w-[360px]'} flex flex-col`}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8">
        <a 
          href={getTwitterUrl(trader.twitterHandle)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block cursor-pointer transition-opacity hover:opacity-80"
        >
          <img 
            src={trader.profilePicture} 
            alt={trader.name} 
            className="w-24 h-24 sm:w-24 sm:h-24 rounded-full border-2 border-primary/20 shrink-0 mx-auto sm:mx-0"
          />
        </a>
        <div className="flex flex-col justify-center min-w-0 text-center sm:text-left">
          <h1 className="font-bold mb-2 text-[length:var(--dynamic-text-size,36px)] whitespace-nowrap px-2 sm:px-0"
              style={{
                '--dynamic-text-size': 'clamp(20px, 2.5vw, 32px)'
              } as React.CSSProperties}
          >
            {trader.name}
          </h1>
          <button
            onClick={handleCopyAddress}
            className="text-muted-foreground text-base truncate px-2 sm:px-0 hover:text-primary flex items-center gap-2 mx-auto sm:mx-0 transition-colors"
          >
            <span>{formatWalletAddress(trader.walletAddress)}</span>
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="space-y-4 mt-auto w-full">
        <a 
          href={getTwitterUrl(trader.twitterHandle)}
          target="_blank"
          rel="noopener noreferrer"
          className="block glass-card p-4 h-[76px] rounded-lg cursor-pointer hover:bg-primary/5 transition-colors group"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <span className="text-lg">X Account</span>
              <span className="truncate ml-2 max-w-[150px] transition-colors text-muted-foreground group-hover:text-[#D946EF] group-hover:brightness-125">{trader.twitterHandle}</span>
            </div>
            <div className="flex justify-end mt-auto">
              <span className="text-muted-foreground text-sm">{formatFollowers(trader.followers)} followers</span>
            </div>
          </div>
        </a>
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
