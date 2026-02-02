import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export const maxDuration = 60;

chromium.setGraphicsMode = false;

// URL completa do pack Chromium v143 (x64). Use esta no Vercel se CHROMIUM_REMOTE_EXEC_PATH não estiver definida ou estiver truncada.
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";

function errorResponse(
  code: string,
  message: string,
  status: number = 500,
) {
  return NextResponse.json({ code, message }, { status });
}

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    const { url, language, theme } = await req.json();

    if (!url || !language || !theme) {
      return NextResponse.json(
        { code: "BAD_REQUEST", message: "URL, language and theme are required" },
        { status: 400 },
      );
    }

    // Em produção (Vercel etc.) o diretório node_modules/@sparticuz/chromium/bin não existe no deploy.
    // Sempre usar o pack remoto (URL) em produção; localmente usar o bin do pacote.
    const isProduction = process.env.NODE_ENV === "production";
    const envPath = process.env.CHROMIUM_REMOTE_EXEC_PATH?.trim();
    const useRemote =
      isProduction ||
      (process.env.VERCEL === "1" || process.env.VERCEL === "true");
    const remotePath =
      envPath && envPath.length > 60 && envPath.endsWith(".tar")
        ? envPath
        : useRemote
          ? CHROMIUM_PACK_URL
          : undefined;

    const executablePath = remotePath
      ? await chromium.executablePath(remotePath)
      : await chromium.executablePath();

    browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      },
      executablePath,
      headless: "shell",
    });

    const page = await browser.newPage();

    const urlWithLang = new URL(url);
    urlWithLang.searchParams.set("lang", language);

    await page.goto("about:blank");
    await page.evaluateOnNewDocument((lang: string) => {
      localStorage.setItem("language", lang);
      document.documentElement.setAttribute("lang", lang);
    }, language);

    await page.goto(urlWithLang.toString(), { waitUntil: "networkidle2" });

    await page.waitForSelector("body[data-language-ready='true']", {
      timeout: 8000,
    });

    await page.evaluate((themeValue: string) => {
      const html = document.documentElement;
      const body = document.body;

      html.classList.remove("dark");
      html.style.backgroundColor =
        themeValue === "dark" ? "#161618" : "#faf9f6";
      body.style.backgroundColor =
        themeValue === "dark" ? "#161618" : "#faf9f6";
      body.style.color = themeValue === "dark" ? "#faf9f6" : "#161618";

      if (themeValue === "dark") {
        html.classList.add("dark");
      }
    }, theme);

    await page.addStyleTag({
      content: `
        @media print {
          .no-print {
            display: none !important;
          }
          nav {
            display: none;
          }
        }

        body {
          margin: 0;
          box-sizing: border-box;
        }

        .page-break {
          page-break-before: always;
        }

        .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `,
    });

    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume-${language}.pdf`,
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error("Erro ao gerar PDF:", err);

    const message = err?.message ?? "";
    let code = "PDF_GENERATION_FAILED";
    let userMessage = "Erro interno ao gerar o PDF. Verifique os logs da função no Vercel.";

    if (
      message.includes("timeout") ||
      message.includes("Timeout") ||
      message.includes("ETIMEDOUT")
    ) {
      code = "CHROMIUM_DOWNLOAD_TIMEOUT";
      userMessage =
        "Download do Chromium demorou demais. Tente novamente ou hospede o .tar no Vercel Blob.";
    } else if (
      message.includes("does not exist") ||
      message.includes("ENOENT") ||
      message.includes("404")
    ) {
      code = "CHROMIUM_PATH_INVALID";
      userMessage =
        "URL do Chromium inválida. Use a URL completa do pack .tar nas variáveis de ambiente.";
    }

    return errorResponse(code, userMessage, 500);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
