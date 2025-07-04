'use server';

/**
 * @fileOverview A resume enhancement AI agent.
 *
 * - suggestResumeImprovements - A function that handles the resume improvement process.
 * - SuggestResumeImprovementsInput - The input type for the suggestResumeImprovements function.
 * - SuggestResumeImprovementsOutput - The return type for the suggestResumeImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResumeImprovementsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be improved.'),
});
export type SuggestResumeImprovementsInput = z.infer<
  typeof SuggestResumeImprovementsInputSchema
>;

const SuggestResumeImprovementsOutputSchema = z.object({
  improvedResumeContent: z
    .string()
    .describe('The improved content of the resume.'),
  suggestions: z
    .string()
    .describe('Specific suggestions for improving the resume.'),
});
export type SuggestResumeImprovementsOutput = z.infer<
  typeof SuggestResumeImprovementsOutputSchema
>;

export async function suggestResumeImprovements(
  input: SuggestResumeImprovementsInput
): Promise<SuggestResumeImprovementsOutput> {
  return suggestResumeImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeImprovementsPrompt',
  input: {schema: SuggestResumeImprovementsInputSchema},
  output: {schema: SuggestResumeImprovementsOutputSchema},
  prompt: `You are an expert resume writer.

You will use this information to improve the resume content and provide suggestions for improvement.

Resume Content: {{{resumeContent}}}

Improve the resume content and provide specific suggestions for improvement. Return the improved resume content and suggestions.
`,
});

const suggestResumeImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestResumeImprovementsFlow',
    inputSchema: SuggestResumeImprovementsInputSchema,
    outputSchema: SuggestResumeImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
