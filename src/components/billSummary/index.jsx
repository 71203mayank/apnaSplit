// import {useBill} from "@/BillContext"

// const BillSummary = () => {
//     const { state } = useBill();
  
//     return (
//       <div className="p-2 border-t h-[100%]">
//         <div className="flex justify-center text-lg gap-2">Final Split</div>
//         <div className="h-[90%] overflow-y-auto">
//             {Object.entries(state.memberCosts).map(([member, cost]) => (
//             <div key={member} className="flex justify-between p-1">
//                 <span>{member}</span>
//                 <span>₹{cost.toFixed(2)}</span>
//             </div>
//             ))}
//         </div>
//         <div className="flex justify-center">

//             <button
//             onClick={() => window.print()}
//             className="bg-green-500 text-white px-4 py-2 mt-2 mb-2 rounded"
//             >
//             Print Bill
//             </button>
//         </div>
//       </div>
//     );
//   };
  
//   export default BillSummary;

// import { useRef } from "react";
// import { useBill } from "@/BillContext";

// const BillSummary = () => {
//   const { state } = useBill();
//   const billRef = useRef(null);

//   const handlePrint = () => {
//     const printContent = billRef.current.innerHTML;
//     const originalContent = document.body.innerHTML;

//     document.body.innerHTML = printContent; // Replace body content with only the bill
//     window.print();
//     document.body.innerHTML = originalContent; // Restore original content after printing
//     window.location.reload(); // Refresh the page to fix UI issues
//   };

//   return (
//     <div ref={billRef} className="p-2 border-t h-[100%]">
//       <div className="flex justify-center text-lg gap-2">Final Split</div>
//       <div className="h-[90%] overflow-y-auto">
//         {Object.entries(state.memberCosts).map(([member, cost]) => (
//           <div key={member} className="flex justify-between p-1">
//             <span>{member}</span>
//             <span>₹{cost.toFixed(2)}</span>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={handlePrint}
//           className="bg-green-500 text-white px-4 py-2 mt-2 mb-2 rounded"
//         >
//           Print Bill
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BillSummary;

import { useBill } from "@/BillContext";

const BillSummary = () => {
  const { state } = useBill();

  const handlePrint = () => {
    window.print();
  };

  const handleReload = () => {
    window.location.reload();
  }

  return (
    <div className="p-2 h-[100%]">
      <div className="flex justify-center text-lg gap-2">Final Split</div>

      {/* Print-Specific Section */}
      <div id="bill-print" className="h-[90%] overflow-y-auto p-4 border border-gray-300 bg-white rounded">
        {Object.entries(state.memberCosts).map(([member, cost]) => (
          <div key={member} className="flex justify-between p-1">
            <span>{member}</span>
            <span>₹{cost.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={handlePrint}
          className="bg-[#20BD9C] text-white px-4 py-2 mt-2 mb-2 rounded"
        >
          Print Split
        </button>
        <button
            onClick={handleReload}
            className="bg-blue-400 text-white px-4 py-2 mt-2 mb-2 rounded"
        >
            New Split
        </button>
      </div>
    </div>
  );
};

export default BillSummary;

