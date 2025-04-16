import { OpenAI } from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateInput = {
  type: string;
  domain: string;
  language: string;
  legislation: string;
};

export async function generateAiDocument(
  input: GenerateInput
): Promise<string> {
  const { type, domain, language, legislation } = input;

  const prompt = `
    Crie um documento do tipo ${type} para o site ${domain}, escrito em ${language}. 
    Considere as legislações: ${legislation}. 
    Seja profissional, use uma lingaugem formal e inclue cláusulas comuns 
    baseadas em boas práticas e nas legislações citadas
  `;

  const response = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content:
          'Você é um especialista jurídico que escreve documentos legais para sites',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 1.5,
    max_tokens: 5500,
  });

  return response.choices[0].message.content || '';
}
