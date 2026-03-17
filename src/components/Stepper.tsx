import React, { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Step({ children }: { children: ReactNode }) {
  return <div className="w-full flex-1 flex flex-col">{children}</div>;
}

interface StepperProps {
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  children: ReactNode;
}

export default function Stepper({
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = "Back",
  nextButtonText = "Next",
  children,
}: StepperProps) {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;
  
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      onFinalStepCompleted?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !isCompleted) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 p-4 py-12">
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 bg-black/5 rounded-full z-0" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#3ca2fa] rounded-full z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        
        {steps.map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep && !isCompleted;
          const isPassed = stepNumber < currentStep || isCompleted;
          
          return (
            <button
              key={stepNumber}
              onClick={() => handleStepClick(stepNumber)}
              className={`relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 transition-all duration-300 font-bold text-lg ${
                isActive 
                  ? "bg-[#3ca2fa] border-white text-white scale-110 shadow-xl" 
                  : isPassed 
                    ? "bg-[#3ca2fa] border-[#3ca2fa] text-white cursor-pointer hover:scale-105" 
                    : "bg-white border-neutral-200 text-neutral-400 cursor-pointer"
              }`}
            >
              {isPassed ? <Check size={28} className="text-white" /> : stepNumber}
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[180px] md:min-h-[350px] bg-white border border-black/5 rounded-[32px] p-6 md:p-12 shadow-2xl shadow-black/5 overflow-hidden mt-8">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full flex flex-col prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight"
            >
              {steps[currentStep - 1]}
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 mb-4">
                <Check size={48} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Ready to Build Your Website?</h2>
              <p className="text-neutral-500 text-lg">You’ve completed the process. Let’s take the next step and bring your project to life.</p>
              <button
                onClick={() => navigate('/contact')}
                className="mt-8 px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
                >
                  Get a Free Consultation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isCompleted && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              currentStep === 1 
                ? "bg-transparent text-neutral-400 cursor-not-allowed" 
                : "bg-white border border-black/5 text-neutral-700 hover:bg-neutral-50 shadow-md hover:shadow-lg active:scale-95"
            }`}
          >
            {backButtonText}
          </button>
          <button
            onClick={handleNext}
            className="px-10 py-4 bg-[#3ca2fa] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#3ca2fa]/30 hover:shadow-2xl hover:shadow-[#3ca2fa]/40 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95"
          >
            {currentStep === totalSteps ? "Finish" : nextButtonText}
          </button>
        </div>
      )}
    </div>
  );
}
