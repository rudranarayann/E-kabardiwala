import Header from "../../components/header";
import BGVideo from "../../assets/hero_page_video.mp4"

export default function HeroLayout() {
    function HeroContent() {
      return (
        <div className="relative text-white flex justify-center flex-col items-center text-center px-4 mt-[50%] md:mt-[20%] ">
          <h1 className="text-3xl md:text-5xl font-bold">
            Got Scrap? Don't know what to do?
          </h1>
          <h1 className="text-2xl md:text-4xl bg-green-600 rounded-md px-3 py-1 mt-2">
            Sell to Us!
          </h1>
          <button className="border-gray-50 border-2 p-2 md:p-3 mt-3 rounded-full hover:bg-green-700">
            Learn More
          </button>
        </div>
      );
    }
  
    return (
      <div>
        <Header />
        <div className="min-h-screen w-full overflow-hidden relative">
          <video
            src={BGVideo}
            autoPlay
            loop
            muted
            className="object-cover absolute h-full w-full"
          ></video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <HeroContent />
        </div>
      </div>
    );
  }
  