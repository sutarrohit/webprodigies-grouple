import Menu from "./Menu"

const LandingPageNavbar = () => {
    return (
        <div className="w-full flex justify-between items-center py-5 z-50 sticky top-0">
            <p className="font-bold text-2xl">Grouple.</p>
            <Menu orientation="desktop" />
        </div>
    )
}

export default LandingPageNavbar
