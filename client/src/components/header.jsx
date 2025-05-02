
import { useState } from "react";
import Logo from "../assets/logoNew.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, UserRoundPen, X, AlignJustifyIcon, LogOut, Settings, Truck, ChartNoAxesCombined, RefreshCcw, ClipboardList, Sprout, PackageCheck, IndianRupee, CircuitBoard, Building2, CalendarArrowUp, GalleryHorizontalEnd } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, vendorLogout } from "../slice/user/user-auth-slice";
import '@fortawesome/fontawesome-free/css/all.min.css';
import toast from "react-hot-toast";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropDownOpen, setDropDownOpen] = useState(false);
    const [isProfileOption, setIsProfileOption] = useState(false);
    const [dropDownForCompany, setDropDownForCompany] = useState(false);
    const { isAuthenticate, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // below function is defined toggle to open Option 
    const toggle = (getPerticularButton, setPerticularButton) => {
        setPerticularButton(!getPerticularButton);
        
    };

    //handel logout 
    function handleOnclickLogout() {
        if (user?.role === 'vendor') {
            dispatch(vendorLogout()).then(() => {
                toast.success("You are logged out !");
            })
        } else {
            dispatch(userLogout()).then(() => {
                toast.success("You are logged out !");
            })
        }
    }

    //When click to logo it redirect to Home page of admin and user respective login type.
    function handleOnClickLogo() {
        user?.role === 'vendor' ? navigate('/admin/home') : navigate('/user/home');
    }

    //Specific header links for functionality
    function HeaderLinks() {
        return (
            <>
                <div className="relative">
                    <p onClick={() => {toggle(isDropDownOpen, setDropDownOpen)
                        if(dropDownForCompany || isProfileOption) { setIsProfileOption(false); setDropDownForCompany(false)} 
                    }} className="hover:cursor-pointer flex items-center gap-2 hover:text-gray-300">
                        Services {isDropDownOpen ? <ChevronUp /> : <ChevronDown />}
                    </p>

                    {/* when clicked in service dropdown button then it shows respective options wheather login person is a vendor or User */}
                    {isDropDownOpen && (
                        <ul onClick={()=>{toggle(isDropDownOpen, setDropDownOpen)}} className="absolute left-0 mt-2 w-48 top-[85px] md:top-[53px] bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden  ">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link className="flex gap-3" to={`${isAuthenticate ? '/user/scrap': '/auth/signin-user'}`}><Truck /> Sell Scrap</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link className="flex gap-3" to="/vehicle-scrap"><RefreshCcw />Vehicle Scraping</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link className="flex gap-3" to={'/zero-waste'}><Sprout />Zero Waste Society</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link className="flex gap-3" to="/e-waste"><CircuitBoard />Sell E-waste</Link>
                            </li>
                            
                        </ul>
                    )}
                </div>

                {/* It redirected to company page */}
                <div className="relative">
                    <p onClick={() => {toggle(dropDownForCompany, setDropDownForCompany)
                        if(isDropDownOpen || isProfileOption) { setIsProfileOption(false); setDropDownOpen(false)} 
                    }} className="hover:cursor-pointer flex items-center gap-2 hover:text-gray-300">
                        Company {dropDownForCompany ? <ChevronUp /> : <ChevronDown />}
                    </p>

                    {/* when clicked in service dropdown button then it shows respective options wheather login person is a vendor or User */}
                    {dropDownForCompany && (
                        <ul onClick={()=>{toggle(dropDownForCompany, setDropDownForCompany)}} className="absolute left-0 mt-2 w-48 top-[60px] md:top-[53px] bg-white text-black shadow-lg rounded-lg z-50 overflow-hidden  ">
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link className="flex gap-3" to="/contact"> Contact</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200">
                                <Link className="flex gap-3" to="/about">About</Link>
                            </li>

                        </ul>
                    )}
                </div>

                {/* <Link className="hover:cursor-pointer hover:text-gray-300">Company</Link> */}

                {/* it redirected to About section  */}
                <p>
                    <Link to={'/career'} className="hover:cursor-pointer hover:text-gray-300">Careers</Link>
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
                        !isAuthenticate ?
                        <Link to={'/auth/signin-user'} className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600">
                            Sell Scrap
                        </Link>
                        :user?.role !== 'vendor' ? <Link to={'/user/scrap'} className="border-2 rounded-full px-4 py-3 hover:cursor-pointer hover:bg-green-600">
                            Sell Scrap
                        </Link> : <h1 className="flex gap-3 font-bold text-xl border p-2 rounded-md"> <ChartNoAxesCombined />Admin Panel</h1>
                    }
                    {
                        user !== null ? <button className="hover:text-gray-300" onClick={handleOnclickLogout}><LogOut /></button> : null
                    }
                </div>

                {/* for valid user it shows a profile section , if not then shows for login/signup */}
                {isAuthenticate ? (
                    <div onClick={() => {toggle(isProfileOption, setIsProfileOption)
                        if(dropDownForCompany || isDropDownOpen || isOpen) { setDropDownForCompany(false); setDropDownOpen(false);setIsOpen(false)} 
                    }} className="flex justify-center items-center flex-col mr-4 hover:cursor-pointer">
                        <p className="rounded-full border-2 border-white p-4" >
                            <UserRoundPen />
                        </p>
                        <h1 className="font-bold">{user?(user?.username).toUpperCase():null}</h1>
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
        <header className="bg-green-700 px-2 min-h-24 flex w-full justify-between flex-wrap items-center shadow-2xl">
            <div onClick={handleOnClickLogo} className="flex gap-2 items-center hover:cursor-pointer">
                <i className="fa-solid fa-recycle fa-2xl"></i>
                {/* <img className="h-15 w-20 rounded-md" src={Logo} alt="logo" /> */}
                <h1 className="text-white text-[15px] md:text-[25px] font-semibold hover:text-gray-300">SCRAP COLLECTOR</h1>
            </div>

            {/* this is when view is for mobile and a option button facilate to shows related header links */}
            <div className="hidden md:flex items-center gap-[50px] text-white">
                <HeaderLinks />
            </div>
            <button onClick={() => {toggle(isOpen, setIsOpen)
                isProfileOption ? setIsProfileOption(false) : null
            }} className="text-white md:hidden">
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
                <div onClick={()=>{toggle(isProfileOption, setIsProfileOption)}} className="absolute top-[96px] right-0 overflow-hidden bg-white text-black shadow-lg rounded-lg z-50">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            <Link to={isAuthenticate && user?.role === 'vendor' ?'/admin/seeallorder' : '/user/allpickups' } className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />{ user?.role === 'vendor' ?'See All Pickups ':'Requests'}
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
                        {isAuthenticate && user?.role === 'vendor'?
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <Link to="/admin/payments" className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5"/> Payments
                                </Link>
                            </li> 
                            :   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    <Link to="/user/payment" className="flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5"/> Total Money Recieved
                                </Link>
                            </li>

                        }
                        {isAuthenticate && user?.role === 'vendor'?
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <Link to="/admin/sheduling" className="flex items-center gap-2">
                                    <PackageCheck className="w-5 h-5" /> Schedule
                                </Link>
                            </li> 
                            : <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            <Link to="/user/waste-price" className="flex items-center gap-2">
                                <PackageCheck className="w-5 h-5" /> See waste price
                            </Link>
                        </li>
                        }
                        {isAuthenticate && user?.role === 'vendor'?
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <Link to="/admin/add-city" className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5" /> Add City
                                </Link>
                            </li> 
                            : <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            <Link to="/user/address" className="flex items-center gap-2">
                                <Building2  className="w-5 h-5" /> Addresses
                            </Link>
                        </li>
                        }
                        {
                            isAuthenticate && user?.role === 'vendor' ? 
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    <Link to="/admin/all-city" className="flex items-center gap-2">
                                        <GalleryHorizontalEnd className="w-5 h-5" /> All Cities
                                    </Link>
                                </li>
                            : null
                        }
                    </ul>
                </div>
            )}
        </header>
    );
}
