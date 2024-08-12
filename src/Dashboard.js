import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ flashcards, onAdd, onEdit, onDelete }) => {
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editFlashcard, setEditFlashcard] = useState({ question: '', answer: '' });

    const handleChange = (e) => {
        setNewFlashcard({
            ...newFlashcard,
            [e.target.name]: e.target.value
        });
    };

    const handleEditChange = (e) => {
        setEditFlashcard({
            ...editFlashcard,
            [e.target.name]: e.target.value
        });
    };

    const saveEdit = (index) => {
        if (editFlashcard.question && editFlashcard.answer) {
            onEdit(index, editFlashcard);
            setEditIndex(null);
            setEditFlashcard({ question: '', answer: '' });
        } else {
            alert('Please fill in both fields.');
        }
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
                <button
                    onClick={() => {
                        if (newFlashcard.question && newFlashcard.answer) {
                            onAdd(newFlashcard);
                            setNewFlashcard({ question: '', answer: '' });
                        } else {
                            alert('Please fill in both fields.');
                        }
                    }}
                >
                    Add Flashcard
                </button>
            </div>
            <div className="flashcard-list">
                <h2>Existing Flashcards</h2>
                {flashcards.length > 0 ? (
                    flashcards.map((fc, index) => (
                        <div key={index} className="flashcard-item">
                            <div>
                                <strong>Question:</strong> {editIndex === index ? (
                                    <input
                                        type="text"
                                        name="question"
                                        value={editFlashcard.question}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    fc.question
                                )}
                            </div>
                            <div>
                                <strong>Answer:</strong> {editIndex === index ? (
                                    <input
                                        type="text"
                                        name="answer"
                                        value={editFlashcard.answer}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    fc.answer
                                )}
                            </div>
                            <div className="flashcard-actions">
                                {editIndex === index ? (
                                    <button onClick={() => saveEdit(index)}>Save</button>
                                ) : (
                                    <button onClick={() => { 
                                        setEditIndex(index); 
                                        setEditFlashcard(fc); 
                                    }}>Edit</button>
                                )}
                                <button onClick={() => onDelete(index)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No flashcards available.</div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
