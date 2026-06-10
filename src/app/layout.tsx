import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/providers/theme";
import { AuthProvider } from "@/context/auth/auth.context";
import { AlertProvider } from "@/providers/alert/page";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const FontSora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SAH - Sistema de Acompanhamento de Habilitações",
    description: "Sistema de Acompanhamento de Habilitações",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${FontSora.variable} ${geistSans.variable} ${geistMono.variable}`}>
            <body>
                <AlertProvider>
                    <AuthProvider>
                        <StyledComponentsRegistry>
                            <Providers>{children}</Providers>
                        </StyledComponentsRegistry>
                    </AuthProvider>
                </AlertProvider>
            </body>
        </html>
    );
}
