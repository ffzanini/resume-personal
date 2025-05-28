import { Maven_Pro as mavenPro } from 'next/font/google'
import localFont from 'next/font/local'

export const fontMavenPro = mavenPro({
  subsets: ['latin'],
  variable: '--font-mavenPro',
  display: 'swap',
})

export const fontRyanaLovely = localFont({
  src: '../../public/fonts/Ryana-Lovely.ttf',
  variable: '--font-ryanaLovely',
  display: 'swap',
})

export const pixeloidSans = localFont({
  src: '../../public/fonts/PixeloidSans.ttf',
  variable: '--font-pixeloidsans',
  display: 'swap',
})

export const pixeloidSansBold = localFont({
  src: '../../public/fonts/PixeloidSans-Bold.ttf',
  variable: '--font-pixeloidsans-bold',
  display: 'swap',
})
