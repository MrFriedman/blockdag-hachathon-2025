"use client";

import { getPatientRecords } from "@/app/utils/healthcare";
import mockRecord from "@/data/mockRecords.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { FileText, Shield, Activity, Lock, Upload } from "lucide-react";
import { useState } from "react";
import RecordsList from "@/components/RecordList";

// const [userRecord, setUserRecord] = useState("");

interface Props {
  params: {
    userId: string;
    recordId: string;
  };
}

interface MedicalRecord {
  id: number;
  userId: number;
  title: string;
  date: string;
  description: string;
  diagnosis: string;
  medications: string;
  bloodType: string;
  allergies: string;
  vitalSigns: string;
  hospital: string;
  doctor: string;
}

const ShowRecord = ({ params }: Props) => {
  const { userId, recordId:number } = params;

  // Get the matching record for this user & recordId
  const record = mockRecord as MedicalRecord[];
  if (!record) {
    return (
      <div className="p-6">
        <p className="text-red-500">Record not found</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />

        <main className="flex-1 p-6 bg-gradient-subtle">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold">Medical Record</h1>
                <p className="text-muted-foreground">
                  Viewing blockchain-secured record for {userId}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-medical-success/10 text-medical-success border-medical-success/20"
            >
              <Shield className="w-3 h-3 mr-1" />
              Blockchain Secured
            </Badge>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>General details</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Field label="Title" value={record[recordId].title} />
                <Field label="Category" value={record[recordId].category} />
                <Field label="Date" value={record[recordId].date} />
                <Field label="Doctor" value={record[recordId].doctor} />
                <Field label="Hospital/Clinic" value={record[recordId].hospital} />
              </CardContent>
            </Card>

            {/* Medical Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Medical Details
                </CardTitle>
                <CardDescription>Clinical information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Description" value={record[recordId].description} />
                <Field label="Diagnosis" value={record[recordId].diagnosis} />
                <Field label="Medications" value={record[recordId].medications} />
                <Field label="Blood Type" value={record[recordId].bloodType} />
                <Field label="Allergies" value={record[recordId].allergies} />
                <Field label="Vital Signs" value={record[recordId].vitalSigns} />
              </CardContent>
            </Card>

            {/* Private Information */}
            <Card className="border-accent/20">
              <RecordsList />
              {/*
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  Private Information
                </CardTitle>
                <CardDescription className="text-accent/80">
                  Encrypted & securely stored
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Private Notes" value={record.privateNotes} />
                <Field label="Treatment" value={record.treatment} />
              </CardContent>
              <CardContent className="space-y-4">
              </CardContent>
                */}
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-lg font-medium">{value || "—"}</p>
  </div>
);

export default ShowRecord;
