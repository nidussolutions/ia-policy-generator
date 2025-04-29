export const en = {
  header: {
    brand: 'Legal Forge',
    dashboard: 'Dashboard',
    sites: 'Sites',
    account: 'Account',
    logout: 'Logout',
    language: 'Language',
    languageEN: 'English',
    languagePT: 'Portuguese',
  },
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    aboutUs: 'About Us',
    getStarted: 'Get Started',
    talkExpert: 'Talk to an Expert',
  },
  hero: {
    stats: 'We have already generated more than 1K documents.',
    title: 'Generate legal policies for your website with AI',
    description:
      'In seconds, create Privacy Policies, Terms of Service, and Cookie Banners that are fully compliant with LGPD & GDPR.',
    getStartedFree: 'Get Started for Free',
    talkExpert: 'Talk to an Expert',
  },
  features: {
    title: 'Features',
    customizable: {
      title: '100% Customizable',
      description: 'Tailor documents precisely to your business needs.',
    },
    compliant: {
      title: 'LGPD & GDPR Compliant',
      description: 'Stay up to date with global privacy regulations.',
    },
    integration: {
      title: 'Easy Integration',
      description: 'Embed or link directly – no coding required.',
    },
  },
  pricing: {
    title: 'Pricing',
    free: {
      title: 'Free',
      price: '$0 / month',
      features: {
        documents: '1 document',
        sites: '1 site',
        characters: '1,000 characters',
        ai: 'Basic AI',
      },
      cta: 'Start for Free',
    },
    pro: {
      title: 'Pro',
      price: '$5 / month or $40 / year',
      features: {
        documents: 'Unlimited documents',
        sites: 'Up to 10 sites',
        characters: 'No character limits',
        ai: 'Advanced AI',
      },
      cta: 'Subscribe Now',
    },
  },
  about: {
    title: 'About Us',
    description: 'Legal Forge was born with the mission of simplifying the creation of legal policies for websites and applications, using artificial intelligence to deliver accurate, updated and personalized documents in seconds.',
    team: {
      joao: {
        name: 'João Gustavo',
        role: 'CEO & Founder',
      },
      thiago: {
        name: 'Thiago Viana',
        role: 'CMO & Founder',
      },
    },
  },
  error: {
    title: 'Oops! Something went wrong while loading the {page} page.',
    description: 'We couldn\'t load the content due to the following error:',
  },
  profile: {
    fields: {
      name: 'Name',
      email: 'Email',
      newPassword: 'New Password',
    },
    placeholders: {
      password: 'Leave blank to keep current',
    },
    buttons: {
      show: 'Show',
      hide: 'Hide',
      saveChanges: 'Save Changes',
    },
    errors: {
      passwordRequirements: 'Password must be at least 6 characters and include a special character.',
      updateFailed: 'Error updating profile. Please try again.',
    },
    success: {
      updated: 'Information updated successfully!',
    },
  },
  footer: {
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    cookiePolicy: 'Cookie Policy',
    contact: 'Contact',
    copyright: 'Legal Forge owned by Nidus Solutions. All rights reserved.',
  },
  login: {
    title: 'Welcome Back',
    email: 'Email Address',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    submit: 'Login',
    forgotPassword: 'Forgot your password?',
    resetPassword: 'Reset your password',
    errorMessage: 'Invalid email or password',
    noAccountMessage: 'Don&apos;t have an account?',
    signUp: 'Sign up',
  },
  register: {
    title: 'Create account',
    name: 'Name',
    placeholderName: 'Full name',
    email: 'Email',
    placeholderEmail: 'you@example.com"',
    password: 'Password',
    placeholderPassword: 'Create a secure password',
    cnpjCpf: 'CNPJ or CPF',
    placeholderCnpjCpf: 'Enter your CNPJ or CPF',
    alreadyHaveAccount: 'Already have an account?',
    button: 'Create Account',
    logIn: 'Log In',
  },
  dashboard: {
    greeting: 'Hello, {name} 👋',
    metrics: {
      connectedSites: 'Connected Sites',
      generatedDocuments: 'Generated Documents',
      lastLogin: 'Last Login',
      plan: 'Plan',
    },
    actions: {
      title: 'Suggested Actions',
      registerSite: 'Register a new site',
      generateDocument: 'Generate a new document',
      checkTerms: 'Check terms status',
    },
    activities: {
      title: 'Recent Activities',
      noActivities: 'No recent activities.',
    },
    errors: {
      noToken: 'No token found. Please login again.',
      loadingError: 'Error loading dashboard. Please login again.',
    },
  },
} as const;
