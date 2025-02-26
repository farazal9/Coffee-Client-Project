'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from "../components/ProgressBar";

function FeedbackForm() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const router = useRouter();
  const [feedback, setFeedback] = useState('');

  const handleNext = () => {
    router.push(`/office-track?selected=${selected}&feedback=${encodeURIComponent(feedback)}`);
  };

  return (
    <div>
      <ProgressBar step={4} />
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-[#1D4045]">
          Anything else we should know?
        </h1>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full h-64 p-4 border-2 border-gray-200 rounded focus:border-[#1D4045] outline-none resize-none"
          placeholder="Tell us more..."
        />

        <button
          onClick={handleNext}
          className="w-full p-4 bg-[#1D4045] text-white hover:opacity-90 transition-opacity"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackForm />
    </Suspense>
  );
}