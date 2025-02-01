export default function AboutLayout(){
    return (
        <div className="flex flex-col p-10 md:px-36 gap-10">
            <div className="flex flex-col gap-7">
                <h1 className="text-3xl md:text-[3rem] font-semibold">About Scrap Collector</h1>
                <p className="text-gray-600 text-xl">Welcome to Scrap Collector, your trusted partner in sustainable waste management. We are dedicated to revolutionizing the way scrap is collected, processed, and recycled, making it easier, faster, and eco-friendlier for individuals and businesses alike.</p>
            </div>

            <div className="flex flex-col gap-7">
                <h1 className="text-3xl md:text-[3rem] font-semibold text-gray-500">Our Vision</h1>
                <p className=" text-xl text-green-700">To create a cleaner, greener, and more sustainable world by transforming waste management practices through innovative technology and eco-conscious solutions.</p>
            </div>

            <div className="flex flex-col gap-7">
                <h1 className="text-3xl md:text-[3rem] font-semibold text-gray-500">Our Mission</h1>
                <p className=" text-xl text-gray-700">At Scrap Collector, our mission is to simplify scrap collection, promote responsible recycling habits, and reduce environmental impact. We aim to empower communities and businesses to contribute to a circular economy, where every piece of scrap finds a new purpose.</p>
            </div>

            <div className="flex flex-col gap-7">
                <h1 className="text-3xl md:text-[3rem] font-semibold text-gray-500">Why Us!</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-16 ">
                    <div className="flex flex-col p-10 rounded-xl bg-green-100 hover:shadow-2xl">
                        <h1 className="font-bold text-xl">Who we are ?</h1>
                        <p className="">Founded with a passion for environmental conservation, Scrap Collector bridges the gap between scrap generators and recyclers. We provide an efficient, transparent, and user-friendly platform that connects households, industries, and businesses with reliable scrap collection services.</p>
                    </div>

                    <div className="flex flex-col gap-7 px-16 py-10 rounded-2xl hover:shadow-2xl">
                        <h1 className="font-bold text-xl">What we do ?</h1>
                        <ul className="flex flex-col gap-5 text-lg">
                            <li className="list-disc">Doorstep Scrap Collection: Schedule pickups at your convenience with just a few clicks.</li>
                            <li className="list-disc">Eco-Friendly Recycling: Ensuring that every item collected is processed responsibly.</li>
                            <li className="list-disc">Transparent Process: Fair pricing and real-time tracking for complete peace of mind.</li>
                            <li className="list-disc">Business Solutions: Tailored waste management plans for industries, offices, and commercial establishments.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-7 bg-gray-200 px-16 py-10 rounded-2xl hover:shadow-2xl">
                        <h1 className="font-bold text-xl">Why Choose Scrap Collector?</h1>
                        <ul className="flex flex-col gap-5 text-lg">
                            <li className="list-disc">Convenience: Hassle-free scrap collection at your doorstep.</li>
                            <li className="list-disc">Sustainability: Contributing to environmental conservation through responsible recycling.</li>
                            <li className="list-disc">Trust & Transparency: Fair valuation and prompt service.</li>
                            <li className="list-disc">Tech-Driven: Easy-to-use platform for seamless booking and tracking.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h1 className="text-[40px] font-bold">Join us in our journey towards a zero-waste future. Together, let's turn scrap into an opportunity for a <span className="bg-green-600 px-4 rounded-md">cleaner, healthier planet.</span></h1>
        </div>
    )
}