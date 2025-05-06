import { useEffect, useState } from "react";
import File  from "@/model/File"; 


interface UserHistory {
  files: File[];
}

export function useUserHistory() {
  const [history, setHistory] = useState<UserHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        if (!res.ok) throw new Error("Erro ao buscar histórico");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading, error };
}
