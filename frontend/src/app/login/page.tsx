// app/login/page.tsx or components/Login.tsx
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-orange-gradient">
      <Card className="p-8 shadow-strong w-full max-w-lg">
        <h2 className="text-3xl font-bold bg-clip-text mb-6 text-center">
          Login Form
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          Please enter your login details here
        </p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">User Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              type="text"
            />
          </div>
          <div className="pb-5">
            <Label htmlFor="password">User Password</Label>
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
            />
          </div>
          <Button asChild size="lg" variant="default" className="w-full text-lg px-8 py-6">
            <Link href="/dashboard">
              Login
            </Link>
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-center text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link href="/getting-started" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}