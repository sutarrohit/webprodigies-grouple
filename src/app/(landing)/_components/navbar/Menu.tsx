"use client"
import { Card, CardContent } from "@/components/ui/card"
import { NEXORA_CONSTANTS } from "@/constants"
import { useNavigation } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

type MenuProps = {
    orientation: "desktop" | "mobile"
}

const Menu = ({ orientation }: MenuProps) => {
    const { section, onSetSection } = useNavigation()

    switch (orientation) {
        case "desktop":
            return (
                <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop-blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
                    <CardContent className="p-0 flex gap-2 items-center">
                        {NEXORA_CONSTANTS.landingPageMenu.map((menuItem) => (
                            <Link
                                href={menuItem.path}
                                key={menuItem.id}
                                {...(menuItem.section && {
                                    onClick: () => onSetSection(menuItem.path),
                                })}
                                className={cn(
                                    "rounded-xl flex gap-2 py-1 px-4 item-center text-[12px]",
                                    section == menuItem.path
                                        ? "bg-themeBlack border border-themeGray items-center"
                                        : "",
                                )}
                            >
                                {section === menuItem.path && menuItem.icon}
                                {menuItem.label}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )

        case "mobile":
            return (
                <div className="flex flex-col mt-10">
                    {NEXORA_CONSTANTS.landingPageMenu.map((menuItem) => (
                        <Link
                            href={menuItem.path}
                            key={menuItem.id}
                            {...(menuItem.section && {
                                onClick: () => onSetSection(menuItem.path),
                            })}
                            className={cn(
                                "rounded-xl flex gap-2 py-2 px-4 item-center",
                                section == menuItem.path
                                    ? "bg-themeBlack border border-themeGray"
                                    : "",
                            )}
                        >
                            {menuItem.icon}
                            {menuItem.label}
                        </Link>
                    ))}
                </div>
            )

        default:
            return <div></div>
    }
}

export default Menu
