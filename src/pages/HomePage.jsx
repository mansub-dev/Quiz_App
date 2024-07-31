import { Link } from "react-router-dom";
import mindImage from "/mind.svg";
import Selector from "../components/QuizSetting";


export default function HomePage({ bigState, setBigState }) {
    const { difficulty, topic, questionCount } = bigState;


    const handleGetQuiz = () => {

        setBigState((prev) => ({
            ...structuredClone(prev),
            getData: true,
        }));

    };

    return (
        <div className='bg-gray-50 min-h-screen flex flex-col justify-center  items-center'>
            <div className=' flex flex-col bg-slate-50 p-4 border border-slate-400 shadow-md rounded relative w-4/5 h-2/5 md:w-3/5 '>
                <div className='flex flex-row items-center mb-14'>
                    <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-3" />
                    <h2 className="text-2xl font-bold text-black">Quizzie</h2>
                </div>
                <div className="flex justify-center items-center ">
                    <Selector setBigState={setBigState} />
                </div>
                <div className="flex items-center ">
                    <div className="bg-slate-50 p-2 mt-6 hidden md:block  md:w-4/5">
                        <h3 className="text-xl font-bold mb-2 text-black">Instructions</h3>
                        <ul className="list-disc list-inside text-black">
                            <li>Select the Topic,Difficulty Level & Questions Number before starting Quiz</li>
                            <li>Read each question carefully before answering.</li>
                            <li>Select the best answer from the given options.</li>
                            <li>Click Next to proceed to the next question.</li>
                            <li>Good luck and do your best!</li>

                        </ul>
                    </div>
                </div>
                <div className="md:flex md:justify-end md:items-end md:absolute md:bottom-4 md:right-4 flex justify-center items-center">
                    {topic && difficulty && questionCount ? (
                        <Link to="/get">
                            <button
                                onClick={handleGetQuiz}
                                className="bg-green-600 text-white py-2 px-4 m-2 rounded"
                            >
                                Get Quiz
                            </button>
                        </Link>
                    ) : null}

                </div>
            </div>
        </div>
    );
}
