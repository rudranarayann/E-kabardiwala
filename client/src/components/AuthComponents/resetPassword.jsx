import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordUser, resetPasswordUser } from "../../slice/user/user-auth-slice";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPassword(){
    const[pass,setPass] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleOnSubmitResetPassword(e){
        e.preventDefault();
        dispatch(resetPasswordUser({token : token , password : pass})).then((data)=>{
            if(data?.payload?.success){
                toast.success(data?.payload?.message || "password reseted");
                navigate("/auth/signup-user")

            }else{
                toast.error(data?.payload?.message || "Invalid credentials !");
            }
        });
    }
    return (
        <div className="h-full w-full flex justify-center items-center bg-gray-100">
        <form
          className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
          onSubmit={handleOnSubmitResetPassword}
        >
            <div>
                <h1 className=" text-4xl font-extrabold ">Reset your password</h1>
                <p className="text-xl pt-5">It's your first time then , <Link to={'/auth/signup-user'} className="text-blue-500 underline ">Sign Up</Link></p>
            </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg text-gray-700">Email :</label>
            <input
              className="py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button
            className="text-md bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200"
            type="submit"
          >
            Forgot
          </button>
        </form>
      </div>
      
    )
}