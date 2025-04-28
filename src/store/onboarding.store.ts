import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_STORAGE_KEY = '@onboarding_completed';

interface OnboardingState {
  isCompleted: boolean;
  isLoading: boolean;
  checkOnboardingStatus: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isCompleted: false,
  isLoading: true,
  checkOnboardingStatus: async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      set({ isCompleted: onboardingCompleted === 'true', isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      set({ isCompleted: true });
    } catch (error) {
    }
  },
})); 