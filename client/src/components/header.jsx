import { useState } from 'react';
import Logo from '../assets/online-kawadiwala_logo.png';
import { Link, Links } from 'react-router-dom';
import { AlignJustify, AlignJustifyIcon, ChevronDown, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);


    const toggle = () => {
        setIsOpen(!isOpen);
    }

    function HeaderLinks() {
        return (
            <>
                <p className='hover:cursor-pointer flex gap-3 hover:text-gray-300'>Service <ChevronDown/>{}</p>
                <p className='hover:cursor-pointer hover:text-gray-300'>Company</p>
                <p className='hover:cursor-pointer hover:text-gray-300'>About</p>
            </>
        )
    }

    function HeaderRight() {
        return (
            <div className='hidden md:flex items-center gap-[30px] text-white '>
                <Link className='border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600 '>Sell Scrap</Link>
                <Link className='border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600 mr-4' to={'/auth'} >LogIn/SignUp</Link>
            </div>
        )
    }

    return (
        <header className='bg-green-700 px-2 py-5 flex w-full justify-between flex-wrap'>
            <div className='flex gap-2 items-center hover:cursor-pointer ' >
                <img className='h-16 w-16 rounded-full' src={Logo} alt="logo" />
                <h1 className=' text-white text-[15px] md:text-[30px] font-semibold hover:text-gray-300'>Scrap Collector</h1>
            </div>
            <Link className='md:hidden border-2 border-white rounded-full px-4 py-2 hover:cursor-pointer hover:bg-green-600 text-white flex justify-center items-center' to={'/auth'} >LogIn/SignUp</Link>
            
            <div className='hidden md:flex items-center gap-[50px] text-white'>
                <HeaderLinks />
            </div>
            <HeaderRight />
            <button onClick={toggle} className='text-white md:hidden'>{isOpen ? <X /> : <AlignJustifyIcon />}</button>
            {isOpen && (
                <div className='flex-col justify-center items-center gap-[90px] text-white w-1/3 mt-3 ml-[45%]'>
                    <HeaderLinks/>
                </div>
            )}
        </header>
    )
}