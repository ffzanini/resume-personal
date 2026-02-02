# resume-personal

## Deploy (Vercel) – Geração de PDF

O download de PDF usa Puppeteer + Chromium. Localmente o binário vem do pacote; no Vercel o binário não está no filesystem, então é preciso usar um **executável remoto**.

### Variável de ambiente no Vercel

No projeto na Vercel, em **Settings → Environment Variables**, adicione:

| Nome | Valor | Ambiente |
|------|--------|----------|
| `CHROMIUM_REMOTE_EXEC_PATH` | `https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar` | Production (e Preview se quiser testar) |

Isso faz a função baixar o Chromium dessa URL na primeira execução (e reutilizar em `/tmp` depois).

**Se o download do GitHub falhar por timeout:** a primeira requisição pode demorar (download ~66 MB). Se aparecer "Download do Chromium demorou demais", hospede o `.tar` em outro lugar (ex.: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), S3, CDN) e use essa URL em `CHROMIUM_REMOTE_EXEC_PATH`.

**Fallback no código:** se `CHROMIUM_REMOTE_EXEC_PATH` não estiver definida ou estiver truncada no Vercel, a API usa a URL completa do pack v143 (x64) por padrão. Garanta que o valor da variável, se definida, seja a URL **completa** terminando em `.tar`.

**Logs:** em **Vercel → Project → Logs** (ou Runtime Logs da função), confira o erro exato da geração de PDF para diagnosticar timeout, 404 ou outro problema.