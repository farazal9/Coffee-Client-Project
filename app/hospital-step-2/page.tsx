'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import cafe from "../../public/cafe.svg"
import restaurant from "../../public/restaurant.svg"
import hotel from "../../public/hotel.svg"
import others from "../../public/other.svg"
import Image from 'next/image';
import ProgressBar from "../components/ProgressBar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const businessTypes = [
  { image: cafe, label: "Cafe" },
  { image: restaurant, label: "Restaurant" },
  { image: hotel, label: "Hotel" },
  { image: others, label: "Others" },
];

export default function BusinessInfo() {
  const [companyName, setCompanyName] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (companyName && selectedBusinessType) {
      router.push(`/hospital-step-3?companyName=${encodeURIComponent(companyName)}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen font-sans flex flex-col items-center pb-6">
         <ProgressBar step={1.5} />
      <div className="absolute top-6 left-6 cursor-pointer mt-10">
        <span className="text-lg">&larr;</span>
      </div>
      
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 mt-10">
        Tell us about your business
      </h2>
      
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-700">BUSINESS NAME</h3>
        <input
          type="text"
          placeholder="Enter your company name..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-2 border-b-2 border-gray-400 outline-none text-center w-full max-w-xs p-2"
        />
      </div>
      
      <Carousel className="w-full max-w-md mt-8">
        <CarouselContent className="flex gap-4">
          {businessTypes.map((item, index) => (
            <CarouselItem key={index} className="w-1/2 md:w-1/4">
              <div className="p-1">
                <Card onClick={() => setSelectedBusinessType(item.label)} className={`cursor-pointer ${selectedBusinessType === item.label ? 'bg-teal-900 text-white' : ''}`}>
                  <CardContent className="flex flex-col items-center justify-center p-4 md:p-8">
                    <Image src={item.image} alt={item.label} width={160} height={160} />
                    <p className={`text-sm mt-1 ${selectedBusinessType === item.label ? 'text-white' : 'text-teal-900'}`}>
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      <button 
        className={`mt-8 px-6 py-3 font-medium uppercase ${companyName && selectedBusinessType ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} 
        onClick={handleNext} 
        disabled={!companyName || !selectedBusinessType}
      >
        NEXT
      </button>
    </div>
  );
}