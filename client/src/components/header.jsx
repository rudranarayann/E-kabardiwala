
import { useState } from "react";
import Logo from "../assets/logoNew.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, UserRoundPen, X, AlignJustifyIcon, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, vendorLogout } from "../slice/user/user-auth-slice";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setDropDownOpen] = useState(false);
    const [isProfileOption, setIsProfileOption] = useState(false);
    const { isAuthenticate, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // below function is defined toggle to open Option 
    const toggle = (getPerticularButton,setPerticularButton) => {
        setPerticularButton(!getPerticularButton);
    };

    //handel logout 
    function handleOnclickLogout() {
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

    //When click to logo it redirect to Home page of admin and user respective login type.
    function handleOnClickLogo() {
        user?.role === 'vendor' ? navigate('/admin') : navigate('/user');
    }

    //Specific header links for functionality
    function HeaderLinks() {
        return (
            <>
                <div className="relative">
                    <p onClick={()=>toggle(isDropDownOpen, setDropDownOpen)} className="hover:cursor-pointer flex items-center gap-2 hover:text-gray-300">
                        Service {isDropDownOpen ? <ChevronUp /> : <ChevronDown />}
                    </p>

                    {/* when clicked in service dropdown button then it shows respective options wheather login person is a vendor or User */}
                    {isDropDownOpen && (
                        <ul className="absolute left-0 mt-2 w-48 top-[85px] md:top-[66px] bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden  ">
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
                
                {/* It redirected to company page */}
                <Link className="hover:cursor-pointer hover:text-gray-300">Company</Link>

                {/* it redirected to About section  */}
                <p>
                    <Link to={'/about'} className="hover:cursor-pointer hover:text-gray-300">About</Link>
                </p>
            </>
        );
    }

    // this function defines functionality of some right side of elements
    function HeaderRight() {
        return (
            <div className="flex items-center gap-[30px] text-white">

                {/* If someone has already logged in , it shows a Admin header for admin and user header for user . And also have logout functionality*/}
                <div className="hidden md:flex items-center gap-[30px] text-white">
                {
                    user?.role !== 'vendor' ? <Link className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600">
                        Sell Scrap
                    </Link> : <h1 className="font-bold text-xl border p-2 rounded-md">Admin Panel</h1>
                }
                {
                    user !== null ? <button className="hover:text-gray-300" onClick={handleOnclickLogout}><LogOut /></button> : null
                }
                </div>

                {/* for valid user it shows a profile section , if not then shows for login/signup */}
                {isAuthenticate ? (
                    <div onClick={()=>toggle(isProfileOption,setIsProfileOption)} className="flex justify-center items-center flex-col mr-4 hover:cursor-pointer">
                        <p className="rounded-full border-2 border-white p-4" >
                            <UserRoundPen />
                        </p>
                        <h1 className="font-bold">{(user?.username).toUpperCase()}</h1>
                    </div>
                ) : (
                    <Link className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600 mr-4" to="/auth/signin-user">
                        LogIn/SignUp
                    </Link>
                )}
            </div>
            
        );
    }

    //main returned component for the header
    return (
        <header className="bg-green-700 px-2 py-5 flex w-full justify-between flex-wrap items-center shadow-2xl">
            <div onClick={handleOnClickLogo} className="flex gap-2 items-center hover:cursor-pointer">
                <i className="fa-solid fa-recycle fa-2xl"></i>
                {/* <img className="h-15 w-20 rounded-md" src={Logo} alt="logo" /> */}
                <h1 className="text-white text-[15px] md:text-[25px] font-semibold hover:text-gray-300">SCRAP COLLECTOR</h1>
            </div>

            {/* this is when screen is for mobile and a option button facilate to shows related header links */}
            <div className="hidden md:flex items-center gap-[50px] text-white">
                <HeaderLinks />
            </div>
            <button onClick={()=>toggle(isOpen,setIsOpen)} className="text-white md:hidden">
                {isOpen ? <X /> : <AlignJustifyIcon />}
            </button>

            <div>
                <HeaderRight />
            </div>

            {isOpen && (
                <div className="flex-col justify-center items-center gap-[90px] text-white w-1/3 mt-3 ml-[40%]">
                    <HeaderLinks />
                </div>
            )}

            {/* it shows the option when you clicked on Profile symbol*/}
            {isProfileOption && (
              <div className="absolute top-[124px] right-0 overflow-hidden bg-white text-black shadow-lg rounded-lg z-50">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/profile-settings" className="flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Profile Settings
                  </Link>
                </li>
                <li
                  onClick={handleOnclickLogout}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-5 h-5" /> Logout
                  </div>
                </li>
              </ul>
            </div>
            )}
        </header>
    );
}
