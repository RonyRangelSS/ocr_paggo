import { useState } from "react";
import { uploadFile } from "@/util/uploadService";

export function useUpload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [text, setText] = useState("");
  const [fileId, setFileId] = useState<string | null>(null);

  const upload = async (file: File, userId: string) => {
    setStatus("uploading");
    setProgress(0);

    try {
      const result = await uploadFile(file, userId, setProgress);
      setText(result.text);
      setStatus("done");
      setFileId(result.fileId);
    } catch (error) {
      setStatus("error");
    }
  };

  return { upload, progress, status, text, fileId };
}
