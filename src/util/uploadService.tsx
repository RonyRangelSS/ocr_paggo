export function uploadFile(
    file: File,
    userId: string, 
    onProgress: (percent: number) => void
  ): Promise<{ text: string, fileId: string }> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId); 
  
      xhr.open("POST", "/api/ocr");
  
      xhr.upload.onprogress = (event) => {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      };
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const { text, fileId } = JSON.parse(xhr.responseText);
          resolve({ text, fileId });
        } else {
          reject(new Error("Erro no upload"));
        }
      };
  
      xhr.onerror = () => reject(new Error("Erro na requisição"));
      xhr.send(formData);
    });
  }
  