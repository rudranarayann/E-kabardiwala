import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../common/commonform";
import { useState } from "react";
import { userRegistrationForm } from '../../config/config'
import { useDispatch } from 'react-redux'
import { userRegistration } from "../../slice/user/user-auth-slice";
import toast from "react-hot-toast";

export default function UserRegistration() {

    const intitialState = {
        username: '',
        email: '',
        password: '',
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const [formData, setFormData] = useState(intitialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handlUserRegistration(event) {
        event.preventDefault();
        if (!emailRegex.test(formData?.email.trim())) {
            toast.error("Please enter a valid email address !");
            return;
        }
        if (!passwordRegex.test(formData?.password.trim())) {
            toast.error("Password must be at least 8 characters and include a number and a special character.");
            return;
        }
        dispatch(userRegistration(formData)).then((data) => {
            if (data?.payload?.success) {
                setFormData(intitialState);
                navigate("/auth/signin-user");
                toast.success(data?.payload?.message || "Successfully registered");
            } else {
                toast.error(data?.payload?.message || "Please try again !");
            }
        });
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 py-6">
            <div>
                <h1 className="text-4xl font-extrabold">Registration For User </h1>
                <p className="text-xl pt-5">Already have an account, <Link to={'/auth/signin-user'} className="text-blue-500 underline ">Sign In</Link></p>
            </div>
            <div>
                <CommonForm formControls={userRegistrationForm} formData={formData} setFormData={setFormData} onSubmit={handlUserRegistration} buttonText={'Sign Up'} />
            </div>
            <div className="w-[30%] flex justify-end">
                <Link to={"/auth/forgotpassword-user"} state={{role:'userr'}} className="text-decoration-line:underline text-blue-500 text-xl font-semibold hover:cursor-pointer hover:text-blue-700 underline">Forgot Password?</Link>
            </div>

        </div>
    )
}