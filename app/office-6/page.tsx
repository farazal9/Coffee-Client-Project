'use client'
import { useState, useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation';
import ProgressBar from "../components/ProgressBar";
import { useOrder } from "../context/OrderContext";

interface FormData {
  fullName: string
  email: string
  phone: string
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
const selected = searchParams.get("selected");
  const { fullName, email, phone, setFullName, setEmail, setPhone } = useOrder();
  
  // Initialize form state with context values
  const [formData, setFormData] = useState<FormData>({
    fullName: fullName,
    email: email,
    phone: phone
  })

  // Track validation status
  const [isValid, setIsValid] = useState({
    fullName: false,
    email: false,
    phone: false
  })

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const value = e.target.value

    // Update form data
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Validate fields
    setIsValid(prev => ({
      ...prev,
      [field]: field === 'email' 
        ? validateEmail(value)
        : field === 'phone' 
          ? value.length >= 10
          : value.length >= 2
    }))
  }

  // Update context when formData changes
  useEffect(() => {
    setFullName(formData.fullName); // Set fullName in context
    setEmail(formData.email); // Set email in context
    setPhone(formData.phone); // Set phone in context
  }, [formData, setFullName, setEmail, setPhone]);

  const handleNext = () => {
    router.push(`/office-7?selected=${selected}`);
  };

  return (
   <div>
     <ProgressBar step={3.5} />
     <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-[#1D4045]">
        Can we get your details?
      </h1>

      <div className="space-y-6">
        {/* Full Name Input */}
        <div className="space-y-2">
          <label className="block text-[#1D4045] font-medium">
            FULL NAME <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange(e, 'fullName')}
              className="w-full p-3 border-b-2 border-gray-300 focus:border-[#1D4045] outline-none transition-colors"
              placeholder="Enter your full name"
            />
            {isValid.fullName && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D4045]">✓</span>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-[#1D4045] font-medium">
            EMAIL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              className="w-full p-3 border-b-2 border-gray-300 focus:border-[#1D4045] outline-none transition-colors"
              placeholder="Enter your email"
            />
            {isValid.email && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D4045]">✓</span>
            )}
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label className="block text-[#1D4045] font-medium">
            PHONE
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange(e, 'phone')}
            className="w-full p-3 border-b-2 border-gray-300 focus:border-[#1D4045] outline-none transition-colors bg-blue-50"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Next Button */}
      <button 
      onClick={handleNext}
        className={`w-full p-4 mt-8 text-white transition-colors ${
          isValid.fullName && isValid.email
            ? 'bg-[#1D4045] hover:opacity-90'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!isValid.fullName || !isValid.email}
      >
        NEXT
      </button>
    </div>
   </div>
  )
}