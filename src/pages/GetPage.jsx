import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";

export default function GetPage({ bigState, setBigState }) {
    const { loaded, topic, questionCount, getData, difficulty } = bigState;
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const genAI = new GoogleGenerativeAI("AIzaSyC2c8j6egl2bA4PIHB3iTqx5SoEXmBn7BM");

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const prompt = `give me ${questionCount} quiz questions about ${topic} with the difficulty level of ${difficulty}. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property with possible four options`;
            const result = await model.generateContent(prompt);

            const response = await result.response;
            let text = await response.text();

            text = text.replaceAll(/json|javascript|##|\*\*|```/g, "");

            const questionsData = JSON.parse(text);

            localStorage.setItem("questionsData", JSON.stringify(questionsData));

            setBigState((prev) => ({
                ...structuredClone(prev),
                questions: questionsData,
                loaded: true,
            }));
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (getData) {
            const storedQuestions = JSON.parse(localStorage.getItem("questionsData") ?? "[]");

            if (!storedQuestions.length) {
                fetchData();
            } else {
                setBigState((prev) => ({
                    ...structuredClone(prev),
                    questions: storedQuestions,
                    loaded: true,
                }));
            }
        }
    }, [getData, setBigState]);

    return (
        <div className='bg-gray-50 min-h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col items-start bg-slate-50 p-4 border border-slate-400 text-black rounded w-4/5 h-2/5 md:w-2/5 '>
                <h6 className="text-3xl my-3 text-gray-800 font-bold">Your Quiz Detail is Here</h6>
                <h1 className="text-x text-gray-600 my-3 font-mono">Topic:<span className="text-black"> {topic}</span></h1>
                <h1 className="text-x text-gray-600 my-3 font-mono">Difficulty:<span className="text-black"> {difficulty} </span></h1>
                <h1 className="text-x text-gray-600 my-3 font-mono">Total Questions:<span className="text-black"> {questionCount} </span></h1>
                <h1 className="text-x text-gray-600 my-3 font-mono">Total Marks:<span className="text-black"> {questionCount} </span></h1>
                <h1 className="text-x text-gray-600 my-3 font-mono">Time Allowed:<span className="text-black"> {questionCount} minutes </span></h1>

                <div className="md:flex gap-x-48">
                    <Link to="/" className="bg-green-600 text-white py-2 px-4 m-2 rounded" onClick={() => localStorage.clear()}>Home Page</Link>
                    {loaded ? (
                        <Link to="/quiz" className="bg-green-600 text-white py-2 px-4 m-2 rounded">Start Attempt</Link>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    );
}
