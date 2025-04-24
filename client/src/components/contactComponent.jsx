import { Mail, MapPin, PhoneCall } from "lucide-react";
import CommonForm from "../common/commonform";
import { contactForm } from "../config/config";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { saveContact } from "../slice/contact/contact-slice";
import toast from "react-hot-toast";

export default function ContactComponent() {
    const initialState = {
        name : '',
        email : '',
        mobileno : '',
        subject : '',
        message : ''
    }
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch()

    function handleContactOnSubmit(e){
        e.preventDefault();
        const formValid = Object.keys(formData).every((item)=> formData[item] !== '')
        if(!formValid){
            toast.error("Fill all fields");
            return ;
        }
        dispatch(saveContact({...formData})).then((data)=>{
            if(data?.payload?.success){
                alert(data?.payload?.message);
                setFormData(initialState);
            }else{
                alert(data?.payload?.message);
            }
        })
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-10 gap-10">
            <div className="flex flex-col justify-center items-center text-xl text-gray-700 gap-5">
                <h1 className="text-3xl font-bold">Get in Touch !</h1>
                <p className="font-semibold">We’d love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out. We're here to help!</p>
            </div>

            <div className="flex md:flex-row flex-col gap-20">
                <div className=" flex flex-col justify-center items-center bg-green-600 rounded-xl  text-white gap-9 p-10">
                    <div>
                        <h1 className="text-3xl font-bold">Contact Information</h1>
                        <p>Please fill the form inorder to give a message</p>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-xl">
                        <PhoneCall />
                        <p className="font-semibold">+91 7809165760</p>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-xl">
                        <Mail />
                        <p className="font-semibold">contact.scrapcollector@gmail.com</p>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-xl">
                        <MapPin />
                        <p className="font-semibold">Sailashree Vihaar,Phase-II,752021,<br />Bhubaneswar,Khordha,Odisha,India</p>
                    </div>
                </div>

                <div className="px-7 md:px-0">
                    <CommonForm formControls={contactForm} buttonText={'Send Message'} formData={formData} setFormData={setFormData} onSubmit={handleContactOnSubmit}/>
                </div>
            </div>
        </div>
    )
}