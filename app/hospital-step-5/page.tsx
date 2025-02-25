'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import ProgressBar from "../components/ProgressBar";
const options = [
  { id: 'coffee-training', label: 'COFFEE TRAINING' },
  { id: 'coffee-advice', label: 'COFFEE ADVICE' },
  { id: 'overall-guidance', label: 'OVERALL GUIDANCE' },
  { id: 'new-equipment', label: 'NEW EQUIPMENT' },
  { id: 'just-coffee', label: 'JUST COFFEE' },
]

export default function Page() {
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter();

  const toggleOption = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleNext = () => {
    router.push("/hospital-step-6")
  }


  return (
    <div>
      <ProgressBar step={3} />
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-teal-600">Faraz</span> Needs ...
        </h1>

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {options.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => toggleOption(id)}
              className={`w-full p-4 rounded-full border-2 transition-colors ${selected.includes(id)
                  ? 'bg-teal-900 text-white border-teal-900'
                  : 'bg-white text-gray-800 border-gray-300'
                }`}
            >
              {selected.includes(id) && '✓ '}{label}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full p-4 bg-teal-900 text-white mt-8 transition-opacity hover:opacity-90"
        >
          NEXT
        </button>
      </div>
    </div>
  )
}