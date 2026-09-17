import { BsFillLightningChargeFill } from "react-icons/bs"
import { CiShoppingTag } from "react-icons/ci"
import { HiUsers } from "react-icons/hi"

const Hero2 = () => {
  return (
    <div className="px-4 sm:px-10 py-6 lg:absolute right-10 top-170 w-[95%]">
      <div className="bg-gray-200 rounded-2xl shadow-md p-4 sm:p-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="flex items-center p-4 gap-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl text-primary border rounded-lg p-3">
              <HiUsers />
            </div>
            <div>
              <h3 className="text-black font-semibold text-lg">Expert Technicians</h3>
              <p className="text-sm text-gray-600">Certified and experienced professionals</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center p-4 gap-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl text-primary border rounded-lg p-3">
              <BsFillLightningChargeFill />
            </div>
            <div>
              <h3 className="text-black font-semibold text-lg">Quick Response</h3>
              <p className="text-sm text-gray-600">We reach you within a few hours</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center p-4 gap-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl text-primary border rounded-lg p-3">
              <CiShoppingTag />
            </div>
            <div>
              <h3 className="text-black font-semibold text-lg">Best Pricing</h3>
              <p className="text-sm text-gray-600">Affordable and transparent rates</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center p-4 gap-3 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl text-primary border rounded-lg p-3">
              <HiUsers />
            </div>
            <div>
              <h3 className="text-black font-semibold text-lg">Trusted Service</h3>
              <p className="text-sm text-gray-600">Reliable and customer focused</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero2