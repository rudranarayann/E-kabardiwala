import bg from '../../assets/userLayout-home-bg.jpg';
import { useNavigate } from 'react-router-dom';
import ContactComponent from '../contactComponent';
import ThreeStepsToScrapCollect from './ThreeStepsScrap';
import AboutLayout from '../../pages/About/aboutLayout';
export default function UserHome() {
    const navigate = useNavigate();
    return (
        <div>
            {/* hero section of user layout */}
            <div className='relative min-h-screen w-full'>
                <img className='absolute h-[100vh] w-full object-cover' src={bg} alt={'Not supported background image'} />

                <div className='absolute z-10 text-center w-full top-[250px] text-white'>
                    <h1 className='text-[40px] font-bold'>Welcome to Scrap Collector!</h1>
                    <p className='font-mono text-2xl'>Your one-stop solution for hassle-free scrap collection and responsible recycling.</p>
                    <button onClick={() => navigate('/user/scrap')} className='border border-white rounded-full px-6 py-4 mt-4 hover:bg-gray-800 text-bold'>Click to Start</button>
                </div>
            </div>

             {/*Steps to request for a selling scrap */}
            <ThreeStepsToScrapCollect/>
            <AboutLayout/>
            <ContactComponent />
        </div>
    )
}