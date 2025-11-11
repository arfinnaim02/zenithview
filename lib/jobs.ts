export type Job = {
  /**
   * Unique slug used in the URL for this job posting
   */
  slug: string;
  /**
   * Job title as displayed on the careers page
   */
  title: string;
  /**
   * Where the role is located. Could be remote or a city name.
   */
  location: string;
  /**
   * Job type – full‑time, part‑time, contract, etc.
   */
  type: string;
  /**
   * A short description of the role
   */
  description: string;
  /**
   * List of requirements for applicants
   */
  requirements: string[];
  /**
   * Optional detailed overview used on the job detail page
   */
  details?: string;
};

/**
 * A simple catalogue of open positions. In a real application these would be
 * persisted in a database, but for this example they live in a plain array.
 */
export const jobs: Job[] = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full‑Time',
    description: 'We’re looking for a React/Next.js engineer with a passion for UI/UX.',
    requirements: [
      '3+ years experience with React',
      'Experience with TypeScript',
      'Knowledge of Tailwind CSS',
    ],
    details: 'As a frontend developer at ZenithView you will craft beautiful user interfaces, collaborate closely with designers, and help shape the user experience across our products.',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    location: 'Dhaka',
    type: 'Contract',
    description: 'Join our data team to build predictive models and analytics pipelines.',
    requirements: [
      'Strong Python skills',
      'Experience with ML frameworks',
      'Understanding of SQL and data warehousing',
    ],
    details: 'You will work with large datasets, develop models and collaborate with engineers to deploy them into production. Experience in AI/ML is a plus.',
  },
  {
    slug: 'marketing-specialist',
    title: 'Marketing Specialist',
    location: 'Remote',
    type: 'Part‑Time',
    description: 'Help grow our brand through creative campaigns and content.',
    requirements: [
      '2+ years in digital marketing',
      'Proficiency with social platforms',
      'Excellent communication skills',
    ],
    details: 'As a marketing specialist you will develop and execute campaigns, collaborate with the design team and analyse campaign performance.',
  },
];