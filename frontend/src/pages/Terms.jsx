import { useNavigate, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#7c3aed]/30 overflow-x-hidden animate-fade-in">
      
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="text-[#7c3aed]" size={28} />
            <span className="font-bold text-xl tracking-tight text-white">DevMind AI</span>
          </Link>
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10"
          >
            &larr; Back
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: July 2026</p>

        <section className="space-y-6">
          
          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              By using DevMind AI you agree to these terms. If you disagree, please do not use our service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              2. Description of Service
            </h2>
            <p className="text-gray-400 leading-relaxed">
              DevMind AI is an AI-powered coding assistant that helps developers explain, debug, and write code using artificial intelligence.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              3. User Accounts
            </h2>
            <ul className="text-gray-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                You must provide accurate information when registering
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                You are responsible for maintaining account security
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                You must be at least 13 years old to use this service
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                One person may not create multiple accounts
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              4. Acceptable Use
            </h2>
            <p className="text-gray-400 leading-relaxed mb-2">You agree NOT to:</p>
            <ul className="text-gray-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Use the service for illegal activities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Submit malicious code intended to cause harm
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Attempt to reverse engineer or hack the platform
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Share your account credentials with others
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Use automated bots to abuse the service
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              5. AI Generated Content
            </h2>
            <ul className="text-gray-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                AI responses are for assistance only
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                We do not guarantee accuracy of AI responses
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Always verify critical code before using in production
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                DevMind AI is not responsible for bugs in AI generated code
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              6. Intellectual Property
            </h2>
            <ul className="text-gray-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                DevMind AI platform and design are our property
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                Code you submit remains your property
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                AI generated responses are provided as-is for your use
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              7. Service Availability
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We strive for 99% uptime but do not guarantee uninterrupted service. We may perform maintenance which could cause temporary downtime.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              8. Free Service
            </h2>
            <p className="text-gray-400 leading-relaxed">
              DevMind AI is currently provided free of charge. We reserve the right to introduce paid plans in future with advance notice to existing users.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              9. Termination
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to suspend accounts that violate these terms without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              10. Limitation of Liability
            </h2>
            <p className="text-gray-400 leading-relaxed">
              DevMind AI is provided as-is without warranties. We are not liable for any damages arising from use of our service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              11. Changes to Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We may update these terms and will notify users of significant changes via email.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              12. Contact
            </h2>
            <p className="text-gray-400 leading-relaxed">
              For terms related questions: <a href="mailto:devmindai@gmail.com" className="text-[#a78bfa] hover:text-white transition-colors">devmindai@gmail.com</a>
            </p>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};
