# resume-personal

## Deploy (Vercel) – Geração de PDF

O download de PDF usa Puppeteer + Chromium. Localmente o binário vem do pacote; no Vercel o binário não está no filesystem, então é preciso usar um **executável remoto**.

### Variável de ambiente no Vercel

No projeto na Vercel, em **Settings → Environment Variables**, adicione:

| Nome | Valor | Ambiente |
|------|--------|----------|
| `CHROMIUM_REMOTE_EXEC_PATH` | `https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar` | Production (e Preview se quiser testar) |

Isso faz a função baixar o Chromium dessa URL na primeira execução (e reutilizar em `/tmp` depois).

**Se o download do GitHub falhar por timeout:** hospede o `.tar` em outro lugar (ex.: Vercel Blob, S3, CDN) e use essa URL em `CHROMIUM_REMOTE_EXEC_PATH`. A versão do pack deve ser compatível com `@sparticuz/chromium` do projeto (ex.: v143.0.4).