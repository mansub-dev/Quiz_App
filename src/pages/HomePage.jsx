import { useState } from 'react';
import DifficultySelector from '../components/DifficultySelector';
import QuestionSelector from '../components/QuestionCountSelector';
import TopicSelector from '../components/TopicSelector';
import { useNavigate } from 'react-router-dom';
import mindImage from './images/mind.svg';

const HomePage = () => {
    const [difficulty, setDifficulty] = useState('None');
    const [topic, setTopic] = useState('None');
    const [questionCount, setQuestionCount] = useState(0);
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/quiz', {
            state: {
                difficulty,
                topic,
                questionCount
            }
        });
    };

    return (
        <div className='bg-gray-800 min-h-screen flex flex-col items-center'>
            <div className="bg-gray-700 p-8 rounded flex flex-col items-center ">
                <div className="flex flex-row">
                    <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-4" />
                    <h2 className="text-3xl font-bold  text-white">QUIZ APP</h2>
                </div>
                <div className="flex items-center ">
                    <div className="bg-gray-700 p-8 mt-2 rounded w-full max-w-3xl">
                        <h3 className="text-2xl font-bold mb-2 text-white">Instructions</h3>
                        <ul className="list-disc list-inside text-white">
                            <li>Select the Topic,Difficulty Level & Questions Number before starting Quiz</li>
                            <li>Read each question carefully before answering.</li>
                            <li>Select the best answer from the given options.</li>
                            <li>Click Next to proceed to the next question.</li>
                            <li>Good luck and do your best!</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <TopicSelector setTopic={setTopic} />
                    <DifficultySelector setDifficulty={setDifficulty} />
                    <QuestionSelector setQuestionCount={setQuestionCount} />
                </div>
                <div className="bg-gray-700 p-4 mt-2 rounded w-full max-w-2xl flex items-center justify-between ">
                    <div className="text-white">
                        <p>Topic: {topic}</p>
                        <p>Difficulty: {difficulty}</p>
                        <p>Number of Questions: {questionCount}</p>
                    </div>
                    <button onClick={handleStartQuiz} className=" bg-gray-800 text-white py-2 px-4 m-2 rounded">Start Quiz</button>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
