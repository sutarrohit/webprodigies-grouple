import SignInForm from "@/components/form/sing-in"
// import { GoogleAuthButton } from "@/components/global/google-oauth-button"
import { Separator } from "@/components/ui/separator"

const SignIn = () => {
    return (
        <>
            <h5 className="font-bold text-base text-themeTextWhite">Login</h5>
            <p className="text-themeTextGray leading-tight text-[14px] mt-1">
                Network with people from around the world , join groups, create
                your own, watch courses and become best version of yourself
            </p>
            <SignInForm />
            <div className="my-10 w-full relative">
                <div className="bg-black px-1 sm:px-3 py-3  absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                    OR CONTINUE WITH
                </div>
                <Separator orientation="horizontal" className="bg-themeGray" />
            </div>
            {/* <GoogleAuthButton method="signin" /> */}
        </>
    )
}

export default SignIn
