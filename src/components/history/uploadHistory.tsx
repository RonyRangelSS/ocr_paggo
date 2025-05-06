"use client";
import { useUserHistory } from "@/hooks/useUserHistory";

export function UploadHistory() {
  const { history, loading, error } = useUserHistory();

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!history) return <p>Nenhum histórico encontrado.</p>;

  return (
    <div className="space-y-6 mt-6 text-gray-900">
      {history.files.map((file) => (
        <div key={file.id} className="border rounded-lg shadow-sm bg-gray-200 p-8 mx-8">
          <h3 className="text-lg font-semibold mb-2">{file.filename}</h3>

          {file.transcription?.text ? (
            <div className="flex gap-6 ">
              <div className="w-2/3">
                <h4 className="font-bold text-sm mb-1">Transcrição:</h4>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{file.transcription.text}</p>
              </div>

              <div className="w-1/3 bg-white-50">
                <h4 className="font-bold text-sm mb-1">Perguntas:</h4>
                <ul className="space-y-3">
                  {file.questions.map((q) => (
                    <li key={q.id} className="border p-2 rounded-md">
                      <p className="text-sm font-medium">Q: {q.question}</p>
                      <p className="text-sm text-gray-700">A: {q.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Transcrição não disponível.</p>
          )}
        </div>
      ))}
    </div>
  );
}
