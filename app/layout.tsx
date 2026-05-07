import "@/app/styles/app.css"
import "@radix-ui/themes/styles.css";
import "@/app/globals.css";
import { Roboto } from "next/font/google"
import Providers from "./Providers";
import { Suspense } from "react";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Suspense>
          <Providers>
          {children}
        </Providers>
      
        </Suspense>
        </body>
    </html>
  );
}
