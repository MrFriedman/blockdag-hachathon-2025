'use client';
// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Users,
  FileText,
  Heart,
  Lock,
  Zap,
  MessageSquare,
  Database,
  UserCheck
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import TrustIndicator from "@/components/TrustIndicator";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-black">
              MediChain
            </span>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Security</Button>
            <Button variant="ghost">Community</Button>
            <Button variant="secondary" onClick={() => window.location.href = '/getting-started'}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Your Health,{" "}
                  <span className="bg-clip-text text-transparent">
                    Your Data
                  </span>
                  <br />
                  Your Community
                </h1>
                <p className="text-xl text-foreground leading-relaxed">
                  Secure your medical records on the blockchain while connecting with a
                  supportive community of women. Take control of your health journey with
                  complete privacy and ownership.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="default" className="text-lg px-8 py-6" onClick={() => window.location.href = '/signup'}>
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => window.location.href = '/signin'}>
                  Login
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <TrustIndicator icon={Shield} label="Bank-level Security" />
                <TrustIndicator icon={Lock} label="Full Privacy Control" />
                <TrustIndicator icon={UserCheck} label="Women-focused Care" />
              </div>
            </div>
            <div className="relative">
              <Image
                src="/image7.svg"
                alt="Women's health technology platform"
                className="rounded-2xl shadow-strong animate-float"
                width={500} // Adjust width as needed
                height={500} // Adjust height as needed
                priority
              />
              <div className="absolute inset-0 gradient-hero opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Empowering Women's Health
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Combining cutting-edge blockchain technology with community support
              to revolutionize how women manage their health data.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Database}
              title="Blockchain Records"
              description="Store your medical records securely on the blockchain with complete ownership and control over your data."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Health Community"
              description="Connect with other women, share experiences, and get support from our caring health-focused community."
            />
            <FeatureCard
              icon={Shield}
              title="Privacy First"
              description="Your health information remains completely private and secure, accessible only to you and authorized providers."
            />
            <FeatureCard
              icon={FileText}
              title="Complete History"
              description="Maintain a comprehensive, tamper-proof record of your entire health journey in one secure location."
            />
            <FeatureCard
              icon={Users}
              title="Expert Network"
              description="Access a network of women's health specialists and get professional guidance when you need it."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Access"
              description="Access your records instantly from anywhere, share with providers securely, and maintain full control."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold">Built on Trust & Security</h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Your health data deserves the highest level of security and privacy protection.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center shadow-medium">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Blockchain Secured</h3>
              <p className="text-foreground">
                Immutable, decentralized storage ensures your data can never be altered or lost.
              </p>
            </Card>
            <Card className="p-8 text-center shadow-medium">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">End-to-End Encrypted</h3>
              <p className="text-foreground">
                Military-grade encryption protects your sensitive health information at all times.
              </p>
            </Card>
            <Card className="p-8 text-center shadow-medium">
              <UserCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">HIPAA Compliant</h3>
              <p className="text-foreground">
                Full compliance with healthcare privacy regulations and women's health standards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">MediChain</span>
              </div>
              <p className="text-muted-foreground">
                Empowering women with secure, blockchain-based healthcare solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Medical Records</li>
                <li>Health Community</li>
                <li>Privacy Center</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Health Resources</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MediChain. All rights reserved. Built for women's health and empowerment by Uluthandolwethu Ntshweni, Dylan Friedmann, Leo Kamhoot.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;