"use client"
import { Card, CardContent } from "@/components/ui/card"
import { GROUPLE_CONSTANTS } from "@/constants"
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
                    <CardContent className="p-0 flex gap-2">
                        {GROUPLE_CONSTANTS.landingPageMenu.map((menuItem) => (
                            <Link
                                href={menuItem.path}
                                key={menuItem.id}
                                {...(menuItem.section && {
                                    onClick: () => onSetSection(menuItem.path),
                                })}
                                className={cn(
                                    "rounded-xl flex gap-2  py-2 px-4 item-center",
                                    section == menuItem.path
                                        ? "bg-[#09090B] border-[#27272A]"
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
            return <div>mobile</div>
    }
}

export default Menu