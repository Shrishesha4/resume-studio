"use client";

import type { ResumeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { format, parseISO } from 'date-fns';

type ResumePreviewProps = {
  data: ResumeData;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Present';
  try {
    return format(parseISO(dateString), 'MMM yyyy');
  } catch (error) {
    return dateString;
  }
};


export function ResumePreview({ data }: ResumePreviewProps) {
  const { profile, summary, experience, education } = data;

  return (
    <Card id="resume-preview" className="w-full max-w-[210mm] aspect-[1/1.414] mx-auto overflow-hidden">
      <CardContent className="p-8 lg:p-12 text-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            {profile.name || "Your Name"}
          </h1>
          <div className="flex items-center gap-x-4 gap-y-1 text-muted-foreground mt-2 flex-wrap justify-center">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </a>
            )}
            {profile.linkedin && (
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
                {profile.linkedin}
              </a>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-2">
              Summary
            </h2>
            <p className="text-foreground/90">
              {summary || "Your professional summary..."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experience?.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-base">{exp.title || "Job Title"}</h3>
                    <div className="text-sm text-muted-foreground">
                      <span>{formatDate(exp.startDate)}</span> - <span>{formatDate(exp.endDate)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline text-muted-foreground text-sm">
                    <p>{exp.company || "Company"}</p>
                    <p>{exp.location || "Location"}</p>
                  </div>
                  <ul className="list-disc list-outside pl-5 mt-1 space-y-1 text-foreground/80">
                    {exp.description?.split('\n').map((item, i) => item.trim() && <li key={i}>{item.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education?.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-base">{edu.degree || "Degree"}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(edu.graduationDate)}</p>
                  </div>
                  <div className="flex justify-between items-baseline text-muted-foreground text-sm">
                    <p>{edu.institution || "Institution"}</p>
                    <p>{edu.location || "Location"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
