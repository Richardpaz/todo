"use client"
import { BellIcon, GearIcon, Half2Icon } from "@radix-ui/react-icons";
import { Avatar, Flex, TextField, TabNav, Badge, Text, Button } from "@radix-ui/themes";
import "@/app/styles/Header.css"
import { useThemeStore } from "@/app/store/theme";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
export function Header() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toggleTheme = useThemeStore(
        (state) => state.toggleTheme
    );


    return (
        <Flex direction="row" gap="4" className="header-container w-full" justify={"between"}>
            <TabNav.Root>

                <Button color="blue">
                    <TabNav.Link asChild active={pathname === "/AddTask"}>
                        <Link href={"/AddTask"}>
                            Agregar Tarea
                        </Link>
                    </TabNav.Link>
                </Button>
                <TabNav.Link asChild active={pathname === "/"}>
                    <Link href={"/"}>
                        Todas
                    </Link>
                </TabNav.Link>

                <TabNav.Link asChild active={pathname === "/Alta"}>
                    <Link href={"/Alta"}>
                        <Text color="red"> Alta</Text>
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/Media"}>
                    <Link href={"/Media"} >
                        <Text color="yellow">Media</Text>
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/Baja"}>
                    <Link href={"/Baja"}>
                        <Text color="blue">Baja</Text>
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/tasks/todo"}>
                    <Link href={"/tasks/todo"}>
                        <Text color="orange">Todo</Text>
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/tasks/in-progress"}>
                    <Link href={"/tasks/in-progress"} >
                        <Text color="blue">in-progress</Text>
                    </Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/tasks/done"}>
                    <Link href={"/tasks/done"}>
                        <Text color="green">hecho</Text>
                    </Link>
                </TabNav.Link>
            </TabNav.Root>
            <Flex align="center" direction="row" gap="4">
                <TextField.Root placeholder="Buscar tarea..." className="w-100" onKeyDown={handleBuscar} />
                <BellIcon />
                <GearIcon />
                <Half2Icon onClick={toggleTheme} />
                <Avatar size={"2"} radius="full" fallback="R" />
            </Flex>
        </Flex >
    )
}

