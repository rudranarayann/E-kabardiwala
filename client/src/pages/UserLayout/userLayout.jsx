import { ArrowDown } from 'lucide-react';
import bg from '../../assets/userLayout-home-bg.jpg';

export default function UserLayout(){
    return (
        <div className="min-h-screen">

            {/* hero section of user layout */}
            <div className='relative'>
                <img className=' absolute h-[100vh] w-full' src={bg} alt={'Not supported background image'} />

                <div className='absolute z-10 text-center w-full top-[250px] text-white'>
                    <h1 className='text-[40px] font-bold'>Welcome to Scrap Collector!</h1>
                    <p className='font-mono text-2xl'>Your one-stop solution for hassle-free scrap collection and responsible recycling.</p>
                    <button className='border border-white rounded-full px-6 py-4 mt-4 hover:bg-gray-800 text-bold'>Click to Start</button>
                </div>
            </div>

            {/*Steps to request for a selling scrap */}

            <div>
                
            </div>
        </div>
    )
}