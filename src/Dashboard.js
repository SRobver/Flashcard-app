import React, { useState } from 'react';
import './Dashboard.css'; // Importing CSS for styling

const Dashboard = ({ flashcards, onAdd, onEdit, onDelete }) => {
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

    const handleChange = (e) => {
        setNewFlashcard({
            ...newFlashcard,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="dashboard-container">
            <div className="add-flashcard">
                <h2>Add Flashcard</h2>
                <input
                    type="text"
                    name="question"
                    placeholder="Enter question"
                    value={newFlashcard.question}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="answer"
                    placeholder="Enter answer"
                    value={newFlashcard.answer}
                    onChange={handleChange}
                />
                <button onClick={() => onAdd(newFlashcard)}>Add Flashcard</button>
            </div>
            <div className="flashcard-list">
                <h2>Existing Flashcards</h2>
                {flashcards.map((fc, index) => (
                    <div key={index} className="flashcard-item">
                        <div>
                            <strong>Question:</strong> {fc.question}
                            <br />
                            <strong>Answer:</strong> {fc.answer}
                        </div>
                        <button onClick={() => onEdit(index)}>Edit</button>
                        <button onClick={() => onDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
