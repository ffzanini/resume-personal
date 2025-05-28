import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: NextRequest) {
  try {
    const { url, language } = await req.json()

    if (!url || !language) {
      return NextResponse.json(
        { message: 'URL and language are required' },
        { status: 400 },
      )
    }

    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    // Carrega a página com o URL e o idioma especificados
    await page.goto(url, { waitUntil: 'networkidle2' })

    // Adiciona o CSS para ocultar o nav durante a impressão
    await page.addStyleTag({
      content: `
        @media print {
          .no-print {
            display: none !important;
          }
        }

        @media print {
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
      `,
    })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm' },
    })

    await browser.close()

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume-${language}.pdf`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
