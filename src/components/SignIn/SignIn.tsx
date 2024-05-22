import FormAuth from "../FormAuth/FormAuth"
import BannerAuth from "../BannerAuth/BannerAuth"

const SignIn = () => {
    return (
        <div className="flex h-screen">

            <BannerAuth/>
            <FormAuth type="signin"/>
        </div>
    )
}

export default SignIn