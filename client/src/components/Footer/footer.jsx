import { useSelector } from "react-redux";
import Logo from "../../assets/logoNew.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";
import { Mail, MapPin, PhoneCall } from "lucide-react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    const { user } = useSelector(state => state.auth);

    const quickLinks = [
        {
            label: 'Home',
            path: user !== null && user?.role === 'vendor' ? '/admin/home' : '/user/home'
        },
        {
            label: 'Sell Scarp',
            path: '/user/scrap'
        },
        {
            label: 'About',
            path: '/about',
        },
        {
            label: 'Carrer',
            path: '',
        }
    ]

    const socilaLinks = [
        {
            icon: "fab fa-facebook-f fa-xl",
            href: 'https://www.facebook.com/profile.php?id=61572452982528'
        },
        {
            icon: "fab fa-linkedin fa-xl",
            href: 'https://www.linkedin.com/in/scrap-collector-10050634a/'
        },
        {
            icon: "fab fa-whatsapp fa-xl",
            href: ''
        },
        {
            icon: "fab fa-instagram fa-xl",
            href: 'https://www.instagram.com/scrap_collector_environx/'
        },
    ]

    return (
        <div className="flex flex-col">
            <div className="flex md:flex-row flex-col justify-evenly gap-6 bg-green-100 px-6 py-16 ">

                <div className="flex flex-col">
                    <div className="flex justify-start items-center gap-2 ">
                        <i className="fa-solid fa-recycle fa-2xl "></i>
                        {/* <img className="h-10 w-15" src={Logo} alt='Logo' /> */}
                        <h1 className="font-semibold text-xl">Scrap Collector</h1>
                    </div>
                    <div className="w-[80px] border border-red-300 mt-2"></div>
                    <div>
                        <p className="font-semibold text-lg text-gray-600">Transforming waste into Opportunity</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl ">CONTACT</h1>
                    <div className="w-[50px] border border-red-300 mt-2"></div>
                    <p className="font-semibold text-gray-600 flex gap-2"><MapPin /> Sailashree Vihaar,Phase-II,752021,<br />Bhubaneswar,Khordha,Odisha,India</p>
                    <div className="flex gap-2 text-gray-600">
                        <PhoneCall />
                        <p className="font-semibold">+91 7809165760</p>
                    </div>
                    <div className="flex gap-2 text-gray-600">
                        <Mail />
                        <p className="font-semibold">contact@scrapcollector.com</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl ">QUICK LINKS</h1>
                    <div className="w-[60px] border border-red-300 mt-2"></div>
                    <div className="flex flex-col">
                        {
                            quickLinks.map((item,index) => (
                                <Link key={index} to={item.path} className="font-semibold text-gray-600 hover:text-gray-800">{item.label}</Link>
                            ))
                        }
                    </div>
                    <div className="flex gap-2">
                        {
                            socilaLinks.map((item,index) => (
                                <a key={index} className="bg-green-300 py-3 px-4 rounded-full hover:translate-y-1" href={item.href} target="_blank"><i className={`${item.icon}`}></i></a>
                            ))
                        }
                    </div>
                </div>
            </div>
            <p className="text-center py-3">&copy; {new Date().getFullYear()} Scrap Collector. All Rights Reserved.</p>      
        </div>
    )

}