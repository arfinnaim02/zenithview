export type CaseStudyEntry = {
  slug: string;
  title: string;
  image: string;
  industry: string;
  services: string[];
  problem: string;
  approach: string;
  results: string;
};

export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'marketing-roi',
    title: 'Boosting Marketing ROI',
    image: '/case-studies/marketing_roi.png',
    industry: 'Marketing',
    services: ['AI / ML Dashboards'],
    problem: 'Low visibility into campaign performance across channels.',
    approach: 'Integrated marketing data into a unified dashboard with predictive analytics.',
    results: 'Improved ROI by 35% and reduced reporting time by 80%.',
  },
  {
    slug: 'competitor-intel',
    title: 'Competitor Ad Intelligence',
    image: '/case-studies/competitor_intel.png',
    industry: 'E-commerce',
    services: ['Competitor Watchdog'],
    problem: 'Lack of insight into competitors’ advertising activities.',
    approach: 'Deployed watchdog to monitor competitor ads and deliver actionable alerts.',
    results: 'Enabled client to adapt campaigns, increasing ad efficiency by 50%.',
  },
  {
    slug: 'process-automation',
    title: 'Process Automation',
    image: '/case-studies/automation.png',
    industry: 'Manufacturing',
    services: ['Automation Tools'],
    problem: 'Manual order processing causing delays and errors.',
    approach: 'Built automated workflows integrated with existing ERP systems.',
    results: 'Reduced processing time by 70% and decreased errors by 90%.',
  },

  // Additional case studies for each of our service offerings. These showcase
  // practical client engagements and results tied to the services defined in
  // lib/services.ts. If you add or rename services, consider adding a
  // corresponding case study here as well.
  {
    slug: 'data-scraping-case',
    title: 'Scalable Data Scraping',
    image: '/case-studies/data_scraping.png',
    industry: 'Retail',
    services: ['Data Scraping Based on Client Criteria'],
    problem: 'The client needed to aggregate pricing data from hundreds of ecommerce sites daily.',
    approach: 'Designed a resilient scraping pipeline with rotating proxies and headless browsers, normalised the data and stored it in a central warehouse.',
    results: 'Enabled dynamic pricing updates and competitive analysis leading to a 20% margin increase.',
  },
  {
    slug: 'data-analytics-visualization-case',
    title: 'Real‑Time Analytics Dashboards',
    image: '/case-studies/data_analytics.png',
    industry: 'SaaS',
    services: ['Data Analysis & Visualization'],
    problem: 'Executives lacked a single source of truth for KPIs across departments.',
    approach: 'Centralised disparate data sources, built models and interactive dashboards with drill‑downs, and automated weekly reports.',
    results: 'Provided actionable insights that reduced decision making time by 40%.',
  },
  {
    slug: 'web-development-case',
    title: 'Modern Web Platform',
    image: '/case-studies/web_development.png',
    industry: 'Education',
    services: ['Web Development'],
    problem: 'An outdated website was slow and difficult to update, hurting student enrolment.',
    approach: 'Rebuilt the site with Next.js and a headless CMS, improved UX, and integrated analytics.',
    results: 'Page load times decreased by 60% and enrolment enquiries increased by 30%.',
  },
  {
    slug: 'graphics-design-case',
    title: 'Brand Identity Refresh',
    image: '/case-studies/graphics_design.png',
    industry: 'Hospitality',
    services: ['Graphics Design'],
    problem: 'Inconsistent branding across channels weakened customer trust.',
    approach: 'Developed a cohesive brand kit, redesigned collateral and provided templates for social media.',
    results: 'Strengthened brand recognition and drove a 15% uplift in bookings.',
  },
  {
    slug: 'video-post-production-case',
    title: 'Video Marketing Enhancement',
    image: '/case-studies/video_production.png',
    industry: 'Tech',
    services: ['Video Post Production'],
    problem: 'Raw product demo footage lacked polish and failed to engage prospects.',
    approach: 'Edited footage with motion graphics, sound design and colour grading to craft a compelling story.',
    results: 'Increased viewer retention by 70% and doubled lead conversions.',
  },
  {
    slug: 'ai-automation-case',
    title: 'Operational AI Automation',
    image: '/case-studies/ai_automation.png',
    industry: 'Customer Support',
    services: ['AI Automation'],
    problem: 'Support teams spent hours on repetitive triage and ticket routing.',
    approach: 'Implemented AI agents and serverless functions to handle common requests and trigger workflows.',
    results: 'Reduced response times by 50% and freed up staff for higher value tasks.',
  },
  {
    slug: 'facebook-competitor-watchdog-case',
    title: 'Ad Intelligence Watchdog',
    image: '/case-studies/watchdog.png',
    industry: 'D2C',
    services: ['Facebook Competitor Watchdog'],
    problem: 'Marketing team lacked visibility into competitor ad spend and creative trends.',
    approach: 'Deployed the Watchdog service to monitor ad libraries, aggregate data and generate weekly insights.',
    results: 'Optimised ad budgets and improved creative performance by 25%.',
  },
  {
    slug: 'ecommerce-package-case',
    title: 'E‑Commerce Transformation',
    image: '/case-studies/ecommerce_package.png',
    industry: 'Retail',
    services: ['E-Commerce Package'],
    problem: 'The client’s store had poor UX and outdated integrations.',
    approach: 'Migrated to a modern headless platform, streamlined checkout and integrated analytics and email flows.',
    results: 'Improved conversion rates by 35% and reduced cart abandonment by 20%.',
  },
  {
    slug: 'business-email-solutions-case',
    title: 'Enterprise Email Overhaul',
    image: '/case-studies/email_solutions.png',
    industry: 'Professional Services',
    services: ['Business Email Solutions'],
    problem: 'Frequent email outages and deliverability issues impacted client communication.',
    approach: 'Set up a secure, scalable mail environment with proper authentication records and admin controls.',
    results: 'Achieved 99.99% uptime and improved sender reputation, leading to higher open rates.',
  },
  {
    slug: 'custom-build-case',
    title: 'Custom Solution PoC',
    image: '/case-studies/custom_build.png',
    industry: 'Start-up',
    services: ['Custom Build (Client Criteria)'],
    problem: 'A unique business requirement couldn’t be fulfilled by existing off‑the‑shelf products.',
    approach: 'Conducted a discovery workshop, scoped requirements and delivered a proof‑of‑concept tailored to the client’s needs.',
    results: 'Validated the concept within two weeks, enabling the start‑up to secure investor funding.',
  },
];