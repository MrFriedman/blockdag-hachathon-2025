"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Wallet, AlertCircle } from "lucide-react";

// Extend the Window interface to include the ethereum property for MetaMask
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>;
    };
  }
}

interface WalletConnectionProps {
  onWalletConnected?: (address: string) => void;
  isConnected?: boolean;
}

export const WalletConnection = ({ onWalletConnected, isConnected: initialConnected = false }: WalletConnectionProps) => {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        setIsConnected(true);
        // Call the parent component's handler with the wallet address
        onWalletConnected?.(address);

        toast("Wallet Connected Successfully!", {
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        });
      } else {
        toast("Wallet Not Found", {
          description: "Please install a Web3 wallet like MetaMask to continue.",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      toast("Connection Failed", {
        description: "An error occurred while connecting. Please try again.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <Card className="bg-medical-success/10 border-medical-success/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-medical-success" />
            <div>
              <p className="font-medium text-medical-success">Wallet Connected Successfully!</p>
              <p className="text-sm text-muted-foreground">{walletAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Step 1: Connect Your E-Wallet</CardTitle>
            <CardDescription>
              Connect your blockchain wallet to securely store and manage your medical records.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm text-primary">
              <p className="font-medium">Secure & Private</p>
              <p>Your wallet address will be used to encrypt and secure your medical data on the blockchain.</p>
            </div>
          </div>

          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            size="lg"
            className="w-full"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
