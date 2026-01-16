import { Language, MultiLanguageText } from '../types';

export const getContent = (
  content: MultiLanguageText | string | undefined, 
  lang: Language
): string => {
  if (!content) return "";

  // 1. Agar eski formatda oddiy string bo'lsa, o'zini qaytar
  if (typeof content === 'string') return content;

  // 2. Hozirgi tanlangan tilda bormi?
  if (content[lang]) return content[lang]!;
  
  // 3. Fallback: Ingliz tili
  if (content['ENG']) return content['ENG']!;
  
  // 4. Fallback: O'zbek tili
  if (content['UZ']) return content['UZ']!;

  // 5. Hech qaysisi bo'lmasa, birinchi duch kelgan qiymatni ol
  return Object.values(content)[0] || "";
};