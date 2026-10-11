import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <PriceTicker />

        <main className="flex-1">{children}</main>

        <Footer />

        <Toaster
          data-rht-toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "var(--font-hind-siliguri), sans-serif",
            },
            success: {
              iconTheme: { primary: "#16a34a", secondary: "#ffffff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
            },
          }}
        />
      </body>
    </html>
  );
}