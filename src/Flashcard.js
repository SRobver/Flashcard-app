import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css'; // Importing CSS for styling

const Flashcard = ({ flashcard, onNext, onPrevious }) => {
    const [flipped, setFlipped] = useState(false);

    // Ensure flashcard is defined and has the necessary properties
    if (!flashcard) {
        return <div>Loading...</div>; // Handle cases where flashcard data is not available
    }

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

// Add PropTypes for type checking
Flashcard.propTypes = {
    flashcard: PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool
    }),
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired
};

export default Flashcard;

