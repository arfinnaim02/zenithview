// src/lib/services.ts
export type Service = {
  title: string;
  slug: string;
  tagline: string;
  problem: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
  pricing: { name: string; description?: string; price?: string; features?: string[] }[];
  faq: { question: string; answer: string }[];
  caseStudies: { title: string; slug: string }[];
  tags?: string[];
};

export const services: Service[] = [
  {
    title: "Data Scraping Based on Client Criteria",
    slug: "data-scraping",
    tagline: "Reliable, targeted data extraction from the sources that matter to you.",
    problem: "You need clean, structured data from multiple sources, on a schedule, with quality checks.",
    solution:
      "We design robust scrapers with proxy rotation, headless browsers and validation to deliver fresh, deduplicated datasets.",
    deliverables: [
      "Requirements & target-source audit",
      "Scraper pipeline & anti-bot strategy",
      "Data normalization & QA",
      "CSV/JSON/DB delivery + schedule",
      "Monitoring & failover alerts",
    ],
    techStack: ["Playwright/Puppeteer", "Node.js", "Python", "Proxies", "Supabase/Postgres", "S3/Blob"],
    pricing: [
      {
        name: "Starter",
        price: "$799",
        description: "1–2 sources, up to 50k records",
        features: ["Basic anti-bot", "CSV/JSON export", "Email support"],
      },
      {
        name: "Growth",
        price: "$2,499",
        description: "Up to 5 sources, 300k+ records",
        features: ["Proxy rotation", "DB delivery", "Monitoring dashboard"],
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "High scale / complex sources",
        features: ["SLA & SSO", "Priority support", "Custom hosting"],
      },
    ],
    faq: [
      { question: "Is scraping legal?", answer: "We comply with robots.txt and applicable laws. We avoid login-gated sources unless you provide explicit permissions." },
    ],
    caseStudies: [{ title: "Retail price tracker", slug: "retail-price-tracker" }],
    tags: ["Data", "Scraping"],
  },

  {
    title: "Data Analysis & Visualization",
    slug: "data-analytics-visualization",
    tagline: "From raw data to decision-ready visuals.",
    problem: "You collect data but insights are buried and reports are manual.",
    solution:
      "We model, analyze and visualize metrics that matter, delivering dashboards that update automatically.",
    deliverables: ["Data audit", "Modeling", "Dashboards", "Report automation", "Anomaly alerts"],
    techStack: ["Python", "Pandas", "SQL", "Supabase", "Recharts", "Chart.js", "Next.js"],
    pricing: [
      { name: "Starter", price: "$1,200", features: ["1 dashboard", "Basic metrics", "Email support"] },
      { name: "Growth", price: "$3,000", features: ["3 dashboards", "Drilldowns", "Slack alerts"] },
      { name: "Enterprise", price: "Custom", features: ["Row-level security", "SSO", "SLA"] },
    ],
    faq: [],
    caseStudies: [{ title: "Marketing performance cockpit", slug: "marketing-performance-cockpit" }],
    tags: ["Analytics", "Dashboards"],
  },

  {
    title: "Web Development",
    slug: "web-development",
    tagline: "Modern, performant websites and apps.",
    problem: "Legacy stacks and slow pages limit growth.",
    solution: "We build fast, secure sites with strong SEO and maintainable code.",
    deliverables: ["UX/UI", "Responsive build", "CMS setup", "SEO baseline", "Deployment & CI/CD"],
    techStack: ["Next.js 14", "TypeScript", "Tailwind", "Vercel", "Sanity / Supabase"],
    pricing: [
      { name: "Landing", price: "$1,500", features: ["1–3 pages", "CMS optional", "GA4"] },
      { name: "Site", price: "$4,500", features: ["5–10 pages", "Blog/CMS", "Contact flows"] },
      { name: "App", price: "Custom", features: ["Auth", "DB", "APIs", "Observability"] },
    ],
    faq: [],
    caseStudies: [{ title: "High-converting SaaS site", slug: "saas-site" }],
    tags: ["Web", "Frontend"],
  },

  {
    title: "Graphics Design",
    slug: "graphics-design",
    tagline: "Brand-aligned visuals that stand out.",
    problem: "Inconsistent design lowers trust and conversions.",
    solution: "We deliver a clean system: logo, palette, components, templates.",
    deliverables: ["Brand kit", "Social templates", "Pitch deck", "Icons/illustrations"],
    techStack: ["Figma", "Adobe Suite", "Canva (handoff)"],
    pricing: [
      { name: "Starter", price: "$600", features: ["Logo + palette", "Basic templates"] },
      { name: "Brand Kit", price: "$1,800", features: ["System + deck", "Components"] },
      { name: "On-going", price: "$1,000/mo", features: ["Monthly assets", "Priority queue"] },
    ],
    faq: [],
    caseStudies: [{ title: "Brand refresh", slug: "brand-refresh" }],
    tags: ["Design"],
  },

  {
    title: "Video Post Production",
    slug: "video-post-production",
    tagline: "Edit, color, sound, and graphics for compelling stories.",
    problem: "Raw footage needs professional polish and speed.",
    solution: "We handle editing, grading, motion graphics, captions and exports.",
    deliverables: ["Edit & color", "Motion graphics", "Captions", "Social cuts"],
    techStack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    pricing: [
      { name: "Short-form", price: "$400", features: ["≤60s", "Captions", "1 round of edits"] },
      { name: "Long-form", price: "$1,200", features: ["3–10 mins", "Graphics", "2 rounds"] },
      { name: "Retainer", price: "Custom", features: ["Monthly batch", "Priority queue"] },
    ],
    faq: [],
    caseStudies: [{ title: "Product explainers", slug: "product-explainers" }],
    tags: ["Video"],
  },

  {
    title: "AI Automation",
    slug: "ai-automation",
    tagline: "Automate workflows with reliable AI agents and triggers.",
    problem: "Teams spend time on repetitive tasks; processes don’t scale.",
    solution: "We build automations connecting your tools with serverless functions and AI.",
    deliverables: ["Process map", "Automation build", "Human-in-the-loop", "Monitoring"],
    techStack: ["Node.js", "Next.js", "Supabase", "OpenAI/Claude", "Zapier/Make"],
    pricing: [
      { name: "Pilot", price: "$1,000", features: ["1 workflow", "Basic guardrails"] },
      { name: "Ops Pack", price: "$3,500", features: ["3–5 workflows", "Dashboards"] },
      { name: "Enterprise", price: "Custom", features: ["SOC2 patterns", "LLM observability"] },
    ],
    faq: [],
    caseStudies: [{ title: "Support automation", slug: "support-automation" }],
    tags: ["AI", "Automation"],
  },

  {
    title: "Facebook Competitor Watchdog",
    slug: "facebook-competitor-watchdog",
    tagline: "Track competitor ads, creatives and messaging daily.",
    problem: "Hard to see how competitors spend and evolve creative.",
    solution: "We aggregate ad library data into alerts, trends and creative boards.",
    deliverables: ["Competitor list", "Ad ingestion", "Dashboards", "Alerts & reports"],
    techStack: ["Meta Ad Library", "Python/Node", "DB", "Recharts"],
    pricing: [
      { name: "Starter", price: "$900", features: ["3 competitors", "Weekly report"] },
      { name: "Growth", price: "$2,200", features: ["10 competitors", "Daily alerts"] },
      { name: "Enterprise", price: "Custom", features: ["Unlimited", "API access"] },
    ],
    faq: [],
    caseStudies: [{ title: "D2C creative radar", slug: "d2c-creative-radar" }],
    tags: ["Watchdog", "Marketing"],
  },

  {
    title: "E-Commerce Package",
    slug: "ecommerce-package",
    tagline: "Everything to launch or modernize your store.",
    problem: "Catalog, payments, analytics and UX need to work together.",
    solution: "We set up storefronts, payments, tracking and conversion flows.",
    deliverables: ["Store setup", "Theme & UX", "Payments & shipping", "Analytics"],
    techStack: ["Next.js", "Shopify/Medusa", "Stripe", "GA4/Plausible"],
    pricing: [
      { name: "Launch", price: "$2,500", features: ["Catalog", "Theme", "Payments"] },
      { name: "Growth", price: "$5,500", features: ["Apps", "Tracking", "Email flows"] },
      { name: "Custom", price: "Custom", features: ["Headless", "Complex ops"] },
    ],
    faq: [],
    caseStudies: [{ title: "Headless store", slug: "headless-store" }],
    tags: ["E-Commerce"],
  },

  {
    title: "Business Email Solutions",
    slug: "business-email-solutions",
    tagline: "Secure, scalable email for your team and domains.",
    problem: "Unreliable email and poor deliverability hurt your brand.",
    solution: "We set up professional email with proper authentication and admin controls.",
    deliverables: ["Domain setup", "MX/SPF/DKIM/DMARC", "Migrations", "Policies & admin"],
    techStack: ["Google Workspace", "Microsoft 365", "Cloudflare", "DMARC"],
    pricing: [
      { name: "Setup", price: "$400", features: ["Domain & DNS", "Auth records"] },
      { name: "Migrate", price: "$900", features: ["Mailbox moves", "Testing"] },
      { name: "Manage", price: "$150/mo", features: ["Admin & support", "Policies"] },
    ],
    faq: [],
    caseStudies: [{ title: "Deliverability lift", slug: "deliverability-lift" }],
    tags: ["Email", "IT"],
  },

  {
    title: "Custom Build (Client Criteria)",
    slug: "client-criteria",
    tagline: "Tell us exactly what you need — we’ll scope and ship.",
    problem: "Off-the-shelf doesn’t fit your exact requirements.",
    solution: "We run a short discovery, propose options, then deliver a focused PoC or build.",
    deliverables: ["Discovery", "Proposal", "PoC/Build", "Handover & docs"],
    techStack: ["As needed"],
    pricing: [{ name: "PoC", price: "$2,000", features: ["2-week sprint", "Demo & docs"] }],
    faq: [],
    caseStudies: [],
    tags: ["Custom"],
  },
];
