import { useState } from "react";
import { useBill } from "../../BillContext";

const Split= () => {
  const { state, dispatch } = useBill();
  const [openDish, setOpenDish] = useState(null);

  const updatePortion = (dishId, member, change) => {
    const dish = state.dishes.find((d) => d.id === dishId);
    const currentPortion = dish.portions[member] || 0;
    const newPortion = Math.max(0, currentPortion + change);

    dispatch({ type: "UPDATE_PORTION", payload: { dishId, member, portion: newPortion } });
  };

  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="flex justify-center text-lg gap-2">Items</div>
      {state.dishes.map((dish) => (
        <div key={dish.id} className="border p-2 my-2 rounded">
          <div className="flex justify-between items-center rounded">
            <span className="font-semibold">{dish.name} - ₹{dish.price}</span>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => setOpenDish(openDish === dish.id ? null : dish.id)}
            >
              {openDish === dish.id ? "Hide" : "Split"}
            </button>
          </div>

          {openDish === dish.id && (
            <div className="mt-2 border-t pt-2">
              {state.members.map((member) => (
                <div key={member} className="flex justify-between py-1">
                  <span>{member}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-red-500 text-white h-8 w-8 flex justify-center items-center rounded"
                      onClick={() => updatePortion(dish.id, member, -1)}
                    >
                      -
                    </button>
                    <span>{dish.portions[member] || 0}</span>
                    <button
                      className="bg-[#20BD9C] text-white h-8 w-8 flex justify-center items-center rounded"
                      onClick={() => updatePortion(dish.id, member, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 w-full rounded"
                onClick={() => dispatch({ type: "EQUAL_SPLIT", payload: dish.id })}
              >
                Split Equally
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Split;
