import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import Header from "@/components/Layout/Header";
// import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import "./globals.css";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow flex overflow-hidden">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
