import  { useState } from 'react';
import './NotDefect.css';
import Header from '../../widgets/header/Header';
import '@/shared/styles/AdaptiveStyles.css'
import axios from 'axios'; // Ensure axios is installed

const NotDefect = () => {
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRatingChange = async (selectedRating) => {

        try {

            // Ensure the URL is correct and using proper protocol
            const response = await axios.post('https://nyuroprintapi.ru:5000/api/feedback/', 
                { rating: selectedRating }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Log successful response
            console.log('Feedback submission response:', response.data);

            // Update state
            setRating(selectedRating);
            setIsSubmitted(true);

        } catch (error) {
            // Detailed error logging
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            // User-friendly error message
            alert('Не удалось отправить оценку. Пожалуйста, проверьте подключение.');
        }
    };

    const ratingEmojis = [
        '😫',   // Very Dissatisfied
        '😕',   // Dissatisfied
        '😐',   // Neutral
        '🙂',   // Satisfied
        '😄'    // Very Satisfied
    ];

    const ratingColors = [
        '#FF4D4D',   // Red for 1 (Very Dissatisfied)
        '#FF9F1C',   // Orange for 2 (Dissatisfied)
        '#FFD700',   // Yellow for 3 (Neutral)
        '#90EE90',   // Light Green for 4 (Satisfied)
        '#2ECC71'    // Green for 5 (Very Satisfied)
    ];

    return (
        <>
        <Header/>
        <main>
        <div className="not-defect-content">
        <div className="result-evaluation-container">
            <div className="result-evaluation-menu">
                <h2 className="result-evaluation-title">Оцените результат</h2>
                <div className="rating-scale">
                    {ratingEmojis.map((emoji, index) => (
                        <div 
                            key={index + 1} 
                            className={`rating-circle ${rating === index + 1 ? 'selected' : ''}`}
                            style={{ 
                                backgroundColor: ratingColors[index],
                                border: rating === index + 1 ? '3px solid #000' : 'none',
                                cursor: 'pointer' // Ensure cursor shows it's clickable
                            }}
                            // Ensure onClick is directly calling the function
                            onClick={() => handleRatingChange(index + 1)}
                        >
                            {emoji}
                        </div>
                    ))}
                </div>
                <div className="rating-labels">
                    <span>Совсем не доволен</span>
                    <span>Очень доволен</span>
                </div>
            </div>
        </div>
            <div className="container">
                <div className="content2">
                    <h1 className="hh1">ДЕФЕКТЫ НЕ ОБНАРУЖЕНЫ</h1>
                    <a href="/started">
                        <button className="not-defect-button">Вернуться к анализу дефектов</button>
                    </a>
                </div>
            </div>
        </div>
        </main>
        </>
    );
};

export default NotDefect;