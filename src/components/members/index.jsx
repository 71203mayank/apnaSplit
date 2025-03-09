import {useState} from "react"
import {useBill} from "@/BillContext"

const Members = () => {
    const {state, dispatch} = useBill();
    const [name, setName] = useState("");

    const addMember = () => {
        if(name.trim() !== ""){
            dispatch({type: "ADD_MEMBER", payload : name});
            setName("");
        }
    }

    return (
        <div>
            <div className="flex justify-center text-lg gap-2">Add Friends</div>
            <div className=" flex gap-2">
                <input 
                    type = "text"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-400 pt-lg px-4 py-2 rounded flex-1"
                    
                />
                <button onClick={addMember} className="bg-[#20BD9C] pt-lg px-4 py-2 text-white rounded">
                    Add
                </button>
            </div>
            <div className="flex gap-1 py-2 flex-wrap">
                {state.members.map((member, index) => (
                    <div key = {index} className="py-1 px-3 bg-gray-200 rounded"> {member}</div>
                ))}
            </div>
        </div>
    )
}

export default Members;