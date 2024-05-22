import FormAuth from "../FormAuth/FormAuth"
import BannerAuth from "../BannerAuth/BannerAuth"

const SignUp = () => {
    return (
        <div className="flex h-screen">
            <FormAuth type="signup"/>
            <BannerAuth/>
        </div>
    )
}

export default SignUp