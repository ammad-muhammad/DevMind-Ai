import { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Settings as SettingsIcon, AlertTriangle, Loader2, ChevronDown } from 'lucide-react';

const COLORS = [
  { name: 'purple', class: 'from-purple-600 to-purple-900', code: '#9333ea' },
  { name: 'blue', class: 'from-blue-600 to-blue-900', code: '#2563eb' },
  { name: 'green', class: 'from-green-600 to-green-900', code: '#16a34a' },
  { name: 'red', class: 'from-red-600 to-red-900', code: '#dc2626' },
  { name: 'orange', class: 'from-orange-500 to-orange-800', code: '#f97316' },
  { name: 'pink', class: 'from-pink-500 to-pink-800', code: '#ec4899' }
];

const LANGUAGES = ['JavaScript', 'Python', 'PHP', 'TypeScript', 'Java', 'C++'];
const styles = [
  { value: "concise", label: "Concise", desc: "Short & direct" },
  { value: "balanced", label: "Balanced", desc: "Detailed enough" },
  { value: "detailed", label: "Detailed", desc: "In-depth explanations" },
];

export const Settings = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Profile states
  const [avatarColor, setAvatarColor] = useState(
    localStorage.getItem('avatar_color') || COLORS[0].name
  );

  // Preferences states
  const [defaultLanguage, setDefaultLanguage] = useState(
    localStorage.getItem('default_language') || LANGUAGES[0]
  );
  const [langOpen, setLangOpen] = useState(false);

  const [responseStyle, setResponseStyle] = useState(
    localStorage.getItem('response_style') || styles[1].value
  );

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ text: '', type: '' });

  // Danger Zone
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Effects to save preferences
  useEffect(() => {
    localStorage.setItem('avatar_color', avatarColor);
  }, [avatarColor]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.relative')) setLangOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwdMsg({ text: 'All fields are required', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    setPwdLoading(true);
    try {
      const res = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPwdMsg({ text: res.data.message || 'Password changed successfully', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPwdMsg({ text: error.response?.data?.message || 'Error changing password', type: 'error' });
    } finally {
      setPwdLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await api.delete('/auth/delete-account');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Error deleting account. Please try again later.');
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const selectedColorClass = COLORS.find(c => c.name === avatarColor)?.class || COLORS[0].class;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] overflow-y-auto scroll-smooth">
      {/* Header */}
      <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-10 shrink-0">
        <div className="w-10 lg:w-0" />
        <h2 className="font-semibold flex items-center gap-2 text-white lg:mr-auto">
          <SettingsIcon className="text-gray-400" size={20} />
          Settings
        </h2>
      </div>

      <div className="max-w-4xl mx-auto w-full p-6 flex flex-col gap-8 pb-20">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your profile, preferences, and security.</p>
        </div>

        {/* Profile Section */}
        <div className="border border-gray-800 rounded-xl p-6 bg-[#111111] animate-fadeInUp">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-6 font-semibold">Profile</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedColorClass} flex items-center justify-center text-white font-bold text-4xl shadow-inner`}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setAvatarColor(c.name)}
                    className={`w-6 h-6 rounded-full border-2 ${avatarColor === c.name ? 'border-white scale-110' : 'border-transparent hover:scale-110'} transition-all`}
                    style={{ backgroundColor: c.code }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-1 block">Username</label>
                <input
                  type="text"
                  value={user?.username || ''}
                  disabled
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-gray-500 outline-none opacity-80"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 mb-1 block">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-gray-500 outline-none opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="border border-gray-800 rounded-xl p-6 bg-[#111111] animate-fadeInUp delay-100">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-6 font-semibold">Preferences</h3>
          <div className="flex flex-col gap-6">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium text-gray-400 mb-2 block">Default Language</label>
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="w-full flex items-center justify-between
                  bg-gray-900 border border-gray-700 hover:border-purple-500
                  rounded-xl px-4 py-3 text-white transition-colors duration-200"
                >
                  <span>{defaultLanguage}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform 
                  duration-200 ${langOpen ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {langOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1
                  bg-gray-900 border border-gray-700 rounded-xl 
                  overflow-hidden z-50 shadow-xl shadow-black/50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setDefaultLanguage(lang)
                          localStorage.setItem('default_language', lang)
                          setLangOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm
                        transition-colors duration-150 flex items-center gap-3
                        ${defaultLanguage === lang 
                          ? 'bg-purple-600/20 text-purple-400' 
                          : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {defaultLanguage === lang && (
                          <span className="text-purple-400">✓</span>
                        )}
                        <span className={defaultLanguage === lang ? 'ml-0' : 'ml-5'}>
                          {lang}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-3 block">Response Style</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {styles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      setResponseStyle(s.value)
                      localStorage.setItem('response_style', s.value)
                    }}
                    className={`flex-1 p-4 rounded-xl border text-left
                    transition-all duration-200
                    ${responseStyle === s.value
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <p className="font-medium text-sm">{s.label}</p>
                    <p className="text-xs mt-1 opacity-70">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="border border-gray-800 rounded-xl p-6 bg-[#111111] animate-fadeInUp delay-200">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-6 font-semibold">Change Password</h3>
          <div className="flex flex-col gap-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-1 block">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {pwdMsg.text && (
              <div className={`text-sm mt-1 ${pwdMsg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {pwdMsg.text}
              </div>
            )}

            <button
              onClick={handlePasswordChange}
              disabled={pwdLoading}
              className="mt-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 px-6 rounded-lg font-medium transition-colors w-fit flex items-center gap-2"
            >
              {pwdLoading ? <><Loader2 className="animate-spin" size={16} /> Saving...</> : 'Save Password'}
            </button>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="border border-red-900/30 bg-red-950/10 rounded-xl p-6 animate-fadeInUp delay-300">
          <h3 className="text-red-400 text-xs uppercase tracking-wider mb-6 font-semibold">Danger Zone</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="text-gray-300 font-medium mb-1">Delete Account</p>
              <p className="text-gray-500 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="shrink-0 border border-red-500/50 hover:bg-red-500/10 text-red-400 px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-red-900/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Are you absolutely sure?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                This action cannot be undone. This will permanently delete your account, all your chats, and all your saved snippets.
              </p>
              
              <div className="flex gap-3 w-full mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-300 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="flex-1 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {deleteLoading ? <><Loader2 className="animate-spin" size={16}/> Deleting...</> : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
