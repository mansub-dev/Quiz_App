import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mindImage from './images/mind.svg';
import nextImage from './images/next.svg';
import previousImage from './images/back.svg';
import { useNavigate } from 'react-router-dom';


const API_KEY = 'AIzaSyAl_pUEgrBWMX5Rnuj8tM9Ti_K1t-rTq5E';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function fetchQuestions(prompt) {
    console.log("Fetching questions with prompt:", prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.replace(/```json\n|```/g, '');
    console.log("Fetched and cleaned text:", cleanedText);

    return cleanedText;
}

const QuizPage = () => {
    const { state } = useLocation();
    const { difficulty, topic, questionCount } = state;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQuestions = localStorage.getItem('questions');
        const savedAnswers = localStorage.getItem('userAnswers');

        if (savedQuestions && savedAnswers) {
            setQuestions(JSON.parse(savedQuestions));
            setUserAnswers(JSON.parse(savedAnswers));
            setLoading(false);
        } else {
            const prompt = `give me ${questionCount} quiz questions about ${topic} with the difficulty level of ${difficulty}. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property(ONLY FOUR OPTIONS)`;

            fetchQuestions(prompt).then((res) => {
                try {
                    const qs = JSON.parse(res);
                    console.log("Parsed questions:", qs);
                    setQuestions(qs);
                    setUserAnswers(new Array(qs.length).fill(null));
                    setLoading(false);
                    localStorage.setItem('questions', JSON.stringify(qs));
                    localStorage.setItem('userAnswers', JSON.stringify(new Array(qs.length).fill(null)));
                } catch (e) {
                    console.error(`Something went wrong parsing JSON: ${e}`);
                }
            });
        }
    }, [difficulty, topic, questionCount]);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        localStorage.removeItem('questions');
        localStorage.removeItem('userAnswers');
    };

    const handleAnswerChange = (index) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = index;
        setUserAnswers(updatedAnswers);
        localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
    };

    const calculateResults = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score += 1;
            }
        });
        return score;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-800 flex justify-center items-center text-white">
                Loading Your Questions, Please Wait...
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center p-4">
            {!submitted ? (
                <div className="bg-gray-700 p-8 w-900 rounded flex items-center h-full flex-col">
                    <div className="flex flex-row">
                        <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-4" />
                        <h2 className="text-3xl font-bold mb-2 text-white">QUIZ APP</h2>
                    </div>
                    <div className="text-white text-lg mt-4 mb-4">
                        Question{currentQuestion + 1}: {questions[currentQuestion]?.question}
                    </div>
                    <div className="text-white grid grid-cols-2 gap-4 mb-2">
                        {questions[currentQuestion]?.answers.map((answer, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion}`}
                                    value={index}
                                    checked={userAnswers[currentQuestion] === index}
                                    onChange={() => handleAnswerChange(index)}
                                    className="hidden"
                                />
                                <div
                                    className={`flex items-center justify-center w-full py-2 px-4 rounded border border-gray-500  text-white ${userAnswers[currentQuestion] === index ? 'bg-gray-600' : 'bg-gray-800'}`}
                                >
                                    <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span> {answer}
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-between mb-4">
                        <img
                            src={previousImage}
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestion === 0}
                            className="bg-gray-600 mr-2 px-4 py-2 rounded cursor-pointer"
                            alt="Previous"
                        />
                        <img
                            src={nextImage}
                            onClick={handleNextQuestion}
                            disabled={currentQuestion === questions.length - 1}
                            className="bg-gray-600 ml-2 px-4 py-2 rounded cursor-pointer"
                            alt="Next"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        Go to Home Page
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800 min-h-screen flex flex-col items-center p-4">
                    <div className="bg-gray-700 p-8 w-900 rounded flex items-center h-full flex-col">
                        <div className="flex flex-row">
                            <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-4" />
                            <h2 className="text-3xl font-bold mb-2 text-white">QUIZ APP</h2>
                        </div>
                        <h1 className="text-white text-2xl mt-4">Quiz Results</h1>
                        <p className="text-white text-3xl mt-4 border p-14  rounded-[50%] bg-slate-800"> {calculateResults()} / {questions.length} </p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            Go to Home Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
