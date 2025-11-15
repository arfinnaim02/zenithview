// lib/blog.ts
export type BlogPost = {
  id?: string;              // Supabase UUID
  slug: string;
  title: string;
  date: string;             // ISO date string or YYYY-MM-DD
  excerpt: string;
  content: string;
  created_at?: string;
  updated_at?: string | null;
};

/**
 * Seed posts used as fallback whenever the Supabase `posts` table is empty
 * or unavailable. They also serve as example content.
 */
export const posts: BlogPost[] = [
  {
    slug: "ai-in-business",
    title: "AI in Business: Unlocking New Possibilities",
    date: "2025-09-10",
    excerpt:
      "Discover how artificial intelligence is transforming industries and creating new opportunities.",
    content: `## AI in Business

Artificial intelligence has moved from science fiction to practical application, revolutionising the way companies operate...`,
  },
  {
    slug: "competitor-intelligence-case-study",
    title: "Competitor Intelligence Case Study",
    date: "2025-08-02",
    excerpt:
      "Learn how we helped a retail client outsmart their competition with real-time ad monitoring.",
    content: `## Competitor Intelligence Case Study

In this post we explore...`,
  },
  {
    slug: "data-visualisation-tips",
    title: "Data Visualisation Tips for Better Dashboards",
    date: "2025-07-15",
    excerpt:
      "Design compelling dashboards with these best practices for data visualisation.",
    content: `## Data Visualisation Tips

Creating effective dashboards requires more than pretty charts...`,
  },
];
