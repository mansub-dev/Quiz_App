import { useState, useEffect } from "react";
import { formatSeconds } from "../utils/utils";
import { Link } from "react-router-dom";


export default function QuizPage({
    bigState: {
        difficulty,
        topic,
        questionCount,
        questions,
        currentIndex,
        getData,
        loaded,
        selectedAnswer,
    },
    setBigState,
}) {
    const [seconds, setSeconds] = useState(questionCount * 1 * 60);
    const [isDataLoaded, setIsDataLoaded] = useState(questions.length > 0);
    const [lineWidth, setLineWidth] = useState(0);
    const [userAnswers, setUserAnswers] = useState(new Array(questionCount).fill(null));
    const [quizFinished, setQuizFinished] = useState(false);


    useEffect(() => {
        let timer;
        if (isDataLoaded) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    clearInterval(timer);
                    handleSubmit();
                    return;
                }
                setSeconds((sec) => sec - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isDataLoaded, seconds]);

    useEffect(() => {
        setLineWidth(((currentIndex) / questions.length) * 100);
    }, [currentIndex, questions.length]);

    const handleNext = () => {
        if (selectedAnswer !== null) {
            setUserAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[currentIndex] = selectedAnswer;
                return newAnswers;
            });
            setBigState((prev) => ({
                ...structuredClone(prev),
                currentIndex: prev.currentIndex + 1,
                selectedAnswer: null,
            }));
        }
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

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setUserAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[currentIndex] = selectedAnswer;
                return newAnswers;
            });
        }
        localStorage.removeItem("questionsData");
        setQuizFinished(true);
        setLineWidth(100);
    };

    const handleHome = () => {

        localStorage.clear();
        setBigState({
            difficulty: null,
            topic: null,
            questionCount: null,
            questions: [],
            currentIndex: 0,
            getData: false,
            loaded: false,
        });
    };

    if (quizFinished) {
        const percentageCorrect = (calculateResults() / questions.length) * 100;

        return (

            <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4">
                <div className="bg-slate-50 p-8  rounded flex items-center h-full flex-col border border-slate-500 ">
                    <h1 className="text-slate-800 text-2xl mt-4 mb-4 font-bold">Quiz Results</h1>
                    <div
                        className=" w-32 h-32 rounded-full flex items-center justify-center relative text-black"
                        style={{
                            background: `conic-gradient(#4CAF50 ${percentageCorrect}%, #ffff ${percentageCorrect}% 100%)`,
                        }}
                    >
                        <div className="absolute border bg-slate-50 rounded-full h-28 w-28 flex items-center justify-center border-none">
                            <div className="text-xl font-bold">{calculateResults()}/{questions.length}</div>
                        </div>
                    </div>
                    <p className="mt-3">You answered {calculateResults()} out of {questions.length} questions correctly</p>
                    <Link to="/"><button
                        onClick={handleHome}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Home
                    </button>
                    </Link>
                </div>
            </div>

        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className=" max-w-2xl bg-white p-8 border border-gray-500 rounded-lg shadow-md relative w-4/5 h-2/5 md:w-900 ">
                <div
                    className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-500"
                    style={{ width: `${lineWidth}%` }}
                />
                <div className="flex flex-row justify-between w-full mb-4 pt-6 ">
                    <h4 className="text-left text-xl text-slate-500 font-bold hidden md:block ">
                        Question {currentIndex + 1} of {questions.length}
                    </h4>
                    <h4 className="md:text-right text-xl text-slate-500 font-bold ">
                        Time Remaining: {formatSeconds(seconds)}
                    </h4>
                </div>
                {questions.length > 0 && (
                    <div className="grid ">
                        <h4 className="text-xl mb-4">{questions[currentIndex].question}</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-4 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-4/5">
                            {questions[currentIndex].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center p-2 cursor-pointer mb-5 border rounded-md border-slate-500 ${selectedAnswer === index ? "bg-slate-300" : "bg-slate-50"
                                        }`}
                                    onClick={() => setBigState((prev) => ({ ...structuredClone(prev), selectedAnswer: index }))}
                                    disabled={quizFinished}
                                >
                                    <span>{String.fromCharCode(65 + index)}.</span>
                                    {answer}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            {currentIndex < questions.length - 1 ? (
                                <button
                                    className="bg-green-600 text-white py-2 px-4 rounded mt-4"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>

                            ) : (

                                <button
                                    className="bg-green-600 text-white py-2 px-4 rounded mt-4"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>

                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
