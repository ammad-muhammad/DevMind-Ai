import { useNavigate, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export const Privacy = () => {
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
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: July 2026</p>

        <section className="space-y-6">
          
          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              1. Information We Collect
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We collect information you provide when creating an account including username, email address, and password (encrypted). We also collect code snippets and chat history you submit to use our AI features.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              2. How We Use Your Information
            </h2>
            <ul className="text-gray-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                To provide and improve DevMind AI services
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                To send account verification emails
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                To save your chat history and code snippets
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] mt-1.5">&bull;</span>
                We never sell your data to third parties
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              3. Data Storage
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Your data is stored securely in encrypted databases. Passwords are hashed using bcrypt and never stored in plain text. Chat history is stored to provide conversation continuity.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              4. AI Processing
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Code and text you submit is processed by third-party AI providers (Groq AI) to generate responses. We do not use your code to train AI models.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              5. Email Communications
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We only send emails for account verification and security purposes. We do not send marketing emails.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              6. Data Deletion
            </h2>
            <p className="text-gray-400 leading-relaxed">
              You can delete your account and all associated data at any time from Settings &rarr; Danger Zone.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              7. Cookies
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We use localStorage to maintain your login session. No third-party tracking cookies are used.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              8. Changes to Privacy Policy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this policy and will notify users of significant changes via email.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-gray-800">
              9. Contact
            </h2>
            <p className="text-gray-400 leading-relaxed">
              For privacy concerns contact us at: <a href="mailto:devmindai@gmail.com" className="text-[#a78bfa] hover:text-white transition-colors">devmindai@gmail.com</a>
            </p>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};
