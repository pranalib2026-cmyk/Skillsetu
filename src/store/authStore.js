import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Hardcoded Admin Credentials
const ADMIN_EMAIL = 'prathamw092@gmail.com';
const ADMIN_PASSWORD = 'pratham01';
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // Simulate latency
          await new Promise(r => setTimeout(r, 800));
          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser = {
              id: 'admin-123',
              email: ADMIN_EMAIL,
              role: 'admin',
              name: 'Skillsetu Admin',
              phone: '9513366591',
              accepted_terms: true
            };
            set({ user: adminUser, isAuthenticated: true, isLoading: false });
            return { error: null };
          }
          const mockUser = {
            id: `user-${Date.now()}`,
            email: email,
            role: email.includes('worker') ? 'worker' : 'employer',
            name: email.split('@')[0],
            accepted_terms: false // requires onboarding
          };
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error };
        }
      },
      register: async (email, password, role) => {
        set({ isLoading: true });
        try {
          await new Promise(r => setTimeout(r, 800));
          const newUser = {
            id: `user-${Date.now()}`,
            email,
            role,
            accepted_terms: false // newly registered users always need onboarding
          };

          set({ user: newUser, isAuthenticated: true, isLoading: false });
          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error };
        }
      },

      logout: async () => {
        set({ user: null, session: null, isAuthenticated: false });
      },

      updateUser: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      acceptTerms: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, accepted_terms: true } });
        }
      }
    }),
    {
      name: 'skillsetu-auth-storage',
    }
  )
);