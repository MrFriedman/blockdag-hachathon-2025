"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import {
  Calendar,
  FileText,
  Heart,
  Users,
  Plus,
  Clock,
  User,
  Activity,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Chen",
      specialty: "Gynecologist",
      date: "March 15, 2024",
      time: "2:00 PM",
      type: "Follow-up",
    },
    {
      id: 2,
      doctor: "Dr. Maria Rodriguez",
      specialty: "General Practice",
      date: "March 20, 2024",
      time: "10:30 AM",
      type: "Annual Checkup",
    },
  ];

  const recentRecords = [
    {
      id: 1,
      title: "Annual Physical Exam",
      date: "March 1, 2024",
      doctor: "Dr. Jennifer Wong",
      status: "completed",
    },
    {
      id: 2,
      title: "Blood Work Results",
      date: "February 28, 2024",
      doctor: "Lab Services",
      status: "reviewed",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 border-b-2 border-primary/60 pb-2">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold">Medical Dashboard</h1>
                <p className="text-foreground">Your Health Records</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-medical-success/10 text-medical-success border-medical-success/20"
              >
                <Shield className="w-3 h-3 mr-1" />
                Blockchain Secured
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Total Records
                    </p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-foreground mt-1">
                      Secured on blockchain
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Blockchain Status
                    </p>
                    <p className="text-2xl font-bold text-medical-success">
                      Active
                    </p>
                    <p className="text-xs text-foreground mt-1">
                      All records synchronized
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-medical-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Upcoming Appointments
                    </p>
                    <p className="text-2xl font-bold">
                      {upcomingAppointments.length}
                    </p>
                    <p className="text-xs text-foreground mt-1">
                      Next: {upcomingAppointments[0]?.date}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>
                  Your scheduled medical appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 bg-gradient-card rounded-lg border border-primary/10 hover-scale"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{appointment.doctor}</p>
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest medical record updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-medical-success rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Blood work results added
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dr. Jennifer Wong • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Prescription updated
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dr. Sarah Chen • 1 day ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Annual checkup scheduled
                      </p>
                      <p className="text-xs text-muted-foreground">
                        System • 3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medical Records Section */}
          <Card className="animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    All Medical Records
                  </CardTitle>
                  <CardDescription>
                    Your complete blockchain-secured health history
                  </CardDescription>
                </div>
                <Button className="">
                  <Link href="/add-record" className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Record
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 bg-gradient-card rounded-lg border border-primary/10 hover-scale"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{record.title}</p>
                          <Badge
                            variant="outline"
                            className="bg-medical-success/10 text-medical-success border-medical-success/20"
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            Blockchain Verified
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {record.doctor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {record.date}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Hash: 0xa1b2c3...d4e5f6</span>
                          <span>Block: #147,829</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant={
                            record.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            record.status === "completed"
                              ? "bg-medical-success"
                              : ""
                          }
                        >
                          {record.status}
                        </Badge>
                        <Link href={"/users/0/records/" + record.id}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Integration Status */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    Blockchain Integration
                  </h3>
                  <p className="">
                    Your medical records are securely stored and encrypted on
                    the blockchain
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Network: Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Encryption: AES-256</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm">Synchronized</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

