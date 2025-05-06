import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; 
import OpenAI from 'openai';


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
  });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question, fileId, userId } = req.body;

  if (!question || !fileId || !userId) {
    return res.status(400).json({ error: 'Campos obrigatórios: question, fileId, userId' });
  }
  console.log('question', question);
    console.log('fileId', fileId);
    console.log('userId', userId);

  try {
    const transcription = await prisma.transcription.findUnique({
      where: { fileId },
    });

    if (!transcription) {
      return res.status(404).json({ error: 'Transcrição não encontrada para o arquivo.' });
    }

      
    const completion = await openai.chat.completions.create({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            "role": "user",
            "content": `Você é um assistente de IA. Responda a pergunta com base no texto: "${transcription.text}". Pergunta: "${question}"`,
          },
            {
                "role": "system",
                "content": "Você é um assistente de IA que responde perguntas com base em um texto fornecido. Sua resposta deve ser clara e concisa.",
            },
        ],
        
      });

      console.log(completion.choices[0].message);

    const answer = completion.choices[0].message?.content ?? 'Sem resposta gerada.';

    const newQuestion = await prisma.question.create({
      data: {
        userId,
        fileId,
        question,
        answer,
      },
    });

    return res.status(200).json({ question: newQuestion.question, answer: newQuestion.answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  } finally {
    await prisma.$disconnect();
  }
}
