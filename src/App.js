import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import Dashboard from './Dashboard';
import './style/App.css'; //

const App = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch flashcards from the backend
        axios.get('http://localhost:5001/flashcards')
            .then(response => {
                setFlashcards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
                setError('Failed to load flashcards.');
                setLoading(false);
            });
    }, []);

    const handleAddFlashcard = (newFlashcard) => {
        axios.post('http://localhost:5001/flashcards', newFlashcard)
            .then(response => {
                setFlashcards([...flashcards, response.data]);
            })
            .catch(error => console.error('Error adding flashcard:', error));
    };

    const handleEditFlashcard = (index, updatedFlashcard) => {
        const id = flashcards[index].id;
        axios.put(`http://localhost:5001/flashcards/${id}`, updatedFlashcard)
            .then(response => {
                const updatedFlashcards = flashcards.map((fc, i) =>
                    i === index ? response.data : fc
                );
                setFlashcards(updatedFlashcards);
            })
            .catch(error => console.error('Error editing flashcard:', error));
    };

    const handleDeleteFlashcard = (index) => {
        const id = flashcards[index].id;
        axios.delete(`http://localhost:5001/flashcards/${id}`)
            .then(() => {
                const updatedFlashcards = flashcards.filter((_, i) => i !== index);
                setFlashcards(updatedFlashcards);
            })
            .catch(error => console.error('Error deleting flashcard:', error));
    };

    const handleLogin = () => {
        // Simplified authentication logic
        if (loginForm.username === 'admin' && loginForm.password === 'password') {
            setIsAdmin(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
    };

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    // Handle navigation index boundaries
    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, flashcards.length - 1));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className="app-container">
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    {flashcards.length > 0 ? (
                        <Flashcard
                            flashcard={flashcards[currentIndex]}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    ) : (
                        <div>No flashcards available.</div>
                    )}

                    {isAdmin ? (
                        <div>
                            <Dashboard
                                flashcards={flashcards}
                                onAdd={handleAddFlashcard}
                                onEdit={handleEditFlashcard}
                                onDelete={handleDeleteFlashcard}
                            />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="login-container">
                            <h2>Login</h2>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={loginForm.username}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginForm.password}
                                onChange={handleChange}
                            />
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;

