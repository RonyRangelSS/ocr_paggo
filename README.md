# 🧠 OCR Inteligente com LLM

Este projeto é uma aplicação full-stack desenvolvida com **Next.js**, **React**, **TailwindCSS** e **Prisma ORM**, conectada a um banco de dados **PostgreSQL**.  

### 📷 Funcionalidade principal:
Este sistema permite ao usuário **enviar imagens com texto**, que são processadas via **OCR (Reconhecimento Óptico de Caracteres)**. Após a transcrição, o usuário pode **fazer perguntas** sobre o conteúdo da imagem utilizando um **modelo de linguagem (LLM)**.

---

## ⚙️ Tecnologias utilizadas

- Next.js 13+ com App Router
- React
- TailwindCSS
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- OpenAI / LLM API
- Tesseract.js (para OCR)

---

## ✅ Pré-requisitos

- Node.js (v18+)
- PostgreSQL rodando localmente
- Git instalado
- Yarn ou npm


## 📦 Instalação

1. **Clone o repositório:**

git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

2. **Instale as dependências**

npm install

3. **Configure as variáveis de ambiente**

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua-chave-secreta-jwt"
OPENAI_API_KEY="sua-chave-api-openai"

4. **Configure o prisma**

npx prisma generate
npx prisma migrate dev --name inite

5. **Rode o projeto localmente**

npm run dev
ou
yarn dev

