import { FaCalendarAlt, FaLongArrowAltRight } from "react-icons/fa";
import { ourServiceLink } from "../../Constants/ourServiceLink";

const OurService = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-12 space-y-16 mt-20 lg:mt-30">
      
      {/* Header */}
      <div className="flex flex-col text-center space-y-2">
        <h4 className="font-semibold text-sm text-primary">OUR SERVICES</h4>
        <h2 className="font-bold text-2xl sm:text-3xl">
          Appliance Repair & Maintenance
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          We repair and maintain all major home appliances
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {ourServiceLink.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all duration-200"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />

            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {service.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {service.description}
            </p>

            <a
              href={service.bookingUrl}
              className="mt-auto text-blue-600 font-semibold hover:underline"
            >
              Book Now →
            </a>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-primary rounded-lg p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex items-start sm:items-center gap-4 text-center lg:text-left">
          <div className="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0">
            <FaCalendarAlt className="text-primary text-lg" />
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white">
              Need Regular Maintenance?
            </h2>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">
              Available Annual Maintenance Plans and get priority service,
              discounts, and extended warranty.
            </p>
          </div>
        </div>

        {/* Right button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <button className="flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer hover:scale-105">
            Explore Plans
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurService;