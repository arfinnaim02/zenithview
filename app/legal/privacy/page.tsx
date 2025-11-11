export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Information We Collect</h2>
      <p className="text-gray-400 mb-4">We may collect personal information you provide when you contact us or use our services, including your name, email address, and company details.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">How We Use Information</h2>
      <p className="text-gray-400 mb-4">We use your information to respond to inquiries, provide services, and improve our offerings. We do not sell your data to third parties.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Your Rights</h2>
      <p className="text-gray-400 mb-4">You have the right to access, correct, or delete your personal information. Contact us at privacy@zenithview.com for any requests.</p>
    </div>
  );
}