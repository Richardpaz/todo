"use client"
import { BellIcon, GearIcon, Half2Icon } from "@radix-ui/react-icons";
import { Avatar, Flex, TextField, TabNav } from "@radix-ui/themes";
import "@/app/styles/Header.css"
import { useThemeStore } from "@/app/store/theme";

export function Header() {

    const toggleTheme = useThemeStore(
        (state) => state.toggleTheme
    );


    return (
        <Flex direction="row" gap="4" className="header-container w-full" justify={"between"}>
            <TabNav.Root>
                <TabNav.Link href="#" active>
                    DashBoard
                </TabNav.Link>
                <TabNav.Link href="#">Analytics</TabNav.Link>
                <TabNav.Link href="#">Hoy</TabNav.Link>
            </TabNav.Root>
            <Flex align="center" direction="row" gap="4">
                <TextField.Root placeholder="Buscar tarea..." className="w-100"/>
                <BellIcon />
                <GearIcon />
                <Half2Icon onClick={toggleTheme} />
                <Avatar size={"2"} radius="full" fallback="R" />
            </Flex>
        </Flex>
    )
}

