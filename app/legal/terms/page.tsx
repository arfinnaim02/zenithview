export const metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-neon mb-6">Terms of Service</h1>
      <p className="text-gray-400 mb-4">These terms govern your use of our website and services. By accessing ZenithView, you agree to these terms.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Use of Services</h2>
      <p className="text-gray-400 mb-4">Our services are provided as-is without warranties. You may not use our services for illegal activities or infringe on intellectual property rights.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Payment & Fees</h2>
      <p className="text-gray-400 mb-4">Fees are due as outlined in your proposal or invoice. Late payments may incur interest and result in suspension of services.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Intellectual Property</h2>
      <p className="text-gray-400 mb-4">All content, designs, and software are property of ZenithView or its licensors. You may not reproduce or redistribute without permission.</p>
      <h2 className="font-heading text-2xl text-neon mt-8 mb-2">Contact</h2>
      <p className="text-gray-400 mb-4">For questions regarding these terms, please contact legal@zenithview.com.</p>
    </div>
  );
}