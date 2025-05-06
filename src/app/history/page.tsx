import { UploadHistory } from "@/components/history/uploadHistory";


export default function History() {
    return (
        <div className="flex flex-col items-center h-screen w-screen bg-gray-900 overflow-x-hidden">
            <div className="flex flex-col items-center mt-5">
                <h1 className="text-5xl font-bold">
                    OCR Paggo
                </h1>
                <br/>
                <h5 className="text-3xl font-bold">
                    Histórico
                </h5>

            </div>
            <UploadHistory />
        </div>
    );
}