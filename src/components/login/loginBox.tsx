"use client";

import LoginInput from "../input";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Button } from "../button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useRouter } from "next/navigation";
import React from "react";

export function LoginBox() {
  const router = useRouter();
  const { logar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) return setMessage("Os campos não podem ser nulos");
    if (senha.length < 6) return setMessage("A senha deve ter no mínimo 6 caracteres");
    if (!email.includes("@")) return setMessage("Email inválido");

    
    setLoading(true);
    
    try {
      const result = await logar({ email, senha });

      setLoading(false);
      console.log(result);

      if (typeof result === "string") {
        setMessage(result); 
      } else if (typeof result === "object" && !!result.email) {
        console.log("Login bem-sucedido:", result);
        router.push("/home");
      } else {
        setMessage("Ocorreu um erro. Tente novamente."); 
      }
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      console.error("Erro ao fazer login:", error);
    }
  }
  

    return (
        <div className="flex h-[60%] w-[26%] flex-col items-center justify-center rounded-xl bg-white shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
          <label className="text-center font-sans text-2xl font-bold uppercase leading-normal text-gray-800">
            <div>BEM VINDO DE</div>
            <div> VOLTA!</div>
          </label>
          <br />
          <br />
          <LoginInput
            icon={FaEnvelope}
            placeholder="Email"
            type="email"
            style={{ color: "#8B96C8" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <LoginInput
            icon={FaLock}
            placeholder="Senha"
            style={{ color: "#8B96C8" }}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="mb-7 mt-2 w-full pl-10 text-[#8d8e8e]">
            <label>Não tem uma conta ? </label>
            <Link href={"/register"}>
              <span className="underline">Cadastre-se</span>
            </Link>
            
          </div>
          <br />
          <Button text={loading ? "Entrando..." : "Entrar"} function={handleLogin} />
          {message && <div className="mt-4 text-red-500">{message}</div>}
        </div>
      );
}