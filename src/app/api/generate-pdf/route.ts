import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export const maxDuration = 60;

chromium.setGraphicsMode = false;

const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";

function errorResponse(code: string, message: string, status: number = 500) {
  return NextResponse.json({ code, message }, { status });
}

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    const { url, language, theme } = await req.json();

    if (!url || !language || !theme) {
      return NextResponse.json(
        {
          code: "BAD_REQUEST",
          message: "URL, language and theme are required",
        },
        { status: 400 },
      );
    }

    const isProduction = process.env.NODE_ENV === "production";
    const envPath = process.env.CHROMIUM_REMOTE_EXEC_PATH?.trim();
    const useRemote =
      isProduction ||
      process.env.VERCEL === "1" ||
      process.env.VERCEL === "true";
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

    await page.evaluate(() => {
      const ARROW_SVG =
        '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-left:2px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      const walk = (node: Node) => {
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent?.includes("\u279A")
        ) {
          const parent = node.parentNode;
          if (!parent) return;
          const parts = node.textContent.split("\u279A");
          const fragment = document.createDocumentFragment();
          parts.forEach((text, i) => {
            fragment.appendChild(document.createTextNode(text));
            if (i < parts.length - 1) {
              const span = document.createElement("span");
              span.innerHTML = ARROW_SVG;
              fragment.appendChild(span);
            }
          });
          parent.replaceChild(fragment, node);
          return;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          const childList = Array.from(node.childNodes);
          childList.forEach(walk);
        }
      };
      walk(document.body);
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
    let userMessage =
      "Erro interno ao gerar o PDF. Verifique os logs da função no Vercel.";

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
