"use client"

import BillSummary from "../components/billSummary/index.jsx";
import DiscountTaxes from "../components/discountTaxes";
import Dishes from "../components/dishes";
import Members from "../components/members";
import Split from "../components/split";
import { useState } from "react";

export default function Home() {
  const steps = [
    {id: 1, component: <Members/>},
    {id: 2, component: <Dishes/>},
    {id: 3, component: <Split/>},
    {id: 4, component: <DiscountTaxes/>},
    {id: 5, component: <BillSummary/>},
  ]

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-[100svh]">
      {/* Render the current step component */}
      <div className="w-full max-w-xl p-4 border border-gray-200 rounded-lg shadow-md h-[200px] flex-1">
        {steps[currentStep].component}
      </div>

      {/* Navigation buttons */}
      <div className="flex mt-5 justify-between w-full max-w-xl">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Step Indicator */}
      <p className="mt-2">Step {currentStep + 1} of {steps.length}</p>
    </div>
  );
}
