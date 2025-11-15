import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { posts as fallbackPosts, type BlogPost } from "@/lib/blog";

type Props = { params: { slug: string } };

// Use service role on the server (not exposed to client)
function getClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

async function findPost(slug: string): Promise<BlogPost | null> {
  const client = getClient();

  // 1) Try Supabase first
  if (client) {
    const { data, error } = await client
      .from("posts")
      .select("id, slug, title, date, excerpt, content, created_at, updated_at")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return data as BlogPost;
    }
  }

  // 2) Fallback to static file posts
  const fallback = fallbackPosts.find((p) => p.slug === slug) || null;
  return fallback;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const post = await findPost(params.slug);
  if (!post) {
    return {
      title: "Blog post not found",
    };
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.content.slice(0, 120),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await findPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="text-gray-300 mb-8 text-lg">{post.excerpt}</p>
      )}

      <div className="prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-200">
          {post.content}
        </p>
      </div>
    </article>
  );
}
