import { useState } from "react";
import Item from "./Item";

export default function PackingList({
    items,
    onDeleteItem,
    onItemTogglePacked,
}) {
    const [sortValue, setSortValue] = useState("input");
    let sortedItems;
    switch (sortValue) {
        case "input":
            sortedItems = items;
            break;
        case "desc":
            sortedItems = items
                .slice()
                .sort((a, b) => a.description.localeCompare(b.description));
            break;
        case "packed":
            sortedItems = items
                .slice()
                .sort((a, b) => Number(a.packed) - Number(b.packed));
            break;
        default:
            break;
    }
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onItemTogglePacked={onItemTogglePacked}
                        key={item.id}
                    />
                ))}
            </ul>
            <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
            >
                <option value="input">Sort by input</option>
                <option value="desc">Sort by description</option>
                <option value="packed">Sort by packed items</option>
            </select>
        </div>
    );
}
