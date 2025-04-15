"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface OnboardingData {
  interests: string[];
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
  selectedEvents: string[];
  referral: string;
  experience: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  setInterests: (interests: string[]) => void;
  setSocialLinks: (links: Partial<OnboardingData["socialLinks"]>) => void;
  setSelectedEvents: (events: string[]) => void;
  setReferral: (referral: string) => void;
  setExperience: (experience: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
}

const DEFAULT_DATA: OnboardingData = {
  interests: [],
  socialLinks: {
    twitter: "",
    github: "",
    linkedin: "",
    instagram: "",
  },
  selectedEvents: [],
  referral: "",
  experience: "",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
  totalSteps = 7,
}: {
  children: ReactNode;
  totalSteps?: number;
}) {
  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA);
  const [currentStep, setCurrentStep] = useState(0);

  const setInterests = (interests: string[]) => {
    setData((prev) => ({ ...prev, interests }));
  };

  const setSocialLinks = (links: Partial<OnboardingData["socialLinks"]>) => {
    setData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...links },
    }));
  };

  const setSelectedEvents = (events: string[]) => {
    setData((prev) => ({ ...prev, selectedEvents: events }));
  };

  const setReferral = (referral: string) => {
    setData((prev) => ({ ...prev, referral }));
  };

  const setExperience = (experience: string) => {
    setData((prev) => ({ ...prev, experience }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setInterests,
        setSocialLinks,
        setSelectedEvents,
        setReferral,
        setExperience,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        isLastStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}
