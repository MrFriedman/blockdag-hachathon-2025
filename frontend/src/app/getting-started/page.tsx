// pages/getting-started.tsx (or app/getting-started/page.tsx)
"use client";

import { useState } from "react";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>;
    };
  }
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wallet, Shield, UserCheck, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/app/integrations/supabase/client";
import { toast } from "sonner";

const GettingStarted = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [profileCreated, setProfileCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    bloodType: "",
    allergies: "",
    currentMedications: "",
    medicalConditions: "",
    emergencyContactName: "",
    emergencyContactPhone: ""
  });

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        toast("Wallet Connected", {
          description: "Your e-wallet has been successfully connected!",
        });
      } else {
        toast("Wallet Not Found", {
          description: "Please install MetaMask or another Web3 wallet to continue.",
          action: {
            label: "Dismiss",
            onClick: () => console.log("Dismissed"),
          },
          duration: 5000,
        });
      }
    } catch (error) {
      toast("Connection Failed", {
        description: "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createMedicalProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast("Authentication Required", {
          description: "Please sign in to create your medical profile.",
          style: { backgroundColor: "red", color: "white" }
        });
        return;
      }

      const { error } = await supabase.from('medical_profiles').insert({
        user_id: user.id,
        wallet_address: walletAddress,
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        blood_type: formData.bloodType || null,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
        current_medications: formData.currentMedications ? formData.currentMedications.split(',').map(s => s.trim()) : [],
        medical_conditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(s => s.trim()) : [],
        emergency_contact_name: formData.emergencyContactName || null,
        emergency_contact_phone: formData.emergencyContactPhone || null
      });

      if (error) throw error;

      setProfileCreated(true);
      toast("Profile Created!", {
        description: "Your medical profile has been securely stored on the blockchain.",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to create medical profile. Please try again.",
        style: { backgroundColor: "red", color: "white" }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text mb-4">Getting Started with WellChain</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connect your e-wallet and create your secure medical profile to begin your journey with blockchain healthcare.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Connect Wallet */}
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${walletConnected ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}>
                  {walletConnected ? <CheckCircle className="h-5 w-5" /> : <Wallet className="h-5 w-5" />}
                </div>
                Step 1: Connect Your E-Wallet
              </CardTitle>
              <CardDescription>
                Connect your blockchain wallet to securely store and manage your medical records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!walletConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Secure & Private</h3>
                      <p className="text-sm text-muted-foreground">Your data is encrypted and stored on the blockchain</p>
                    </div>
                  </div>
                  <Button onClick={connectWallet} variant="default" size="lg" className="w-full">
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect E-Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Wallet Connected Successfully!</h3>
                      <p className="text-sm text-muted-foreground font-mono">{walletAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Create Medical Profile */}
          <Card className={`shadow-strong transition-all duration-300 ${!walletConnected ? 'opacity-50' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${profileCreated ? 'bg-primary text-white' : walletConnected ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {profileCreated ? <CheckCircle className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                </div>
                Step 2: Create Your Medical Profile
              </CardTitle>
              <CardDescription>
                {!walletConnected
                  ? "Connect your wallet first to continue with profile creation."
                  : "Fill in your medical information to create your secure blockchain profile."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!profileCreated ? (
                <form onSubmit={createMedicalProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={!walletConnected}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!walletConnected}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        value={formData.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        placeholder="e.g., A+, B-, O+"
                        disabled={!walletConnected}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="Emergency contact name"
                        disabled={!walletConnected}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder="Emergency contact phone"
                        disabled={!walletConnected}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        placeholder="List any allergies (comma separated)"
                        disabled={!walletConnected}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentMedications">Current Medications</Label>
                      <Textarea
                        id="currentMedications"
                        value={formData.currentMedications}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('currentMedications', e.target.value)}
                        placeholder="List current medications (comma separated)"
                        disabled={!walletConnected}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea
                        id="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('medicalConditions', e.target.value)}
                        placeholder="List any medical conditions (comma separated)"
                        disabled={!walletConnected}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={!walletConnected || !formData.fullName || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Creating Profile..."
                    ) : (
                      <>
                        Create Medical Profile
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-4 p-6 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold text-primary">Profile Created Successfully!</h3>
                      <p className="text-muted-foreground">Your medical profile is now securely stored on the blockchain.</p>
                    </div>
                  </div>
                  <Button variant="default" size="lg" onClick={() => window.location.href = '/'}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;