"use client";
import "@/app/styles/app.css"
import { Header } from "./components/Header"
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "@/app/globals.css";
import { useThemeStore } from "./store/theme";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = useThemeStore((state) => state.theme);
  return (
    <html lang="es">
      <body>
        <Theme appearance={theme} panelBackground="translucent">
          <div className="contenedor">
            <aside className="aside">aside</aside>
            <header className="header">
              <Header />
            </header>
            <main className="main">{children}</main>
          </div>
        </Theme>
      </body>
    </html>
  );
}
