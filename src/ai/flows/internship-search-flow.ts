'use server';
/**
 * @fileOverview AI-powered internship search flow.
 *
 * This file defines a Genkit flow that takes a search query and returns relevant internship listings
 * by leveraging an AI model to understand the user's intent and search a predefined list of internships.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import backendData from '@/../docs/backend.json';
import type { Internship } from '@/lib/definitions';

// Define the structure of the search tool's input
const internshipSearchToolSchema = z.object({
  query: z.string().describe("The search query. Can be a keyword, skill, company name, location, or role title."),
});

// Extract internships from the backend.json file
const allInternships: Internship[] = (backendData.firestore?.['/internships/{internshipId}']?.seed || []).map((internship: any) => ({
    id: internship.id,
    title: internship.title,
    description: internship.description,
    company: internship.company,
    sector: internship.sector,
    location: internship.location,
    capacity: internship.capacity,
    skillsRequired: internship.skillsRequired,
    applicationUrl: internship.applicationUrl,
}));


// Define the tool that the AI can use to search for internships
const searchInternshipsTool = ai.defineTool(
  {
    name: 'searchInternships',
    description: 'Searches for internships based on a query.',
    inputSchema: internshipSearchToolSchema,
    outputSchema: z.array(z.custom<Internship>()),
  },
  async ({ query }) => {
    if (!query || query.toLowerCase() === 'internships') {
      return allInternships;
    }
    
    const lowercasedQuery = query.toLowerCase();
    
    const filteredInternships = allInternships.filter(internship => {
      return (
        internship.title.toLowerCase().includes(lowercasedQuery) ||
        internship.company.toLowerCase().includes(lowercasedQuery) ||
        internship.description.toLowerCase().includes(lowercasedQuery) ||
        internship.location.toLowerCase().includes(lowercasedQuery) ||
        internship.sector.toLowerCase().includes(lowercasedQuery) ||
        internship.skillsRequired.some(skill => skill.toLowerCase().includes(lowercasedQuery))
      );
    });

    return filteredInternships;
  }
);

// Input schema for the main search flow
const InternshipSearchInputSchema = z.object({
  query: z.string().describe('The user\'s search query for an internship.'),
});
export type InternshipSearchInput = z.infer<typeof InternshipSearchInputSchema>;

// Output schema for the main search flow
const InternshipSearchOutputSchema = z.object({
  internships: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      company: z.string(),
      location: z.string(),
      description: z.string(),
      sector: z.string(),
      skillsRequired: z.array(z.string()),
      capacity: z.number().optional().default(1),
      applicationUrl: z.string().url().optional(),
    })
  ).describe('A list of relevant internship listings found.'),
});
export type InternshipSearchOutput = z.infer<typeof InternshipSearchOutputSchema>;


export async function getInternshipSearchResults(
  input: InternshipSearchInput
): Promise<InternshipSearchOutput> {
  return internshipSearchFlow(input);
}

const internshipSearchFlow = ai.defineFlow(
  {
    name: 'internshipSearchFlow',
    inputSchema: InternshipSearchInputSchema,
    outputSchema: InternshipSearchOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert internship search assistant. Use the provided tool to find internships based on the user's query.

      User query: "${input.query}"`,
      model: 'googleai/gemini-2.5-flash',
      tools: [searchInternshipsTool],
      output: {
        schema: InternshipSearchOutputSchema
      }
    });

    // If the model generates a text response with a list of internships, use it.
    if (llmResponse.output) {
      return llmResponse.output;
    }

    // Fallback in case the model doesn't directly return the structured output
    const toolCalls = llmResponse.toolCalls();
    if (toolCalls.length > 0) {
        const toolResults = await Promise.all(
            toolCalls.map(async (call) => {
                const result = await call.run();
                return result;
            })
        );
         return { internships: (toolResults[0] || []) as Internship[] };
    }
    
    // If all else fails, perform a manual search.
    const results = await searchInternshipsTool(input);
    return { internships: results };
  }
);

    