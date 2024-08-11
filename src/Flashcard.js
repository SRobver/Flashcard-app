import React, { useState } from 'react';
import './Flashcard.css'; // Importing CSS for styling

const Flashcard = ({ flashcard, onNext, onPrevious }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="flashcard-container">
            <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className="front">{flashcard.question}</div>
                <div className="back">{flashcard.answer}</div>
            </div>
            <div className="navigation-buttons">
                <button onClick={onPrevious} disabled={flashcard.isFirst}>Previous</button>
                <button onClick={onNext} disabled={flashcard.isLast}>Next</button>
            </div>
        </div>
    );
};

export default Flashcard;
