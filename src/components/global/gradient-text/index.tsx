import { cn } from "@/lib/utils"

type Props = {
    element?: "H1" | "H2"
    children: React.ReactNode
    className?: string
}

const GradientText = ({ className, element, children }: Props) => {
    switch (element) {
        case "H1":
            return (
                <h1 className={cn(className, "text-gradient")}>{children}</h1>
            )
        case "H1":
            return (
                <h1 className={cn(className, "text-gradient")}>{children}</h1>
            )
        default:
            return <p className={cn(className, "text-gradient")}>{children}</p>
    }
}

export default GradientText
