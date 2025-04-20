import { CheckCircle, Loader2 } from 'lucide-react';
import React from 'react';

export type GenerationStepsProps = {
  currentStep: number;
};

const steps = [
  'Coletando dados do site',
  'Analisando informações',
  'Gerando conteúdo com IA',
  'Salvando documento',
  'Concluído',
];

export function GenerationSteps({ currentStep }: GenerationStepsProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
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
              <CheckCircle className="text-green-500" />
            ) : status === 'in-progress' ? (
              <Loader2 className="animate-spin text-yellow-500" />
            ) : (
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
            )}
            <span
              className={`text-sm font-medium ${
                status === 'done'
                  ? 'text-green-500'
                  : status === 'in-progress'
                    ? 'text-yellow-500'
                    : 'text-gray-400'
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
