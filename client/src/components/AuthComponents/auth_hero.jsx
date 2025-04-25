import {MoveRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/online-kawadiwala_logo.png'
import AboutLayout from '../../pages/About/aboutLayout';
import ContactComponent from '../contactComponent';

export default function AuthHeroComponent(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 bg-green-700 justify-center items-center shadow-lg ">
            <div className='h-32 w-32 rounded-lg overflow-hidden '>
                <img onClick={()=>navigate('/')} className='object-cover h-full w-full hover:cursor-pointer ' src={logo} alt="logo" />
            </div>
            <h1 className="text-gray-200 text-[40px] font-extrabold font-mono px-4 ">Welcome you, <br /> to Online Scrap Collector</h1>
            <div className='flex flex-col gap-6 font-bold  rounded-md p-10 '>
                <p className='flex gap-4 text-gray-200  text-2xl justify-center items-center pl-7'>User <span className='text-black bg-gray-300 rounded-full px-7 py-4 hover:bg-gray-400 hover:cursor-pointer' onClick={()=>navigate('/auth/signin-user')}><MoveRight /></span></p>
                <p className='flex gap-4 text-2xl justify-center items-center text-gray-200'>Vendor <span className='text-black bg-gray-300 rounded-full px-7 py-4 hover:bg-gray-400 hover:cursor-pointer' onClick={()=>navigate('/auth/signin-vendor')}><MoveRight  /></span></p>
            </div>
           
        </div>
    )
}