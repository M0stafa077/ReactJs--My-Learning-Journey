export default function Stats({ items }) {
    if (!items.length) {
        return (
            <em className="stats">
                Start adding some items to your packing list 🚀
            </em>
        );
    }
    const itemsCount = items.length;
    const packedItemsCount = items.filter((item) => item.packed).length;
    const packedPrecentage = Math.round((packedItemsCount / itemsCount) * 100);
    return (
        <footer className="stats">
            <em>
                You have {itemsCount} items on your list. And you have already
                packed {packedItemsCount} item ({packedPrecentage}%)
            </em>
        </footer>
    );
}
