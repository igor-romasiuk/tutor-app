import "@/globals.css";
import StoreProvider from "@/lib/store/provider";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f9fafb] text-gray-900 min-h-screen">
        <StoreProvider>
          <Header />
          <main className="container mx-auto px-6 py-10">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
