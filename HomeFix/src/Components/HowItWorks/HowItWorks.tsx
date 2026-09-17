import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { LuShieldCheck } from "react-icons/lu";
import { TbSettingsStar } from "react-icons/tb";

const HowItWorks = () => {
  return (
    <div>
      {/* top */}
      <div className="text-center mt-30">
        <p className="text-base text-primary">HOW IT WORKS</p>
        <h2 className="text-3xl font-bold">Simple Steps to Book Our Service</h2>
      </div>


      <div className="border border-gray-300 m-5 rounded-lg grid grid-cols-4 relative mt-20">

        {/* cards */}
        <div className="col-span-1 mt-10 mb-5 border-r border-gray-300">
          <div className="text-center">
            <h2 className="text-xl font-bold">
              Step 1 <br /> Book a Service
            </h2>
            <p>
              Schedule your service <br />
              online or call us.
            </p>
          </div>
          <div className="bg-primary text-white text-lg border-0 rounded-full h-12 w-12 flex items-center justify-center absolute -top-5 left-20 lg:left-40">
            <FaCalendarAlt />
          </div>
        </div>

        <div className="col-span-1 mt-10 mb-5 border-r border-gray-300">
          <div className="text-center">
            <h2 className="text-xl font-bold">
              Step 2 <br /> We Confirm
            </h2>
            <p>
              Our team will confirm your <br />
              booking.
            </p>
          </div>
          <div className="bg-primary text-white text-lg border-0 rounded-full h-12 w-12 flex items-center justify-center absolute -top-5 left-65 lg:left-132">
            <HiOutlineStatusOnline />
          </div>
        </div>

        <div className="col-span-1 mt-10 mb-5 border-r border-gray-300">
          <div className="text-center">
            <h2 className="text-xl font-bold">
              Step 3 <br /> WeFix the Issue
            </h2>
            <p>
              Our expert Technician will <br />
              fix tthe issue.
            </p>
          </div>
          <div className="bg-primary text-white text-lg border-0 rounded-full h-12 w-12 flex items-center justify-center absolute -top-5 right-65 lg:left-225">
            <TbSettingsStar />
          </div>
        </div>

        <div className="col-span-1 mt-10 mb-5">
          <div className="text-center">
            <h2 className="text-xl font-bold">
              Step 4 <br /> You Relax
            </h2>
            <p>
              Enjoy hassle-free working <br />
              appliances.
            </p>
          </div>
          <div className="bg-primary text-white text-lg border-0 rounded-full h-12 w-12 flex items-center justify-center absolute -top-5 right-18 lg:left-320">
          <LuShieldCheck />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
