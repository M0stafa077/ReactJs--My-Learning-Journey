import { useState } from "react";
import { FormSplitBill } from "./FormSplitBill";
import { AddNewFriend } from "./AddNewFriend";
import { FriendsList } from "./FriendsList";

const f = {
    id: 12345,
    name: "Mostafa Asaad",
    image: "Me.jpeg",
    balance: 0,
};

export default function App() {
    const [friends, setFriends] = useState([f]);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const handleAddingFriend = (e) => {
        setIsAddingFriend((oldVal) => !oldVal);
        setSelectedFriend(null);
    };
    function handleSelect(friend) {
        setSelectedFriend((currSelected) =>
            currSelected?.id === friend.id ? null : friend
        );
        setIsAddingFriend(false);
    }
    function handleSplitBill(value) {
        setFriends((friends) => {
            console.log(value);
            return friends.map((friend) => {
                return friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend;
            });
        });
    }
    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friends={friends}
                    onSelect={handleSelect}
                    selectedFriend={selectedFriend}
                />
                {isAddingFriend && <AddNewFriend setFriends={setFriends} />}
                <Button onClick={handleAddingFriend}>
                    {isAddingFriend ? "Close" : "Add Friend"}
                </Button>
            </div>
            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}
export function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}
