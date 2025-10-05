'use server';
/**
 * @fileOverview Internship recommendation engine flow.
 *
 * This file defines a Genkit flow that takes candidate information such as education, skills,
 * sector interests, and location as input, and returns personalized internship recommendations.
 *
 * @exports {function} getInternshipRecommendations - The main function to trigger the internship recommendation flow.
 * @exports {type} InternshipRecommendationInput - The input type for the getInternshipRecommendations function.
 * @exports {type} InternshipRecommendationOutput - The output type for the getInternshipRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for internship recommendations
const InternshipRecommendationInputSchema = z.object({
  education: z.string().describe('Highest level of education completed or college name.'),
  skills: z.array(z.string()).describe('List of skills possessed by the candidate.'),
  sectorInterests: z.array(z.string()).describe('List of sectors the candidate is interested in.'),
  location: z.string().describe('Preferred location for the internship.'),
  affirmativeAction: z.boolean().optional().describe('Whether the candidate is eligible for affirmative action policies.'),
  collegeTier: z.string().optional().describe('The tier of the candidate\'s college (e.g., Tier 1, 2, or 3).'),
});
export type InternshipRecommendationInput = z.infer<typeof InternshipRecommendationInputSchema>;

// Output schema for internship recommendations
const InternshipRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('Title of the internship.'),
      company: z.string().describe('Name of the company offering the internship.'),
      location: z.string().describe('Location of the internship.'),
      description: z.string().describe('Brief description of the internship.'),
      url: z.string().url().describe('URL to the internship application page.'),
      stipend: z.string().optional().describe('The monthly stipend for the internship.'),
    })
  ).describe('List of 10 recommended internships.'),
});
export type InternshipRecommendationOutput = z.infer<typeof InternshipRecommendationOutputSchema>;


/**
 * Wrapper function to trigger the internship recommendation flow.
 * @param {InternshipRecommendationInput} input - The input data for the flow.
 * @returns {Promise<InternshipRecommendationOutput>} - A promise resolving to the recommendation output.
 */
export async function getInternshipRecommendations(input: InternshipRecommendationInput): Promise<InternshipRecommendationOutput> {
  return internshipRecommendationFlow(input);
}

// Define the prompt for the internship recommendation engine
const internshipRecommendationPrompt = ai.definePrompt({
  name: 'internshipRecommendationPrompt',
  input: {schema: InternshipRecommendationInputSchema},
  output: {schema: InternshipRecommendationOutputSchema},
  prompt: `You are an AI internship recommendation engine. You take candidate information such as college, college tier, skills, sector interests, and location and provide a list of 10 relevant internship recommendations.

  Consider affirmative action policies, college tier, and the internship capacity of different industries when making recommendations.

  College: {{{education}}}
  College Tier: {{{collegeTier}}}
  Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Sector Interests: {{#each sectorInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Location: {{{location}}}
  Affirmative Action: {{affirmativeAction}}

  Here are your recommendations:
  {{output}}
  `,
});

// Define the Genkit flow for internship recommendations
const internshipRecommendationFlow = ai.defineFlow(
  {
    name: 'internshipRecommendationFlow',
    inputSchema: InternshipRecommendationInputSchema,
    outputSchema: InternshipRecommendationOutputSchema,
  },
  async input => {
    const {output} = await internshipRecommendationPrompt(input);
    return output!;
  }
);
