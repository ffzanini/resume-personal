<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
</p>

<h1 align="center">Resume · ffzanini.dev</h1>

<p align="center">
  Currículo online multilíngue com geração de PDF e tema claro/escuro.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-deploy">Deploy</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-contato">Contato</a>
</p>

---

## 📋 Sobre o projeto

Este repositório contém o **currículo online** ([resume.ffzanini.dev](https://resume.ffzanini.dev)), pensado como uma vitrine objetiva de formação, experiência e habilidades. O foco é **usabilidade** e **acessibilidade**: navegação simples, suporte a múltiplos idiomas (PT, EN, ES), tema claro/escuro e **download do currículo em PDF** gerado a partir do próprio conteúdo da página.

O projeto foi desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS**, priorizando performance e boa experiência em dispositivos móveis e desktop.

---

## ✨ Funcionalidades

- **Idiomas:** Português, Inglês e Espanhol (i18n)
- **Tema:** Alternância entre modo claro e escuro
- **PDF:** Geração e download do currículo em PDF (via API com Puppeteer + Chromium)
- **SEO:** Sitemap e metadados configurados para indexação
- **Analytics:** Integração com Vercel Analytics e Speed Insights
- **Layout responsivo:** Pensado para leitura em qualquer dispositivo

---

## 🛠 Tecnologias

### Principais

| Tecnologia | Uso |
|------------|-----|
| [Next.js](https://nextjs.org/) | Framework React, SSR, API Routes |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização e design system |
| [React](https://react.dev/) | Interface e componentes |
| [Vercel](https://vercel.com/) | Hospedagem e deploy |

### Complementares

| Tecnologia | Uso |
|------------|-----|
| [Framer Motion](https://motion.dev/) | Animações e transições |
| [React Hook Form](https://react-hook-form.com/) | Formulários |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones |
| [next-themes](https://github.com/pacocoursey/next-themes) | Tema claro/escuro |
| [Puppeteer](https://pptr.dev/) + [@sparticuz/chromium](https://github.com/Sparticuz/chromium) | Geração de PDF em serverless |
| [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) | Geração de sitemap |
| [react-hot-toast](https://react-hot-toast.com/) | Notificações (toast) |

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: LTS)
- npm ou yarn

### Passos

**1. Clonar o repositório**

```bash
git clone https://github.com/ffzanini/resume-personal.git
cd resume-personal
```

**2. Instalar dependências**

```bash
npm install
```

**3. Rodar em desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

**4. Build para produção**

```bash
npm run build
npm start
```

---

## 📦 Deploy (Vercel) – Geração de PDF

O download de PDF usa **Puppeteer** + **Chromium**. Em ambiente local o binário vem do pacote; na Vercel o filesystem é efêmero, então é necessário usar um **executável remoto**.

### Variável de ambiente

No projeto na Vercel, em **Settings → Environment Variables**, adicione:

| Nome | Valor | Ambiente |
|------|--------|----------|
| `CHROMIUM_REMOTE_EXEC_PATH` | `https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar` | Production (e Preview, se quiser testar) |

Isso faz a função baixar o Chromium dessa URL na primeira execução (e reutilizar em `/tmp` depois).

**Se o download do GitHub falhar por timeout:** a primeira requisição pode demorar (download ~66 MB). Se aparecer "Download do Chromium demorou demais", hospede o `.tar` em outro lugar (ex.: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), S3, CDN) e use essa URL em `CHROMIUM_REMOTE_EXEC_PATH`.

**Fallback no código:** se `CHROMIUM_REMOTE_EXEC_PATH` não estiver definida ou estiver truncada, a API usa a URL completa do pack v143 (x64) por padrão. Garanta que o valor da variável, se definida, seja a URL **completa** terminando em `.tar`.

**Logs:** em **Vercel → Project → Logs** (ou Runtime Logs da função), confira o erro exato da geração de PDF para diagnosticar timeout, 404 ou outro problema.

---

## 👋 Contato

Dúvidas sobre o projeto, consultoria ou interesse em produtos digitais e desenvolvimento? Entre em contato:

- **Site:** [ffzanini.dev](https://www.ffzanini.dev)
- **LinkedIn:** [linkedin.com/in/ffzanini](https://www.linkedin.com/in/ffzanini/)

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<p align="center">
  Feito com 💙 por Felipe Frantz Zanini
</p>
