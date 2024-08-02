import { useState, useEffect } from "react";
import { formatSeconds } from "../utils/utils";
import mindImage from "/mind.svg";
import { Link } from "react-router-dom";
import { LuTimer } from "react-icons/lu";
import { MdNavigateNext } from "react-icons/md";


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
                <div className="bg-slate-50 p-8 rounded flex items-center h-full flex-col border shadow-md ">
                    <h1 className="text-xl my-3 text-stone-800/100 font-medium font-mono">Quiz Results</h1>
                    <div
                        className=" w-32 h-32 rounded-full flex items-center justify-center relative text-black"
                        style={{
                            background: `conic-gradient(#4CAF50 ${percentageCorrect}%, #ffff ${percentageCorrect}% 100%)`,
                        }}
                    >
                        <div className="absolute border bg-slate-50 rounded-full h-28 w-28 flex items-center justify-center border-none">
                            <div className="text-xl font-semibold">{calculateResults()}/{questions.length}</div>
                        </div>
                    </div>
                    <p className="flex ml-8 mt-3  flex-col items-center justify-center md:font-mono">You have answered {calculateResults()} out of {questions.length} questions correctly.</p>
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

        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex flex-col justify-center items-center flex-grow">
                <div className="flex flex-col justify-center items-center  md:w-4/5">
                    <div className="flex flex-col justify-center items-center  md:items-start md:w-4/5">
                        <div className="flex  items-start mb-4">
                            <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-3" />
                            <h2 className="text-2xl font-bold text-black">Quizzie</h2>
                        </div>
                        <div className="bg-white p-8 border rounded-lg shadow-md relative w-4/5 h-2/5 md:w-full">
                            <div
                                className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-500 rounded-tl-md"
                                style={{ width: `${lineWidth}%` }}
                            />
                            <div className="md:flex md:flex-row md:justify-between md:w-full md:mb-4 md:p-1 flex flex-row gap-1 justify-around items-center mb-3 text-xl">
                                <h4 className="flex items-center my-3 text-stone-800 font-medium font-mono gap-1 w-fit">
                                    <span className="hidden md:block">Question</span><span className="block md:hidden">Q</span> {currentIndex + 1} of {questions.length}
                                </h4>
                                <div className="block md:hidden">|</div>
                                <h4 className="flex items-center my-3 text-stone-800 font-medium font-mono">
                                    <LuTimer className="mr-2" size={19} /> {formatSeconds(seconds)}
                                </h4>
                            </div>
                            {questions.length > 0 && (
                                <div className="grid ">
                                    <h4 className="text-xl font-semibold mb-4">{questions[currentIndex].question}</h4>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-4 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-4/5">
                                        {questions[currentIndex].answers.map((answer, index) => (
                                            <button
                                                key={index}
                                                className={`flex items-start p-2 cursor-pointer mb-5 border rounded-md text-left ${selectedAnswer === index ? "bg-stone-300/80" : "bg-slate-200/40"}`}
                                                onClick={() => setBigState((prev) => ({ ...structuredClone(prev), selectedAnswer: index }))}
                                                disabled={quizFinished}
                                            >
                                                <span >{String.fromCharCode(65 + index)}.</span>
                                                <span className="ml-2">{answer}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        {currentIndex < questions.length - 1 ? (
                                            <button
                                                className="bg-green-600 text-white py-2 px-4 rounded mt-4"
                                                onClick={handleNext}
                                            >
                                                <MdNavigateNext size={20} />
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
                </div>
            </div>
        </div>
    );
}
