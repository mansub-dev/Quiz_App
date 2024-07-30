import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import GetPage from "./pages/GetPage";

const o = {
    currentIndex: 0,
    questions: [
        {
            selectedAnswer: null,
        },
        {
            selectedAnswer: null,
        },
        {},
    ],
    questionCount: 0,
    difficulty: "",
    topic: "",
    getData: false,
    loaded: false,
};

function App() {
    //   const [difficulty, setDifficulty] = useState("");
    //   const [topic, setTopic] = useState("");
    //   const [questionCount, setQuestionCount] = useState(0);

    const [bigState, setBigState] = useState(o);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage bigState={bigState} setBigState={setBigState} />}
                />
                <Route
                    path="/get"
                    element={<GetPage bigState={bigState} setBigState={setBigState} />}
                />
                <Route
                    path="/quiz"
                    element={<QuizPage bigState={bigState} setBigState={setBigState} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
