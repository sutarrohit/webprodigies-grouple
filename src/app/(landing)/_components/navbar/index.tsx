import GlassSheet from "@/components/global/glass-sheet"
import { Button } from "@/components/ui/button"
import { Logout } from "@/icons"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import Menu from "./Menu"

const LandingPageNavbar = () => {
    return (
        <div className="w-full flex justify-between items-center py-5 z-50 sticky top-0">
            <p className="font-bold text-2xl">Grouple.</p>

            <Menu orientation="desktop" />

            <div className="flex gap-2">
                <Link href="/sign-in">
                    <Button
                        variant="outline"
                        className="bg-themBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray text-[12px]"
                    >
                        <Logout />
                        Login
                    </Button>
                </Link>

                {/* Mobile Menu */}
                <GlassSheet
                    triggerClass="lg:hidden"
                    trigger={
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent"
                        >
                            <MenuIcon size={20} />
                        </Button>
                    }
                >
                    <Menu orientation="mobile" />
                </GlassSheet>
            </div>
        </div>
    )
}

export default LandingPageNavbar
