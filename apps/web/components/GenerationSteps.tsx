import { CheckCircle, Loader2 } from 'lucide-react';
import React from 'react';
import { useTheme } from './ThemeContext';

export type GenerationStepsProps = {
  currentStep: number;
};

const steps = [
  'Collecting website data',
  'Analyzing information',
  'Generating content with AI',
  'Saving document',
  'Completed',
];

export function GenerationSteps({ currentStep }: GenerationStepsProps) {
  const { theme } = useTheme();

  return (
      <div className="flex flex-col gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg">
        {steps.map((label, index) => {
          const status =
              index < currentStep
                  ? 'done'
                  : index === currentStep
                      ? 'in-progress'
                      : 'pending';

          return (
              <div key={index} className="flex items-center gap-3">
                {status === 'done' ? (
                    <CheckCircle className="text-green-500 dark:text-green-400" />
                ) : status === 'in-progress' ? (
                    <Loader2 className="animate-spin text-yellow-500 dark:text-yellow-400" />
                ) : (
                    <div className="w-4 h-4 border-2 border-gray-400 dark:border-gray-600 rounded-full" />
                )}
                <span
                    className={`text-sm font-medium ${
                        status === 'done'
                            ? 'text-green-500 dark:text-green-400'
                            : status === 'in-progress'
                                ? 'text-yellow-500 dark:text-yellow-400'
                                : 'text-gray-400 dark:text-gray-500'
                    }`}
                >
              {label}
            </span>
              </div>
          );
        })}
      </div>
  );
}
