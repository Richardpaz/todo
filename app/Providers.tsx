"use client";
import { Theme } from "@radix-ui/themes";
import { useThemeStore } from "./store/theme";
import { Header } from "./components/Header";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useThemeStore((state) => state.theme);
    return (
        <Theme appearance={theme} panelBackground="translucent">
            <div className="contenedor">
                <aside className="aside">aside</aside>
                <header className="header">
                    <Header />
                </header>
                <main className="main">{children}</main>
            </div></Theme>
    );
}