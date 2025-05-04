import { FileUpload } from "@/components/home/fileUpload";

export default function Home() {
    return (
        <div className="flex flex-col items-center h-screen w-screen fixed bg-gray-900">
            <div className="flex flex-col items-center mt-5">
                <h1 className="text-5xl font-bold">
                    OCR Paggo
                </h1>
                <br/>
                <h4 className="text-2xl font-thin">
                Converta documentos em texto com alta precisão e faça perguntas para obter
                </h4>
                <h4 className="text-2xl font-thin">
                explicações claras e rápidas sobre o conteúdo extraído
                </h4>
            </div>
            <FileUpload />
        </div>
    );
}