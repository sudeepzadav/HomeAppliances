import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { heroImage } from "../../Constants/image";

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

const Hero = () => {
  return (
    <section className="w-full overflow-hidden bg-linear-to-br from-white via-slate-50 to-blue-50 py-10 sm:py-14 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">

          {/* TEXT SECTION */}
          <div className="w-full text-center lg:text-left space-y-5 sm:space-y-6">

            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary">
              Trusted Home Appliance Service
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              We Repair. <br />
              We Maintain. <span className="text-primary">You Relax.</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-600">
              Professional repair and maintenance services for all your home
              appliances. Quick, reliable, and affordable solutions delivered
              right to your doorstep.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-primary/90">
                <FaCalendarAlt />
                Book a Service
              </button>

              <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold text-gray-700 transition hover:border-primary hover:text-primary">
                Learn More
                <FaArrowRight />
              </button>
            </div>

            {/* CUSTOMER SECTION */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">

              {/* AVATARS */}
              <div className="flex -space-x-3 sm:-space-x-4">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="user"
                    className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full border-2 border-white object-cover shadow-md"
                  />
                ))}
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-primary">
                    10K+
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-primary">
                    24/7
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Support
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-primary">
                    99%
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Success Rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="relative w-full flex justify-center lg:justify-end">

            <div className="absolute h-40 w-40 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-full bg-primary/20 blur-3xl"></div>

            <img
              src={heroImage}
              alt="Home Appliance Repair"
              className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl object-cover shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;