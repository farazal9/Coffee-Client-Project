'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProgressBar from "../components/ProgressBar";

function Office3Component() {
  // State management
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get company name from URL params
  useEffect(() => {
    const companyNameFromParams = searchParams.get('companyName');
    if (companyNameFromParams) {
      setCompanyName(companyNameFromParams);
    }
  }, [searchParams]);

  // Validate region input
  const validateRegion = (value: string) => {
    if (!value.trim()) {
      return 'Region is required';
    }
    if (value.length < 2) {
      return 'Region must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s-]+$/.test(value)) {
      return 'Region should only contain letters, spaces, and hyphens';
    }
    return '';
  };

  // Handle input change with debouncing
  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegion(value);
    setTouched(true);
    
    // Clear previous error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Handle next button click with loading state and validation
  const handleNext = async () => {
    setTouched(true);
    const validationError = validateRegion(region);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Simulate API call or data processing
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store region in localStorage for persistence
      localStorage.setItem('selectedRegion', region);

      // Navigate to next page with smooth transition
      router.push('../office-4');
    } catch (err) {
      console.error("Error in handleNext:", err); 
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-6">
        <ProgressBar step={2} />
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 mt-10">
        Where is <span className="text-teal-600">{companyName}</span> located?
      </h2>
      
      <div className="w-full max-w-md px-4 mt-10">
        <div className="mb-6">
          <p className="text-teal-600 text-sm uppercase mb-2 mt-5">REGION</p>
          <div className="relative">
            <input
              type="text"
              value={region}
              onChange={handleRegionChange}
              onKeyPress={handleKeyPress}
              onBlur={() => setTouched(true)}
              placeholder="Enter region name"
              className={`w-full p-2 border-b ${
                error && touched ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-teal-600 transition-colors`}
              disabled={isLoading}
            />
            {region && !error && (
              <span className="absolute right-2 top-2 text-green-500 transition-opacity">✓</span>
            )}
          </div>
          {error && touched && (
            <p className="text-red-500 text-sm mt-1 transition-opacity">{error}</p>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={isLoading}
          className={`w-full mt-10 bg-teal-800 text-white py-3 px-4 rounded 
            hover:bg-teal-900 transition-all transform hover:scale-[1.02] 
            active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
            ${isLoading ? 'opacity-75' : ''}`}
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'NEXT'}
        </button>
      </div>
    </div>
  );
}

export default function Office3() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Office3Component />
    </Suspense>
  );
}