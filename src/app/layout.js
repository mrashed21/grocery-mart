import AdminProvider from "@/context/AdminProvider";
import { SearchProvider } from "@/context/SearchProvider";
import { getServerSettingData } from "@/lib/getServerSettingData";
import Providers from "@/providers/Providers";
import QueryProviders from "@/providers/QueryProviders";
import { Abhaya_Libre, Manrope, Nunito } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
});

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-abhaya",
});

export async function generateMetadata() {
  try {
    const settings = await getServerSettingData();

    return {
      title: settings?.data?.[0]?.title || "",
      icons: {
        icon: settings?.data?.[0]?.favicon || "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Error loading settings:", error);
    return {
      title: "Grocery Mart",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${manrope.variable} ${abhayaLibre.variable}`}
      >
        <AdminProvider>
          <Providers>
            <QueryProviders>
              <SearchProvider>
                {children}
                <ToastContainer
                  position="bottom-right"
                  autoClose={1500}
                  transition={Slide}
                  closeOnClick
                />
              </SearchProvider>
            </QueryProviders>
          </Providers>
        </AdminProvider>
      </body>
    </html>
  );
}
