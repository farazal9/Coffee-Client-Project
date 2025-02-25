"use client";
import { useRouter } from "next/navigation";
import { FaBuilding } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "../components/ProgressBar";
import { useOrder } from "../context/OrderContext";

// Keep the audience data array
const audienceData = [
  { icon: <FaBuilding size={70} />, employees: 5 },
  { icon: <FaBuilding size={70} />, employees: 10 },
  { icon: <FaBuilding size={70} />, employees: 25 },
  { icon: <FaBuilding size={70} />, employees: 50 },
  { icon: <BsFillBuildingsFill size={70} />, employees: 150 },
  { icon: <BsFillBuildingsFill size={70} />, employees: "200+" },
];

export default function BusinessInfo() {
  const router = useRouter();
  const { companyName, setCompanyName, selectedEmployees, setSelectedEmployees } = useOrder();

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (companyName && selectedEmployees) {
      router.push(`/office-3?companyName=${encodeURIComponent(companyName)}`);
    }
  };

  return (

    <div>
      <ProgressBar step={2} />
      <div className="relative w-full min-h-screen font-sans flex flex-col items-center px-5 pb-6">
        {/* Back Button with improved styling */}
        <button
          onClick={() => router.push("/step-1")}
          className="absolute top-6 left-6 mt-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <span className="text-2xl text-gray-600">&larr;</span>
        </button>

        {/* Main heading with enhanced typography */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 mt-10 text-gray-800">
          Tell us about your business
        </h2>

        {/* Company name input with modern styling */}
        <div className="text-center w-full max-w-md mb-12">
          <h3 className="text-sm font-semibold text-gray-600 tracking-wider">
            COMPANY NAME
          </h3>
          <input
            type="text"
            placeholder="Enter your company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-3 w-full px-4 py-3 text-center text-lg border-b-2 border-gray-300 
                   focus:border-teal-600 transition-colors duration-200 outline-none
                   placeholder:text-gray-400"
          />
        </div>

        {/* Grid layout for employee selection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {audienceData.map((item, index) => (
            <div key={index} className="transform transition-all duration-200 hover:scale-105">
              <Card
                onClick={() => setSelectedEmployees(item.employees)}
                className={`cursor-pointer border-2 h-full ${selectedEmployees === item.employees
                    ? "border-teal-600 bg-teal-900 shadow-lg"
                    : "border-gray-200 hover:border-teal-600"
                  }`}
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className={`mb-4 transition-colors duration-200 ${selectedEmployees === item.employees ? "text-white" : "text-teal-900"
                    }`}>
                    {item.icon}
                  </div>
                  <p className={`text-sm font-semibold tracking-wider ${selectedEmployees === item.employees
                      ? "text-white"
                      : "text-teal-900"
                    }`}>
                    {item.employees} EMPLOYEES
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Next button with enhanced styling */}
        <button
          className={`mt-12 px-8 py-4 rounded-md font-semibold tracking-wider shadow-md
                   transform transition-all duration-200 ${companyName && selectedEmployees
              ? "bg-teal-700 text-white hover:bg-teal-800 hover:scale-105 active:scale-95"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          onClick={handleNext}
          disabled={!companyName || !selectedEmployees}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}