'use client';

import { useState, useEffect } from 'react';
import { FaCoffee, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { BiCoffeeTogo } from "react-icons/bi";
import { useRouter,useSearchParams  } from 'next/navigation';
import ProgressBar from "../components/ProgressBar";
import { useOrder } from '../context/OrderContext';

export default function ReviewPage() {
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
    setFullName(formData.fullName); // Set fullName in context
    setEmail(formData.email); // Set email in context
    setPhone(formData.phone); // Set phone in context
    setAdditionalInfo(formData.additionalInfo); // Set additionalInfo in context
    setWantsSample(formData.wantsSample); // Set wantsSample in context
  }, [formData, setFullName, setEmail, setPhone, setAdditionalInfo, setWantsSample]);

  const searchParams = useSearchParams();
  const selectedOptions = searchParams.get("selected")?.split(",") || [];

  const feedback = searchParams.get("feedback") || "";
  return (
    <div className="container-fluid px-0">
      <ProgressBar step={5} />
      {/* Header Section */}
      <div className="py-6">
        <div className="mx-1 flex items-center justify-between">
          <div className="px-0 text-center flex-1">
            <h2 className="font-['Noe_Display'] text-[26px] leading-[40px] text-[#4F9CA9] font-bold m-0">
       { companyName}
            </h2>
          </div>
          <div className="w-[24px]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto my-8">
        {/* Selected Items Review */}
        {selections.map((item, index) => (
          <div key={index} className="w-full max-w-lg mx-auto my-4">
            <div className="flex items-center bg-[#F5F5F5] min-h-[50px] mx-1 py-3">
              <div className="w-16 text-center">
                <item.icon className="w-6 h-6 mx-auto text-[#1D4045]" />
              </div>
              <div className="flex-1">
                {Array.isArray(item.label) ? (
                  item.label.map((text, i) => (
                    <div key={i} className="font-['Apercu-Medium'] text-[18px] leading-[21px] text-black font-bold">
                      {text}
                    </div>
                  ))
                ) : (
                  <span className="font-['Apercu-Medium'] text-[18px] leading-[21px] text-black font-bold">
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Your Details Section */}
        <div className="max-w-lg mx-auto mb-12 mt-16 px-0 flex flex-col items-center">
          <h3 className="text-center font-['Apercu'] text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-12 pb-2 border-b border-[#1D4045]">
            Your Details
          </h3>

          <form className="w-full">
            <div className="mb-8 text-center">
              <label className="block uppercase text-[#3F8A93] mb-4 font-bold text-[16px]">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full text-center py-3 px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[16px] text-black"
                placeholder="Enter your name..."
              />
            </div>

            <div className="mb-8 text-center">
              <label className="block uppercase text-[#3F8A93] mb-4 font-bold text-[16px]">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-center py-3 px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[16px] text-black"
                placeholder="Enter your email..."
              />
            </div>

            <div className="mb-8 text-center">
              <label className="block uppercase text-[#3F8A93] mb-4 font-bold text-[16px]">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full text-center py-3 px-4 border-b border-[#1D4045] focus:outline-none font-['Apercu'] text-[16px] text-black"
                placeholder="Enter your phone..."
              />
            </div>
          </form>
        </div>
        <div className="max-w-lg mx-auto mb-12 mt-16 px-0 text-center">
      <h3 className="text-center font-['Apercu'] text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-12 pb-2 border-b border-[#1D4045] inline-block">
        Your Needs
      </h3>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {selectedOptions.map((option) => (
          <div key={option} className="w-full md:w-[calc(50%-1rem)] bg-[#1D4045] rounded py-4 px-6 border border-white">
            <p className="font-['Apercu'] text-[18px] leading-[21px] text-white mb-0 flex items-center justify-center">
              <FaCheck className="w-5 h-5 mr-3" />
              {option.replace("-", " ")} 
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Feedback Section */}
    <div className="max-w-lg mx-auto mb-12 mt-16 px-0 flex flex-col items-center">
      <h3 className="text-center font-['Apercu'] text-[26px] leading-[21px] text-[#1D4045] font-[900] mb-12 pb-2 border-b border-[#1D4045]">
        Additional Info
      </h3>

      <div className="w-full p-4 border border-[#1D4045] rounded font-['Apercu'] text-[16px] text-black min-h-[200px] bg-gray-100">
        {feedback ? feedback : "No additional information provided."}
      </div>
    </div>

        {/* Free Sample Checkbox */}
        <div className="max-w-lg mx-auto my-8">
          <div className="w-4/5 mx-auto text-center p-1 bg-[#1D4045] rounded">
            <label className="flex items-center justify-center text-white cursor-pointer py-3">
              <input
                type="checkbox"
                checked={formData.wantsSample}
                onChange={(e) => setFormData({ ...formData, wantsSample: e.target.checked })}
                className="mr-3"
              />
              <span className="uppercase font-bold font-['Apercu-Medium']">
                I would like a free coffee sample
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mb-12">
        <button onClick={handleNext} className="w-[300px] h-[50px] bg-yellow-500 text-black uppercase font-['Apercu-Medium'] text-[16px] rounded hover:bg-yellow-600 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
}