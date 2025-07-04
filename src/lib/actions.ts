
"use server";

import {
  suggestResumeImprovements,
  SuggestResumeImprovementsOutput,
} from "@/ai/flows/suggest-resume-improvements";
import type { ResumeData } from "@/lib/types";

function formatResumeData(data: ResumeData): string {
  let content = `Name: ${data.profile.name}\n`;
  content += `Email: ${data.profile.email}\n`;
  content += `Phone: ${data.profile.phone}\n`;
  if (data.profile.linkedin) {
    content += `LinkedIn: ${data.profile.linkedin}\n`;
  }

  content += `\n--- Summary ---\n${data.summary}\n`;

  content += `\n--- Experience ---\n`;
  data.experience.forEach((exp) => {
    content += `Title: ${exp.title}\n`;
    content += `Company: ${exp.company}\n`;
    content += `Location: ${exp.location}\n`;
    content += `Dates: ${exp.startDate} to ${exp.endDate || "Present"}\n`;
    content += `Description:\n${exp.description}\n\n`;
  });

  content += `\n--- Education ---\n`;
  data.education.forEach((edu) => {
    content += `Degree: ${edu.degree}\n`;
    content += `Institution: ${edu.institution}\n`;
    content += `Location: ${edu.location}\n`;
    content += `Graduation Date: ${edu.graduationDate}\n\n`;
  });

  return content;
}

export async function enhanceResumeAction(
  resumeData: ResumeData
): Promise<SuggestResumeImprovementsOutput | null> {
  try {
    const resumeContent = formatResumeData(resumeData);
    const result = await suggestResumeImprovements({ resumeContent });
    return result;
  } catch (error) {
    console.error("Error in enhanceResumeAction:", error);
    return null;
  }
}
