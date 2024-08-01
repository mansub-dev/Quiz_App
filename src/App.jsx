import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import GetPage from "./pages/GetPage";

const initialState = {
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
    const [bigState, setBigState] = useState(initialState);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage bigState={bigState} setBigState={setBigState} />,

        },
        {
            path: "/get",
            element: <GetPage bigState={bigState} setBigState={setBigState} />,

        },
        {
            path: "/quiz",
            element: <QuizPage bigState={bigState} setBigState={setBigState} />,

        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
