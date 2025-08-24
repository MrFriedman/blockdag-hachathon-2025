"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Wallet, AlertCircle } from "lucide-react";
// Import the initContract function from your service file
import { initContract } from "@/app/utils/healthcare";

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
      // Use the initContract function from the service file
      const { account } = await initContract();
      
      setWalletAddress(account);
      setIsConnected(true);
      onWalletConnected?.(account);

      toast("Wallet Connected Successfully!", {
        description: `Connected to ${account.slice(0, 6)}...${account.slice(-4)}`,
      });
    } catch (error) {
      console.error("Connection failed:", error);
      toast("Connection Failed", {
        description: "Please ensure you have a Web3 wallet installed and try again.",
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