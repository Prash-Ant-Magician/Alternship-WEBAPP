'use server';

/**
 * @fileOverview A chatbot assistance AI agent.
 *
 * - chatbotAssistanceForQueries - A function that handles the chatbot assistance process.
 * - ChatbotAssistanceForQueriesInput - The input type for the chatbotAssistanceForQueries function.
 * - ChatbotAssistanceForQueriesOutput - The return type for the chatbotAssistanceForQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistanceForQueriesInputSchema = z.object({
  query: z.string().describe('The user query about the application.'),
});
export type ChatbotAssistanceForQueriesInput = z.infer<typeof ChatbotAssistanceForQueriesInputSchema>;

const ChatbotAssistanceForQueriesOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type ChatbotAssistanceForQueriesOutput = z.infer<typeof ChatbotAssistanceForQueriesOutputSchema>;

export async function chatbotAssistanceForQueries(input: ChatbotAssistanceForQueriesInput): Promise<ChatbotAssistanceForQueriesOutput> {
  return chatbotAssistanceForQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAssistanceForQueriesPrompt',
  input: {schema: ChatbotAssistanceForQueriesInputSchema},
  output: {schema: ChatbotAssistanceForQueriesOutputSchema},
  prompt: `You are a chatbot designed to answer questions about the Alternship application.

  Use the following information to answer the user's query. If you do not know the answer, say that you do not know.
  Be polite and helpful.
  Do not ask any clarifying question, answer the question as best as you can.
  Here is some information about the application:
  - The application is called Alternship.
  - The application is designed to help candidates find internships.
  - The application takes candidate's education, skills, sector interests, and location as input.
  - The application suggests 3-5 top internships based on candidate inputs, location, skills, and internship capacity of industries.
  - The application supports multiple languages.
  - The application allows users to create accounts and log in.
  - The application provides frequently asked questions and answers.

  Query: {{{query}}}`,
});

const chatbotAssistanceForQueriesFlow = ai.defineFlow(
  {
    name: 'chatbotAssistanceForQueriesFlow',
    inputSchema: ChatbotAssistanceForQueriesInputSchema,
    outputSchema: ChatbotAssistanceForQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
