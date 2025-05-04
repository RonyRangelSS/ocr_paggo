"use client";

import LoginInput from "../input";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Button } from "../button";
import Link from "next/link";

export function LoginBox() {
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
            value={"email"}
            onChange={(e) => e}
          />
          <br />
          <LoginInput
            icon={FaLock}
            placeholder="Senha"
            style={{ color: "#8B96C8" }}
            type="password"
            value={"fjkdf"}
            onChange={(e) => e }
          />
          <div className="mb-7 mt-2 w-full pl-10 text-[#8d8e8e]">
            <label>Não tem uma conta ? </label>
            <Link href={"/register"}>
              <text className="underline">Cadastre-se</text>
            </Link>
            
          </div>
          <br />
          <Button text="Login" function={() => alert("hi")} />
        </div>
      );
}