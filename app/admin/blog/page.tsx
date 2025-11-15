"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blog";

type AdminPost = BlogPost & {
  id: string;
  created_at?: string;
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().slice(0, 10),
    excerpt: "",
    content: "",
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (!res.ok) throw new Error("Failed to load posts");
      const json = await res.json();
      setPosts(json.data ?? []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug:
          (form.slug || form.title.toLowerCase().replace(/\s+/g, "-")).trim(),
        date: form.date,
        excerpt: form.excerpt,
        content: form.content,
      };

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to create post");
      }

      const { data: newPost } = await res.json();
      setPosts((prev) => [newPost, ...prev]);

      setForm({
        title: "",
        slug: "",
        date: new Date().toISOString().slice(0, 10),
        excerpt: "",
        content: "",
      });
      setShowForm(false);
    } catch (err: any) {
      alert(err.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to delete post");
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete post");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8">
        Blog Posts
      </h1>

      <button onClick={() => setShowForm((s) => !s)} className="btn-neon mb-6">
        {showForm ? "Cancel" : "Add New Post"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddPost}
          className="border border-white/10 rounded-2xl p-6 mb-8 bg-base/80 space-y-4"
        >
          <h2 className="font-heading text-xl text-neon mb-2">New Post</h2>

          <div>
            <label className="block text-sm mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="slug">
              Slug (optional)
            </label>
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
            <label className="block text-sm mb-1" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="excerpt">
              Excerpt
            </label>
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
            <label className="block text-sm mb-1" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={form.content}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-md bg-base border border-white/10 focus:outline-none"
            />
          </div>

          <button type="submit" className="btn-neon" disabled={saving}>
            {saving ? "Saving…" : "Add Post"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-white/10 rounded-2xl p-6 bg-base/80"
            >
              <p className="text-sm text-gray-500 mb-1">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h3 className="font-heading text-xl text-neon mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{post.excerpt}</p>
              <p className="text-xs text-gray-500 mb-3">Slug: {post.slug}</p>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-400 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
