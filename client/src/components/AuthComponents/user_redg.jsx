import { Link } from "react-router-dom";
import CommonForm from "../../common/commonform";
import { useState } from "react";
import {userRegistrationForm} from '../../config/config'
import { useDispatch } from 'react-redux'
import { userRegistration } from "../../slice/user/user-auth-slice";

export default function UserRegistration(){

    const intitialState = {
        username : '',
        email : '',
        password : '',
    }

    const [formData,setFormData] = useState(intitialState);
    const dispatch = useDispatch();

    function handlUserRegistration(event){
        event.preventDefault();
        dispatch(userRegistration(formData)).then((data)=>{
            if(data?.payload?.success)
                setFormData(intitialState);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center gap-20">
            <div>
                <h1 className=" text-4xl font-extrabold">Registration For User </h1>
                <p className="text-xl pt-5">Already have an account, <Link to={'/auth/signin-user'} className="text-blue-500 underline ">Sign In</Link></p>
            </div>
            <div>
                <CommonForm formControls={userRegistrationForm} formData={formData} setFormData={setFormData} onSubmit={handlUserRegistration} buttonText={'Sign Up'}/>
            </div>
        </div>
    )
}