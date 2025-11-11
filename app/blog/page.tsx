import { posts } from '@/lib/blog';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8 text-center">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border border-white/10 rounded-2xl p-6 bg-base/80">
            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <Link href={`/blog/${post.slug}`} className="font-heading text-2xl text-neon hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-400 mt-2 text-sm max-w-3xl">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-electric text-sm mt-4 inline-block">Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}