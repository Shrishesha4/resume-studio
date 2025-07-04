"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { resumeSchema, type ResumeData } from "@/lib/types";
import { ResumeForm } from "@/components/resume-form";
import { ResumePreview } from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Wand2, FileDown, Briefcase } from "lucide-react";
import { enhanceResumeAction } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const defaultValues: ResumeData = {
  profile: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/johndoe",
  },
  summary:
    "A highly motivated and results-oriented software engineer with over 5 years of experience in developing and deploying web applications. Proficient in JavaScript, React, and Node.js. Seeking to leverage my skills to contribute to a dynamic and innovative team.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2021-01-01",
      endDate: "Present",
      description:
        "- Led the development of a new customer-facing dashboard, resulting in a 20% increase in user engagement.\n- Mentored junior engineers and conducted code reviews to ensure high-quality code.\n- Collaborated with product managers to define project requirements and timelines.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationDate: "2019-05-20",
    },
  ],
  customSections: [],
};

export default function Home() {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(14);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    suggestions: string;
    improvedResumeContent: string;
  } | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
  });

  const resumeData = form.watch();

  const handlePrint = () => {
    window.print();
  };

  const handleEnhance = async () => {
    setIsAiLoading(true);
    try {
      const result = await enhanceResumeAction(resumeData);
      if (result) {
        setAiResult(result);
        setIsAiModalOpen(true);
      } else {
        throw new Error("Failed to get AI suggestions.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "There was a problem enhancing your resume. Please try again later.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="main-header bg-background shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap sm:flex-nowrap h-auto sm:h-16 items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <Briefcase className="h-6 w-6 text-primary" />
              <h1>ResumeCraft</h1>
            </div>
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-end w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <label htmlFor="font-size-slider" className="text-sm font-medium text-muted-foreground">Font Size</label>
                <Slider
                  id="font-size-slider"
                  defaultValue={[14]}
                  min={10}
                  max={20}
                  step={1}
                  className="w-24"
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleEnhance}
                  disabled={isAiLoading}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isAiLoading ? "Enhancing..." : "Enhance with AI"}
                </Button>
                <Button onClick={handlePrint}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:py-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="resume-form-section">
          <ResumeForm form={form} />
        </div>
        <div className="resume-preview-section mt-8 lg:mt-0">
          <div className="sticky top-20">
            <ResumePreview data={resumeData} fontSize={fontSize} />
          </div>
        </div>
      </main>

      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>AI-Powered Suggestions</DialogTitle>
            <DialogDescription>
              Here are suggestions to improve your resume. You can review them
              and update your resume manually.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-hidden">
            <Tabs defaultValue="suggestions" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="improved">Improved Full Text</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions" className="flex-grow overflow-auto p-4 border rounded-md mt-2">
                 <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: aiResult?.suggestions.replace(/\n/g, '<br />') ?? '' }}
                  />
              </TabsContent>
              <TabsContent value="improved" className="flex-grow overflow-auto p-4 border rounded-md mt-2">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {aiResult?.improvedResumeContent}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
