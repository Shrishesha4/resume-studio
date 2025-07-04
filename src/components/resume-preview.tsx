"use client";

import type { ResumeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { cn } from "@/lib/utils";

type ResumePreviewProps = {
  data: ResumeData;
  fontSize: number;
  textAlign: "left" | "center" | "right" | "justify";
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Present';
  try {
    return format(parseISO(dateString), 'MMM yyyy');
  } catch (error) {
    return dateString;
  }
};


export function ResumePreview({ data, fontSize, textAlign }: ResumePreviewProps) {
  const { profile, summary, experience, education, customSections } = data;

  return (
    <Card 
      id="resume-preview" 
      className={cn(
        "w-full max-w-[210mm] lg:aspect-[1/1.414] mx-auto overflow-y-auto lg:overflow-hidden max-h-[calc(100vh-10rem)] lg:max-h-none",
        `text-${textAlign}`
      )} 
      style={{fontSize: `${fontSize}px`}}
    >
      <CardContent className="p-8 lg:p-12 [font-size:0.875em]">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="font-bold tracking-tight text-primary [font-size:2.25em]">
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
          {summary && (
            <div>
              <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-2 [font-size:1.125em]">
                Summary
              </h2>
              <p className="text-foreground/90">
                {summary}
              </p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div>
              <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3 [font-size:1.125em]">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold [font-size:1em]">{exp.title || "Job Title"}</h3>
                      <div className="text-muted-foreground [font-size:0.875em]">
                        <span>{formatDate(exp.startDate)}</span> - <span>{formatDate(exp.endDate)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground [font-size:0.875em]">
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
          )}
          
          {customSections &&
            customSections.length > 0 &&
            customSections.map((section, index) => {
              if (!section.title && !section.content) return null;

              if (section.layout === "grid" && section.columns && section.columns > 0) {
                const items =
                  section.content
                    ?.split("\n")
                    .map((s) => s.trim().replace(/^- /, ""))
                    .filter((s) => s) || [];

                const maxItems =
                  section.rows && section.rows > 0
                    ? section.columns * section.rows
                    : items.length;
                const limitedItems = items.slice(0, maxItems);

                return (
                  <div key={index}>
                    <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3 [font-size:1.125em]">
                      {section.title}
                    </h2>
                    <div
                      className="grid gap-x-4 gap-y-1 text-foreground/90"
                      style={{
                        gridTemplateColumns: `repeat(${section.columns}, minmax(0, 1fr))`,
                      }}
                    >
                      {limitedItems.map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  </div>
                );
              }

              if (section.layout === "paragraph") {
                return (
                  <div key={index}>
                    <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3 [font-size:1.125em]">
                      {section.title}
                    </h2>
                    <p className="text-foreground/90 whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                );
              }
              
              // Default to list view
              return (
                <div key={index}>
                  <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3 [font-size:1.125em]">
                    {section.title}
                  </h2>
                  <ul className="list-disc list-outside pl-5 mt-1 space-y-1 text-foreground/80">
                    {section.content
                      ?.split("\n")
                      .map(
                        (item, i) =>
                          item.trim() && (
                            <li key={i}>{item.replace(/^- /, "")}</li>
                          )
                      )}
                  </ul>
                </div>
              );
            })}

          {education && education.length > 0 && (
            <div>
              <h2 className="font-semibold uppercase tracking-wider text-primary border-b-2 border-primary pb-1 mb-3 [font-size:1.125em]">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold [font-size:1em]">{edu.degree || "Degree"}</h3>
                      <p className="text-muted-foreground [font-size:0.875em]">{formatDate(edu.graduationDate)}</p>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground [font-size:0.875em]">
                      <p>{edu.institution || "Institution"}</p>
                      <p>{edu.location || "Location"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
