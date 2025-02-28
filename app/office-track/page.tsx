'use client';

import { useState, useEffect, Suspense } from 'react';
import { FaCoffee, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { BiCoffeeTogo } from "react-icons/bi";
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from "../components/ProgressBar";
import { useOrder } from '../context/OrderContext';

function ReviewContent() {
  const {
    fullName,
    email,
    phone,
    additionalInfo,
    wantsSample,
    setFullName,
    setEmail,
    setPhone,
    setAdditionalInfo,
    setWantsSample,
    selected,
    selectedCoffee,
    companyName
  } = useOrder();

  const [formData, setFormData] = useState({
    fullName: fullName,
    email: email,
    phone: phone,
    additionalInfo: additionalInfo,
    wantsSample: wantsSample
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selections = [
    {
      icon: FaCoffee,
      label: 'CAFE',
      value: 'cafe'
    },
    {
      icon: FaMapMarkerAlt,
      label: selected || 'Select Region', // Default value if not selected
      value: ''
    },
    {
      icon: BiCoffeeTogo,
      label: selectedCoffee ? [selectedCoffee] : ['Select Coffee'], // Default value
      value: ''
    }
  ];

  const router = useRouter();
  const handleNext = () => {
    router.push("/office-confirm");
  };

  // Update context when formData changes
  useEffect(() => {
    setFullName(formData.fullName);
    setEmail(formData.email);
    setPhone(formData.phone);
    setAdditionalInfo(formData.additionalInfo);
    setWantsSample(formData.wantsSample);
  }, [formData, setFullName, setEmail, setPhone, setAdditionalInfo, setWantsSample]);

  const searchParams = useSearchParams();
  const selectedOptions = searchParams.get("selected")?.split(",") || [];
  const feedback = searchParams.get("feedback") || "";

  return (
    <div>
      <ProgressBar step={5} />
      <div className="container-fluid px-4 sm:px-6 md:px-8">

        {/* Header Section */}
        <div className="py-4 sm:py-6">
          <div className="mx-1 flex items-center justify-between">
            <div className="px-0 text-center flex-1">
              <h2 className="font-['Noe_Display'] text-[22px] sm:text-[26px] leading-[32px] sm:leading-[40px] text-[#4F9CA9] font-bold m-0">
                {companyName}
              </h2>
            </div>
            <div className="w-[24px]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto my-4 sm:my-8 px-2 sm:px-0">
          {/* Selected Items Review */}
          {selections.map((item, index) => (
            <div key={index} className="w-full max-w-lg mx-auto my-3 sm:my-4">
              <div className="flex items-center bg-[#F5F5F5] min-h-[50px] mx-1 py-3 px-2 rounded">
                <div className="w-12 sm:w-16 text-center">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-[#1D4045]" />
                </div>
                <div className="flex-1 overflow-hidden">
                  {Array.isArray(item.label) ? (
                    item.label.map((text, i) => (
                      <div key={i} className="font-['Apercu-Medium'] text-[16px] sm:text-[18px] leading-[21px] text-black font-bold truncate">
                        {text}
                      </div>
                    ))
                  ) : (
                    <span className="font-['Apercu-Medium'] text-[16px] sm:text-[18px] leading-[21px] text-black font-bold truncate">
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Your Details Section */}
          <div className="max-w-lg mx-auto mb-8 sm:mb-12 mt-12 sm:mt-16 px-2 sm:px-0 flex flex-col items-center">
            <h3 className="text-center font-['Apercu'] text-[22px] sm:text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-8 sm:mb-12 pb-2 border-b border-[#1D4045]">
              Your Details
            </h3>

            <form className="w-full">
              <div className="mb-6 sm:mb-8 text-center">
                <label className="block uppercase text-[#3F8A93] mb-3 sm:mb-4 font-bold text-[14px] sm:text-[16px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full text-center py-2 sm:py-3 px-3 sm:px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[15px] sm:text-[16px] text-black"
                  placeholder="Enter your name..."
                />
              </div>

              <div className="mb-6 sm:mb-8 text-center">
                <label className="block uppercase text-[#3F8A93] mb-3 sm:mb-4 font-bold text-[14px] sm:text-[16px]">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-center py-2 sm:py-3 px-3 sm:px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[15px] sm:text-[16px] text-black"
                  placeholder="Enter your email..."
                />
              </div>

              <div className="mb-6 sm:mb-8 text-center">
                <label className="block uppercase text-[#3F8A93] mb-3 sm:mb-4 font-bold text-[14px] sm:text-[16px]">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-center py-2 sm:py-3 px-3 sm:px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[15px] sm:text-[16px] text-black"
                  placeholder="Enter your phone..."
                />
              </div>
            </form>
          </div>

          <div className="max-w-lg mx-auto mb-8 sm:mb-12 mt-12 sm:mt-16 px-2 sm:px-0 text-center">
            <h3 className="text-center font-['Apercu'] text-[22px] sm:text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-8 sm:mb-12 pb-2 border-b border-[#1D4045] inline-block">
              Your Needs
            </h3>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-6">
              {selectedOptions.map((option) => (
                <div key={option} className="w-full sm:w-[calc(50%-1rem)] bg-[#1D4045] rounded py-3 sm:py-4 px-4 sm:px-6 border border-white">
                  <p className="font-['Apercu'] text-[16px] sm:text-[18px] leading-[21px] text-white mb-0 flex items-center justify-center">
                    <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    {option.replace("-", " ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="max-w-lg mx-auto mb-8 sm:mb-12 mt-12 sm:mt-16 px-2 sm:px-0 flex flex-col items-center">
            <h3 className="text-center font-['Apercu'] text-[22px] sm:text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-8 sm:mb-12 pb-2 border-b border-[#1D4045]">
              Additional Info
            </h3>

            <div className="w-full p-3 sm:p-4 border border-[#1D4045] rounded font-['Apercu'] text-[15px] sm:text-[16px] text-black min-h-[150px] sm:min-h-[200px] bg-gray-100">
              {feedback ? feedback : "No additional information provided."}
            </div>
          </div>

          {/* Free Sample Checkbox */}
          <div className="max-w-lg mx-auto my-6 sm:my-8 px-2 sm:px-0">
            <div className="w-full sm:w-4/5 mx-auto text-center p-1 bg-[#1D4045] rounded">
              <label className="flex items-center justify-center text-white cursor-pointer py-2 sm:py-3 px-2 sm:px-0">
                <input
                  type="checkbox"
                  checked={formData.wantsSample}
                  onChange={(e) => setFormData({ ...formData, wantsSample: e.target.checked })}
                  className="mr-2 sm:mr-3 h-4 w-4"
                />
                <span className="uppercase font-bold font-['Apercu-Medium'] text-[14px] sm:text-[16px]">
                  I would like a free coffee sample
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <button
            onClick={handleNext}
            className="w-full sm:w-[300px] h-[45px] sm:h-[50px] bg-yellow-500 text-black uppercase font-['Apercu-Medium'] text-[15px] sm:text-[16px] rounded hover:bg-yellow-600 transition-colors max-w-[320px]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewContent />
    </Suspense>
  );
}