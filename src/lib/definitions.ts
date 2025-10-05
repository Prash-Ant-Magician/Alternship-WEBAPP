import { z } from 'zod';

export const recommendationFormSchema = z.object({
  education: z.string().min(3, { message: 'Education is required.' }),
  skills: z.string().min(2, { message: 'Please list at least one skill.' }),
  sectorInterests: z.string().min(3, { message: 'Please list at least one sector.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  affirmativeAction: z.boolean().default(false).optional(),
});

export type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type InternshipRecommendation = {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  stipend?: string;
};

export type Internship = {
    id: string;
    title: string;
    company: string;
    sector: string;
    location: string;
    capacity: number;
    skillsRequired: string[];
    description: string;
}

export type FAQ = {
    id: string;
    question: string;
    answer: string;
}

export type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

export type UserProfile = {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'company';
  displayName?: string;
  photoURL?: string;
  skills?: string[];
  headline?: string;
  location?: string;
  availability?: string;
};

export type PortfolioItem = {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'Certificate' | 'Project' | 'Article' | 'Video' | 'Other';
  contentUrl: string;
  thumbnailUrl?: string;
  createdAt: any; // Using `any` for Firestore ServerTimestamp
}

export type Translations = {
  header: {
    home: string;
    interns: string;
    companies: string;
    about: string;
    faq: string;
    contact: string;
    login: string;
    signup: string;
    howItWorks: string;
    forCompanies: string;
    forInterns: string;
  };
  home: {
    find: string;
    your: string;
    internship: string;
    tagline: string;
    recommendationsAppearHere: string;
    fillFormToStart: string;
  };
  recommendationForm: {
    title: string;
    description: string;
    education: string;
    educationPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    skills: string;
    skillsPlaceholder: string;
    skillsDescription: string;
    sectorInterests: string;
    sectorInterestsPlaceholder: string;
    sectorInterestsDescription: string;
    affirmativeAction: string;
    affirmativeActionDescription: string;
    getRecommendations: string;
    findingInternships: string;
  },
  recommendationList: {
    learnMore: string;
  },
  faqPage: {
    title: string;
    description: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  },
  loginPage: {
    title: string;
    description: string;
    emailLabel: string;
    passwordLabel: string;
    forgotPassword: string;
    loginButton: string;
    noAccount: string;
    signupLink: string;
  },
  signupPage: {
    title: string;
    description: string;
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    createAccountButton: string;
    hasAccount: string;
    loginLink: string;
  },
  chatbot: {
    title: string;
    placeholder: string;
  },
  aboutPage: {
    tagline: string;
    ourMission: {
        title: string;
        description: string;
    };
    ourVision: {
        title: string;
        description: string;
    };
    ourTeam: {
        title: string;
        description: string;
    };
  },
  contactPage: {
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    toast: {
        title: string;
        description: string;
    }
  },
  forCompaniesPage: {
    title: string;
    description: string;
    features: {
        feature1: { title: string; description: string };
        feature2: { title: string; description: string };
        feature3: { title: string; description: string };
    };
    cta: {
        title: string;
        description: string;
    }
  },
  forInternsPage: {
    title: string;
    description: string;
    features: {
        feature1: { title: string; description: string };
        feature2: { title: string; description: string };
        feature3: { title: string; description: string };
    };
    cta: {
        title: string;
        description: string;
    }
  },
  howItWorksPage: {
    description: string;
    steps: {
        step1: { title: string; description: string };
        step2: { title: string; description: string };
        step3: { title: string; description: string };
        step4: { title: string; description: string };
    }
  }
};

    