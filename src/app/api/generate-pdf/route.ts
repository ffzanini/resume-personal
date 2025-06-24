import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { url, language, theme } = await req.json();

    if (!url || !language || !theme) {
      return NextResponse.json(
        { message: "URL, language and theme are required" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Define idioma antes de carregar a página
    await page.goto("about:blank");
    await page.evaluateOnNewDocument((lang) => {
      localStorage.setItem("language", lang);
      document.documentElement.setAttribute("lang", lang);
    }, language);

    // Navega para a URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Aguarda o idioma estar aplicado de fato
    await page.waitForSelector("body[data-language-ready='true']", {
      timeout: 8000,
    });

    // Aplica o tema
    await page.evaluate((theme) => {
      const html = document.documentElement;
      const body = document.body;

      html.classList.remove("dark");
      html.style.backgroundColor = theme === "dark" ? "#161618" : "#faf9f6";
      body.style.backgroundColor = theme === "dark" ? "#161618" : "#faf9f6";
      body.style.color = theme === "dark" ? "#faf9f6" : "#161618";

      if (theme === "dark") {
        html.classList.add("dark");
      }
    }, theme);

    // Estilos para impressão
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

    // Gera o PDF
    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
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
      { status: 500 }
    );
  }
}
