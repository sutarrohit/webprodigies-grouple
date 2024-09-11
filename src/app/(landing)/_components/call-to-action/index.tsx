import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "@/icons"
import Link from "next/link"

const CallToAction = () => {
    return (
        <div className="flex flex-col item-start md:item-center gap-y-5 md:gap-y-0">
            <GradientText
                className="text-[35px] md:text-[45px] lg:text-55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-bold"
                element="H1"
            >
                Bringing community <br className="md:hidden" /> Together
            </GradientText>

            <p className="text-sm md:text-center text-left text-muted-foreground">
                Grouple is a vibrant online community platform that empowers
                <br className="md:hidden" />
                people to connect <br className="md:block hidden" />{" "}
                collaborate, and cultivate meaningful
                <br className="md:hidden" />
                relationships.
            </p>
            <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
                <Button
                    variant="outline"
                    className="rounded-xl bg-transparent text-base"
                >
                    Watch Demo
                </Button>

                <Link href="/sign-in">
                    <Button className="rounded-xl text-base flex gap-2 w-full">
                        <BadgePlus /> Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction
