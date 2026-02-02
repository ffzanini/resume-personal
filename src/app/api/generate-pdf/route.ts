import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export const maxDuration = 60;

chromium.setGraphicsMode = false;

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    const { url, language, theme } = await req.json();

    if (!url || !language || !theme) {
      return NextResponse.json(
        { message: "URL, language and theme are required" },
        { status: 400 },
      );
    }

    const remotePath = process.env.CHROMIUM_REMOTE_EXEC_PATH;
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
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json(
      { message: "Erro interno ao gerar o PDF." },
      { status: 500 },
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
