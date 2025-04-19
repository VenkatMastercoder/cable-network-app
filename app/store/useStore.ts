import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  s_no: number;
  user_id: string;
  name: string;
  age: string;
  mobile_number: string;
  email: string;
  address: object;
  role: string;
  created_at: string;
  updated_at: string;
  dummyIdCount: number;
}

interface Tokens {
  token_data: {
    access_token: string;
    refresh_token: string;
  };
}

interface UserStore {
  user: User | null;
  tokens: Tokens | null;
  setUser: (userData: User) => void;
  setTokens: (tokenData: Tokens) => void;
  clearUserData: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      setUser: (userData) => set({ user: userData }),
      setTokens: (tokenData) => set({ tokens: tokenData }),
      clearUserData: () => set({ user: null, tokens: null }),
    }),
    {
      name: 'user-store',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useUserStore;