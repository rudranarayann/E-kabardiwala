import { Link } from "react-router-dom"
import bg from "../../assets/userLayout-home-bg.jpg"
import AboutLayout from "../../pages/About/aboutLayout"
import ContactComponent from "../contactComponent"
import { div } from "@tensorflow/tfjs"

export default function AdminHeroPage() {
    return (
        <div>


            <div className="min-h-screen relative">
                <img
                    className="w-full h-full absolute"
                    src={bg}
                    alt="Vendor Home image"
                />
                <div className="absolute h-full w-full">
                    <div className="flex justify-center items-center flex-col md:mt-[15%] mt-[45%] px-5 md:px-0 gap-3">
                        <h1 className="text-white text-[30px] font-semibold">Register Your Company with Scrap Prices</h1>
                        <p className="text-white">Register your company today and start receiving scrap directly from individuals and businesses near you.</p>
                        <Link to={'/admin/company-registration'} className="border border-white rounded-full text-green-300 px-4 py-3 font-bold hover:bg-gray-500">Register Your Company</Link>
                    </div>
                </div>
            </div>
            <AboutLayout />
            <ContactComponent />
        </div>
    )
}