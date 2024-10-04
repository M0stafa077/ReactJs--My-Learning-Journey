import { useState } from "react";
import { Button } from "./App";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    const [billValue, setBillValue] = useState("");
    const [userExpense, setUserExpense] = useState("");
    const friendExpense = billValue - userExpense;
    function handleSubmit(e) {
        e.preventDefault();
        if (whoIsPaying === "user") onSplitBill(friendExpense);
        else if (whoIsPaying === "friend") onSplitBill(billValue * -1);
        setBillValue("");
        setUserExpense("");
        setWhoIsPaying("user");
    }
    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>
            <label>Bill Value</label>
            <input
                type="text"
                value={billValue}
                onChange={(e) => setBillValue(Number(e.target.value))}
            />
            <label>Your expense</label>
            <input
                type="text"
                value={userExpense}
                onChange={(e) => {
                    if (Number(e.target.value) > billValue)
                        e.target.value = userExpense;
                    setUserExpense(Number(e.target.value));
                }}
            />
            <label>{selectedFriend.name}'s expense</label>
            <input type="text" disabled value={friendExpense} />
            <label>Who is paying the bill ?</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">Friend</option>
            </select>
            <Button>Split bill</Button>
        </form>
    );
}
