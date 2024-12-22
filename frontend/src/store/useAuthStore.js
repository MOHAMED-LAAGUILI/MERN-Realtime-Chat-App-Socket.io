import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: true,
    isSigningIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
  
    CheckAuth:async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ user: response.data});
        } catch (e) {
            console.log('error in check auth', e);
           
            set({ user: null });
            
        }finally{
            set({ isCheckingAuth: false });
        }
    },
    signup: async (user) => set({ user }),
    logout: () => set({ user: null }),
    }));