import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useOnboardingStore } from '../../store/onboarding.store';

interface OnboardingStep {
  title: string;
  description: string;
  image: any; // We'll use require() for images
}

interface OnboardingViewModel {
  currentStep: number;
  steps: OnboardingStep[];
  handleNext: () => void;
  handleSkip: () => void;
  isLastStep: boolean;
  setCurrentStep: (step: number) => void;
}

export const useOnboardingViewModel = (): OnboardingViewModel => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const completeOnboarding = useOnboardingStore(state => state.completeOnboarding);

  const steps: OnboardingStep[] = [
    {
      title: 'Bem-vindo ao Fantasy Game',
      description: 'Crie sua escalação perfeita e dispute com seus amigos!',
      image: require('../../assets/images/lineup.png'),
    },
    {
      title: 'Escolha seus Jogadores',
      description: 'Selecione os melhores jogadores para cada posição e monte seu time ideal.',
      image: require('../../assets/images/player.png'),
    },
    {
      title: 'Acompanhe o Ranking',
      description: 'Veja sua pontuação e compare com outros usuários para ver quem montou o melhor time!',
      image: require('../../assets/images/stadium.png'),
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await completeOnboarding();
      navigation.navigate('Private');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.navigate('Private');
  };

  return {
    currentStep,
    steps,
    handleNext,
    handleSkip,
    isLastStep: currentStep === steps.length - 1,
    setCurrentStep,
  };
};
