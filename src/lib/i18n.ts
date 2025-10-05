import type { Translations } from "./definitions";

export const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'bho', name: 'भोजपुरी (Bhojpuri)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
];

export const translations: Record<string, Translations> = {
    en: {
        header: {
            home: "Home",
            interns: "Interns",
            companies: "Companies",
            about: "About",
            faq: "FAQ",
            contact: "Contact",
            login: "Log In",
            signup: "Sign Up",
            howItWorks: "How It Works",
            forCompanies: "For Companies",
            forInterns: "For Interns",
        },
        home: {
            find: "Find",
            your: "your",
            internship: "internship",
            tagline: "Use our AI-powered engine to discover opportunities perfectly tailored to your profile and aspirations.",
            recommendationsAppearHere: "Your recommendations will appear here",
            fillFormToStart: "Fill out the form above to get started.",
        },
        recommendationForm: {
            title: "Find Your Perfect Internship",
            description: "Fill in your details below and let our AI find the best opportunities for you.",
            education: "Highest Education",
            educationPlaceholder: "e.g., Bachelor's in Computer Science",
            location: "Preferred Location",
            locationPlaceholder: "e.g., San Francisco, CA",
            skills: "Skills",
            skillsPlaceholder: "e.g., JavaScript, Python, Product Management",
            skillsDescription: "Separate skills with a comma.",
            sectorInterests: "Sector Interests",
            sectorInterestsPlaceholder: "e.g., Technology, Finance, Healthcare",
            sectorInterestsDescription: "Separate sectors with a comma.",
            affirmativeAction: "Affirmative Action Eligibility",
            affirmativeActionDescription: "Check this if you are eligible for affirmative action policies. This may improve your recommendations.",
            getRecommendations: "Get Recommendations",
            findingInternships: "Finding Internships...",
        },
        recommendationList: {
            learnMore: "Learn More",
        },
        faqPage: {
            title: "Frequently Asked Questions",
            description: "Find answers to common questions about Alternship.",
            q1: "What is Alternship?",
            a1: "Alternship is an AI-powered platform designed to help candidates find suitable internship opportunities. We use your education, skills, interests, and location to recommend the best internships for you.",
            q2: "How does the recommendation engine work?",
            a2: "Our engine analyzes your profile against a vast database of internships. It considers factors like your skills, academic background, preferred industry sectors, location, and even affirmative action policies to provide personalized recommendations.",
            q3: "Is Alternship free to use?",
            a3: "Yes, our core features, including internship recommendations, are completely free for all candidates.",
            q4: "How many recommendations will I receive?",
            a4: "The AI aims to provide a curated list of 3-5 top internship matches to ensure quality over quantity. This helps you focus on the most relevant opportunities.",
            q5: "Can I use the platform in different languages?",
            a5: "Yes, Alternship supports multiple languages. You can switch your preferred language using the language selector in the header.",
            q6: "How do I use the chatbot?",
            a6: "Simply click on the chat icon at the bottom-right corner of the screen to open the chatbot. You can ask it any question about the application, and it will do its best to assist you."
        },
        loginPage: {
            title: "Welcome Back",
            description: "Enter your email below to login to your account",
            emailLabel: "Email",
            passwordLabel: "Password",
            forgotPassword: "Forgot your password?",
            loginButton: "Login",
            noAccount: "Don't have an account?",
            signupLink: "Sign up",
        },
        signupPage: {
            title: "Create an Account",
            description: "Enter your information to get started",
            firstNameLabel: "First name",
            lastNameLabel: "Last name",
            emailLabel: "Email",
            passwordLabel: "Password",
            createAccountButton: "Create an account",
            hasAccount: "Already have an account?",
            loginLink: "Login",
        },
        chatbot: {
            title: "Chat with our Assistant",
            placeholder: "Ask a question...",
        },
        aboutPage: {
            tagline: "We're on a mission to connect talented individuals with transformative internship experiences.",
            ourMission: {
                title: "Our Mission",
                description: "To democratize access to career-launching opportunities for everyone, everywhere. We believe that talent is universal, but opportunity is not. Alternship is here to change that.",
            },
            ourVision: {
                title: "Our Vision",
                description: "We envision a world where every student and aspiring professional can find a meaningful internship that aligns with their passions and sets them on a path to success.",
            },
            ourTeam: {
                title: "Our Team",
                description: "We are a passionate group of developers, designers, and career experts dedicated to building the most effective and user-friendly internship platform on the market.",
            }
        },
        contactPage: {
            description: "Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
            nameLabel: "Your Name",
            namePlaceholder: "e.g., Jane Doe",
            emailLabel: "Your Email",
            emailPlaceholder: "e.g., jane.doe@example.com",
            messageLabel: "Your Message",
            messagePlaceholder: "Let us know how we can help...",
            sendButton: "Send Message",
            sendingButton: "Sending...",
            toast: {
                title: "Message Sent!",
                description: "Thanks for reaching out. We'll get back to you shortly.",
            }
        },
        forCompaniesPage: {
            title: "Find Your Next Star Intern",
            description: "Connect with a diverse pool of motivated, skilled, and ambitious students ready to contribute to your company's success.",
            features: {
                feature1: {
                    title: "Access Top Talent",
                    description: "Our AI-driven platform identifies the best candidates based on your specific needs, saving you time and resources in the hiring process."
                },
                feature2: {
                    title: "Diverse Candidate Pool",
                    description: "Reach a wide range of students from various backgrounds and disciplines, fostering innovation and diversity within your team."
                },
                feature3: {
                    title: "Streamlined Process",
                    description: "Easily post internship opportunities and manage applications through our intuitive dashboard. Finding your next intern has never been simpler."
                }
            },
            cta: {
                title: "Ready to find your next intern?",
                description: "Post a job today and connect with thousands of qualified candidates.",
            }
        },
        forInternsPage: {
            title: "Your Career Journey Starts Here",
            description: "Stop searching, start discovering. Let our AI find the perfect internship to launch your career.",
            features: {
                feature1: {
                    title: "AI-Powered Matching",
                    description: "Our intelligent algorithm matches your unique profile with internships where you'll truly shine. Say goodbye to endless scrolling."
                },
                feature2: {
                    title: "Diverse Opportunities",
                    description: "Explore a wide array of internships across various industries, from tech startups to established corporations."
                },
                feature3: {
                    title: "Launch Your Career",
                    description: "Gain valuable hands-on experience, build your professional network, and take the first step towards your dream job."
                }
            },
            cta: {
                title: "Ready to find your internship?",
                description: "Fill out your profile and get personalized recommendations in minutes.",
            }
        },
        howItWorksPage: {
            description: "Getting personalized internship recommendations is easy. Here's how our platform works in four simple steps.",
            steps: {
                step1: {
                    title: "Create Your Profile",
                    description: "Tell us about your education, skills, and what you're passionate about. The more we know, the better the match."
                },
                step2: {
                    title: "AI Analysis",
                    description: "Our powerful AI gets to work, analyzing your profile against thousands of internship opportunities to find the perfect fit."
                },
                step3: {
                    title: "Receive Recommendations",
                    description: "Get a curated list of 3-5 top internship matches delivered directly to you. No more sifting through irrelevant listings."
                },
                step4: {
                    title: "Apply and Succeed",
                    description: "Easily apply to the internships that excite you the most and get ready to kickstart your career."
                }
            }
        },
    },
    hi: {
        header: {
            home: "होम",
            interns: "इंटर्न",
            companies: "कंपनियां",
            about: "बारे में",
            faq: "सामान्य प्रश्न",
            contact: "संपर्क",
            login: "लॉग इन करें",
            signup: "साइन अप करें",
            howItWorks: "यह कैसे काम करता है",
            forCompanies: "कंपनियों के लिए",
            forInterns: "इंटर्न के लिए",
        },
        home: {
            find: "अपनी",
            your: "पसंदीदा",
            internship: "इंटर्नशिप",
            tagline: "अपनी प्रोफ़ाइल और आकांक्षाओं के अनुरूप अवसरों की खोज के लिए हमारे AI-संचालित इंजन का उपयोग करें।",
            recommendationsAppearHere: "आपकी सिफारिशें यहां दिखाई देंगी",
            fillFormToStart: "शुरू करने के लिए ऊपर दिया गया फॉर्म भरें।",
        },
        recommendationForm: {
            title: "अपनी परफेक्ट इंटर्नशिप खोजें",
            description: "नीचे अपना विवरण भरें और हमारे AI को आपके लिए सर्वोत्तम अवसर खोजने दें।",
            education: "उच्चतम शिक्षा",
            educationPlaceholder: "उदा., कंप्यूटर विज्ञान में स्नातक",
            location: "पसंदीदा स्थान",
            locationPlaceholder: "उदा., सैन फ्रांसिस्को, सीए",
            skills: "कौशल",
            skillsPlaceholder: "उदा., जावास्क्रिप्ट, पायथन, उत्पाद प्रबंधन",
            skillsDescription: "कौशल को अल्पविराम से अलग करें।",
            sectorInterests: "क्षेत्र हित",
            sectorInterestsPlaceholder: "उदा., प्रौद्योगिकी, वित्त, स्वास्थ्य सेवा",
            sectorInterestsDescription: "क्षेत्रों को अल्पविराम से अलग करें।",
            affirmativeAction: "सकारात्मक कार्रवाई पात्रता",
            affirmativeActionDescription: "यदि आप सकारात्मक कार्रवाई नीतियों के लिए पात्र हैं तो इसे जांचें। यह आपकी सिफारिशों में सुधार कर सकता है।",
            getRecommendations: "सिफारिशें प्राप्त करें",
            findingInternships: "इंटर्नशिप खोज रहे हैं...",
        },
        recommendationList: {
            learnMore: "और जानें",
        },
        faqPage: {
            title: "अक्सर पूछे जाने वाले प्रश्न",
            description: "Alternship के बारे में सामान्य प्रश्नों के उत्तर प्राप्त करें।",
            q1: "Alternship क्या है?",
            a1: "Alternship एक AI-संचालित प्लेटफ़ॉर्म है जिसे उम्मीदवारों को उपयुक्त इंटर्नशिप के अवसर खोजने में मदद करने के लिए डिज़ाइन किया गया है। हम आपके लिए सर्वोत्तम इंटर्नशिप की सिफारिश करने के लिए आपकी शिक्षा, कौशल, रुचियों और स्थान का उपयोग करते हैं।",
            q2: "सिफारिश इंजन कैसे काम करता है?",
            a2: "हमारा इंजन इंटर्नशिप के एक विशाल डेटाबेस के मुकाबले आपकी प्रोफ़ाइल का विश्लेषण करता है। यह व्यक्तिगत सिफारिशें प्रदान करने के लिए आपके कौशल, शैक्षणिक पृष्ठभूमि, पसंदीदा उद्योग क्षेत्रों, स्थान और यहां तक कि सकारात्मक कार्रवाई नीतियों जैसे कारकों पर विचार करता है।",
            q3: "क्या Alternship का उपयोग निःशुल्क है?",
            a3: "हां, इंटर्नशिप सिफारिशों सहित हमारी मुख्य विशेषताएं सभी उम्मीदवारों के लिए पूरी तरह से निःशुल्क हैं।",
            q4: "मुझे कितनी सिफारिशें मिलेंगी?",
            a4: "AI का लक्ष्य मात्रा से अधिक गुणवत्ता सुनिश्चित करने के लिए 3-5 शीर्ष इंटर्नशिप मैचों की एक क्यूरेटेड सूची प्रदान करना है। यह आपको सबसे प्रासंगिक अवसरों पर ध्यान केंद्रित करने में मदद करता है।",
            q5: "क्या मैं प्लेटफ़ॉर्म का उपयोग विभिन्न भाषाओं में कर सकता हूँ?",
            a5: "हां, Alternship कई भाषाओं का समर्थन करता है। आप हेडर में भाषा चयनकर्ता का उपयोग करके अपनी पसंदीदा भाषा बदल सकते हैं।",
            q6: "मैं चैटबॉट का उपयोग कैसे करूं?",
            a6: "चैटबॉट खोलने के लिए बस स्क्रीन के नीचे-दाएं कोने में चैट आइकन पर क्लिक करें। आप इससे आवेदन के बारे में कोई भी प्रश्न पूछ सकते हैं, और यह आपकी सहायता करने की पूरी कोशिश करेगा।"
        },
        loginPage: {
            title: "वापसी पर स्वागत है",
            description: "अपने खाते में लॉगिन करने के लिए नीचे अपना ईमेल दर्ज करें",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            forgotPassword: "अपना पासवर्ड भूल गए?",
            loginButton: "लॉग इन करें",
            noAccount: "कोई खाता नहीं है?",
            signupLink: "साइन अप करें",
        },
        signupPage: {
            title: "खाता बनाएं",
            description: "शुरू करने के लिए अपनी जानकारी दर्ज करें",
            firstNameLabel: "पहला नाम",
            lastNameLabel: "अंतिम नाम",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            createAccountButton: "खाता बनाएं",
            hasAccount: "पहले से ही एक खाता है?",
            loginLink: "लॉग इन करें",
        },
        chatbot: {
            title: "हमारे सहायक के साथ चैट करें",
            placeholder: "एक प्रश्न पूछें...",
        },
        aboutPage: {
            tagline: "हम प्रतिभाशाली व्यक्तियों को परिवर्तनकारी इंटर्नशिप अनुभवों से जोड़ने के मिशन पर हैं।",
            ourMission: {
                title: "हमारा मिशन",
                description: "सभी के लिए, हर जगह करियर-लॉन्चिंग अवसरों तक पहुंच का लोकतंत्रीकरण करना। हमारा मानना ​​है कि प्रतिभा सार्वभौमिक है, लेकिन अवसर नहीं। Alternship इसे बदलने के लिए यहां है।",
            },
            ourVision: {
                title: "हमारा दृष्टिकोण",
                description: "हम एक ऐसी दुनिया की कल्पना करते हैं जहां हर छात्र और महत्वाकांक्षी पेशेवर एक सार्थक इंटर्नशिप पा सकता है जो उनके जुनून के साथ संरेखित हो और उन्हें सफलता की राह पर स्थापित करे।",
            },
            ourTeam: {
                title: "हमारी टीम",
                description: "हम डेवलपर्स, डिजाइनरों और करियर विशेषज्ञों का एक उत्साही समूह हैं जो बाजार पर सबसे प्रभावी और उपयोगकर्ता-अनुकूल इंटर्नशिप प्लेटफॉर्म बनाने के लिए समर्पित हैं।",
            }
        },
        contactPage: {
            description: "कोई प्रश्न या प्रतिक्रिया है? हमें आपसे सुनना अच्छा लगेगा। नीचे दिया गया फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
            nameLabel: "आपका नाम",
            namePlaceholder: "जैसे, जेन डो",
            emailLabel: "आपका ईमेल",
            emailPlaceholder: "जैसे, jane.doe@example.com",
            messageLabel: "आपका संदेश",
            messagePlaceholder: "हमें बताएं कि हम कैसे मदद कर सकते हैं...",
            sendButton: "संदेश भेजें",
            sendingButton: "भेजा जा रहा है...",
            toast: {
                title: "संदेश भेजा गया!",
                description: "संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।",
            }
        },
        forCompaniesPage: {
            title: "अपना अगला स्टार इंटर्न खोजें",
            description: "अपनी कंपनी की सफलता में योगदान देने के लिए तैयार प्रेरित, कुशल और महत्वाकांक्षी छात्रों के विविध पूल से जुड़ें।",
            features: {
                feature1: {
                    title: "शीर्ष प्रतिभा तक पहुंच",
                    description: "हमारा AI-संचालित प्लेटफ़ॉर्म आपकी विशिष्ट आवश्यकताओं के आधार पर सर्वश्रेष्ठ उम्मीदवारों की पहचान करता है, जिससे भर्ती प्रक्रिया में आपका समय और संसाधन बचता है।"
                },
                feature2: {
                    title: "विविध उम्मीदवार पूल",
                    description: "अपनी टीम के भीतर नवाचार और विविधता को बढ़ावा देते हुए, विभिन्न पृष्ठभूमि और विषयों के छात्रों की एक विस्तृत श्रृंखला तक पहुँचें।"
                },
                feature3: {
                    title: "सुव्यवस्थित प्रक्रिया",
                    description: "हमारे सहज ज्ञान युक्त डैशबोर्ड के माध्यम से आसानी से इंटर्नशिप के अवसर पोस्ट करें और आवेदनों का प्रबंधन करें। अपना अगला इंटर्न ढूंढना इतना आसान कभी नहीं रहा।"
                }
            },
            cta: {
                title: "अपना अगला इंटर्न खोजने के लिए तैयार हैं?",
                description: "आज ही एक नौकरी पोस्ट करें और हजारों योग्य उम्मीदवारों से जुड़ें।",
            }
        },
        forInternsPage: {
            title: "आपका करियर सफ़र यहाँ से शुरू होता है",
            description: "खोजना बंद करें, खोजना शुरू करें। हमारे AI को अपना करियर शुरू करने के लिए सही इंटर्नशिप खोजने दें।",
            features: {
                feature1: {
                    title: "AI-संचालित मिलान",
                    description: "हमारा बुद्धिमान एल्गोरिथ्म आपकी अनूठी प्रोफ़ाइल को उन इंटर्नशिप से मिलाता है जहाँ आप वास्तव में चमकेंगे। अंतहीन स्क्रॉलिंग को अलविदा कहें।"
                },
                feature2: {
                    title: "विविध अवसर",
                    description: "टेक स्टार्टअप से लेकर स्थापित निगमों तक, विभिन्न उद्योगों में इंटर्नशिप की एक विस्तृत श्रृंखला का अन्वेषण करें।"
                },
                feature3: {
                    title: "अपना करियर लॉन्च करें",
                    description: "मूल्यवान व्यावहारिक अनुभव प्राप्त करें, अपना पेशेवर नेटवर्क बनाएं और अपने सपनों की नौकरी की ओर पहला कदम उठाएं।"
                }
            },
            cta: {
                title: "अपनी इंटर्नशिप खोजने के लिए तैयार हैं?",
                description: "अपनी प्रोफ़ाइल भरें और मिनटों में व्यक्तिगत सिफारिशें प्राप्त करें।",
            }
        },
        howItWorksPage: {
            description: "व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करना आसान है। यहाँ बताया गया है कि हमारा प्लेटफ़ॉर्म चार सरल चरणों में कैसे काम करता है।",
            steps: {
                step1: {
                    title: "अपनी प्रोफ़ाइल बनाएं",
                    description: "हमें अपनी शिक्षा, कौशल और आप किस चीज के प्रति जुनूनी हैं, के बारे में बताएं। हम जितना अधिक जानेंगे, मैच उतना ही बेहतर होगा।"
                },
                step2: {
                    title: "AI विश्लेषण",
                    description: "हमारा शक्तिशाली AI काम पर लग जाता है, सही फिट खोजने के लिए हजारों इंटर्नशिप अवसरों के मुकाबले आपकी प्रोफ़ाइल का विश्लेषण करता है।"
                },
                step3: {
                    title: "सिफारिशें प्राप्त करें",
                    description: "सीधे आपको दी गई 3-5 शीर्ष इंटर्नशिप मैचों की एक क्यूरेटेड सूची प्राप्त करें। अब अप्रासंगिक लिस्टिंग के माध्यम से छानबीन करने की आवश्यकता नहीं है।"
                },
                step4: {
                    title: "आवेदन करें और सफल हों",
                    description: "उन इंटर्नशिप के लिए आसानी से आवेदन करें जो आपको सबसे ज्यादा उत्साहित करती हैं और अपना करियर शुरू करने के लिए तैयार हो जाएं।"
                }
            }
        },
    },
    bho: {
        header: {
            home: "होम",
            interns: "इंटर्न",
            companies: "कंपनियां",
            about: "बारे में",
            faq: "अक्सर पूछे जाए वाले सवाल",
            contact: "संपर्क",
            login: "लॉग इन करीं",
            signup: "साइन अप करीं",
            howItWorks: "इ कईसे काम करेला",
            forCompanies: "कंपनी खातिर",
            forInterns: "इंटर्न खातिर",
        },
        home: {
            find: "आपन",
            your: "पसंदीदा",
            internship: "इंटर्नशिप",
            tagline: "आपन प्रोफाइल आ आकांक्षा के अनुरूप अवसर खोजे खातिर हमनी के AI-संचालित इंजन के इस्तेमाल करीं।",
            recommendationsAppearHere: "तोहार सिफारिश इहाँ लउकी",
            fillFormToStart: "शुरू करे खातिर ऊपर दिहल फॉर्म भरीं।",
        },
        recommendationForm: {
            title: "आपन परफेक्ट इंटर्नशिप खोजीं",
            description: "नीचे आपन विवरण भरीं आ हमनी के AI के आपके खातिर सबसे बढ़िया अवसर खोजे दीं।",
            education: "सबसे ढेर पढ़ाई",
            educationPlaceholder: "उदा., कंप्यूटर साइंस में बैचलर",
            location: "पसंदीदा जगह",
            locationPlaceholder: "उदा., सैन फ्रांसिस्को, सीए",
            skills: "कौशल",
            skillsPlaceholder: "उदा., जावास्क्रिप्ट, पाइथन, प्रोडक्ट मैनेजमेंट",
            skillsDescription: "कौशल के अल्पविराम से अलगा करीं।",
            sectorInterests: "क्षेत्र के रुचि",
            sectorInterestsPlaceholder: "उदा., टेक्नोलॉजी, फाइनेंस, हेल्थकेयर",
            sectorInterestsDescription: "क्षेत्र के अल्पविराम से अलगा करीं।",
            affirmativeAction: "सकारात्मक कार्रवाई के पात्रता",
            affirmativeActionDescription: "अगर रउआ सकारात्मक कार्रवाई नीति के पात्र बानी त एकरा के जाँची। एहसे तोहार सिफारिश बेहतर हो सकेला।",
            getRecommendations: "सिफारिश पाईं",
            findingInternships: "इंटर्नशिप खोजल जा रहल बा...",
        },
        recommendationList: {
            learnMore: "अउरी जानीं",
        },
        faqPage: {
            title: "अक्सर पूछे जाए वाले सवाल",
            description: "Alternship के बारे में आम सवाल के जवाब पाईं।",
            q1: "Alternship का ह?",
            a1: "Alternship एगो AI-संचालित प्लेटफॉर्म ह जवन उम्मीदवार के उपयुक्त इंटर्नशिप अवसर खोजे में मदद करे खातिर बनावल गइल बा। हमनी के आपके खातिर सबसे बढ़िया इंटर्नशिप के सिफारिश करे खातिर राउर पढ़ाई, कौशल, रुचि आ स्थान के इस्तेमाल करेनी जा।",
            q2: "सिफारिश इंजन कइसे काम करेला?",
            a2: "हमनी के इंजन इंटर्नशिप के एगो विशाल डेटाबेस के खिलाफ राउर प्रोफाइल के विश्लेषण करेला। इ व्यक्तिगत सिफारिश देवे खातिर राउर कौशल, शैक्षणिक पृष्ठभूमि, पसंदीदा उद्योग क्षेत्र, स्थान आ सकारात्मक कार्रवाई नीति जइसन कारक पर विचार करेला।",
            q3: "का Alternship के इस्तेमाल मुफ्त बा?",
            a3: "हँ, हमनी के मुख्य सुविधा, जवना में इंटर्नशिप सिफारिश भी शामिल बा, सगरी उम्मीदवार खातिर बिल्कुल मुफ्त बा।",
            q4: "हमरा के केतना सिफारिश मिली?",
            a4: "AI के लक्ष्य मात्रा से अधिका गुणवत्ता सुनिश्चित करे खातिर 3-5 शीर्ष इंटर्नशिप मैच के एगो क्यूरेटेड सूची देवे के बा। एहसे रउआ सबसे प्रासंगिक अवसर पर ध्यान केंद्रित करे में मदद मिलेला।",
            q5: "का हम अलग-अलग भाषा में प्लेटफॉर्म के इस्तेमाल कर सकेनी?",
            a5: "हँ, Alternship कई भाषा के समर्थन करेला। रउआ हेडर में भाषा चयनकर्ता के इस्तेमाल करके आपन पसंदीदा भाषा बदल सकेनी।",
            q6: "हम चैटबॉट के इस्तेमाल कइसे करीं?",
            a6: "चैटबॉट खोले खातिर बस स्क्रीन के नीचे-दाहिना कोना में चैट आइकन पर क्लिक करीं। रउआ एकरा से आवेदन के बारे में कवनो सवाल पूछ सकेनी, आ इ राउर मदद करे के पूरा कोशिश करी।"
        },
        loginPage: {
            title: "वापसी पर स्वागत बा",
            description: "आपन खाता में लॉगिन करे खातिर नीचे आपन ईमेल डालीं",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            forgotPassword: "आपन पासवर्ड भुलाइल?",
            loginButton: "लॉग इन करीं",
            noAccount: "खाता नइखे?",
            signupLink: "साइन अप करीं",
        },
        signupPage: {
            title: "खाता बनाईं",
            description: "शुरू करे खातिर आपन जानकारी डालीं",
            firstNameLabel: "पहिला नाम",
            lastNameLabel: "अंतिम नाम",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            createAccountButton: "खाता बनाईं",
            hasAccount: "पहिले से खाता बा?",
            loginLink: "लॉग इन करीं",
        },
        chatbot: {
            title: "हमनी के सहायक से बतियाईं",
            placeholder: "एगो सवाल पूछीं...",
        },
        aboutPage: {
            tagline: "हमनी के प्रतिभाशाली व्यक्ति के परिवर्तनकारी इंटर्नशिप अनुभव से जोड़े के मिशन पर बानी जा।",
            ourMission: {
                title: "हमनी के मिशन",
                description: "सभे खातिर, हर जगह कैरियर-लॉन्चिंग अवसर तक पहुँच के लोकतंत्रीकरण करे के। हमनी के मानेनी जा कि प्रतिभा सार्वभौमिक बा, लेकिन अवसर ना। Alternship एकरा के बदले खातिर इहाँ बा।",
            },
            ourVision: {
                title: "हमनी के दृष्टि",
                description: "हमनी के अइसन दुनिया के कल्पना करेनी जा जहाँ हर छात्र आ महत्वाकांक्षी पेशेवर एगो सार्थक इंटर्नशिप पा सकेला जवन ओकरा जुनून से मेल खात होखे आ ओकरा के सफलता के राह पर ले जा सके।",
            },
            ourTeam: {
                title: "हमनी के टीम",
                description: "हमनी के डेवलपर, डिजाइनर, आ कैरियर विशेषज्ञ के एगो उत्साही समूह हईं जे बाजार पर सबसे प्रभावी आ उपयोगकर्ता-अनुकूल इंटर्नशिप प्लेटफॉर्म बनावे खातिर समर्पित बा।",
            }
        },
        contactPage: {
            description: "कवनो सवाल भा प्रतिक्रिया बा? हमनी के आपके से सुनल अच्छा लागी। नीचे दिहल फॉर्म भरीं आ हमनी के जल्द से जल्द आपके से संपर्क करब।",
            nameLabel: "राउर नाम",
            namePlaceholder: "जइसे, जेन डो",
            emailLabel: "राउर ईमेल",
            emailPlaceholder: "जइसे, jane.doe@example.com",
            messageLabel: "राउर संदेश",
            messagePlaceholder: "हमनी के बताईं कि हमनी के कईसे मदद कर सकेनी जा...",
            sendButton: "संदेश भेजीं",
            sendingButton: "भेजा रहल बा...",
            toast: {
                title: "संदेश भेज दिहल गईल!",
                description: "पहुँचे खातिर धन्यवाद। हमनी के जल्द ही आपके से संपर्क करब।",
            }
        },
        forCompaniesPage: {
            title: "आपन अगला स्टार इंटर्न खोजीं",
            description: "आपन कंपनी के सफलता में योगदान देवे खातिर तइयार प्रेरित, कुशल, आ महत्वाकांक्षी छात्र के विविध पूल से जुड़ीं।",
            features: {
                feature1: {
                    title: "शीर्ष प्रतिभा तक पहुँच",
                    description: "हमनी के AI-संचालित प्लेटफॉर्म राउर विशिष्ट जरूरत के आधार पर सबसे बढ़िया उम्मीदवार के पहचान करेला, जवना से भर्ती प्रक्रिया में राउर समय आ संसाधन बचेला।"
                },
                feature2: {
                    title: "विविध उम्मीदवार पूल",
                    description: "आपन टीम के भीतर नवाचार आ विविधता के बढ़ावा देत, विभिन्न पृष्ठभूमि आ विषय के छात्र के विस्तृत श्रृंखला तक पहुँचीं।"
                },
                feature3: {
                    title: "सुव्यवस्थित प्रक्रिया",
                    description: "हमनी के सहज ज्ञान युक्त डैशबोर्ड के माध्यम से आसानी से इंटर्नशिप अवसर पोस्ट करीं आ आवेदन के प्रबंधन करीं। आपन अगला इंटर्न खोजल एतना आसान कहियो ना रहे।"
                }
            },
            cta: {
                title: "आपन अगला इंटर्न खोजे खातिर तइयार बानी?",
                description: "आज एगो नौकरी पोस्ट करीं आ हजारन योग्य उम्मीदवार से जुड़ीं।",
            }
        },
        forInternsPage: {
            title: "राउर कैरियर यात्रा इहाँ से शुरू होला",
            description: "खोजल बंद करीं, खोजल शुरू करीं। हमनी के AI के आपन कैरियर शुरू करे खातिर सही इंटर्नशिप खोजे दीं।",
            features: {
                feature1: {
                    title: "AI-संचालित मिलान",
                    description: "हमनी के बुद्धिमान एल्गोरिदम राउर अद्वितीय प्रोफाइल के अइसन इंटर्नशिप से मिलावेला जहाँ रउआ सचमुच चमकब। अंतहीन स्क्रॉलिंग के अलविदा कही।",
                },
                feature2: {
                    title: "विविध अवसर",
                    description: "टेक स्टार्टअप से ले के स्थापित निगम तक, विभिन्न उद्योग में इंटर्नशिप के विस्तृत श्रृंखला के अन्वेषण करीं।",
                },
                feature3: {
                    title: "आपन कैरियर लॉन्च करीं",
                    description: "मूल्यवान व्यावहारिक अनुभव प्राप्त करीं, आपन पेशेवर नेटवर्क बनाईं, आ आपन सपना के नौकरी के ओर पहिला कदम उठाईं।",
                }
            },
            cta: {
                title: "आपन इंटर्नशिप खोजे खातिर तइयार बानी?",
                description: "आपन प्रोफाइल भरीं आ मिनट में व्यक्तिगत सिफारिश पाईं।",
            }
        },
        howItWorksPage: {
            description: "व्यक्तिगत इंटर्नशिप सिफारिश पावल आसान बा। इहाँ बतावल गइल बा कि हमनी के प्लेटफॉर्म चार सरल चरण में कईसे काम करेला।",
            steps: {
                step1: {
                    title: "आपन प्रोफाइल बनाईं",
                    description: "हमनी के आपन पढ़ाई, कौशल, आ रउआ कवना चीज के प्रति जुनूनी बानी, के बारे में बताईं। हमनी के जेतना ढेर जानब, मैच ओतने बढ़िया होई।",
                },
                step2: {
                    title: "AI विश्लेषण",
                    description: "हमनी के शक्तिशाली AI काम पर लाग जाला, सही फिट खोजे खातिर हजारन इंटर्नशिप अवसर के खिलाफ राउर प्रोफाइल के विश्लेषण करेला।",
                },
                step3: {
                    title: "सिफारिश पाईं",
                    description: "सीधे आपके दिहल 3-5 शीर्ष इंटर्नशिप मैच के एगो क्यूरेटेड सूची पाईं। अब अप्रासंगिक लिस्टिंग के माध्यम से छानबीन करे के जरूरत नइखे।",
                },
                step4: {
                    title: "आवेदन करीं आ सफल होईं",
                    description: "जवना इंटर्नशिप में रउआ सबसे ढेर उत्साहित बानी, ओकरा खातिर आसानी से आवेदन करीं आ आपन कैरियर शुरू करे खातिर तइयार हो जाईं।",
                }
            }
        },
    },
    mr: {
        header: {
            home: "होम",
            interns: "इंटर्न",
            companies: "कंपन्या",
            about: "बद्दल",
            faq: "FAQ",
            contact: "संपर्क",
            login: "लॉग इन करा",
            signup: "साइन अप करा",
            howItWorks: "हे कसे कार्य करते",
            forCompanies: "कंपन्यांसाठी",
            forInterns: "इंटर्नसाठी",
        },
        home: {
            find: "तुमची",
            your: "पसंतीची",
            internship: "इंटर्नशिप",
            tagline: "तुमच्या प्रोफाइल आणि आकांक्षांनुसार योग्य संधी शोधण्यासाठी आमच्या AI-शक्तीशाली इंजिनचा वापर करा.",
            recommendationsAppearHere: "तुमच्या शिफारसी येथे दिसतील",
            fillFormToStart: "सुरुवात करण्यासाठी वरील फॉर्म भरा.",
        },
        recommendationForm: {
            title: "तुमची परफेक्ट इंटर्नशिप शोधा",
            description: "खाली तुमचे तपशील भरा आणि आमच्या AI ला तुमच्यासाठी सर्वोत्तम संधी शोधू द्या.",
            education: "उच्च शिक्षण",
            educationPlaceholder: "उदा., संगणक विज्ञानात पदवी",
            location: "पसंतीचे ठिकाण",
            locationPlaceholder: "उदा., सॅन फ्रान्सिस्को, सीए",
            skills: "कौशल्ये",
            skillsPlaceholder: "उदा., जावास्क्रिप्ट, पायथन, उत्पादन व्यवस्थापन",
            skillsDescription: "कौशल्ये स्वल्पविरामाने वेगळी करा.",
            sectorInterests: "क्षेत्रांमधील आवड",
            sectorInterestsPlaceholder: "उदा., तंत्रज्ञान, वित्त, आरोग्यसेवा",
            sectorInterestsDescription: "क्षेत्रे स्वल्पविरामाने वेगळी करा.",
            affirmativeAction: "सकारात्मक कृती पात्रता",
            affirmativeActionDescription: "तुम्ही सकारात्मक कृती धोरणांसाठी पात्र असाल तर हे तपासा. यामुळे तुमच्या शिफारसी सुधारू शकतात.",
            getRecommendations: "शिफारसी मिळवा",
            findingInternships: "इंटर्नशिप शोधत आहे...",
        },
        recommendationList: {
            learnMore: "अधिक जाणून घ्या",
        },
        faqPage: {
            title: "वारंवार विचारले जाणारे प्रश्न",
            description: "Alternshipबद्दल सामान्य प्रश्नांची उत्तरे मिळवा.",
            q1: "Alternship म्हणजे काय?",
            a1: "Alternship हे एक AI-शक्तीशाली प्लॅटफॉर्म आहे जे उमेदवारांना योग्य इंटर्नशिप संधी शोधण्यात मदत करण्यासाठी डिझाइन केलेले आहे. तुमच्यासाठी सर्वोत्तम इंटर्नशिपची शिफारस करण्यासाठी आम्ही तुमचे शिक्षण, कौशल्ये, आवडी आणि स्थान वापरतो.",
            q2: "शिफारस इंजिन कसे कार्य करते?",
            a2: "आमचे इंजिन इंटर्नशिपच्या विशाल डेटाबेसच्या तुलनेत तुमच्या प्रोफाइलचे विश्लेषण करते. ते वैयक्तिकृत शिफारसी देण्यासाठी तुमची कौशल्ये, शैक्षणिक पार्श्वभूमी, पसंतीचे उद्योग क्षेत्र, स्थान आणि अगदी सकारात्मक कृती धोरणे यासारख्या घटकांचा विचार करते.",
            q3: "Alternship वापरण्यासाठी विनामूल्य आहे का?",
            a3: "होय, इंटर्नशिप शिफारसींसह आमची मुख्य वैशिष्ट्ये सर्व उमेदवारांसाठी पूर्णपणे विनामूल्य आहेत.",
            q4: "मला किती शिफारसी मिळतील?",
            a4: "AI चा उद्देश संख्येपेक्षा गुणवत्तेची खात्री करण्यासाठी 3-5 शीर्ष इंटर्नशिप सामन्यांची क्युरेटेड सूची प्रदान करणे आहे. हे तुम्हाला सर्वात संबंधित संधींवर लक्ष केंद्रित करण्यास मदत करते.",
            q5: "मी प्लॅटफॉर्म वेगवेगळ्या भाषांमध्ये वापरू शकतो का?",
            a5: "होय, Alternship एकाधिक भाषांना समर्थन देते. तुम्ही हेडरमधील भाषा निवडकाचा वापर करून तुमची पसंतीची भाषा बदलू शकता.",
            q6: "मी चॅटबॉट कसा वापरू?",
            a6: "चॅटबॉट उघडण्यासाठी फक्त स्क्रीनच्या तळाशी-उजव्या कोपऱ्यातील चॅट आयकॉनवर क्लिक करा. तुम्ही त्याला अर्जाबद्दल कोणताही प्रश्न विचारू शकता आणि तो तुम्हाला मदत करण्याचा पूर्ण प्रयत्न करेल."
        },
        loginPage: {
            title: "पुन्हा स्वागत आहे",
            description: "तुमच्या खात्यात लॉग इन करण्यासाठी खाली तुमचा ईमेल प्रविष्ट करा",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            forgotPassword: "तुमचा पासवर्ड विसरलात?",
            loginButton: "लॉग इन करा",
            noAccount: "खाते नाही?",
            signupLink: "साइन अप करा",
        },
        signupPage: {
            title: "एक खाते तयार करा",
            description: "सुरुवात करण्यासाठी तुमची माहिती प्रविष्ट करा",
            firstNameLabel: "पहिले नाव",
            lastNameLabel: "आडनाव",
            emailLabel: "ईमेल",
            passwordLabel: "पासवर्ड",
            createAccountButton: "एक खाते तयार करा",
            hasAccount: "आधीपासूनच खाते आहे?",
            loginLink: "लॉग इन करा",
        },
        chatbot: {
            title: "आमच्या सहाय्यकाशी गप्पा मारा",
            placeholder: "एक प्रश्न विचारा...",
        },
        aboutPage: {
            tagline: "आम्ही प्रतिभावान व्यक्तींना परिवर्तनीय इंटर्नशिप अनुभवांशी जोडण्याच्या मिशनवर आहोत.",
            ourMission: {
                title: "आमचे ध्येय",
                description: "प्रत्येकासाठी, सर्वत्र करिअर-लाँचिंग संधींमध्ये प्रवेशाचे लोकशाहीकरण करणे. आमचा विश्वास आहे की प्रतिभा सार्वत्रिक आहे, परंतु संधी नाही. Alternship हे बदलण्यासाठी येथे आहे.",
            },
            ourVision: {
                title: "आमची दृष्टी",
                description: "आम्ही अशा जगाची कल्पना करतो जिथे प्रत्येक विद्यार्थी आणि महत्वाकांक्षी व्यावसायिक एक अर्थपूर्ण इंटर्नशिप शोधू शकतो जो त्यांच्या आवडीनिवडींशी जुळतो आणि त्यांना यशाच्या मार्गावर आणतो.",
            },
            ourTeam: {
                title: "आमची टीम",
                description: "आम्ही विकासक, डिझाइनर आणि करिअर तज्ञांचा एक उत्साही गट आहोत जो बाजारात सर्वात प्रभावी आणि वापरकर्ता-अनुकूल इंटर्नशिप प्लॅटफॉर्म तयार करण्यासाठी समर्पित आहे.",
            }
        },
        contactPage: {
            description: "प्रश्न किंवा अभिप्राय आहे? आम्हाला तुमच्याकडून ऐकायला आवडेल. खालील फॉर्म भरा आणि आम्ही शक्य तितक्या लवकर तुमच्याशी संपर्क साधू.",
            nameLabel: "तुमचे नाव",
            namePlaceholder: "उदा. जेन डो",
            emailLabel: "तुमचा ईमेल",
            emailPlaceholder: "उदा. jane.doe@example.com",
            messageLabel: "तुमचा संदेश",
            messagePlaceholder: "आम्ही कशी मदत करू शकतो ते आम्हाला कळवा...",
            sendButton: "संदेश पाठवा",
            sendingButton: "पाठवत आहे...",
            toast: {
                title: "संदेश पाठवला!",
                description: "संपर्क साधल्याबद्दल धन्यवाद. आम्ही लवकरच तुमच्याशी संपर्क साधू.",
            }
        },
        forCompaniesPage: {
            title: "तुमचा पुढील स्टार इंटर्न शोधा",
            description: "तुमच्या कंपनीच्या यशात योगदान देण्यासाठी तयार असलेल्या प्रेरित, कुशल आणि महत्वाकांक्षी विद्यार्थ्यांच्या विविध गटाशी संपर्क साधा.",
            features: {
                feature1: {
                    title: "शीर्ष प्रतिभेपर्यंत पोहोचा",
                    description: "आमचे AI-चालित प्लॅटफॉर्म तुमच्या विशिष्ट गरजांवर आधारित सर्वोत्तम उमेदवारांना ओळखते, ज्यामुळे भरती प्रक्रियेत तुमचा वेळ आणि संसाधने वाचतात."
                },
                feature2: {
                    title: "विविध उमेदवार गट",
                    description: "तुमच्या टीममध्ये नवीनता आणि विविधतेला प्रोत्साहन देत, विविध पार्श्वभूमी आणि विषयांमधील विद्यार्थ्यांच्या विस्तृत श्रेणीपर्यंत पोहोचा."
                },
                feature3: {
                    title: "सुव्यवस्थित प्रक्रिया",
                    description: "आमच्या अंतर्ज्ञानी डॅशबोर्डद्वारे सहजपणे इंटर्नशिप संधी पोस्ट करा आणि अर्ज व्यवस्थापित करा. तुमचा पुढील इंटर्न शोधणे इतके सोपे कधीच नव्हते."
                }
            },
            cta: {
                title: "तुमचा पुढील इंटर्न शोधण्यासाठी तयार आहात?",
                description: "आजच नोकरी पोस्ट करा आणि हजारो पात्र उमेदवारांशी संपर्क साधा.",
            }
        },
        forInternsPage: {
            title: "तुमच्या करिअरचा प्रवास येथून सुरू होतो",
            description: "शोधणे थांबवा, शोधायला सुरुवात करा. आमच्या AI ला तुमचे करिअर सुरू करण्यासाठी योग्य इंटर्नशिप शोधू द्या.",
            features: {
                feature1: {
                    title: "AI-शक्तीशाली जुळवणी",
                    description: "आमचे बुद्धिमान अल्गोरिदम तुमच्या अद्वितीय प्रोफाइलला अशा इंटर्नशिपशी जुळवते जिथे तुम्ही खरोखरच चमकू शकाल. अंतहीन स्क्रोलिंगला अलविदा म्हणा."
                },
                feature2: {
                    title: "विविध संधी",
                    description: "टेक स्टार्टअप्सपासून ते प्रस्थापित कॉर्पोरेशन्सपर्यंत, विविध उद्योगांमध्ये इंटर्नशिपची विस्तृत श्रेणी एक्सप्लोर करा."
                },
                feature3: {
                    title: "तुमचे करिअर सुरू करा",
                    description: "मौल्यवान प्रत्यक्ष अनुभव मिळवा, तुमचे व्यावसायिक नेटवर्क तयार करा आणि तुमच्या स्वप्नातील नोकरीच्या दिशेने पहिले पाऊल टाका."
                }
            },
            cta: {
                title: "तुमची इंटर्नशिप शोधण्यासाठी तयार आहात?",
                description: "तुमचे प्रोफाइल भरा आणि काही मिनिटांत वैयक्तिकृत शिफारसी मिळवा.",
            }
        },
        howItWorksPage: {
            description: "वैयक्तिकृत इंटर्नशिप शिफारसी मिळवणे सोपे आहे. आमचा प्लॅटफॉर्म चार सोप्या चरणांमध्ये कसा कार्य करतो ते येथे आहे.",
            steps: {
                step1: {
                    title: "तुमचे प्रोफाइल तयार करा",
                    description: "आम्हाला तुमच्या शिक्षण, कौशल्ये आणि तुम्हाला कशाची आवड आहे याबद्दल सांगा. आम्हाला जितके जास्त कळेल, तितके जुळणारे चांगले असेल."
                },
                step2: {
                    title: "AI विश्लेषण",
                    description: "आमचे शक्तिशाली AI कामाला लागते, योग्य जुळणारे शोधण्यासाठी हजारो इंटर्नशिप संधींच्या तुलनेत तुमच्या प्रोफाइलचे विश्लेषण करते."
                },
                step3: {
                    title: "शिफारसी मिळवा",
                    description: "थेट तुम्हाला वितरित केलेल्या 3-5 शीर्ष इंटर्नशिप सामन्यांची क्युरेटेड सूची मिळवा. आता अप्रासंगिक सूचीमधून शोधण्याची गरज नाही."
                },
                step4: {
                    title: "अर्ज करा आणि यशस्वी व्हा",
                    description: "तुम्हाला सर्वात जास्त उत्साहित करणाऱ्या इंटर्नशिपसाठी सहजपणे अर्ज करा आणि तुमचे करिअर सुरू करण्यासाठी सज्ज व्हा."
                }
            }
        },
    },
    ta: {
        header: {
            home: "முகப்பு",
            interns: "பயிற்சியாளர்கள்",
            companies: "நிறுவனங்கள்",
            about: "பற்றி",
            faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
            contact: "தொடர்பு",
            login: "உள்நுழை",
            signup: "பதிவு செய்க",
            howItWorks: "இது எப்படி வேலை செய்கிறது",
            forCompanies: "நிறுவனங்களுக்கு",
            forInterns: "பயிற்சியாளர்களுக்கு",
        },
        home: {
            find: "உங்கள்",
            your: "விருப்பமான",
            internship: "பயிற்சியைக்",
            tagline: "உங்கள் சுயவிவரத்திற்கும் விருப்பங்களுக்கும் hoàn hảoவாகப் பொருந்தும் வாய்ப்புகளைக் கண்டறிய எங்கள் AI-இயங்கும் இயந்திரத்தைப் பயன்படுத்தவும்.",
            recommendationsAppearHere: "உங்கள் பரிந்துரைகள் இங்கே தோன்றும்",
            fillFormToStart: "தொடங்குவதற்கு மேலே உள்ள படிவத்தை நிரப்பவும்.",
        },
        recommendationForm: {
            title: "உங்கள் சரியான பயிற்சியைக் கண்டறியுங்கள்",
            description: "கீழே உங்கள் விவரங்களை நிரப்பி, எங்கள் AI உங்களுக்கான சிறந்த வாய்ப்புகளைக் கண்டறியட்டும்.",
            education: "உயர்கல்வி",
            educationPlaceholder: "எ.கா., கணினி அறிவியலில் இளங்கலை",
            location: "விரும்பிய இடம்",
            locationPlaceholder: "எ.கா., சான் பிரான்சிஸ்கோ, சிஏ",
            skills: "திறன்கள்",
            skillsPlaceholder: "எ.கா., ஜாவாஸ்கிரிப்ட், பைதான், தயாரிப்பு மேலாண்மை",
            skillsDescription: "திறன்களை காற்புள்ளியால் பிரிக்கவும்.",
            sectorInterests: "துறை ஆர்வங்கள்",
            sectorInterestsPlaceholder: "எ.கா., தொழில்நுட்பம், நிதி, சுகாதாரம்",
            sectorInterestsDescription: "துறைகளை காற்புள்ளியால் பிரிக்கவும்.",
            affirmativeAction: "உறுதியான நடவடிக்கை தகுதி",
            affirmativeActionDescription: "உறுதியான நடவடிக்கை கொள்கைகளுக்கு நீங்கள் தகுதியுடையவராக இருந்தால் இதை சரிபார்க்கவும். இது உங்கள் பரிந்துரைகளை மேம்படுத்தலாம்.",
            getRecommendations: "பரிந்துரைகளைப் பெறுங்கள்",
            findingInternships: "பயிற்சிகளைத் தேடுகிறது...",
        },
        recommendationList: {
            learnMore: "மேலும் அறிக",
        },
        faqPage: {
            title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
            description: "Alternship பற்றிய பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்.",
            q1: "Alternship என்றால் என்ன?",
            a1: "Alternship என்பது வேட்பாளர்கள் பொருத்தமான பயிற்சி வாய்ப்புகளைக் கண்டறிய உதவும் வகையில் வடிவமைக்கப்பட்ட ஒரு AI-இயங்கும் தளமாகும். உங்களுக்கான சிறந்த பயிற்சிகளைப் பரிந்துரைக்க உங்கள் கல்வி, திறன்கள், ஆர்வங்கள் மற்றும் இருப்பிடத்தைப் பயன்படுத்துகிறோம்.",
            q2: "பரிந்துரை இயந்திரம் எவ்வாறு செயல்படுகிறது?",
            a2: "எங்கள் இயந்திரம் பயிற்சிகளின் பரந்த தரவுத்தளத்திற்கு எதிராக உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்கிறது. இது தனிப்பயனாக்கப்பட்ட பரிந்துரைகளை வழங்க உங்கள் திறன்கள், கல்விப் பின்னணி, விரும்பிய தொழில் துறைகள், இருப்பிடம் மற்றும் உறுதியான நடவடிக்கை கொள்கைகள் போன்ற காரணிகளைக் கருதுகிறது.",
            q3: "Alternship-ஐப் பயன்படுத்துவது இலவசமா?",
            a3: "ஆம், பயிற்சிப் பரிந்துரைகள் உட்பட எங்கள் முக்கிய அம்சங்கள் அனைத்து வேட்பாளர்களுக்கும் முற்றிலும் இலவசம்.",
            q4: "நான் எத்தனை பரிந்துரைகளைப் பெறுவேன்?",
            a4: "AI அளவை விட தரத்தை உறுதிப்படுத்த 3-5 சிறந்த பயிற்சிப் பொருத்தங்களின் தொகுக்கப்பட்ட பட்டியலை வழங்குவதை நோக்கமாகக் கொண்டுள்ளது. இது மிகவும் பொருத்தமான வாய்ப்புகளில் கவனம் செலுத்த உங்களுக்கு உதவுகிறது.",
            q5: "நான் வெவ்வேறு மொழிகளில் தளத்தைப் பயன்படுத்தலாமா?",
            a5: "ஆம், Alternship பல மொழிகளை ஆதரிக்கிறது. தலைப்பில் உள்ள மொழித் தேர்வியைப் பயன்படுத்தி உங்கள் விருப்பமான மொழியை மாற்றலாம்.",
            q6: "நான் அரட்டைப்பெட்டியை எவ்வாறு பயன்படுத்துவது?",
            a6: "அரட்டைப்பெட்டியைத் திறக்க திரையின் கீழ்-வலது மூலையில் உள்ள அரட்டை ஐகானைக் கிளிக் செய்யவும். நீங்கள் அதனிடம் பயன்பாடு பற்றி எந்தக் கேள்வியையும் கேட்கலாம், அது உங்களுக்கு உதவ தன்னால் முடிந்த அனைத்தையும் செய்யும்."
        },
        loginPage: {
            title: "மீண்டும் வருக",
            description: "உங்கள் கணக்கில் உள்நுழைய கீழே உங்கள் மின்னஞ்சலை உள்ளிடவும்",
            emailLabel: "மின்னஞ்சல்",
            passwordLabel: "கடவுச்சொல்",
            forgotPassword: "உங்கள் கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
            loginButton: "உள்நுழை",
            noAccount: "கணக்கு இல்லையா?",
            signupLink: "பதிவு செய்க",
        },
        signupPage: {
            title: "ஒரு கணக்கை உருவாக்கவும்",
            description: "தொடங்குவதற்கு உங்கள் தகவலை உள்ளிடவும்",
            firstNameLabel: "முதல் பெயர்",
            lastNameLabel: "கடைசி பெயர்",
            emailLabel: "மின்னஞ்சல்",
            passwordLabel: "கடவுச்சொல்",
            createAccountButton: "ஒரு கணக்கை உருவாக்கவும்",
            hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
            loginLink: "உள்நுழை",
        },
        chatbot: {
            title: "எங்கள் உதவியாளருடன் அரட்டையடிக்கவும்",
            placeholder: "ஒரு கேள்வியைக் கேளுங்கள்...",
        },
        aboutPage: {
            tagline: "திறமையான தனிநபர்களை மாற்றியமைக்கும் பயிற்சி அனுபவങ്ങളുമായി இணைக்கும் ஒரு பணியில் நாங்கள் இருக்கிறோம்.",
            ourMission: {
                title: "எங்கள் நோக்கம்",
                description: "அனைவருக்கும், எல்லா இடங்களிலும் தொழில் தொடங்கும் வாய்ப்புகளுக்கான அணுகலை ஜனநாயகப்படுத்துதல். திறமை உலகளாவியது என்று நாங்கள் நம்புகிறோம், ஆனால் வாய்ப்பு இல்லை. Alternship அதை மாற்ற இங்கே உள்ளது.",
            },
            ourVision: {
                title: "எங்கள் பார்வை",
                description: "ஒவ்வொரு மாணவரும் மற்றும் ஆர்வமுள்ள நிபுணரும் தங்கள் ஆர்வங்களுடன் ஒத்துப்போகும் மற்றும் அவர்களை വിജയത്തിലേക്കുള്ള പാതയിൽ സ്ഥാപിക്കുന്ന ஒரு அர்த்தமுள்ள பயிற்சியைக் காணக்கூடிய ഒരു ലോകத்தை ഞങ്ങൾ கற்பனை செய்கிறோம்.",
            },
            ourTeam: {
                title: "எங்கள் குழு",
                description: "நாங்கள் சந்தையில் மிகவும் பயனுள்ள மற்றும் பயனர் நட்பு பயிற்சி தளத்தை உருவாக்குவதற்கு அர்ப்பணிக்கப்பட்ட டெவலப்பர்கள், வடிவமைப்பாளர்கள் மற்றும் தொழில் வல்லுநர்களின் ஒரு உணர்ச்சிமிக்க குழு.",
            }
        },
        contactPage: {
            description: "கேள்விகள் அல்லது கருத்துகள் உள்ளதா? உங்களிடமிருந்து கேட்க நாங்கள் விரும்புகிறோம். கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் கூடிய விரைவில் உங்களைத் தொடர்புகொள்வோம்.",
            nameLabel: "உங்கள் பெயர்",
            namePlaceholder: "எ.கா., ஜேன் டோ",
            emailLabel: "உங்கள் மின்னஞ்சல்",
            emailPlaceholder: "எ.கா., jane.doe@example.com",
            messageLabel: "உங்கள் செய்தி",
            messagePlaceholder: "நாங்கள் எப்படி உதவ முடியும் என்பதை எங்களுக்குத் தெரியப்படுத்துங்கள்...",
            sendButton: "செய்தி அனுப்பு",
            sendingButton: "அனுப்புகிறது...",
            toast: {
                title: "செய்தி அனுப்பப்பட்டது!",
                description: "தொடர்பு கொண்டதற்கு நன்றி. நாங்கள் விரைவில் உங்களைத் தொடர்புகொள்வோம்.",
            }
        },
        forCompaniesPage: {
            title: "உங்கள் அடுத்த நட்சத்திர பயிற்சியாளரைக் கண்டறியுங்கள்",
            description: "உங்கள் நிறுவனத்தின் வெற்றிக்கு பங்களிக்கத் தயாராக உள்ள ஊக்கமுள்ள, திறமையான மற்றும் லட்சிய மாணவர்களின் பல்வேறு குழுவுடன் இணையுங்கள்.",
            features: {
                feature1: {
                    title: "சிறந்த திறமைகளை அணுகவும்",
                    description: "எங்கள் AI-இயங்கும் தளம் உங்கள் குறிப்பிட்ட தேவைகளின் அடிப்படையில் சிறந்த வேட்பாளர்களை அடையாளம் காட்டுகிறது, ஆட்சேர்ப்பு செயல்பாட்டில் உங்கள் நேரத்தையும் வளங்களையும் மிச்சப்படுத்துகிறது."
                },
                feature2: {
                    title: "பல்வேறு வேட்பாளர் குழு",
                    description: "உங்கள் குழுவிற்குள் புதுமை மற்றும் பன்முகத்தன்மையை வளர்த்து, பல்வேறு பின்னணிகள் மற்றும் துறைகளைச் சேர்ந்த மாணவர்களின் பரந்த வரம்பை அடையுங்கள்."
                },
                feature3: {
                    title: "நெறிப்படுத்தப்பட்ட செயல்முறை",
                    description: "எங்கள் உள்ளுணர்வு டாஷ்போர்டு மூலம் பயிற்சி வாய்ப்புகளை எளிதாக இடுகையிடவும் மற்றும் விண்ணப்பங்களை நிர்வகிக்கவும். உங்கள் அடுத்த பயிற்சியாளரைக் கண்டுபிடிப்பது ఇంత எளிதாக இருந்ததில்லை."
                }
            },
            cta: {
                title: "உங்கள் அடுத்த பயிற்சியாளரைக் கண்டுபிடிக்கத் தயாரா?",
                description: "இன்று ஒரு வேலையை இடுகையிட்டு ஆயிரக்கணக்கான தகுதியான வேட்பாளர்களுடன் இணையுங்கள்.",
            }
        },
        forInternsPage: {
            title: "உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது",
            description: "தேடுவதை நிறுத்துங்கள், கண்டறியத் தொடங்குங்கள். உங்கள் தொழிலைத் தொடங்க சரியான பயிற்சியைக் கண்டறிய எங்கள் AI-க்கு விடுங்கள்.",
            features: {
                feature1: {
                    title: "AI-இயங்கும் பொருத்தம்",
                    description: "எங்கள் அறிவார்ந்த அல்காரிதம் உங்கள் தனித்துவமான சுயவிவரத்தை நீங்கள் உண்மையிலேயே பிரகாசிக்கும் பயிற்சிகளுடன் பொருத்துகிறது. முடிவற்ற ஸ்க்ரோலிங்கிற்கு விடைபெறுங்கள்."
                },
                feature2: {
                    title: "பல்வேறு வாய்ப்புகள்",
                    description: "தொழில்நுட்ப தொடக்க நிறுவனங்கள் முதல் நிறுவப்பட்ட நிறுவனங்கள் வரை, பல்வேறு தொழில்களில் பரந்த அளவிலான பயிற்சிகளை ஆராயுங்கள்."
                },
                feature3: {
                    title: "உங்கள் தொழிலைத் தொடங்குங்கள்",
                    description: "மதிப்புமிக்க நேரடி அனுபவத்தைப் பெறுங்கள், உங்கள் தொழில்முறை நெட்வொர்க்கை உருவாக்குங்கள், மேலும் உங்கள் கனவு வேலையை நோக்கிய முதல் படியை எடுங்கள்."
                }
            },
            cta: {
                title: "உங்கள் பயிற்சியைக் கண்டுபிடிக்கத் தயாரா?",
                description: "உங்கள் சுயவிவரத்தை நிரப்பி, நிமிடங்களில் தனிப்பயனாக்கப்பட்ட பரிந்துரைகளைப் பெறுங்கள்.",
            }
        },
        howItWorksPage: {
            description: "தனிப்பயனாக்கப்பட்ட பயிற்சிப் பரிந்துரைகளைப் பெறுவது எளிது. எங்கள் தளம் நான்கு எளிய படிகளில் எவ்வாறு செயல்படுகிறது என்பது இங்கே.",
            steps: {
                step1: {
                    title: "உங்கள் சுயவிவரத்தை உருவாக்கவும்",
                    description: "உங்கள் கல்வி, திறன்கள் மற்றும் நீங்கள் எதில் ஆர்வமாக உள்ளீர்கள் என்பதைப் பற்றி எங்களிடம் கூறுங்கள். நாங்கள் எவ்வளவு அதிகமாக அறிந்து கொள்கிறோமோ, అంత మంచి பொருத்தம் இருக்கும்."
                },
                step2: {
                    title: "AI பகுப்பாய்வு",
                    description: "எங்கள் சக்திவாய்ந்த AI வேலைக்குச் செல்கிறது, சரியான பொருத்தத்தைக் கண்டறிய ஆயிரக்கணக்கான பயிற்சி வாய்ப்புகளுக்கு எதிராக உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்கிறது."
                },
                step3: {
                    title: "பரிந்துரைகளைப் பெறுங்கள்",
                    description: "நேரடியாக உங்களுக்கு வழங்கப்படும் 3-5 சிறந்த பயிற்சிப் பொருத்தங்களின் தொகுக்கப்பட்ட பட்டியலைப் பெறுங்கள். இனி பொருத்தமற்ற பட்டியல்களைத் தேட வேண்டாம்."
                },
                step4: {
                    title: "விண்ணப்பித்து வெற்றி பெறுங்கள்",
                    description: "உங்களை மிகவும் உற்சாகப்படுத்தும் பயிற்சிகளுக்கு எளிதாக விண்ணப்பித்து, உங்கள் தொழிலைத் தொடங்கத் தயாராகுங்கள்."
                }
            }
        },
    },
    bn: {
        header: {
            home: "হোম",
            interns: "ইন্টার্ন",
            companies: "কোম্পানি",
            about: "সম্পর্কে",
            faq: "FAQ",
            contact: "যোগাযোগ",
            login: "লগ ইন করুন",
            signup: "সাইন আপ করুন",
            howItWorks: "কিভাবে এটা কাজ করে",
            forCompanies: "কোম্পানির জন্য",
            forInterns: "ইন্টার্নদের জন্য",
        },
        home: {
            find: "আপনার",
            your: "পছন্দের",
            internship: "ইন্টার্নশিপ",
            tagline: "আপনার প্রোফাইল এবং আকাঙ্ক্ষার জন্য পুরোপুরি উপযুক্ত সুযোগগুলি আবিষ্কার করতে আমাদের AI-চালিত ইঞ্জিন ব্যবহার করুন।",
            recommendationsAppearHere: "আপনার সুপারিশগুলি এখানে উপস্থিত হবে",
            fillFormToStart: "শুরু করতে উপরের ফর্মটি পূরণ করুন।",
        },
        recommendationForm: {
            title: "আপনার পারফেক্ট ইন্টার্নশিপ খুঁজুন",
            description: "নীচে আপনার বিবরণ পূরণ করুন এবং আমাদের AI আপনার জন্য সেরা সুযোগগুলি খুঁজে বের করুক।",
            education: "সর্বোচ্চ শিক্ষা",
            educationPlaceholder: "যেমন, কম্পিউটার সায়েন্সে স্নাতক",
            location: "পছন্দের অবস্থান",
            locationPlaceholder: "যেমন, সান ফ্রান্সিসকো, সিএ",
            skills: "দক্ষতা",
            skillsPlaceholder: "যেমন, জাভাস্ক্রিপ্ট, পাইথন, প্রোডাক্ট ম্যানেজমেন্ট",
            skillsDescription: "কমা দিয়ে দক্ষতা আলাদা করুন।",
            sectorInterests: "খাতের আগ্রহ",
            sectorInterestsPlaceholder: "যেমন, প্রযুক্তি, অর্থ, স্বাস্থ্যসেবা",
            sectorInterestsDescription: "কমা দিয়ে খাতগুলি আলাদা করুন।",
            affirmativeAction: "ইতিবাচক পদক্ষেপের যোগ্যতা",
            affirmativeActionDescription: "আপনি যদি ইতিবাচক পদক্ষেপ নীতির জন্য যোগ্য হন তবে এটি পরীক্ষা করুন। এটি আপনার সুপারিশগুলিকে উন্নত করতে পারে।",
            getRecommendations: "সুপারিশ পান",
            findingInternships: "ইন্টার্নশিপ খোঁজা হচ্ছে...",
        },
        recommendationList: {
            learnMore: "আরও জানুন",
        },
        faqPage: {
            title: "সচরাচর জিজ্ঞাস্য",
            description: "Alternship সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।",
            q1: "Alternship কী?",
            a1: "Alternship একটি AI-চালিত প্ল্যাটফর্ম যা প্রার্থীদের উপযুক্ত ইন্টার্নশিপ সুযোগ খুঁজে পেতে সহায়তা করার জন্য ডিজাইন করা হয়েছে। আমরা আপনার জন্য সেরা ইন্টার্নশিপের সুপারিশ করতে আপনার শিক্ষা, দক্ষতা, আগ্রহ এবং অবস্থান ব্যবহার করি।",
            q2: "সুপারিশ ইঞ্জিন কীভাবে কাজ করে?",
            a2: "আমাদের ইঞ্জিন ইন্টার্নশিপের একটি বিশাল ডাটাবেসের বিপরীতে আপনার প্রোফাইল বিশ্লেষণ করে। এটি ব্যক্তিগতকৃত সুপারিশ প্রদানের জন্য আপনার দক্ষতা, একাডেমিক পটভূমি, পছন্দের শিল্প খাত, অবস্থান এবং এমনকি ইতিবাচক পদক্ষেপ নীতির মতো বিষয়গুলি বিবেচনা করে।",
            q3: "Alternship ব্যবহার করা কি বিনামূল্যে?",
            a3: "হ্যাঁ, ইন্টার্নশিপ সুপারিশ সহ আমাদের মূল বৈশিষ্ট্যগুলি সমস্ত প্রার্থীদের জন্য সম্পূর্ণ বিনামূল্যে।",
            q4: "আমি কতগুলি সুপারিশ পাব?",
            a4: "AI পরিমাণের চেয়ে গুণমান নিশ্চিত করার জন্য 3-5টি শীর্ষ ইন্টার্নশিপ ম্যাচের একটি কিউরেটেড তালিকা প্রদান করার লক্ষ্য রাখে। এটি আপনাকে সবচেয়ে প্রাসঙ্গিক সুযোগগুলিতে ফোকাস করতে সহায়তা করে।",
            q5: "আমি কি বিভিন্ন ভাষায় প্ল্যাটফর্মটি ব্যবহার করতে পারি?",
            a5: "হ্যাঁ, Alternship একাধিক ভাষা সমর্থন করে। আপনি হেডারে ভাষা নির্বাচক ব্যবহার করে আপনার পছন্দের ভাষা পরিবর্তন করতে পারেন।",
            q6: "আমি চ্যাটবট কীভাবে ব্যবহার করব?",
            a6: "চ্যাটবট খুলতে কেবল পর্দার নীচে-ডান কোণায় চ্যাট আইকনে ক্লিক করুন। আপনি এটিতে আবেদন সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন, এবং এটি আপনাকে সহায়তা করার জন্য যথাসাধ্য চেষ্টা করবে।"
        },
        loginPage: {
            title: "ফিরে আসার জন্য ধন্যবাদ",
            description: "আপনার অ্যাকাউন্টে লগইন করতে নীচে আপনার ইমেল লিখুন",
            emailLabel: "ইমেল",
            passwordLabel: "পাসওয়ার্ড",
            forgotPassword: "আপনার পাসওয়ার্ড ভুলে গেছেন?",
            loginButton: "লগইন করুন",
            noAccount: "অ্যাকাউন্ট নেই?",
            signupLink: "সাইন আপ করুন",
        },
        signupPage: {
            title: "একটি অ্যাকাউন্ট তৈরি করুন",
            description: "শুরু করতে আপনার তথ্য লিখুন",
            firstNameLabel: "প্রথম নাম",
            lastNameLabel: "শেষ নাম",
            emailLabel: "ইমেল",
            passwordLabel: "পাসওয়ার্ড",
            createAccountButton: "একটি অ্যাকাউন্ট তৈরি করুন",
            hasAccount: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
            loginLink: "লগইন করুন",
        },
        chatbot: {
            title: "আমাদের সহকারীর সাথে চ্যাট করুন",
            placeholder: "একটি প্রশ্ন জিজ্ঞাসা করুন...",
        },
        aboutPage: {
            tagline: "আমরা প্রতিভাবান ব্যক্তিদের রূপান্তরমূলক ইন্টার্নশিপ অভিজ্ঞতার সাথে সংযুক্ত করার একটি মিশনে আছি।",
            ourMission: {
                title: "আমাদের লক্ষ্য",
                description: "সবার জন্য, সর্বত্র ক্যারিয়ার-লঞ্চিং সুযোগগুলিতে অ্যাক্সেসের গণতন্ত্রীকরণ করা। আমরা বিশ্বাস করি যে প্রতিভা সর্বজনীন, কিন্তু সুযোগ নয়। Alternship এটি পরিবর্তন করতে এখানে আছে।",
            },
            ourVision: {
                title: "আমাদের দৃষ্টি",
                description: "আমরা এমন একটি বিশ্বের কল্পনা করি যেখানে প্রতিটি ছাত্র এবং উচ্চাকাঙ্ক্ষী পেশাদার একটি অর্থপূর্ণ ইন্টার্নশিপ খুঁজে পেতে পারে যা তাদের আবেগের সাথে সারিবদ্ধ হয় এবং তাদের সাফল্যের পথে স্থাপন করে।",
            },
            ourTeam: {
                title: "আমাদের দল",
                description: "আমরা ডেভেলপার, ডিজাইনার এবং ক্যারিয়ার বিশেষজ্ঞদের একটি উত্সাহী গোষ্ঠী যা বাজারে সবচেয়ে কার্যকর এবং ব্যবহারকারী-বান্ধব ইন্টার্নশিপ প্ল্যাটফর্ম তৈরি করতে উত্সর্গীকৃত।",
            }
        },
        contactPage: {
            description: "প্রশ্ন বা প্রতিক্রিয়া আছে? আমরা আপনার কাছ থেকে শুনতে চাই। নীচের ফর্মটি পূরণ করুন এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করব।",
            nameLabel: "আপনার নাম",
            namePlaceholder: "যেমন, জেন ডো",
            emailLabel: "আপনার ইমেল",
            emailPlaceholder: "যেমন, jane.doe@example.com",
            messageLabel: "আপনার বার্তা",
            messagePlaceholder: "আমাদের জানান আমরা কিভাবে সাহায্য করতে পারি...",
            sendButton: "বার্তা পাঠান",
            sendingButton: "পাঠানো হচ্ছে...",
            toast: {
                title: "বার্তা পাঠানো হয়েছে!",
                description: "যোগাযোগ করার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
            }
        },
        forCompaniesPage: {
            title: "আপনার পরবর্তী তারকা ইন্টার্ন খুঁজুন",
            description: "আপনার কোম্পানির সাফল্যে অবদান রাখতে প্রস্তুত এমন অনুপ্রাণিত, দক্ষ এবং উচ্চাকাঙ্ক্ষী ছাত্রদের একটি বৈচিত্র্যময় পুলের সাথে সংযোগ স্থাপন করুন।",
            features: {
                feature1: {
                    title: "শীর্ষ প্রতিভা অ্যাক্সেস করুন",
                    description: "আমাদের AI-চালিত প্ল্যাটফর্ম আপনার নির্দিষ্ট প্রয়োজনের উপর ভিত্তি করে সেরা প্রার্থীদের সনাক্ত করে, নিয়োগ প্রক্রিয়ায় আপনার সময় এবং সম্পদ সাশ্রয় করে।"
                },
                feature2: {
                    title: "বৈচিত্র্যময় প্রার্থী পুল",
                    description: "আপনার দলের মধ্যে উদ্ভাবন এবং বৈচিত্র্যকে উত্সাহিত করে, বিভিন্ন পটভূমি এবং শৃঙ্খলা থেকে বিস্তৃত ছাত্রদের কাছে পৌঁছান।"
                },
                feature3: {
                    title: "সুव्यवस्थित প্রক্রিয়া",
                    description: "আমাদের স্বজ্ঞাত ড্যাশবোর্ডের মাধ্যমে সহজেই ইন্টার্নশিপ সুযোগ পোস্ট করুন এবং অ্যাপ্লিকেশনগুলি পরিচালনা করুন। আপনার পরবর্তী ইন্টার্ন খুঁজে পাওয়া এত সহজ কখনও ছিল না।"
                }
            },
            cta: {
                title: "আপনার পরবর্তী ইন্টার্ন খুঁজে পেতে প্রস্তুত?",
                description: "আজই একটি চাকরি পোস্ট করুন এবং হাজার হাজার যোগ্য প্রার্থীর সাথে সংযোগ স্থাপন করুন।",
            }
        },
        forInternsPage: {
            title: "আপনার ক্যারিয়ারের যাত্রা এখান থেকে শুরু হয়",
            description: "অনুসন্ধান বন্ধ করুন, আবিষ্কার শুরু করুন। আমাদের AI কে আপনার ক্যারিয়ার শুরু করার জন্য নিখুঁত ইন্টার্নশিপ খুঁজে পেতে দিন।",
            features: {
                feature1: {
                    title: "AI-চালিত ম্যাচিং",
                    description: "আমাদের বুদ্ধিমান অ্যালগরিদম আপনার অনন্য প্রোফাইলকে এমন ইন্টার্নশিপের সাথে মেলে যেখানে আপনি সত্যিই উজ্জ্বল হবেন। অবিরাম স্ক্রোলিংকে বিদায় জানান।"
                },
                feature2: {
                    title: "বৈচিত্র্যময় সুযোগ",
                    description: "টেক স্টার্টআপ থেকে শুরু করে প্রতিষ্ঠিত কর্পোরেশন পর্যন্ত বিভিন্ন শিল্প জুড়ে বিস্তৃত ইন্টার্নশিপ অন্বেষণ করুন।"
                },
                feature3: {
                    title: "আপনার ক্যারিয়ার লঞ্চ করুন",
                    description: "মূল্যবান বাস্তব অভিজ্ঞতা অর্জন করুন, আপনার পেশাদার নেটওয়ার্ক তৈরি করুন এবং আপনার স্বপ্নের চাকরির দিকে প্রথম পদক্ষেপ নিন।"
                }
            },
            cta: {
                title: "আপনার ইন্টার্নশিপ খুঁজে পেতে প্রস্তুত?",
                description: "আপনার প্রোফাইল পূরণ করুন এবং কয়েক মিনিটের মধ্যে ব্যক্তিগতকৃত সুপারিশ পান।",
            }
        },
        howItWorksPage: {
            description: "ব্যক্তিগতকৃত ইন্টার্নশিপ সুপারিশ পাওয়া সহজ। আমাদের প্ল্যাটফর্ম চারটি সহজ ধাপে কীভাবে কাজ করে তা এখানে।",
            steps: {
                step1: {
                    title: "আপনার প্রোফাইল তৈরি করুন",
                    description: "আমাদের আপনার শিক্ষা, দক্ষতা এবং আপনি কিসে আগ্রহী সে সম্পর্কে বলুন। আমরা যত বেশি জানব, ম্যাচ তত ভাল হবে।"
                },
                step2: {
                    title: "AI বিশ্লেষণ",
                    description: "আমাদের শক্তিশালী AI কাজে লেগে যায়, নিখুঁত ফিট খুঁজে পেতে হাজার হাজার ইন্টার্নশিপ সুযোগের বিপরীতে আপনার প্রোফাইল বিশ্লেষণ করে।"
                },
                step3: {
                    title: "সুপারিশ গ্রহণ করুন",
                    description: "সরাসরি আপনার কাছে পৌঁছে দেওয়া 3-5টি শীর্ষ ইন্টার্নশিপ ম্যাচের একটি কিউরেটেড তালিকা পান। আর অপ্রাসঙ্গিক তালিকাগুলির মাধ্যমে ছাঁটাই করার দরকার নেই।"
                },
                step4: {
                    title: "আবেদন করুন এবং সফল হন",
                    description: "যে ইন্টার্নশিপগুলি আপনাকে সবচেয়ে বেশি উত্তেজিত করে সেগুলিতে সহজেই আবেদন করুন এবং আপনার ক্যারিয়ার শুরু করার জন্য প্রস্তুত হন।"
                }
            }
        },
    },
};
