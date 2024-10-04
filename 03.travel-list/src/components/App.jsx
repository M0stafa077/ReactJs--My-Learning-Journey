import useState from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState([]);
    function handleAddItem(newItem) {
        setItems(() => [...items, newItem]);
    }
    function handleResetItems() {
        setItems([]);
    }
    function handleDeleteItem(itemId) {
        setItems((items) => items.filter((item) => item.id !== itemId));
    }
    function handleToggleItemPacked(itemId) {
        setItems((items) =>
            items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
            )
        );
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} onResetItems={handleResetItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onItemTogglePacked={handleToggleItemPacked}
            />
            <Stats items={items} />
        </div>
    );
}
