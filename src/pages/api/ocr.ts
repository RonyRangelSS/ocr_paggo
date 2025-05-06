import formidable, { IncomingForm } from 'formidable';
import { createWorker } from 'tesseract.js';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; 

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const file = Array.isArray(files.file) ? files.file[0] as formidable.File : files.file;
      const userId = String(fields.userId);
      const filename = file!.originalFilename || 'sem_nome';
      const filepath = file!.filepath;


      const worker = await createWorker('eng');
      const {
        data: { text },
      } = await worker.recognize(filepath);
      await worker.terminate();

      const newFile = await prisma.file.create({
        data: {
          userId,
          filename,
          filepath,
          transcription: {
            create: {
              text,
            },
          },
        },
        include: {
          transcription: true,
        },
      });

      await fs.unlink(filepath);

      res.status(200).json({
        text: newFile.transcription?.text,
        fileId: newFile.id,
      });
    } catch (error) {
      console.error('Erro durante o upload/ocr:', error);
      res.status(500).json({ error: 'Erro ao processar o arquivo.' });
    }
  });
}
