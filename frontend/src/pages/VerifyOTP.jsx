import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Mail, Loader2, Code2 } from 'lucide-react';

export const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  const { verifyOTP, resendOTP, pendingEmail, requiresVerification, loading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (!requiresVerification || !pendingEmail) {
      navigate('/login');
    }
    clearError();
  }, [requiresVerification, pendingEmail, navigate, clearError]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    
    try {
      await verifyOTP(pendingEmail, otpValue);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in store
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    try {
      await resendOTP(pendingEmail);
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
      clearError();
    } catch (err) {
      // Handle error if needed
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
            <Code2 className="text-purple-500" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">DevMind AI</h1>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top glow effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"></div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 border border-purple-500/20">
              <Mail className="text-purple-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
            <p className="text-gray-400 mb-1">We sent a 6-digit code to</p>
            <p className="text-purple-400 font-semibold mb-4">{pendingEmail}</p>
            <p className="text-gray-500 text-sm">Enter it below to verify your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              ))}
            </div>

            {error && (
              <div className="text-center text-red-400 text-sm bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /> Verifying...</>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={timer > 0 || resending}
              className={`text-sm font-medium transition-colors ${
                timer > 0 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              {resending ? 'Resending...' : timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
