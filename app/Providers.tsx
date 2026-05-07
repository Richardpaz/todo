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
                <header className="header">
                    <Header />
                </header>
                <main className="flex flex-col items-center justify-center main">{children}</main>
            </div></Theme>
    );
}