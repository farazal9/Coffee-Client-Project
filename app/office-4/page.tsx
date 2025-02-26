'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import ProgressBar from "../components/ProgressBar";
import { useOrder } from '../context/OrderContext';

function CoffeeSelectionComponent() {
  // State management
  const { companyName, setCompanyName, selectedCoffee, setSelectedCoffee } = useOrder();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedCoffee ? selectedCoffee.split(',') : []);
  const router = useRouter();
  const searchParams = useSearchParams();

  const coffeeOptions = [
    'TRADITIONAL ESPRESSO MACHINE',
    'THROUGH A BEAN TO CUP MACHINE',
    'FILTER COFFEE SERVES',
    'PODS'
  ];

  // Get company name from URL params if available
  useEffect(() => {
    const companyNameFromParams = searchParams.get('companyName');
    if (companyNameFromParams) {
      setCompanyName(companyNameFromParams);
    }
  }, [searchParams, setCompanyName]);

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prev => {
      // If already selected, remove it; otherwise add it
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleNext = () => {
    if (companyName && selectedOptions.length > 0) {
      setSelectedCoffee(selectedOptions.join(','));
      const params = new URLSearchParams();
      params.append('companyName', companyName);
      selectedOptions.forEach(option => params.append('option', option));
      router.push(`/office-5?${params.toString()}`);
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);

  return (
    <div>
      <ProgressBar step={2.5} />
      <div className="min-h-screen p-8 flex flex-col items-center justify-center max-w-6xl mx-auto">
        <Head>
          <title>Coffee Selection</title>
          <meta name="description" content="Select how you want your coffee served" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="absolute top-6 left-6 cursor-pointer mt-10">
          <span className="text-lg">&larr;</span>
        </div>

        <main className="py-16 flex flex-col items-center justify-center w-full">
          <h1 className="mb-12 text-4xl font-bold text-center text-[#1b353b]">
            How do you serve your coffee at <span className="text-[#4b9eab]">{companyName || 'Your Business'}</span> ?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
            {coffeeOptions.map((option) => (
              <div
                key={option}
                className={`p-10 border rounded flex justify-center items-center cursor-pointer transition-all h-40 text-center ${isOptionSelected(option)
                    ? 'bg-[#1b353b] text-white border-[#1b353b]'
                    : 'border-gray-200 hover:border-[#4b9eab] bg-[#F0F5F4]'
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                <h2 className={`text-xl font-medium ${isOptionSelected(option) ? 'text-white' : 'text-[#1b353b]'}`}>
                  {option}
                </h2>
              </div>
            ))}
          </div>

          <div className="mt-12 w-full flex justify-center">
            <button
              className={`py-4 px-12 text-xl font-medium cursor-pointer transition-all uppercase ${companyName && selectedOptions.length > 0
                  ? 'bg-[#1b353b] text-white hover:bg-[#162b30]'
                  : 'bg-[#F0F5F4] text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleNext}
              disabled={!companyName || selectedOptions.length === 0}
            >
              NEXT
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CoffeeSelection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoffeeSelectionComponent />
    </Suspense>
  );
}