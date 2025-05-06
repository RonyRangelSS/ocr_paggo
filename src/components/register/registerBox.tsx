"use client";

import Input from "@/components/input";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Button } from "../button";
import { handleRegister } from "@/util/authService";
import { useRouter } from "next/navigation";


export default function RegisterBox() {

  const router = useRouter();
  const [usuario, setUsuario] = useState({ nome: "", email: "", senha: "" });
  const [message, setMessage] = useState<string>("");

  const handleRegisterClick = async () => {
    const { nome, email, senha } = usuario;

    try {
      const result = await handleRegister(nome, email, senha);
      setMessage(result);
      router.push("/login");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col py-8 items-center justify-between rounded-l-xl w-[60%] h-[400px] border-r-2">
        <label className="text-gray-900 text-center text-2xl font-bold leading-normal un">
        Criar uma conta
      </label>
      <div className="my-12 flex h-[50%] w-full flex-col items-center justify-between">
        <Input
          icon={FaUser}
          placeholder="Digite seu nome..."
          style={{ color: "#8B96C2" }}
          type="text"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
        />
        <Input
          icon={FaEnvelope}
          placeholder="Digite seu email..."
          type="email"
          style={{ color: "#8B96C2" }}
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        <Input
          icon={FaLock}
          placeholder="Digite sua senha..."
          style={{ color: "#8B96C2" }}
          type="password"
          value={usuario.senha}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
        />
      </div>
      <Button text="Cadastrar" function={handleRegisterClick} />
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
}