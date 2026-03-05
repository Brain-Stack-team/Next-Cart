import "../styles/globals.css"
import Providers from "./providers"

export const metadata = {
  title: "Next-Cart",
  description: "Modern e-commerce demo built with Next.js",
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
