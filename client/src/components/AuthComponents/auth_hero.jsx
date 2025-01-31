import {MoveRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/online-kawadiwala_logo.png'

export default function AuthHeroComponent(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 bg-green-800 justify-center items-center rounded-lg shadow-lg">
            <div className='h-32 w-32 rounded-lg overflow-hidden '>
                <img className='object-cover h-full w-full' src={logo} alt="logo" />
            </div>
            <h1 className="text-white text-[40px] font-extrabold font-mono px-4 ">Welcome you, <br /> to Online-Kawadiwala</h1>
            <div className='flex flex-col gap-6 font-bold  rounded-md p-10 '>
                <p className='flex gap-4 text-2xl justify-center items-center pl-7'>User <span className='bg-gray-300 rounded-full px-7 py-4 hover:bg-gray-400 hover:cursor-pointer' onClick={()=>navigate('/auth/signin-user')}><MoveRight /></span></p>
                <p className='flex gap-4 text-2xl justify-center items-center '>Vendor <span className='bg-gray-300 rounded-full px-7 py-4 hover:bg-gray-400 hover:cursor-pointer' onClick={()=>navigate('/auth/signin-vendor')}><MoveRight  /></span></p>
            </div>

        </div>
    )
}