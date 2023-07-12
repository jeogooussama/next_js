"use client"
import React, { useState } from 'react';

const Main = () => {
    const [generatedWords, setGeneratedWords] = useState([]);
    const [error, setError] = useState('');
    const [copyStatus, setCopyStatus] = useState('');

    const handleGenerate = () => {
        const text = document.getElementById('text-input').value;
        const count = parseInt(document.getElementById('number-input').value);

        if (isNaN(count) || count < 1 || count > 500) {
            setError('Please enter a valid number between 1 and 500.');
            setGeneratedWords([]);
            return;
        }

        setError('');

        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(text);
        }

        setGeneratedWords(words);
    };

    const handleCopy = () => {
        const generatedText = generatedWords.join('\n');
        navigator.clipboard.writeText(generatedText)
            .then(() => setCopyStatus('The text Copied!'))
            .catch((error) => setCopyStatus('Copy failed!'));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl">Text Repeater</h2>
            <h3 className="text-lg">Type any text below and click generate</h3>
            <span className="text-xl mt-4">Text</span>
            <input
                type="text"
                id="text-input"
                className="px-4 py-2 text-black rounded-lg shadow-md mt-2 w-full sm:w-auto"
                placeholder="Type your text here"
            />
            <span className="text-xl mt-4">Numbers</span>
            <input
                type="number"
                id="number-input"
                className="px-4 py-2 text-black rounded-lg shadow-md mt-2 w-full sm:w-auto"
                min={1}
                max={500}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                type="button"
                className="px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleGenerate}
            >
                Generate
            </button>
            {generatedWords.length > 0 && (
                <div className="mt-4 text-lg">
                    <button
                        type="button"
                        className="px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                        onClick={handleCopy}
                    >
                        Copy All
                    </button>
                    <ul>
                        {generatedWords.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>

                    {copyStatus && alert(copyStatus)}
                </div>
            )}
        </div>
    );
};

export default Main;
