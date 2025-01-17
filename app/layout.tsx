import '@radix-ui/themes/styles.css';
import './theme-config.css';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/NavBar";
import {Container, Theme, ThemePanel} from "@radix-ui/themes";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";


const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <QueryClientProvider>
            <AuthProvider>
                <body className={inter.variable}>
                <Theme>
                    <NavBar/>
                    <main className="p-5">
                        <Container>
                            {children}
                        </Container>

                    </main>
                    {/*<ThemePanel></ThemePanel>*/}
                </Theme>
                </body>
            </AuthProvider>
        </QueryClientProvider>

        </html>
    );
}
