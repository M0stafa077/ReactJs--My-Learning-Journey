import { useState } from "react";

export default function Form({ onAddItem, onResetItems }) {
    const [newItemDescription, setNewItemDescription] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItemDescription) return;
        const newItem = {
            id: Date.now(),
            description: newItemDescription,
            quantity: newItemQuantity,
            packed: false,
        };
        console.log(newItem);
        onAddItem(newItem);
        setNewItemDescription("");
        setNewItemQuantity(1);
    };
    const handleReset = (e) => {
        e.preventDefault(); // Prevent Form submission
        setNewItemDescription("");
        setNewItemQuantity(1);
        onResetItems();
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip? </h3>
            <select
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={newItemDescription}
                onChange={(e) => {
                    setNewItemDescription(e.target.value);
                }}
            />
            <button>Add</button>
            <button onClick={handleReset}>Reset</button>
        </form>
    );
}
