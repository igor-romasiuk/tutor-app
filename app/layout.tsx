import "@/globals.css";
import { ThemeProvider } from "next-themes";
import StoreProvider from "@/lib/store/provider";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f9fafb] text-gray-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <StoreProvider>
            <Header />
            <main className="container mx-auto px-6 pt-6 pb-10">{children}</main>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
