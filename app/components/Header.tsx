"use client"
import { BellIcon, GearIcon, Half2Icon } from "@radix-ui/react-icons";
import { Avatar, Flex, TextField, TabNav } from "@radix-ui/themes";
import "@/app/styles/Header.css"
import { useThemeStore } from "@/app/store/theme";
import { usePathname } from "next/navigation";
import Link from "next/link";
export function Header() {
    const pathname = usePathname();
    const toggleTheme = useThemeStore(
        (state) => state.toggleTheme
    );


    return (
        <Flex direction="row" gap="4" className="header-container w-full" justify={"between"}>
            <TabNav.Root>

                <TabNav.Link asChild active={pathname === "/"}>
                    <Link href={"/"}>
                        DashBoard
                    </Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === "/Hoy"}>
                    <Link href={"/Hoy"}>
                        Hoy
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/Analytics"}>
                    <Link href={"/Analytics"}>
                        Analytics
                    </Link>
                </TabNav.Link>
            </TabNav.Root>
            <Flex align="center" direction="row" gap="4">
                <TextField.Root placeholder="Buscar tarea..." className="w-100" />
                <BellIcon />
                <GearIcon />
                <Half2Icon onClick={toggleTheme} />
                <Avatar size={"2"} radius="full" fallback="R" />
            </Flex>
        </Flex >
    )
}

