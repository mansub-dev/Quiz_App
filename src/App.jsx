import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import Error from "./pages/ErrorPage";
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
            errorElement: <Error />
        },
        {
            path: "/get",
            element: <GetPage bigState={bigState} setBigState={setBigState} />,
            errorElement: <Error />
        },
        {
            path: "/quiz",
            element: <QuizPage bigState={bigState} setBigState={setBigState} />,
            errorElement: <Error />
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
