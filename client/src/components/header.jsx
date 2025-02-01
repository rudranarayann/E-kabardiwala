
import { useState } from "react";
import Logo from "../assets/logoNew.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, UserRoundPen, X, AlignJustifyIcon, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, vendorLogout } from "../slice/user/user-auth-slice";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setDropDownOpen] = useState(false);
    const { isAuthenticate, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropDown = () => {
        setDropDownOpen(!isDropDownOpen);
    };

    function handleOnclicLogout() {
        if (user?.role === 'vendor') {
            dispatch(vendorLogout()).then(() => {
                alert('logged out successfully');
            })
        } else {
            dispatch(userLogout()).then(() => {
                alert('logged out successfully');
            })
        }
    }

    function handleOnClickLogo() {
        user?.role === 'vendor' ? navigate('/admin') : navigate('/user');
    }

    function HeaderLinks() {
        return (
            <>
                <div className="relative">
                    <p onClick={toggleDropDown} className="hover:cursor-pointer flex items-center gap-2 hover:text-gray-300">
                        Service {isDropDownOpen ? <ChevronUp /> : <ChevronDown />}
                    </p>


                    {isDropDownOpen && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden ">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/sell-scrap">Sell Scrap</Link>
                            </li>
                            {user?.role === 'vendor' ? <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/add-vendor-address">Add Vendor Address</Link>
                            </li> : <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/add-vendor-address">Vehicle Scraping</Link>
                            </li>}
                            {user?.role === 'vendor' ? <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/pick-up">Pick Up</Link>
                            </li> : <li className="px-4 py-2 hover:bg-gray-200">
                                <Link to="/pick-up">Zero Waste Society</Link>
                            </li>}
                            {
                                user?.role === 'vendor' ? <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/pick-up">Payments</Link>
                                </li> : <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/pick-up">Sell E-waste</Link>
                                </li>
                            }
                        </ul>
                    )}
                </div>

                <Link className="hover:cursor-pointer hover:text-gray-300">Company</Link>
                <p>
                    <Link to={'/about'} className="hover:cursor-pointer hover:text-gray-300">About</Link>
                </p>
            </>
        );
    }

    function HeaderRight() {
        return (
            <div className="hidden md:flex items-center gap-[30px] text-white">
                {
                    user?.role !== 'vendor' ? <Link className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600">
                        Sell Scrap
                    </Link> : <h1 className="font-bold text-xl border p-2 rounded-md">Admin Panel</h1>
                }
                {
                    user !== null ? <button className="hover:text-gray-300" onClick={handleOnclicLogout}><LogOut /></button> : null
                }
                {isAuthenticate ? (
                    <div className="flex justify-center items-center flex-col mr-4">
                        <p>
                            <UserRoundPen />
                        </p>
                        <h1 className="font-bold">{user?.username}</h1>
                    </div>
                ) : (
                    <Link className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600 mr-4" to="/auth">
                        LogIn/SignUp
                    </Link>
                )}

            </div>
        );
    }

    // console.log("role : ",user?.role);
    return (
        <header className="bg-green-700 px-2 py-5 flex w-full justify-between flex-wrap items-center shadow-2xl">
            <div className="flex gap-2 items-center hover:cursor-pointer">
                <img className="h-15 w-20 rounded-md" src={Logo} alt="logo" />
                <h1 onClick={handleOnClickLogo} className="text-white text-[15px] md:text-[25px] font-semibold hover:text-gray-300">SCRAP COLLECTOR</h1>
            </div>

            {
                !isAuthenticate ? (
                    <Link className="md:hidden border-2 border-white rounded-full px-4 py-2 hover:cursor-pointer hover:bg-green-600 text-white flex justify-center items-center" to="/auth">
                        LogIn/SignUp
                    </Link>
                ) : null
            }

            <div className="hidden md:flex items-center gap-[50px] text-white">
                <HeaderLinks />
            </div>

            <div>
                <HeaderRight />
            </div>

            <button onClick={toggle} className="text-white md:hidden">
                {isOpen ? <X /> : <AlignJustifyIcon />}
            </button>

            {isOpen && (
                <div className="flex-col justify-center items-center gap-[90px] text-white w-1/3 mt-3 ml-[40%]">
                    <HeaderLinks />
                </div>
            )}
        </header>
    );
}
