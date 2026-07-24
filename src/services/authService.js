// Admin Authentication Service for SolveX Enterprise Intelligence OS

const ADMIN_ACCOUNTS = [
  {
    id: 'adm-001',
    email: 'admin@solvex.ai',
    password: 'admin',
    name: 'Alex Drake',
    role: 'Chief Operating Officer (Executive Admin)',
    avatar: 'AD',
    department: 'Executive Operations',
    permissions: ['all', 'system_config', 'audit_logs', 'agent_control'],
    lastLogin: 'Just now'
  },
  {
    id: 'adm-002',
    email: 'sysadmin@solvex.ai',
    password: 'admin',
    name: 'Sarah Connor',
    role: 'Lead Security & Infrastructure Admin',
    avatar: 'SC',
    department: 'Cybersecurity & Infrastructure',
    permissions: ['security', 'system_config', 'audit_logs'],
    lastLogin: '2 hours ago'
  },
  {
    id: 'adm-003',
    email: 'coo.admin@solvex.ai',
    password: 'admin',
    name: 'Michael Chen',
    role: 'VP of Supply Chain & Ops Admin',
    avatar: 'MC',
    department: 'Global Supply Chain',
    permissions: ['inventory', 'production', 'automation'],
    lastLogin: '1 day ago'
  }
];

const STORAGE_KEY = 'solvex_admin_session';

export const authService = {
  // Get available admin demo presets
  getPresetAdmins: () => {
    return ADMIN_ACCOUNTS.map(acc => ({
      email: acc.email,
      name: acc.name,
      role: acc.role,
      password: acc.password
    }));
  },

  // Authenticate admin user
  login: async (email, password, remember = true) => {
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 600));

    const cleanEmail = email.trim().toLowerCase();
    const admin = ADMIN_ACCOUNTS.find(acc => acc.email.toLowerCase() === cleanEmail);

    if (!admin) {
      throw new Error('Access Denied: Email address is not registered in Admin Directory.');
    }

    if (admin.password !== password) {
      throw new Error('Access Denied: Invalid admin password.');
    }

    const sessionData = {
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatar: admin.avatar,
        department: admin.department,
        permissions: admin.permissions
      },
      token: `jwt_solvex_admin_${Date.now()}`,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    }

    return sessionData.user;
  },

  // Get current active session
  getCurrentUser: () => {
    const local = localStorage.getItem(STORAGE_KEY);
    const session = sessionStorage.getItem(STORAGE_KEY);
    const dataStr = local || session;
    
    if (!dataStr) return null;

    try {
      const data = JSON.parse(dataStr);
      // Check expiration
      if (new Date(data.expiresAt) < new Date()) {
        authService.logout();
        return null;
      }
      return data.user;
    } catch (e) {
      authService.logout();
      return null;
    }
  },

  // Check if admin is currently authenticated
  isAuthenticated: () => {
    return !!authService.getCurrentUser();
  },

  // Log out current admin
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }
};
