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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
//import { useToast } from "@/hooks/use-toast";
import { addRecord } from "../utils/healthcare";
import {
  FileText,
  Shield,
  Upload,
  Calendar,
  User,
  Activity,
  Lock,
} from "lucide-react";

const useToast = () => {
  return {
    toast: ({
      title,
      description,
      variant,
    }: {
      title: string;
      description: string;
      variant?: string;
    }) => {
      console.log(`Toast: ${title} - ${description} (Variant: ${variant})`);
    },
  };
};

const AddRecord = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    doctor: "",
    hospital: "",
    description: "",
    diagnosis: "",
    medications: "",
    privateNotes: "",
    allergies: "",
    bloodType: "",
    vitalSigns: "",
  });

  const [contractData, setContractData] = useState({
    diagnosis: "",
    treatment: "",
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContractChange = (field: string, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate blockchain submission
    // await new Promise(resolve => setTimeout(resolve, 2000));
    //addRecord(...??)
    //
    console.log("recording to blockchain");
    await addRecord(0, contractData.diagnosis, contractData.treatment);

    toast({
      title: "Record Added Successfully",
      description:
        "Your medical record has been encrypted and stored on the blockchain.",
    });

    setIsSubmitting(false);
    setFormData({
      title: "",
      category: "",
      date: "",
      doctor: "",
      hospital: "",
      description: "",
      diagnosis: "",
      medications: "",
      privateNotes: "",
      allergies: "",
      bloodType: "",
      vitalSigns: "",
    });
    setContractData({
      diagnosis: "",
      treatment: "",
    });
    setFiles(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />

        <main className="flex-1 p-6 bg-gradient-subtle">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold">Add Medical Record</h1>
                <p className="text-muted-foreground">
                  Create a new blockchain-secured medical record
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

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    General details about the medical record
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Record Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="e.g., Annual Physical Exam"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">
                          Consultation
                        </SelectItem>
                        <SelectItem value="lab-results">Lab Results</SelectItem>
                        <SelectItem value="imaging">Imaging</SelectItem>
                        <SelectItem value="prescription">
                          Prescription
                        </SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor/Provider *</Label>
                    <Input
                      id="doctor"
                      value={formData.doctor}
                      onChange={(e) =>
                        handleInputChange("doctor", e.target.value)
                      }
                      placeholder="Dr. Sarah Chen"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <Input
                      id="hospital"
                      value={formData.hospital}
                      onChange={(e) =>
                        handleInputChange("hospital", e.target.value)
                      }
                      placeholder="MediChain Medical Center"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medical Details */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Medical Details
                  </CardTitle>
                  <CardDescription>
                    Clinical information and findings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Brief description of the medical record"
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) =>
                          handleInputChange("bloodType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) =>
                          handleInputChange("allergies", e.target.value)
                        }
                        placeholder="Known allergies"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vitalSigns">Vital Signs</Label>
                    <Input
                      id="vitalSigns"
                      value={formData.vitalSigns}
                      onChange={(e) =>
                        handleInputChange("vitalSigns", e.target.value)
                      }
                      placeholder="BP: 120/80, HR: 72, Temp: 98.6°F"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Private Information */}
              <Card className="animate-fade-in border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Private Information
                  </CardTitle>
                  <CardDescription>
                    This information will be encrypted and stored securely on
                    the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/*

                  <div className="space-y-2">
                    <Label htmlFor="privateNotes">Private Notes</Label>
                    <Textarea
                      id="privateNotes"
                      value={formData.privateNotes}
                      onChange={(e) =>
                        handleInputChange("privateNotes", e.target.value)
                      }
                      placeholder="Private medical notes, sensitive information, personal observations..."
                      rows={4}
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                  */}
                  {/*Diag and treatment for contract*/}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        value={contractData.diagnosis}
                        onChange={(e) =>
                          handleContractChange("diagnosis", e.target.value)
                        }
                        placeholder="Medical diagnosis or findings"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="treatment">treatment</Label>
                      <Textarea
                        id="treatment"
                        value={contractData.treatment}
                        onChange={(e) =>
                          handleContractChange("treatment", e.target.value)
                        }
                        placeholder="Prescribed treatment"
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.title ||
                    !formData.category ||
                    !formData.date ||
                    !formData.doctor
                  }
                  className="bg-transparent text-black"
                >
                  {isSubmitting ? (
                    <>
                      <Shield className="w-4 h-4 mr-2 animate-spin" />
                      Storing on Blockchain...
                    </>
                  ) : (
                    <></>
                  )}
                </Button>
                <Button onClick={handleSubmit} type="button" variant="outline">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AddRecord;
