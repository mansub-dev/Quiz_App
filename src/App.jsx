import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';

function App() {
    const [difficulty, setDifficulty] = useState('');
    const [topic, setTopic] = useState('');
    const [questionCount, setQuestionCount] = useState(0);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            difficulty={difficulty}
                            topic={topic}
                            questionCount={questionCount}
                            setDifficulty={setDifficulty}
                            setTopic={setTopic}
                            setQuestionCount={setQuestionCount}
                        />
                    }
                />
                <Route
                    path="/quiz"
                    element={
                        <QuizPage />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
