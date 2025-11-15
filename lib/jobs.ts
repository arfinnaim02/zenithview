// lib/jobs.ts
export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  details?: string;
};

export const jobs: Job[] = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer (React/Next.js)',
    location: 'Remote',
    type: 'Full-Time',
    description:
      'Own delightful, accessible UI in React/Next.js and ship polished product experiences that users love.',
    requirements: [
      '3+ years professional experience with React and modern TypeScript',
      'Hands-on Next.js (App Router), API routes, and data fetching patterns',
      'Strong CSS fundamentals (Tailwind preferred) and responsive design',
      'Focus on performance, accessibility (WCAG), and component reusability',
      'Comfort with Git, code reviews, and basic testing (Jest/React Testing Library)',
    ],
    details:
      'As a Frontend Developer at ZenithView, you will build and refine product interfaces used daily by our customers. '
      + 'You’ll collaborate with design and backend partners to deliver features end-to-end, improve lighthouse scores, and '
      + 'help grow our shared component library. You’ll have the autonomy to propose UX improvements and the support of a '
      + 'team that cares deeply about design quality and maintainable code.\n\n'
      + 'What you’ll do:\n'
      + '• Build modern, accessible UIs in React/Next.js (App Router)\n'
      + '• Translate Figma files into production-ready components\n'
      + '• Optimize performance and establish UI testing where it matters\n'
      + '• Partner with designers/PMs to scope, plan, and deliver features\n\n'
      + 'Our interview process is practical and respectful of your time. Submit your resume (and portfolio/GitHub if available). '
      + 'We review every application and respond to all candidates.',
  },

  {
    slug: 'data-scientist',
    title: 'Data Scientist (ML & Analytics)',
    location: 'Dhaka',
    type: 'Contract',
    description:
      'Build production-ready models and analytics that power real business decisions for our clients.',
    requirements: [
      'Strong Python (pandas, NumPy, scikit-learn) and SQL skills',
      'Experience training and evaluating ML models; solid grasp of feature engineering',
      'Familiarity with one deep-learning framework (PyTorch or TensorFlow)',
      'Comfort exploring/bias-checking real-world, messy datasets',
      'Clear communication of insights to technical and non-technical stakeholders',
    ],
    details:
      'In this role you’ll take projects from discovery to deployment: clarifying the business question, assembling clean datasets, '
      + 'selecting/validating models, and presenting insights that lead to action. The ideal candidate is comfortable running experiments, '
      + 'documenting methods, and collaborating with engineers to ship reliable pipelines.\n\n'
      + 'Nice to have: experience with cloud notebooks (Colab/SageMaker), dashboards (Streamlit/Plotly), or MLOps basics. '
      + 'Please include links to any public repos, notebooks, or publications—optional but appreciated.',
  },

  {
    slug: 'marketing-specialist',
    title: 'Marketing Specialist (Growth & Content)',
    location: 'Remote',
    type: 'Part-Time',
    description:
      'Plan and execute growth campaigns, create clear messaging, and showcase customer wins across channels.',
    requirements: [
      '2+ years in digital marketing across content, social, or lifecycle campaigns',
      'Comfort writing concise, on-brand copy and repurposing assets for multiple channels',
      'Working knowledge of SEO/SEM fundamentals and analytics dashboards',
      'Ability to brief designers and measure campaign impact against goals',
      'Strong communication and project ownership in a remote environment',
    ],
    details:
      'You’ll own day-to-day campaign execution: content calendars, landing pages, email nurture, and social. '
      + 'You’ll collaborate with design on visuals, gather customer stories for case studies, and report results with clear, actionable insights. '
      + 'We value thoughtful storytelling, ethical marketing, and measurable impact.\n\n'
      + 'If you’ve shipped campaigns you’re proud of, include links to samples (site, blog, socials, or portfolio). '
      + 'Short writing samples are welcome.',
  },
];
