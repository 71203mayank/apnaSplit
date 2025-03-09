import { useState, useContext } from "react";
import { BillContext, useBill } from "../../BillContext";

const DiscountTaxes = () => {
  const { state, dispatch } = useBill()
  const [discount, setDiscount] = useState(state.discount || 0);
  const [sgst, setSgst] = useState(state.sgst || 0);
  const [cgst, setCgst] = useState(state.cgst || 0);

  const applyDiscount = () => {
    dispatch({ type: "APPLY_DISCOUNT", payload: parseFloat(discount) });
    alert("Discount Applied!")
  };

  const applyTaxes = () => {
    dispatch({ type: "APPLY_TAXES", payload: { sgst: parseFloat(sgst), cgst: parseFloat(cgst) } });
    alert("Taxes Applied!")
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-center text-lg gap-2">Discount & Taxes</div>

      {/* Discount Input */}
      <div className="mb-3">
        <label className="block font-medium">Discount (₹):</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
        />
        <button onClick={applyDiscount} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Apply Discount
        </button>
      </div>

      {/* Taxes Input */}
      <div className="mb-3">
        <label className="block font-medium">SGST (₹):</label>
        <input
          type="number"
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">CGST (₹):</label>
        <input
          type="number"
          value={cgst}
          onChange={(e) => setCgst(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
        />
      </div>

      <button onClick={applyTaxes} className="bg-[#20BD9C] text-white px-4 py-2 rounded">
        Apply Taxes
      </button>
    </div>
  );
};

export default DiscountTaxes;
