import { createClient } from "@supabase/supabase-js";
import { posts as fallbackPosts, type BlogPost } from "@/lib/blog";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Use service role on the server so RLS doesn't block public posts
function getClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

async function getPosts(): Promise<BlogPost[]> {
  const client = getClient();
  if (!client) {
    // No Supabase config – use only file posts
    return fallbackPosts;
  }

  const { data, error } = await client
    .from("posts")
    .select("id, slug, title, date, excerpt, content, created_at, updated_at")
    .order("date", { ascending: false });

  if (error || !data || data.length === 0) {
    // On error / empty table, fall back to static posts
    return fallbackPosts;
  }

  return data as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8 text-center">
        Blog
      </h1>
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border border-white/10 rounded-2xl p-6 bg-base/80"
            >
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="font-heading text-2xl text-neon hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-400 mt-2 text-sm max-w-3xl">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-electric text-sm mt-4 inline-block"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
