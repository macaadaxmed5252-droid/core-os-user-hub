import React, { useState, useEffect } from 'react';

export default function UserManagementHub() {
  // --- 1. STATE & ARCHITECTURE LAYER ---
  const [currentPage, setCurrentPage] = useState('register'); // Router State: 'register' or 'directory'
  
  // LocalStorage integration for persisting users
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('hub_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState("");
  const [userBio, setUserBio] = useState('');
  const [enableAlerts, setEnableAlerts] = useState(true);
  
  // Feedback Notification State
  const [uiAlert, setUiAlert] = useState(null);

  // Sync users state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hub_users', JSON.stringify(users));
  }, [users]);

  // --- 2. BUSINESS LOGIC ENGINE ---
  const handleCreateUser = (e) => {
    e.preventDefault();

    // Validation Guard Clauses
    if (!fullName.trim() || !userBio.trim() || !userRole) {
      setUiAlert({
        type: 'danger',
        title: 'Validation Error',
        message: 'Please fill out all required fields (Name, Role, and Biography).'
      });
      return;
    }

    if (userBio.trim().length < 10) {
      setUiAlert({
        type: 'warning',
        title: 'Short Bio Content',
        message: 'The user biography must contain at least 10 characters.'
      });
      return;
    }

    // Creating the new user object
    const newUser = {
      id: Date.now(),
      name: fullName,
      role: userRole,
      bio: userBio,
      status: "Active",
      alerts: enableAlerts
    };

    setUsers([newUser, ...users]);

    // Success feedback trigger
    setUiAlert({
      type: 'success',
      title: 'User Registered Successfully',
      message: `${newUser.name} has been added to the management system.`
    });

    // Reset Form fields
    setFullName('');
    setUserRole('');
    setUserBio('');
  };

  const deleteUser = (id, name) => {
    setUsers(users.filter(user => user.id !== id));
    setUiAlert({
      type: 'danger',
      title: 'Account Permanently Deleted',
      message: `The account for ${name} has been removed from the system.`
    });
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 antialiased min-h-screen flex flex-col font-sans selection:bg-violet-500 selection:text-white">
      
      {/* ==================== 1. LOGO + NAVBAR COMPONENT ==================== */}
      <nav className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="h-9 w-9 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-black text-sm">HUB</span>
            </div>
            <span className="text-lg font-black tracking-wider text-white">CORE<span className="text-violet-400 font-light text-xs">.OS</span></span>
          </div>
          
          {/* NAVIGATION TABS */}
          <div className="flex space-x-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button 
              onClick={() => setCurrentPage('register')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${currentPage === 'register' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-neutral-400 hover:text-white'}`}
            >
              Add User Form
            </button>
            <button 
              onClick={() => setCurrentPage('directory')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${currentPage === 'directory' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-neutral-400 hover:text-white'}`}
            >
              User Directory Table
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-neutral-950 text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-neutral-900">{users.length}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== 2. FEEDBACK: ALERT COMPONENT ==================== */}
      {uiAlert && (
        <div className="max-w-[1400px] w-full mx-auto px-6 pt-6">
          <div className={`border rounded-xl p-4 flex items-start justify-between shadow-2xl transition-all ${
            uiAlert.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' :
            uiAlert.type === 'warning' ? 'bg-amber-950/40 border-amber-500/30 text-amber-300' :
            'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex space-x-3">
              <span className="text-lg mt-0.5">{uiAlert.type === 'success' ? '✓' : '⚠'}</span>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider">{uiAlert.title}</h4>
                <p className="text-xs opacity-90 mt-1 font-sans">{uiAlert.message}</p>
              </div>
            </div>
            <button onClick={() => setUiAlert(null)} className="text-xs font-mono font-bold hover:opacity-60 uppercase">Dismiss</button>
          </div>
        </div>
      )}

      {/* ==================== CORE ROUTER BODY ==================== */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6">
        
        {/* ---------------- PAGE 1: FORMS & ACCREDITATION ---------------- */}
        {currentPage === 'register' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* FORM CONTAINER */}
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-black tracking-tight text-white">Create New User Account</h2>
                <p className="text-xs text-neutral-400 mt-1">Register a new system user to manage database roles and parameters.</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FORMS: Input */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter Your Full Name*"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                    />
                  </div>
                  {/* FORMS: Select */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Professional Role</label>
                    <select 
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                    > 
                      <option value="" disabled hidden>Select Role</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                    </select>
                  </div>
                </div>

                {/* FORMS: Textarea */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">User Biography / Description</label>
                  <textarea 
                    rows="4"
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    placeholder="Provide a summary description of the user profile..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-700 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  ></textarea>
                </div>

                {/* FORMS: Switch */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-neutral-300">Enable Email Notifications</h5>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Allow the automated system to dispatch activity metrics alerts.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={enableAlerts}
                      onChange={(e) => setEnableAlerts(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 peer-checked:after:bg-black after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* BUTTONS: Primary */}
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg active:scale-[0.99] transition-all"
                >
                  Save Account & Register
                </button>
              </form>
            </div>

            {/* DASHBOARD: STAT CARDS (LIVE SIDEBAR) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center">
                  <span className="h-2 w-2 bg-violet-400 rounded-full mr-2"></span>Database Platform Metrics
                </h3>
                
                <div className="space-y-4">
                  {/* FEEDBACK: Progress */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-neutral-400">Total License Capacity</span>
                      <span className="font-mono font-bold text-violet-400">{((users.length / 10) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800">
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-full transition-all duration-500" style={{ width: `${(users.length / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* DASHBOARD: Stat Cards */}
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-neutral-500">Registered Accounts:</span><span className="text-white font-bold">{users.length}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Active Licenses Left:</span><span className="text-violet-400 font-bold">{10 - users.length}</span></div>
                  </div>
                </div>
              </div>

              {/* BUTTONS: Outline / Redirect */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ready to Monitor?</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Switch view parameters to check the full registry table.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage('directory')}
                  className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-violet-400 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  View Directory Table →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- PAGE 2: DATA DISPLAY (TABLES) ---------------- */}
        {currentPage === 'directory' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black tracking-tight text-white">System User Directory</h2>
                <p className="text-xs text-neutral-400 mt-1">General indexing directory tracking active registered profiles.</p>
              </div>
              <button 
                onClick={() => setCurrentPage('register')}
                className="bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-600 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                + Add New User
              </button>
            </div>

            {/* DATA DISPLAY: Tables */}
            <div className="overflow-hidden border border-neutral-800 rounded-xl bg-neutral-950">
              {users.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-xs font-mono">
                  No registered profiles found in the local registry core.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-neutral-800 text-left text-xs">
                  <thead className="bg-neutral-900/50 font-bold uppercase text-neutral-400 tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">Bio / Description</th>
                      <th className="px-6 py-4">Email Notification</th>
                      <th className="px-6 py-4">Status Badge</th>
                      <th className="px-6 py-4 text-right">Emergency Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-neutral-900/40 transition-colors">
                        {/* Name and Role */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-white text-sm">{user.name}</div>
                          <div className="text-[11px] text-neutral-500 font-mono">{user.role}</div>
                        </td>
                        {/* Bio Text */}
                        <td className="px-6 py-4 max-w-xs truncate text-neutral-400">{user.bio}</td>
                        {/* Status Bool */}
                        <td className="px-6 py-4 font-mono text-[11px]">
                          {user.alerts ? (
                            <span className="text-emerald-400">Enabled</span>
                          ) : (
                            <span className="text-neutral-600">Disabled</span>
                          )}
                        </td>
                        {/* DATA DISPLAY: Badges */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium text-[10px] uppercase border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                            {user.status}
                          </span>
                        </td>
                        {/* Actions Button */}
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => deleteUser(user.id, user.name)}
                            className="text-rose-400 hover:text-rose-300 font-bold hover:underline text-xs"
                          >
                            Delete User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ==================== 3. FOOTER COMPONENT ==================== */}
      <footer className="bg-neutral-900 text-neutral-500 py-6 px-8 border-t border-neutral-800 text-xs mt-auto">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-white font-black tracking-widest text-xs uppercase">User Core Hub</span>
            <span className="text-neutral-700">|</span>
            <span className="font-mono">React Framework Workflow</span>
          </div>
          <div className="text-neutral-600 font-mono"> Prepared by Group 10 &copy; 2026 User Core Hub.</div>
        </div>
      </footer>

    </div>
  );
}