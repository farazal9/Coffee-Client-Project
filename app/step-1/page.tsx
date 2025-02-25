"use client";
import { useRouter } from "next/navigation";
import { FaBuilding, FaStore } from "react-icons/fa";
import { useOrder } from "../context/OrderContext";
import ProgressBar from "../components/ProgressBar";

export default function StepOne() {
  const router = useRouter();
  const { selected, setSelected } = useOrder();

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === 'OFFICE') {
      router.push('/step-2');
    } else if (selected === 'HOSPITALITY') {
      router.push('/hospital-step-2');
    }
  };

  return (
    <div className="relative w-full min-h-screen font-sans flex flex-col items-center pb-6">
      <ProgressBar step={1} />
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 cursor-pointer mt-10">
        <span className="text-lg">&larr;</span>
      </div>
      
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 mt-10">
        Let`s get started! Do you need coffee for...
      </h2>
      
      {/* Selection Boxes */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full mt-10">
        <div
          className={`border border-gray-300 p-20 flex flex-col items-center justify-center cursor-pointer ${selected === 'OFFICE' ? 'bg-teal-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleSelect('OFFICE')}
        >
          <FaBuilding size={70} className={selected === 'OFFICE' ? 'text-white' : 'text-teal-900'} />
          <h3 className="mt-4 font-semibold">OFFICE</h3>
        </div>
        <div
          className={`border border-gray-300 p-8 flex flex-col items-center justify-center cursor-pointer ${selected === 'HOSPITALITY' ? 'bg-teal-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleSelect('HOSPITALITY')}
        >
          <FaStore size={70} className={selected === 'HOSPITALITY' ? 'text-white' : 'text-teal-900'} />
          <h3 className="mt-4 font-semibold">HOSPITALITY BUSINESS</h3>
        </div>
      </div>
      
      {/* Alternative Option */}
      <div className="mt-6">
        <a href="#" className="text-sm text-gray-800 underline font-medium">Looking for something else ?</a>
      </div>
      
      {/* Next Button */}
      <button
        className={`mt-8 px-6 py-3 font-medium uppercase ${selected ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        onClick={handleNext}
        disabled={!selected}
      >
        NEXT
      </button>
    </div>
  );
}
