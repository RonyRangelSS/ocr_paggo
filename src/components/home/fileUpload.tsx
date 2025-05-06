"use client";

import { useDropzone } from 'react-dropzone';
import { Button } from '../button';
import { FaRegFileAlt } from 'react-icons/fa';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { useUpload } from '@/hooks/useUpload';

export function FileUpload() {
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, progress, status, text, fileId } = useUpload();
  const [result, setResult] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [perguntando, setPerguntando] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && usuario) {
      upload(file, String(usuario.id));
    }
  };

  const handleTranscription = async () => {
    setLoading(true);
    try {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        await upload(file, String(usuario!.id));
      }
    } catch (error) {
      console.error('Erro ao tentar transcrever o arquivo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setPerguntando(true);
    setQuestions((prev) => [...prev, question]);

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          fileId,
          userId: usuario?.id,
        }),
      });
      const data = await response.json();
      setAnswers((prev) => [...prev, data.answer]);
        setPerguntando(false);
    } catch (error) {
      console.error('Erro ao tentar fazer a pergunta:', error);
    }
  };

  const content = (
    <div className="mt-8">
      <section className="container">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md w-110 h-70 cursor-pointer bg-gray-100 p-5"
        >
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <div>
              <FaRegFileAlt className="text-5xl text-gray-500 mb-4" />
              <p className="text-md font-medium text-gray-700">
                {acceptedFiles[0].name}
              </p>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-600 text-center">
              Arraste e solte alguns arquivos aqui, ou clique para selecionar
              arquivos
            </p>
          )}
        </div>
        <br />
        {files.length > 0 && (
          <aside className="mt-4">
            <h4 className="font-medium mb-1">Arquivo selecionado:</h4>
            <ul className="text-sm text-gray-700">{files}</ul>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <br />
            <Button
              text={loading ? 'Transcrevendo...' : 'Transcrever'}
              function={handleTranscription}
            />
            {progress > 0 && progress < 100 && (
              <div className="mt-4">
                <p>{text}</p>
                <progress value={progress} max={100} className="w-full" />
              </div>
            )}
          </aside>
        )}
      </section>
    </div>
  );

  return (
    <div className="h-100vh py-8 px-4 bg-gray-900">
    {text ? (
        <div className="flex flex-col items-center justify-start space-y-8">
        <div className="flex flex-col md:flex-row w-full max-w-6xl justify-center items-start gap-8">
            <div className="border-2 border-gray-300 rounded-md p-4 bg-white shadow-md text-black w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Texto Transcrito:</h3>
            <p className="whitespace-pre-wrap break-words">{text}</p>
            </div>

            <div className="border-2 border-gray-300 rounded-md p-4 bg-white shadow-md text-black w-full items-center md:w-1/2">
            <h4 className="text-lg font-semibold mb-2">Faça uma pergunta sobre o texto:</h4>
            <form onSubmit={handleQuestionSubmit}>
                <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-md w-full mt-2"
                placeholder="Digite sua pergunta..."
                />
                <button
                type="submit"
                className="bg-gray-800 w-[100%] h-full border-1 border-[#B0ABAB] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg cursor-pointer mt-4"
                >
                {perguntando ? 'Perguntando...' : 'Perguntar'}
                </button>
            </form>

            {answers.length > 0 && (
            <div className="mt-4">

                <div>
                {answers.slice().reverse().map((answer, index) => (
                    <div>
                        <h5 className="font-medium">Sua Pergunta:</h5>
                        <p>{questions[index]}</p>

                        <h5 className="font-medium mt-2">Respostas do Chat:</h5>
                            <p key={index}>{answer}</p>
                        <br/>
                    </div>
                ))}
                </div>
            </div>
            )}

            </div>
        </div>
        </div>
    ) : (
        content
    )}
    </div>

    );
}