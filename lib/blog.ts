export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'ai-in-business',
    title: 'AI in Business: Unlocking New Possibilities',
    date: '2025-09-10',
    excerpt: 'Discover how artificial intelligence is transforming industries and creating new opportunities.',
    content: `## AI in Business\n\nArtificial intelligence has moved from science fiction to practical application, revolutionising the way companies operate...`,
  },
  {
    slug: 'competitor-intelligence-case-study',
    title: 'Competitor Intelligence Case Study',
    date: '2025-08-02',
    excerpt: 'Learn how we helped a retail client outsmart their competition with real-time ad monitoring.',
    content: `## Competitor Intelligence Case Study\n\nIn this post we explore...`,
  },
  {
    slug: 'data-visualisation-tips',
    title: 'Data Visualisation Tips for Better Dashboards',
    date: '2025-07-15',
    excerpt: 'Design compelling dashboards with these best practices for data visualisation.',
    content: `## Data Visualisation Tips\n\nCreating effective dashboards requires more than pretty charts...`,
  },
];