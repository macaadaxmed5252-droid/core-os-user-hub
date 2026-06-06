import React, { useState, useEffect } from 'react';
import AboutPage from './AboutPage';

export default function UserManagementHub() {
  // --- 1. STATE LAYER ---
  const [currentPage, setCurrentPage] = useState('about'); // Boga 'about' ayaa u horreynaya si toos ah
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Isku-xidhka HTML Root iyo Isbeddelka Midabada
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0a0a0a';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f8fafc';
    }
  }, [isDarkMode]);

  // LocalStorage sync
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('hub_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState("");
  const [userBio, setUserBio] = useState('');
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [uiAlert, setUiAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('hub_users', JSON.stringify(users));
  }, [users]);

  // --- 2. BUSINESS LOGIC ---
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !userBio.trim() || !userRole) {
      setUiAlert({ type: 'danger', title: 'Validation Error', message: 'Please fill out all required fields.' });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: fullName,
      role: userRole,
      bio: userBio,
      status: "Active",
      alerts: enableAlerts
    };

    setUsers([newUser, ...users]);
    setUiAlert({ type: 'success', title: 'User Registered', message: `${newUser.name} added successfully.` });
    setFullName(''); setUserRole(''); setUserBio('');
    setCurrentPage('directory'); // Toos u gee jadwalka markuu kaydiyo
  };

  const deleteUser = (id, name) => {
    setUsers(users.filter(user => user.id !== id));
    setUiAlert({ type: 'danger', title: 'Deleted', message: `${name} has been removed.` });
  };

  return (
    <div className={`antialiased min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* BACKGROUND GLOWS */}
      <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${isDarkMode ? 'bg-violet-600/10' : 'bg-violet-500/5'}`}></div>

      {/* NAVBAR COMPONENT */}
      <nav className={`backdrop-blur-md border-b sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-sm transition-all ${
        isDarkMode ? 'bg-neutral-900/80 border-neutral-800/60' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="flex items-center space-x-8 w-full justify-between">
          <div className="flex items-center space-x-6">
            <div onClick={() => setCurrentPage('about')} className="flex items-center space-x-2 group cursor-pointer">
              <div className="h-9 w-9 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">HUB</span>
              </div>
              <span className={`text-lg font-black tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CORE<span className="text-violet-500 font-light text-xs">.OS</span></span>
            </div>
            
            {/* TABS FOR NAVIGATION */}
            <div className={`flex space-x-1 p-1 rounded-xl border ${isDarkMode ? 'bg-neutral-950/60 border-neutral-800/50' : 'bg-slate-200/60 border-slate-300/60'}`}>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${currentPage === 'about' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md' : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                About OS
              </button>
              <button 
                onClick={() => setCurrentPage('register')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${currentPage === 'register' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md' : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Add User
              </button>
              <button 
                onClick={() => setCurrentPage('directory')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative ${currentPage === 'directory' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md' : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Directory
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-neutral-950 text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-neutral-900 dark:border-neutral-950">{users.length}</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC LIGHT / DARK MODE ICON BUTTON */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className={`p-2.5 rounded-xl border transition-all duration-300 active:scale-90 cursor-pointer ${
              isDarkMode ? 'bg-neutral-800 border-neutral-700 text-amber-400 hover:bg-neutral-700' : 'bg-white border-slate-300 text-violet-600 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.581 1.581m12.42 12.42l1.581 1.581M3 12h2.25m13.5 0H21M4.22 19.78l1.581-1.581M17.642 6.358l1.581-1.581M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ALERT MESSAGES */}
      {uiAlert && (
        <div className="max-w-[1400px] w-full mx-auto px-6 pt-6">
          <div className={`border rounded-xl p-4 flex items-start justify-between shadow-md ${
            uiAlert.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
          }`}>
            <div className="flex space-x-3">
              <div>
                <h4 className="font-extrabold text-sm uppercase">{uiAlert.title}</h4>
                <p className="text-xs opacity-90 mt-1">{uiAlert.message}</p>
              </div>
            </div>
            <button onClick={() => setUiAlert(null)} className="text-xs font-mono uppercase px-2 py-1 rounded border cursor-pointer">Dismiss</button>
          </div>
        </div>
      )}

      {/* DYNAMIC SCREEN MAIN BODY */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 z-10">
        
        {/* PAGE 1: ABOUT ROUTE */}
        {currentPage === 'about' && (
          <AboutPage setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />
        )}

        {/* PAGE 2: REGISTRATION fORM */}
        {currentPage === 'register' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            <div className={`lg:col-span-7 border rounded-2xl p-6 shadow-xl ${
              isDarkMode ? 'bg-neutral-900/70 border-neutral-800/80' : 'bg-white border-slate-200/80 shadow-sm'
            }`}>
              <div className={`border-b pb-4 mb-6 ${isDarkMode ? 'border-neutral-800' : 'border-slate-100'}`}>
                <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Create New User Account</h2>
                <p className="text-xs text-neutral-400 mt-1">Register a new system user to manage database roles.</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[10px] uppercase font-bold mb-2 ${isDarkMode ? 'text-neutral-400' : 'text-slate-500'}`}>Full Name</label>
                    <input 
                      type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Your Full Name*"
                      className={`w-full border rounded-xl px-4 py-3 text-xs outline-none focus:border-violet-500 ${
                        isDarkMode ? 'bg-neutral-950/80 border-neutral-800 text-neutral-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] uppercase font-bold mb-2 ${isDarkMode ? 'text-neutral-400' : 'text-slate-500'}`}>Professional Role</label>
                    <select 
                      value={userRole} onChange={(e) => setUserRole(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-xs outline-none focus:border-violet-500 cursor-pointer ${
                        isDarkMode ? 'bg-neutral-950/80 border-neutral-800 text-neutral-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    > 
                      <option value="" disabled hidden>Select Role</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-bold mb-2 ${isDarkMode ? 'text-neutral-400' : 'text-slate-500'}`}>User Biography</label>
                  <textarea 
                    rows="4" value={userBio} onChange={(e) => setUserBio(e.target.value)} placeholder="Summary description..."
                    className={`w-full border rounded-xl px-4 py-3 text-xs outline-none focus:border-violet-500 resize-none ${
                      isDarkMode ? 'bg-neutral-950/80 border-neutral-800 text-neutral-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-bold text-xs uppercase py-4 rounded-xl shadow-lg cursor-pointer">
                  Save Account & Register
                </button>
              </form>
            </div>

            {/* DASHBOARD LIVE SIDEBAR */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`border rounded-2xl p-6 shadow-xl ${isDarkMode ? 'bg-neutral-900/70 border-neutral-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-sm font-bold uppercase text-neutral-400 mb-5">Database Platform Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 border rounded-xl text-center ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] uppercase font-bold text-neutral-500">Registered</div>
                    <div className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{users.length}</div>
                  </div>
                  <div className={`p-4 border rounded-xl text-center ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] uppercase font-bold text-neutral-500">Available</div>
                    <div className="text-2xl font-black text-fuchsia-500 mt-1">{10 - users.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: USER INDEX DIRECTORY TABLE */}
        {currentPage === 'directory' && (
          <div className={`border rounded-2xl p-6 shadow-xl space-y-6 animate-fadeIn ${isDarkMode ? 'bg-neutral-900/70 border-neutral-800/80' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>System User Directory</h2>
                <p className="text-xs text-neutral-400 mt-1">General tracking table for active user registry nodes.</p>
              </div>
              <button onClick={() => setCurrentPage('register')} className="bg-violet-500/10 text-violet-500 border border-violet-500/20 hover:bg-violet-600 hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer">+ Add User</button>
            </div>

            <div className={`overflow-hidden border rounded-xl ${isDarkMode ? 'border-neutral-800/80 bg-neutral-950/60' : 'border-slate-200 bg-slate-50'}`}>
              {users.length === 0 ? (
                <div className="p-12 text-center text-xs text-neutral-500 font-mono">
                  <span>⚠ No profiles registered in the database engine core.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y text-left text-xs divide-neutral-800/60">
                    <thead className={`font-bold uppercase tracking-wider text-[10px] ${isDarkMode ? 'bg-neutral-900 text-neutral-400' : 'bg-slate-100 text-slate-500'}`}>
                      <tr>
                        <th className="px-6 py-4">User Details</th>
                        <th className="px-6 py-4">Biography</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-neutral-800/60 text-neutral-300' : 'divide-slate-200 text-slate-700'}`}>
                      {users.map((user) => (
                        <tr key={user.id} className={isDarkMode ? 'hover:bg-neutral-900/50' : 'hover:bg-slate-100'}>
                          <td className="px-6 py-4">
                            <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
                            <div className="text-[11px] text-neutral-500 font-mono">{user.role}</div>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate text-neutral-400">{user.bio}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 text-[10px] font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-md">Active</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => deleteUser(user.id, user.name)} className="text-rose-500 hover:text-rose-600 font-bold px-2 py-1 rounded cursor-pointer">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`py-6 px-8 border-t text-xs mt-auto ${isDarkMode ? 'bg-neutral-900/40 border-neutral-800/60 text-neutral-500' : 'bg-white border-slate-200 text-slate-500'}`}>
        <div className="max-w-[1400px] w-full mx-auto flex justify-between items-center">
          <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-800 font-bold'}>User Core Hub</span>
          <span>Prepared by Group 10 &copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}