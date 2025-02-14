export default function ThreeStepsToScrapCollect() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
            <h1 className="text-[60px] font-extrabold mb-2 text-green-400">Scrap Collector</h1>
            <p className="text-2xl text-gray-300 mb-6 max-w-xl text-center">
                Join us in making the world a cleaner and greener place. Recycle your scrap efficiently with our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-h-[80vh] max-w-7xl">
                <div className=" flex justify-center flex-col p-6 bg-gray-800 rounded-lg shadow-md text-center ">
                    <h2 className="md:text-[50px] text-[40px] font-semibold text-green-300">Easy Pickup</h2>
                    <p className="text-gray-400 mt-2 md:text-xl text-lg">Schedule a pickup for your scrap materials effortlessly.</p>
                </div>
                <div className=" flex justify-center flex-col p-6 bg-gray-800 rounded-lg shadow-md text-center">
                    <h2 className="md:text-[50px] text-[40px] font-semibold text-green-300">Eco-Friendly</h2>
                    <p className="text-gray-400 mt-2 md:text-xl text-lg">We ensure proper recycling to reduce environmental impact.</p>
                </div>
                <div className="flex justify-center flex-col p-6 bg-gray-800 rounded-lg shadow-md text-center">
                    <h2 className="md:text-[50px] text-[40px] font-semibold text-green-300">Get Rewards</h2>
                    <p className="text-gray-400 mt-2 md:text-xl text-lg">Earn points and rewards for every successful recycling.</p>
                </div>
                <div className="flex justify-center flex-col p-6 bg-gray-800 rounded-lg shadow-md text-center">
                    <h2 className="md:text-[50px] text-[40px] font-semibold text-green-300">Track Your Impact</h2>
                    <p className="text-gray-400 mt-2 md:text-xl text-lg">Monitor how much waste you've recycled and its positive effects.</p>
                </div>
            </div>
        </div>
    )
}