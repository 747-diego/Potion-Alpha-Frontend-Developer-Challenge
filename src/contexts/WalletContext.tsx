
import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WalletContextType {
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  showConnectModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const connectWallet = () => {
    setIsConnected(true);
    setShowModal(false);
    toast.success("Wallet connected successfully!");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  const showConnectModal = () => {
    setShowModal(true);
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        connectWallet, 
        disconnectWallet,
        showConnectModal 
      }}
    >
      {children}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              You need to connect your wallet to access this feature.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={connectWallet}>
              Connect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
