import { useTranslation } from '@/hooks/useTranslation';

export function LanguageSelector() {
  const { changeLanguage, currentLanguage } = useTranslation();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-transparent border border-gray-600 rounded-md px-2 py-1 text-sm"
    >
      <option value="pt-BR">Português</option>
      <option value="en-US">English</option>
    </select>
  );
}