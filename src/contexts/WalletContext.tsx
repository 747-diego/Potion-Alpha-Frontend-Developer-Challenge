
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WalletContextType {
  isConnected: boolean;
  isXConnected: boolean;
  xUsername: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  showConnectModal: () => void;
  connectX: () => void;
  disconnectX: () => void;
}

const WalletContext = React.createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isXConnected, setIsXConnected] = React.useState(false);
  const [xUsername, setXUsername] = React.useState("@NomadEngineer");
  const [showModal, setShowModal] = React.useState(false);

  const connectWallet = () => {
    setIsConnected(true);
    setShowModal(false);
    toast.success("Wallet connected successfully!");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setIsXConnected(false);
    setXUsername("");
    toast.info("Wallet disconnected");
  };

  const connectX = () => {
    setIsXConnected(true);
    setXUsername("@NomadEngineer");
    toast("🎉 X Connected!", {
      description: "Your X account has been linked successfully!",
      duration: 2000,
    });
  };

  const disconnectX = () => {
    setIsXConnected(false);
    setXUsername("");
    toast.info("X account disconnected");
  };

  const showConnectModal = () => {
    setShowModal(true);
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        isXConnected,
        xUsername,
        connectWallet, 
        disconnectWallet,
        showConnectModal,
        connectX,
        disconnectX
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
  const context = React.useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
