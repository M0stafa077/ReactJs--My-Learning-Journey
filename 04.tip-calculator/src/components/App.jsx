import { useState } from "react";

export default function App() {
    const [bill, setBill] = useState(0);
    const [service, setService] = useState(5);
    const [friendService, setFriendService] = useState(5);
    const divStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "30px",
    };
    const handleReset = () => {
        setBill(0);
        setService(5);
        setFriendService(5);
    };
    return (
        <div className="app" style={{ maxWidth: "400px" }}>
            <Bill bill={bill} setBill={setBill} rowStyle={divStyle} />
            <Service
                service={service}
                setService={setService}
                rowStyle={divStyle}
            >
                How did you like the service ?
            </Service>
            <Service
                service={friendService}
                setService={setFriendService}
                rowStyle={divStyle}
            >
                How did your friend like the service ?
            </Service>
            <Result
                bill={bill}
                service={service}
                friendService={friendService}
            />
            {bill > 0 && <Reset onReset={handleReset} />}
        </div>
    );
}

function Bill({ bill, setBill, rowStyle }) {
    return (
        <div style={rowStyle}>
            <p>How much was the bill? </p>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
            />
        </div>
    );
}

function Service({ service, setService, children, rowStyle }) {
    return (
        <div className="service" style={rowStyle}>
            <p>{children}</p>
            <select
                value={service}
                onChange={(e) => setService(Number(e.target.value))}
            >
                <option value={0}>Dissatisfied (0%)</option>
                <option value={5}>It was okay (5%)</option>
                <option value={10}>It was good (10%)</option>
                <option value={20}>Absluetely amazing(20%)</option>
            </select>
        </div>
    );
}
function Result({ bill, service, friendService }) {
    const serviceBill = Math.round(
        ((service + friendService) / 2 / 100) * bill
    );
    const totalPill = Math.round(bill + serviceBill);
    return (
        bill > 0 && (
            <h2>{`You pay $${totalPill} ($${bill} + $${serviceBill})`}</h2>
        )
    );
}
function Reset({ onReset }) {
    return <button onClick={onReset}>Reset</button>;
}
