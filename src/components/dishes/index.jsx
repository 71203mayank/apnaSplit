import {useState} from "react";
import {useBill} from "@/BillContext";

const Dishes = () => {
    const {state, dispatch} = useBill();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const addDish = () => {
        if(name.trim() != "" && price) {
            dispatch({
                type: "ADD_DISH",
                payload: {id: Date.now(), name, price: parseFloat(price), portions: {} },
            });

            setName("");
            setPrice("");
        }
    }

    return (
        <div className="h-[100%]">
            <div className="flex justify-center text-lg gap-2">Add Items</div>
            <div className=" flex gap-2 flex-col">
                <div>
                    <input
                        type = "text"
                        placeholder="Name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        className="border border-gray-400 pt-lg px-4 py-2 rounded w-full"
                    />
                </div>
                <div className="flex gap-2">
                    <input
                        type = "number"
                        placeholder="Price"
                        value = {price}
                        onChange = {(e) => setPrice(e.target.value)}
                        className="border border-gray-400 pt-lg px-4 py-2 rounded flex-2"
                    />
                    <button onClick={addDish} className="bg-[#20BD9C] pt-lg px-4 py-2 text-white rounded">
                        Add
                    </button >
                </div>
            </div>
            <div className="h-110 mt-2 mb-2 flex flex-col gap-1 overflow-y-auto">
                {state.dishes.map((dish) => (
                    <div key = {dish.id} className="py-1 px-3 bg-gray-200 rounded flex justify-between">
                        <div> {dish.name}</div>
                        <div>₹{dish.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dishes;