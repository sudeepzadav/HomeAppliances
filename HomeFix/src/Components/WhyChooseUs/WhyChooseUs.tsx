import { HiUsers } from "react-icons/hi";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { RiServiceFill } from "react-icons/ri";
import { WhyChooseUsImg } from "../../Constants/image";

const WhyChooseUs = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-10">
      {/* Top */}
      <div className="text-center mb-10">
        <p className="text-sm text-primary">WHY CHOOSE US</p>
        <h2 className="text-2xl sm:text-3xl font-bold">
          We Provide Reliable & Quality Service
        </h2>
      </div>

      {/* Middle */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        
        {/* Left content */}
        <div className="grid grid-cols-2 lg:flex flex-col lg:col-span-2 space-y-4 order-2 lg:order-1">
          
          <div className="flex gap-4 items-start hover:bg-gray-300 rounded-lg p-3 cursor-pointer group">
            <div className="bg-gray-300 p-3 rounded-full group-hover:bg-white">
              <HiUsers className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                Trained & Verified Technicians
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Our professionals are background verified and tightly trained.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:bg-gray-300 rounded-lg p-3 cursor-pointer group">
            <div className="bg-gray-300 p-3 rounded-full group-hover:bg-white">
              <HiUsers className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">On-Time Service</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                We value your time and ensure on-time service every time.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:bg-gray-300 rounded-lg p-3 cursor-pointer group">
            <div className="bg-gray-300 p-3 rounded-full group-hover:bg-white">
              <MdOutlineHomeRepairService className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Warranty on Service</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                We provide warranty on our service and spare parts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:bg-gray-300 rounded-lg p-3 cursor-pointer group">
            <div className="bg-gray-300 p-3 rounded-full group-hover:bg-white">
              <RiServiceFill className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Customer Satisfaction</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Our top priority is customer satisfaction and trust.
              </p>
            </div>
          </div>

        </div>

        {/* Right image */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end order-1 lg:order-2 relative">
          <img
            src={WhyChooseUsImg}
            alt="Why Choose Us"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl object-cover"
          />

          <div className="absolute bg-primary text-white sm:left-15 sm:bottom-5 lg:left-60 lg:bottom-4 border-0 rounded-xl p-3">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">15+</h2>
              <p>Years of <br />Certified</p>
            </div>
            <div className="text-sm">(Experience)</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;