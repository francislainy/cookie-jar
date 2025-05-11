import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}
