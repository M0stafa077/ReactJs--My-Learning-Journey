import React from "react";
import ReactDom from "react-dom/client";
import "./style.css";
import { pizzaData } from "./pizzas";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer openHour={9} closeHour={23} />
        </div>
    );
}
function Header() {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}
function Menu() {
    return (
        <main className="menu">
            <h2>our menu</h2>
            <p>
                Authentic Italian cuisine. 6 creative dishes to choose from. All
                from our stone oven, all organic, all delicious.
            </p>
            <ul className="pizzas">
                {pizzaData.map((pizza) => {
                    return <Pizza pizzaObj={pizza} key={pizza.name} />;
                })}
            </ul>
        </main>
    );
}
function Pizza({ pizzaObj }) {
    return (
        <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
            </div>
        </li>
    );
}
function Footer({ openHour, closeHour }) {
    const currentHour = new Date().getHours();
    const isOpen = currentHour > openHour && currentHour < closeHour;
    return (
        <footer className="footer">
            {isOpen ? (
                <Order openHour={openHour} closeHour={closeHour} />
            ) : (
                <Closed openHour={openHour} closeHour={closeHour} />
            )}
        </footer>
    );
}
function Order({ openHour, closeHour }) {
    return (
        <div className="order">
            <p>
                We're open from {openHour}:00 AM to {closeHour}:00 PM. Come
                visit us or order online.
            </p>
            <button className="btn">Order</button>
        </div>
    );
}
function Closed({ openHour, closeHour }) {
    return (
        <p>
            CLOSED! We're happy to welcome you between {openHour}:00 and{" "}
            {closeHour}:00.
        </p>
    );
}
