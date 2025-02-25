"use client";

import { useState } from 'react';

export default function ContactForm() {
  // Form state management
  const [formData, setFormData] = useState({
    businessName: '',
    townCity: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          WE&apos;D LOVE TO SPEAK TO YOU ABOUT YOUR COFFEE NEEDS.
        </h1>
        <p className="text-gray-600">
          Whether it be a wholesale or retail opportunity Get in touch and let&apos;s grab a coffee.
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              BUSINESS NAME
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>

          {/* Town/City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              TOWN/CITY
            </label>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              FIRST NAME
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              LAST NAME
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            HOW CAN WE HELP YOU?
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none transition duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full md:w-80 bg-orange-400 text-white py-4 px-8 hover:bg-orange-500 transition duration-200"
          >
            GET IN TOUCH
          </button>
        </div>
      </form>
    </div>
  );
}