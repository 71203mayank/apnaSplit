"use client"
import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
    members: [],
    dishes: [],
    tax: { sgst: 0, cgst: 0 },
    discount: 0,
    memberCosts: {}, // Tracks how much each member owes
};

// Reducer function
const billReducer = (state, action) => {
    switch (action.type) {
        case "ADD_MEMBER":
            return {
                ...state,
                members: [...state.members, action.payload],
                memberCosts: { ...state.memberCosts, [action.payload]: 0 }, // Initialize cost
            };

        case "ADD_DISH":
            return {
                ...state,
                dishes: [...state.dishes, { ...action.payload, portions: {} }],
            };

        case "UPDATE_PORTION": {
            const { dishId, member, portion } = action.payload;

            // Update the portions of the dish
            const updatedDishes = state.dishes.map((dish) => {
                if (dish.id === dishId) {
                    return {
                        ...dish,
                        portions: { ...dish.portions, [member]: portion },
                    };
                }
                return dish;
            });

            // Recalculate the member costs
            const newMemberCosts = Object.fromEntries(state.members.map((m) => [m, 0])); // Reset member costs

            updatedDishes.forEach((dish) => {
                const totalPortions = Object.values(dish.portions).reduce((a, b) => a + b, 0);

                if (totalPortions > 0) {
                    Object.entries(dish.portions).forEach(([member, portion]) => {
                        newMemberCosts[member] += (portion / totalPortions) * dish.price;
                    });
                }
            });

            return { ...state, dishes: updatedDishes, memberCosts: newMemberCosts };
        }


        case "EQUAL_SPLIT": {
            const dishId = action.payload;
            const dish = state.dishes.find((d) => d.id === dishId);

            if (!dish) return state;

            const equalPortion = 1; // Assign each member 1 portion
            const newPortions = Object.fromEntries(state.members.map((m) => [m, equalPortion]));

            // Recalculate costs
            const totalMembers = state.members.length;
            const newMemberCosts = { ...state.memberCosts };

            state.members.forEach((member) => {
                newMemberCosts[member] += dish.price / totalMembers;
            });

            return {
                ...state,
                dishes: state.dishes.map((d) => (d.id === dishId ? { ...d, portions: newPortions } : d)),
                memberCosts: newMemberCosts,
            };
        }
        case "APPLY_DISCOUNT": {
            const discount = action.payload;
            const totalMembers = state.members.length;
            if (totalMembers === 0) return state;

            // Equally distribute the discount
            const discountPerMember = discount / totalMembers;
            const newMemberCosts = { ...state.memberCosts };

            state.members.forEach((member) => {
                newMemberCosts[member] -= discountPerMember;
            });

            return { ...state, discount, memberCosts: newMemberCosts };
        }

        case "APPLY_TAXES": {
            const { sgst, cgst } = action.payload;
            const totalTax = sgst + cgst;
            const totalMembers = state.members.length;
            if (totalMembers === 0) return state;

            // Equally distribute tax among members
            const taxPerMember = totalTax / totalMembers;
            const newMemberCosts = { ...state.memberCosts };

            state.members.forEach((member) => {
                newMemberCosts[member] += taxPerMember;
            });

            return { ...state, sgst, cgst, memberCosts: newMemberCosts };
        }


        default:
            return state;
    }
};

const BillContext = createContext();

export const BillProvider = ({ children }) => {
    const [state, dispatch] = useReducer(billReducer, initialState);

    return (
        <BillContext.Provider value={{ state, dispatch }}>
            {children}
        </BillContext.Provider>
    );
};

export const useBill = () => useContext(BillContext);
