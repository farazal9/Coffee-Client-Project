'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MessageSent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">MESSAGE SENT</h1>
      
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center">
          <CheckCircle className="w-10 h-10 text-teal-600" />
        </div>
        <p className="mt-4 text-gray-700 text-sm md:text-base">
          Thanks for getting in touch. We’ll get back to you as soon as possible.
        </p>
      </div>

      <p className="mt-6 text-xs text-gray-500 uppercase">IN THE MEANTIME</p>
      
      <div className="mt-4 space-y-3 w-full max-w-xs">
        <Link href="/blog">
          <button className="w-full px-4 py-2 mb-4 text-white bg-teal-700 rounded-md hover:bg-teal-800">
            READ OUR BLOG
          </button>
        </Link>
        <Link href="/">
          <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            RETURN TO HOMEPAGE
          </button>
        </Link>
      </div>
    </div>
  );
}
