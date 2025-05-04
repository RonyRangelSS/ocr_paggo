export default function RegisterBanner() {
    return (
      <div className="flex h-[400px] w-[60%] flex-col items-center justify-between rounded-r-xl bg-gray-100 bg-cover bg-center px-4 py-8 font-sour-gummy text-white">
        <label className="font-roboto text-center text-2xl font-bold leading-normal text-gray-800">
          Bem vindo ao OCR-PAGGO
        </label>
        <div>
          <img src={"/logo.png"} width={"250px"} />
        </div>
  
        <label className="font-roboto text-center text-2xl font-bold leading-normal text-gray-800">
          Facilitando a visualização de documentos...
        </label>
      </div>
    );
  }