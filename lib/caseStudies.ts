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
    slug: "marketing-roi",
    title: "Boosting Marketing ROI",
    image: "/case-studies/marketing_roi.png",
    industry: "Marketing",
    services: ["AI / ML Dashboards"],
    problem: "Low visibility into campaign performance across channels.",
    approach:
      "We started by auditing every channel the client was using—paid search, paid social, email, and display—to understand where data lived and how it was being reported. From there, we designed a unified tracking plan and stitched data together into a single warehouse so every impression, click and conversion was aligned to the same customer and campaign model. On top of this, we built an AI-powered dashboard that highlighted under- and over-performing segments, surfaced budget-reallocation suggestions, and allowed the marketing team to simulate ‘what-if’ scenarios before changing spend.",
    results:
      "Improved ROI by 35% and reduced reporting time by 80%.",
  },
  {
    slug: "process-automation",
    title: "Process Automation",
    image: "/case-studies/automation.png",
    industry: "Manufacturing",
    services: ["Automation Tools"],
    problem: "Manual order processing causing delays and errors.",
    approach:
      "Together with the client’s operations team, we mapped the end-to-end order journey—from quote to fulfilment—to spot every manual handoff and repetitive task. We then introduced a set of automation scripts and workflow rules that pulled orders directly from their CRM, validated them against inventory and pricing policies, and pushed clean data into the existing ERP system. Human review was reserved only for exceptions, with a clear dashboard that showed bottlenecks, error trends, and where further automation would have the most impact.",
    results:
      "Reduced processing time by 70% and decreased errors by 90%.",
  },

  // Additional case studies for each of our service offerings. These showcase
  // practical client engagements and results tied to the services defined in
  // lib/services.ts. If you add or rename services, consider adding a
  // corresponding case study here as well.
  {
    slug: "data-scraping-case",
    title: "Scalable Data Scraping",
    image: "/case-studies/data_scraping.png",
    industry: "Retail",
    services: ["Data Scraping Based on Client Criteria"],
    problem:
      "The client needed to aggregate pricing data from hundreds of ecommerce sites daily.",
    approach:
      "We began by working with the client’s pricing team to define exactly which products, competitors and attributes mattered most, turning a vague ‘scrape everything’ request into a focused, high-value spec. Next, we engineered a resilient scraping infrastructure using rotating proxies, headless browsers, and site-specific adapters to cope with changing layouts and anti-bot protections. The raw data was normalised into a consistent schema and loaded into a central warehouse, where we added automated quality checks and alerting so the team could instantly see when competitors changed prices or launched new SKUs.",
    results:
      "Enabled dynamic pricing updates and competitive analysis leading to a 20% margin increase.",
  },
  {
    slug: "data-analytics-visualization-case",
    title: "Real-Time Analytics Dashboards",
    image: "/case-studies/data_analytics.png",
    industry: "SaaS",
    services: ["Data Analysis & Visualization"],
    problem:
      "Executives lacked a single source of truth for KPIs across departments.",
    approach:
      "We interviewed stakeholders from sales, product, marketing and customer success to collect their ‘must-have’ metrics and uncover where existing reports conflicted. Based on that discovery, we modelled a shared set of definitions—what a lead, opportunity, active user or churned customer actually meant—and implemented them inside a modern data stack. Finally, we built interactive dashboards with drill-downs, cohort views and alerting, so leaders could jump from high-level KPIs into the underlying drivers in just a few clicks, without waiting for an analyst to run custom reports.",
    results:
      "Provided actionable insights that reduced decision making time by 40%.",
  },
  {
    slug: "web-development-case",
    title: "Modern Web Platform",
    image: "/case-studies/web_development.png",
    industry: "Education",
    services: ["Web Development"],
    problem:
      "An outdated website was slow and difficult to update, hurting student enrolment.",
    approach:
      "We started with a UX workshop, reviewing analytics and student feedback to understand which pages truly influenced enquiries and applications. With that insight, we rebuilt the site using Next.js and a headless CMS, separating content from code so the marketing team could update programs, tuition and deadlines without developer help. We also optimised performance with image optimisation, caching and edge delivery, and wired in behavioural analytics to continuously test variations of landing pages, forms and calls-to-action.",
    results:
      "Page load times decreased by 60% and enrolment enquiries increased by 30%.",
  },
  {
    slug: "graphics-design-case",
    title: "Brand Identity Refresh",
    image: "/case-studies/graphics_design.png",
    industry: "Hospitality",
    services: ["Graphics Design"],
    problem:
      "Inconsistent branding across channels weakened customer trust.",
    approach:
      "Our design team conducted a visual audit of every guest touchpoint—website, menus, signage, booking emails and social feeds—to spot mismatched logos, colours and tone of voice. We then collaborated with key stakeholders to define a refreshed brand story and visual language that reflected the venue’s atmosphere and target audience. This became a practical brand kit: typography, colour palettes, layouts, photography guidelines and ready-to-use templates for social media, ensuring every future piece of communication felt recognisably ‘on brand’.",
    results:
      "Strengthened brand recognition and drove a 15% uplift in bookings.",
  },
  {
    slug: "video-post-production-case",
    title: "Video Marketing Enhancement",
    image: "/case-studies/video_production.png",
    industry: "Tech",
    services: ["Video Post Production"],
    problem:
      "Raw product demo footage lacked polish and failed to engage prospects.",
    approach:
      "We sat down with the sales and product teams to understand the key objections they faced on calls and what a ‘perfect’ demo would answer in the first 90 seconds. Using that insight, we re-structured the existing footage into a narrative that opened with customer pain, moved through the solution, and ended with strong proof points and a clear call-to-action. Motion graphics, on-screen annotations and subtle sound design were layered in to highlight important moments, while different cuts were produced for social, landing pages and webinar follow-ups.",
    results:
      "Increased viewer retention by 70% and doubled lead conversions.",
  },
  {
    slug: "ai-automation-case",
    title: "Operational AI Automation",
    image: "/case-studies/ai_automation.png",
    industry: "Customer Support",
    services: ["AI Automation"],
    problem:
      "Support teams spent hours on repetitive triage and ticket routing.",
    approach:
      "We analysed several months of historical tickets to cluster common request types and identify which ones could be safely automated. Based on that analysis, we deployed AI agents capable of understanding incoming messages, classifying intent, and either answering directly using a controlled knowledge base or routing the ticket to the right queue with the correct priority. All automations were rolled out with careful safeguards—easy human takeover, clear labelling and analytics—so the support leadership could monitor impact, refine flows and gradually expand the range of tasks handled by AI.",
    results:
      "Reduced response times by 50% and freed up staff for higher value tasks.",
  },
  {
    slug: "facebook-competitor-watchdog-case",
    title: "Ad Intelligence Watchdog",
    image: "/case-studies/watchdog.png",
    industry: "D2C",
    services: ["Facebook Competitor Watchdog"],
    problem:
      "Marketing team lacked visibility into competitor ad spend and creative trends.",
    approach:
      "We began by listing the client’s key competitors and target audiences, then configured our Watchdog service to continuously scan meta ad libraries for new and changing campaigns. The collected creatives and metadata were normalised into an easy-to-filter dashboard that highlighted which messages, formats and offers competitors were pushing hardest. Weekly insight summaries translated this raw intelligence into concrete recommendations—what to test next, which audiences to defend, and where the client could out-innovate rivals with fresh creative angles.",
    results:
      "Optimised ad budgets and improved creative performance by 25%.",
  },
  {
    slug: "ecommerce-package-case",
    title: "E-Commerce Transformation",
    image: "/case-studies/ecommerce_package.png",
    industry: "Retail",
    services: ["E-Commerce Package"],
    problem:
      "The client’s store had poor UX and outdated integrations.",
    approach:
      "We first reviewed the full purchase funnel—from homepage to post-purchase emails—to pinpoint where customers dropped off and what friction they experienced. Then we migrated the store to a modern headless commerce stack, introducing a cleaner navigation, faster product search and a simplified, mobile-optimised checkout. Behind the scenes we integrated analytics, CRM and email automation so browsing behaviour, cart events and purchases automatically triggered relevant flows like abandoned-cart nudges, win-back campaigns and personalised recommendations.",
    results:
      "Improved conversion rates by 35% and reduced cart abandonment by 20%.",
  },
  {
    slug: "business-email-solutions-case",
    title: "Enterprise Email Overhaul",
    image: "/case-studies/email_solutions.png",
    industry: "Professional Services",
    services: ["Business Email Solutions"],
    problem:
      "Frequent email outages and deliverability issues impacted client communication.",
    approach:
      "We conducted a technical review of the client’s current mail setup—DNS records, mail relays, inbox providers and security policies—to identify misconfigurations and single points of failure. The environment was then rebuilt on a more reliable, scalable platform with enforced SPF, DKIM and DMARC, plus clear mailbox policies and admin controls for onboarding and off-boarding staff. Finally, we implemented monitoring and deliverability reporting so IT and leadership could see, in real time, how reliably messages were reaching client inboxes and where further tuning was needed.",
    results:
      "Achieved 99.99% uptime and improved sender reputation, leading to higher open rates.",
  },
  {
    slug: "custom-build-case",
    title: "Custom Solution PoC",
    image: "/case-studies/custom_build.png",
    industry: "Start-up",
    services: ["Custom Build (Client Criteria)"],
    problem:
      "A unique business requirement couldn’t be fulfilled by existing off-the-shelf products.",
    approach:
      "We kicked off with a focused discovery workshop to capture the startup’s vision, constraints and success metrics, turning loose ideas into a clear, prioritised feature set. From there we designed a lightweight architecture and built a clickable prototype, validating key interactions and workflows with real users before writing production code. The final proof-of-concept was delivered as a small but robust product slice—complete with documentation, roadmap suggestions and technical due diligence notes—so the founders could confidently present both business value and technical feasibility to potential investors.",
    results:
      "Validated the concept within two weeks, enabling the start-up to secure investor funding.",
  },
];
