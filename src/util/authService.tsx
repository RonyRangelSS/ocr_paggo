import Usuario, { Credentials } from "../model/Usuario";


export async function handleLogin(credenciais: Credentials) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciais),
  });
  const data = await response.json();

  if (response.status === 401) {
    const errorData = await response.json();
    throw new Error("Credenciais inválidas");
  }

  if (response.ok) {
    console.log("Login bem-sucedido:", data);
    return data.user as Usuario;
  } else {
    return data as string;
  }
}

export const handleRegister = async (nome: string, email: string, senha: string) => {
    if (!nome || !email || !senha) {
      throw new Error("Os campos não podem ser nulos");
    }
  
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });
    
  
    if (response.ok) {
      return "Cadastro realizado com sucesso!";
    } else if (response.status === 409) {
      throw new Error("Este email já está registrado.");
    } else {
      throw new Error("Erro no cadastro. Tente novamente.");
    }
  };
  
  