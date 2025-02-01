'use client';

import { useState, useEffect } from 'react';
import './styles.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [chapterInput, setChapterInput] = useState(1);
    const [shlokaInput, setShlokaInput] = useState(1);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedShloka, setSelectedShloka] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/test.json');
                const jsonData = await response.json();
                setData(jsonData);

                const defaultChapter = jsonData[0];
                setSelectedChapter(defaultChapter);
                setSelectedShloka(defaultChapter.Shloka["1"]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = () => {
        const chapterIndex = parseInt(chapterInput, 10) - 1;

        if (chapterIndex < 0 || chapterIndex >= data.length) {
            alert(`There are only ${data.length} chapters available.`);
            return;
        }

        const chapter = data[chapterIndex];
        const totalShlokas = Object.keys(chapter.Shloka).length;

        if (shlokaInput < 1 || shlokaInput > totalShlokas) {
            alert(`Chapter ${chapter.chapter} has only ${totalShlokas} shlokas.`);
            return;
        }

        setSelectedChapter(chapter);
        setSelectedShloka(chapter.Shloka[shlokaInput]);
    };

    return (
        <div className="container">
            <div className="left-section">
                <h1>Bhagavad Gita</h1>

                <div className="input-section">
                    <label htmlFor="chapter-input">Chapter:</label>
                    <input
                        id="chapter-input"
                        type="number"
                        min="1"
                        value={chapterInput}
                        onChange={(e) => setChapterInput(e.target.value)}
                        placeholder="Enter chapter number"
                    />
                </div>

                <div className="input-section">
                    <label htmlFor="shloka-input">Shloka:</label>
                    <input
                        id="shloka-input"
                        type="number"
                        min="1"
                        value={shlokaInput}
                        onChange={(e) => setShlokaInput(e.target.value)}
                        placeholder="Enter shloka number"
                    />
                </div>

                <button onClick={handleSubmit}>Submit</button>

                {selectedShloka && (
                    <div className="shloka-display">
                        <h3>Selected Shloka</h3>
                        <p><strong>Shloka:</strong> {selectedShloka[0]}</p>
                        <p><strong>English Translation:</strong> {selectedShloka[1]}</p>
                        {/* <p><strong>Hindi:</strong> {selectedShloka[2]}</p> */}
                    </div>
                )}
            </div>

            <div className="right-section">
                <h3>YouTube Video</h3>
                {selectedShloka ? (
                    <iframe
                        className="video-frame"
                        src={`https://youtube.com/embed/${selectedShloka[3]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Select a chapter and shloka to view the video</p>
                )}
            </div>
        </div>
    );
};

export default Home;
