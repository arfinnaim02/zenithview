import { posts } from '@/lib/blog';
import { notFound } from 'next/navigation';

type Params = { slug: string };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  // Convert markdown-like content to HTML (simple conversion)
  const html = post!.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        return `<h2>${line.replace('## ', '')}</h2>`;
      }
      return `<p>${line}</p>`;
    })
    .join('');
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-sm text-gray-500 mb-2">{new Date(post!.date).toLocaleDateString()}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">{post!.title}</h1>
      <article className="prose prose-invert prose-lg" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}