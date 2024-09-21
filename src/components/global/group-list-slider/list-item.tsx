"use client"

import { cn } from "@/lib/utils"

type GroupListItemProps = {
    icon: JSX.Element
    label: string
    selected?: string
}

function getSelected(selected: string, label: string): boolean {
    const cleanString = (str: string) => {
        return str
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]/g, " ") // Replace non-alphanumeric characters with space
            .replace(/\s+/g, " ") // Replace multiple spaces with a single space
            .trim() // Trim leading/trailing spaces
    }
    const normalizedselected = cleanString(selected)
    const normalizedLabel = cleanString(label)
    return normalizedselected === normalizedLabel
}

export const GroupListItem = ({
    icon,
    label,
    selected,
}: GroupListItemProps) => {
    return (
        <div
            className={cn(
                "flex gap-3 items-center py-2 px-4 rounded-2xl bg-themeGray border-2 cursor-pointer",

                getSelected(selected ? selected : "", label)
                    ? "border-themeTextGray"
                    : "border-themeGray",
            )}
        >
            {icon}
            {label}
        </div>
    )
}
