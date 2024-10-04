import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

export default function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const handlePrevious = () => {
        currentStep > 1 && setCurrentStep(currentStep - 1);
    };
    const handleNext = () => {
        currentStep < 3 && setCurrentStep(currentStep + 1);
    };
    return (
        <div className="steps">
            <div className="numbers">
                {[1, 2, 3].map((num) => (
                    <Number step={num} currentStep={currentStep} key={num} />
                ))}
            </div>
            <StepMessage currentStep={currentStep}>
                {messages[currentStep - 1]}
            </StepMessage>
            <div className="buttons">
                <Button
                    textColor={"#fff"}
                    bgColor={"#7950f2"}
                    onClick={handlePrevious}
                >
                    <span>👈</span>Previous
                </Button>
                <Button
                    textColor={"#fff"}
                    bgColor={"#7950f2"}
                    onClick={handleNext}
                >
                    Next<span>👉</span>
                </Button>
            </div>
        </div>
    );
}

function Button({ textColor, bgColor, onClick, children }) {
    return (
        <button
            style={{ backgroundColor: bgColor, color: textColor }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function Number({ step, currentStep }) {
    return <div className={currentStep >= step ? "active" : ""}>{step}</div>;
}

function StepMessage({ currentStep, children }) {
    return (
        <div className="message">
            <h3>Step {currentStep}</h3> {children}
        </div>
    );
}
