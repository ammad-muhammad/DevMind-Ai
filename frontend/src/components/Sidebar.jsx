import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useChatStore from '../store/chatStore';
import { 
  Code2, 
  MessageSquare, 
  Bug, 
  BookOpen, 
  Zap, 
  MessageCircle,
  Save,
  Settings,
  LogOut,
  Trash2,
  Plus,
  Menu,
  X
} from 'lucide-react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { chats, getChat, deleteChat, activeChat, clearChat } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleItemClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const handleHistoryClick = async (chatId) => {
    handleItemClick();
    await getChat(chatId);
    navigate('/dashboard/chat');
  };

  const navItems = [
    { path: '/dashboard/chat', label: 'AI Chat', icon: MessageSquare, color: 'text-[#7c3aed]', activeBg: 'bg-[#7c3aed]/10', activeBorder: 'border-[#7c3aed]' },
    { path: '/dashboard/debug', label: 'Debugger', icon: Bug, color: 'text-[#ea580c]', activeBg: 'bg-[#ea580c]/10', activeBorder: 'border-[#ea580c]' },
    { path: '/dashboard/explain', label: 'Explainer', icon: BookOpen, color: 'text-[#2563eb]', activeBg: 'bg-[#2563eb]/10', activeBorder: 'border-[#2563eb]' },
    { path: '/dashboard/write', label: 'Code Writer', icon: Zap, color: 'text-[#16a34a]', activeBg: 'bg-[#16a34a]/10', activeBorder: 'border-[#16a34a]' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2.5 left-3 z-50 lg:hidden bg-gray-900 border border-gray-700 p-2 rounded-lg text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sidebar Container */}
      <div className={`
        fixed lg:relative left-0 top-0 h-full z-50 
        w-[260px] bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col shrink-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Section */}
        <div className="p-4 shrink-0 pt-16 lg:pt-4">
          <Link to="/" onClick={handleItemClick} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity px-2">
            <Code2 className="text-[#7c3aed]" size={24} />
            <span className="font-bold text-lg tracking-tight text-white">DevMind AI</span>
          </Link>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 flex flex-col gap-6 scroll-smooth">
          
          {/* Tools Section */}
          <div className="flex flex-col gap-1">
            <div className="px-3 mb-2 text-xs font-bold text-gray-500 tracking-wider">TOOLS</div>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              // using delays up to 300 for first 4 items
              const delayClass = index === 0 ? '' : `delay-${index * 100}`;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleItemClick}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 animate-slideInLeft ${delayClass}
                    ${isActive 
                      ? `${item.activeBg} text-white ${item.activeBorder} glow-purple` 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-[#111111]'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? item.color : 'text-gray-500 shrink-0'} />
                  <span className="flex-1">{item.label}</span>
                  {item.label === 'AI Chat' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        clearChat();
                        navigate('/dashboard/chat');
                        handleItemClick();
                      }}
                      title="New Chat"
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all
                        ${isActive ? 'hover:bg-[#7c3aed]/20 text-[#7c3aed]' : 'hover:bg-[#1f1f1f] text-gray-400 hover:text-white'}
                      `}
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </Link>
              );
            })}
          </div>

          {/* History Section */}
          <div className="flex flex-col gap-1">
            <div className="px-3 mb-2 text-xs font-bold text-gray-500 tracking-wider">HISTORY</div>
            {chats.length === 0 ? (
              <div className="px-3 text-sm text-gray-600 italic py-2">No chats yet</div>
            ) : (
              <>
                {chats.slice(0, 5).map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => handleHistoryClick(chat._id)}
                    className="animate-fadeIn card-hover group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 text-gray-400 hover:bg-[#111111] hover:text-gray-200 cursor-pointer"
                  >
                    <MessageCircle size={16} className="shrink-0 text-gray-600 group-hover:text-[#7c3aed]" />
                    <span className="truncate flex-1 text-[13px]">{chat.title}</span>
                    {chat.language && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 shrink-0 uppercase">
                        {chat.language.substring(0, 3)}
                      </span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat._id);
                        if (activeChat?._id === chat._id) {
                          navigate('/dashboard/chat');
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 p-1 rounded hover:bg-red-400/10 transition-colors duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div className="px-3 pt-2">
                  <button className="text-xs text-[#7c3aed] hover:text-[#a78bfa] font-medium transition-colors">
                    View All
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Saved Section */}
          <div className="flex flex-col gap-1 mb-4">
            <div className="px-3 mb-2 text-xs font-bold text-gray-500 tracking-wider flex items-center justify-between">
              SAVED
            </div>
            <Link 
              to="/dashboard/snippets"
              onClick={handleItemClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium border-l-2 transition-all duration-200 animate-slideInLeft delay-300
                ${location.pathname === '/dashboard/snippets' 
                  ? 'bg-[#3b82f6]/10 text-white border-[#3b82f6] glow-purple' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-[#111111]'
                }
              `}
            >
              <Save size={18} className={location.pathname === '/dashboard/snippets' ? 'text-[#3b82f6]' : 'text-gray-500'} />
              Saved Snippets
            </Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="p-4 shrink-0 border-t border-[#1f1f1f]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-white truncate">{user?.username}</span>
              <span className="text-xs text-gray-500 truncate">{user?.email}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { navigate('/dashboard/settings'); handleItemClick(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all border
                ${location.pathname === '/dashboard/settings' 
                  ? 'bg-[#1a1a1a] text-white border-gray-700 glow-purple' 
                  : 'text-gray-400 bg-[#111111] border-[#1f1f1f] hover:text-white hover:bg-[#1a1a1a]'
                }
              `}
            >
              <Settings size={14} /> Settings
            </button>
            <button  
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-gray-400 bg-[#111111] hover:bg-red-500/10 hover:text-red-400 border border-[#1f1f1f] hover:border-red-500/20 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};
