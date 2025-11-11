import dynamic from 'next/dynamic';

// Dynamically import the dashboard to avoid SSR issues with chart.js
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });

export const metadata = {
  title: 'Interactive Dashboards',
  description: 'Explore sample AI dashboards with real‑looking demo data.',
};

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-8 text-center">Interactive Dashboards</h1>
      <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">Select an environment and time range to explore how our dashboards visualize key metrics and uncover insights.</p>
      <Dashboard />
    </div>
  );
}