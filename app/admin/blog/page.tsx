"use client";

import { posts as defaultPosts, type BlogPost } from '@/lib/blog';
import { useState } from 'react';

/**
 * Admin interface for managing blog posts. Because the blog posts live in
 * a static file, this interface updates the in-memory list at runtime. In
 * a production environment you would back this with a database and create
 * API endpoints for CRUD operations.
 */
export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    content: '',
  });
  const [showForm, setShowForm] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addPost() {
    const newPost: BlogPost = {
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      title: form.title,
      date: form.date,
      excerpt: form.excerpt,
      content: form.content,
    };
    setPosts((prev) => [newPost, ...prev]);
    setForm({ title: '', slug: '', date: new Date().toISOString().slice(0, 10), excerpt: '', content: '' });
    setShowForm(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8">Blog Posts</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-neon mb-6"
      >
        {showForm ? 'Cancel' : 'Add New Post'}
      </button>
      {showForm && (
        <div className="border border-white/10 rounded-2xl p-6 mb-8 bg-base/80">
          <h2 className="font-heading text-xl text-neon mb-4">New Post</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="slug">Slug (optional)</label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={form.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={form.excerpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows={4}
                value={form.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
              />
            </div>
            <button onClick={addPost} className="btn-neon">Add Post</button>
          </div>
        </div>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="border border-white/10 rounded-2xl p-6 bg-base/80">
            <p className="text-sm text-gray-500 mb-1">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <h3 className="font-heading text-xl text-neon mb-1">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{post.excerpt}</p>
            <span className="text-gray-500 text-xs">Slug: {post.slug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}