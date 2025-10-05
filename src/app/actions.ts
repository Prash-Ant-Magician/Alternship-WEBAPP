'use server';

import {
  getInternshipRecommendations,
  type InternshipRecommendationOutput,
} from '@/ai/flows/internship-recommendation-engine';
import {
  chatbotAssistanceForQueries,
} from '@/ai/flows/chatbot-assistance-for-queries';
import {
  translateText,
} from '@/ai/flows/translate-text-flow';
import {
  getInternshipSearchResults,
  type InternshipSearchOutput,
} from '@/ai/flows/internship-search-flow';
import { recommendationFormSchema, type RecommendationFormValues, contactFormSchema, type ContactFormValues } from '@/lib/definitions';

type FormattedInternshipRecommendationOutput = {
  recommendations: InternshipRecommendationOutput['recommendations'];
} | { error: string };

export async function handleRecommendationRequest(
  values: RecommendationFormValues
): Promise<FormattedInternshipRecommendationOutput> {
  const validatedFields = recommendationFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid input.' };
  }

  const { education, skills, sectorInterests, location, affirmativeAction } = validatedFields.data;

  try {
    const recommendations = await getInternshipRecommendations({
      education,
      skills: skills.split(',').map(s => s.trim()).filter(s => s),
      sectorInterests: sectorInterests.split(',').map(s => s.trim()).filter(s => s),
      location,
      affirmativeAction,
    });
    return recommendations;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get recommendations. Please try again.' };
  }
}

export async function handleChatbotQuery(query: string): Promise<string> {
    if (!query) {
        return "Please enter a message.";
    }
    try {
        const response = await chatbotAssistanceForQueries({ query });
        return response.answer;
    } catch (e) {
        console.error(e);
        return "I'm sorry, I'm having trouble connecting. Please try again later.";
    }
}

export async function handleTranslation(text: string, targetLanguage: string): Promise<string> {
  if (!text) {
    return "";
  }
  try {
    const response = await translateText({ text, targetLanguage });
    return response.translation;
  } catch (e) {
    console.error(e);
    return text; // Return original text if translation fails
  }
}

export async function handleContactRequest(values: ContactFormValues): Promise<{success: boolean, error?: string}> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Contact form validation failed:", validatedFields.error);
    return { success: false, error: 'Invalid input.' };
  }
  
  // Here you would implement your email sending logic.
  // For now, we'll just log it to the server console.
  console.log("New contact form submission:");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);
  console.log("---");

  // Simulate a successful submission
  return { success: true };
}

export async function handleSearchRequest(query: string): Promise<InternshipSearchOutput | { error: string }> {
  if (!query) {
    // Return a default set of popular internships if query is empty
     try {
        const results = await getInternshipSearchResults({ query: "popular internships" });
        return results;
      } catch (e: any) {
        console.error(e);
        return { error: e.message || 'Failed to get search results. Please try again.' };
      }
  }
  try {
    const results = await getInternshipSearchResults({ query });
    return results;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to get search results. Please try again.' };
  }
}
