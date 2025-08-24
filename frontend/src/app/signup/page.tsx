'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // ⬅️ Import useRouter
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Wallet, AlertCircle, UserPlus, ArrowRight, Calendar, Phone, User, Shield, Import } from "lucide-react";
import { WalletConnection } from "@/components/WalletConnection";
import Link from "next/link";
// --- Mock Components and Hooks for Self-Contained Demo ---

const WellChainLogo = ({ size = "lg" }) => {
  const textSize = size === "lg" ? "text-2xl" : "text-xl";
  return <div className={`font-bold ${textSize}`}>WellChain</div>;
};

const useToast = () => {
  return {
    toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
      console.log(`Toast: ${title} - ${description} (Variant: ${variant})`);
    }
  };
};

// --- Main SignUp Component ---
const SignUp = () => {
  const [step, setStep] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  // const [isProfileCreated, setIsProfileCreated] = useState(false); ⬅️ Remove this state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    bloodType: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    allergies: "",
    currentMedications: "",
    medicalConditions: ""
  });
  
  const router = useRouter(); // ⬅️ Initialize useRouter
  const { toast } = useToast();

  const handleWalletConnected = (address: string) => {
    setWalletConnected(true);
    setWalletAddress(address);
    setStep(2);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }

    // Simulate account creation
    toast({
      title: "Account Created Successfully!",
      description: "Welcome to WellChain. Redirecting to your dashboard...",
    });

    // ⬅️ Replace the mock navigation with an actual router push
    setTimeout(() => {
        router.push("/dashboard"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <WellChainLogo size="lg" />
          <h1 className="text-3xl font-bold mt-4 mb-2">
            Create Your WellChain Account
          </h1>
          <p className="">
            Join the future of healthcare with secure blockchain medical records.
          </p>
        </div>

        {/* Step 1: Wallet Connection */}
        {step === 1 && (
          <WalletConnection 
            onWalletConnected={handleWalletConnected}
            isConnected={walletConnected}
          />
        )}

        {/* Step 2: Medical Profile Creation */}
        {step === 2 && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Step 2: Create Your Medical Profile</CardTitle>
                  <CardDescription>
                    Fill in your medical information to create your secure blockchain profile.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      placeholder="e.g., A+, B-, O+"
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange("bloodType", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContactName"
                      placeholder="Emergency contact name"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    placeholder="Emergency contact phone"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any allergies (comma separated)"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentMedications">Current Medications</Label>
                  <Textarea
                    id="currentMedications"
                    placeholder="List current medications (comma separated)"
                    value={formData.currentMedications}
                    onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    placeholder="List any medical conditions (comma separated)"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                    rows={2}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Medical Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/signin">
                  <span className="text-primary hover:underline cursor-pointer">
                    Sign in here
                  </span>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SignUp;