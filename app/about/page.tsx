import Timeline from '@/components/Timeline';
import TeamCard from '@/components/TeamCard';

const companyTimeline = [
  { number: 1, title: '2019', description: 'ZenithView founded with a vision to democratize AI for businesses.' },
  { number: 2, title: '2021', description: 'Launched our first AI dashboards and automation solutions.' },
  { number: 3, title: '2023', description: 'Introduced Competitor Watchdog and expanded into new markets.' },
  { number: 4, title: '2025', description: 'Growing team across Bangladesh & beyond, delivering world‑class products.' },
];

const teamMembers = [
  {
    name: 'Ayaan Chowdhury',
    role: 'CEO & Co‑Founder',
    photo: '/team/founder1.png',
    bio: 'Ayaan oversees product strategy and champions AI innovation. With a background in machine learning, he leads the vision and growth of ZenithView.',
  },
  {
    name: 'Sara Rahman',
    role: 'CTO & Co‑Founder',
    photo: '/team/founder2.png',
    bio: 'Sara heads technology and engineering. She has built scalable platforms and loves bridging design with engineering excellence.',
  },
  {
    name: 'Jamil Hasan',
    role: 'COO & Co‑Founder',
    photo: '/team/founder3.png',
    bio: 'Jamil brings operations and marketing expertise, ensuring our solutions deliver real value and resonate with clients.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6 text-center">Our Story</h1>
      <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">ZenithView was born from a passion to harness the power of AI and data to transform businesses. Our mission is to build intelligent, ethical, and human‑centric solutions that help organizations thrive in the digital era.</p>
      <div className="mb-20">
        <Timeline steps={companyTimeline} />
      </div>
      <h2 className="font-heading text-3xl text-neon mb-8 text-center">Meet the Founders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
      </div>
      <div className="mt-20 text-center">
        <h2 className="font-heading text-2xl text-neon mb-4">Mission & Vision</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-4">Our mission is to empower businesses to make smarter decisions through AI, automation, and data insights. We envision a world where intelligent technology amplifies human potential and drives positive change.</p>
        <p className="text-gray-400 max-w-3xl mx-auto mb-4">We value innovation, transparency, and collaboration. We believe in building sustainable solutions that create lasting impact for our clients and communities.</p>
      </div>

      {/* New values section to make the about page more engaging */}
      <div className="mt-20 text-center">
        <h2 className="font-heading text-2xl text-neon mb-4">Our Core Values</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-6">
          At ZenithView we are guided by principles that inform every decision we make. These values
          underpin our culture and the way we work with clients and colleagues.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-base/80 rounded-2xl border border-white/10">
            <h3 className="font-heading text-neon mb-2 text-xl">Innovation</h3>
            <p className="text-gray-400 text-sm">We embrace curiosity and push the boundaries of what’s possible with technology.</p>
          </div>
          <div className="p-6 bg-base/80 rounded-2xl border border-white/10">
            <h3 className="font-heading text-neon mb-2 text-xl">Integrity</h3>
            <p className="text-gray-400 text-sm">Honesty and transparency build trust in every relationship we foster.</p>
          </div>
          <div className="p-6 bg-base/80 rounded-2xl border border-white/10">
            <h3 className="font-heading text-neon mb-2 text-xl">Collaboration</h3>
            <p className="text-gray-400 text-sm">We believe the best solutions emerge when diverse minds come together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}