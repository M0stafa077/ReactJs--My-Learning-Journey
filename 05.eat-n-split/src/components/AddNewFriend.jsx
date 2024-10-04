import { useState } from "react";
import { Button } from "./App";

export function AddNewFriend({ setFriends }) {
    const [friendName, setFriendName] = useState("");
    const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
    const newId = crypto.randomUUID();
    function handleChangeName(e) {
        setFriendName(e.target.value);
    }
    function handleChangeImage(e) {
        setFriendImage(e.target.value);
    }
    function handleAddFriend(e) {
        e.preventDefault();
        if (!friendImage || !friendName) return;
        const newFriend = {
            id: newId,
            name: friendName,
            image: `${friendImage}?=${newId}`,
            balance: 0,
        };
        setFriends((friends) => [...friends, newFriend]);
        setFriendName("");
        setFriendImage("https://i.pravatar.cc/48");
    }
    return (
        <form className="form-add-friend" onSubmit={handleAddFriend}>
            <label>Friend name</label>
            <input type="text" value={friendName} onChange={handleChangeName} />
            <label>Friend image</label>
            <input
                type="text"
                value={friendImage}
                onChange={handleChangeImage}
            />
            <Button>Add</Button>
        </form>
    );
}
