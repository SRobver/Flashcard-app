import React, { useState } from 'react';
import Flashcard from './Flashcard';
import Dashboard from './Dashboard';

const App = () => {
    const [flashcards, setFlashcards] = useState([
        { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.', isFirst: true, isLast: false },
        { question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML.', isFirst: false, isLast: true }
    ]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });

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

    const handleAddFlashcard = (newFlashcard) => {
        setFlashcards([...flashcards, newFlashcard]);
    };

    const handleEditFlashcard = (index) => {
        // Implement editing logic here
    };

    const handleDeleteFlashcard = (index) => {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(updatedFlashcards);
    };

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Flashcard
                flashcard={flashcards[currentIndex]}
                onNext={() => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, flashcards.length - 1))}
                onPrevious={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
            />
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
        </div>
    );
};

export default App;
