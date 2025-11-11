"use client";

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Environment = 'Marketing' | 'Sales' | 'Product';

export default function Dashboard() {
  const [env, setEnv] = useState<Environment>('Marketing');
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');

  const data = getData(env, range);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(['Marketing', 'Sales', 'Product'] as Environment[]).map((option) => (
            <button
              key={option}
              onClick={() => setEnv(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${env === option ? 'bg-neon text-base-900' : 'bg-base/80 text-gray-300'} transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setRange(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${range === option ? 'bg-neon text-base-900' : 'bg-base/80 text-gray-300'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 bg-base/80 border border-white/10 rounded-2xl">
          <h4 className="font-heading text-neon mb-2">Revenue Over Time</h4>
          {/*
            Use a fixed height container with maintainAspectRatio set to true. This
            prevents the chart from stretching vertically as data changes. The
            aspectRatio option ensures charts keep a consistent 16:9 ratio.
          */}
          <div className="h-64">
            <Line
              data={data.line}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 16 / 9,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
        <div className="p-4 bg-base/80 border border-white/10 rounded-2xl">
          <h4 className="font-heading text-neon mb-2">Top KPIs</h4>
          <div className="h-64">
            <Bar
              data={data.bar}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 16 / 9,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getData(env: Environment, range: '7d' | '30d' | '90d') {
  // Generate dummy data based on env and range
  const length = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const labels = Array.from({ length }, (_, i) => `${i + 1}`);
  const lineData = labels.map(() => Math.floor(Math.random() * 100) + 50);
  const barData = [
    Math.floor(Math.random() * 100) + 10,
    Math.floor(Math.random() * 100) + 10,
    Math.floor(Math.random() * 100) + 10,
    Math.floor(Math.random() * 100) + 10,
  ];
  return {
    line: {
      labels,
      datasets: [
        {
          data: lineData,
          borderColor: '#00d0ff',
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    },
    bar: {
      labels: ['Metric A', 'Metric B', 'Metric C', 'Metric D'],
      datasets: [
        {
          data: barData,
          backgroundColor: ['#00d0ff', '#39f0ff', '#8b5cf6', '#39f0ff'],
          borderRadius: 4,
        },
      ],
    },
  };
}