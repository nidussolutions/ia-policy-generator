import { useToastContext } from '@/components/toast/ToastContext';

export const useToast = () => {
  const { showToast } = useToastContext();
  return showToast;
};
