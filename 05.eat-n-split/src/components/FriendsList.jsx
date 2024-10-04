import { Button } from "./App";

export function FriendsList({ friends, onSelect, selectedFriend }) {
    return (
        <div>
            <ul>
                {friends.map((friend) => (
                    <FriendCard
                        friend={friend}
                        onSelect={onSelect}
                        selectedFriend={selectedFriend}
                        key={friend.id}
                    />
                ))}
            </ul>
        </div>
    );
}
function FriendCard({ friend, onSelect, selectedFriend }) {
    const isSelected = friend.id === selectedFriend?.id;
    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}></img>
            <h3>{friend.name}</h3>
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} ows you {friend.balance}$
                </p>
            )}
            {friend.balance < 0 && (
                <p className="red">
                    You ows {friend.name} {Math.abs(friend.balance)}$
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button
                onClick={() => {
                    onSelect(friend);
                }}
            >
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}
