import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

export default function GetPage({ bigState, setBigState }) {

    const { loaded, topic, questionCount, getData, difficulty } = bigState;

    const fetchData = async () => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyC2c8j6egl2bA4PIHB3iTqx5SoEXmBn7BM");

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const prompt = `give me ${questionCount} quiz questions about ${topic} with the difficulty level of ${difficulty}. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property with possible four options`;
            const result = await model.generateContent(prompt);
            console.log(questionCount, topic, difficulty);

            const response = await result.response;
            let text = await response.text();

            text = text.replaceAll(/json|javascript|##|\*\*|```/g, "");
            text = text.replaceAll(/##/g, "");
            text = text.replaceAll(/\*\*/g, "");
            text = text.replaceAll(/```/g, "");

            console.log(text);

            const jasonHolder = JSON.parse(text);

            console.log(jasonHolder);
            localStorage.setItem("questionsData", JSON.stringify(jasonHolder));

            setBigState((prev) => ({
                ...structuredClone(prev),
                questions: jasonHolder,
                loaded: true,
            }));
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    useEffect(() => {
        if (getData) {
            const storedQuestions = JSON.parse(
                localStorage.getItem("questionsData") ?? "[]"
            );

            console.log(storedQuestions);

            if (!storedQuestions.length) {
                fetchData();
            } else {
                setBigState((prev) => ({
                    ...structuredClone(prev),
                    questions: storedQuestions,
                    loaded: true,
                }));

                console.log(loaded);
            }
        }
    }, [difficulty, topic, getData, questionCount, setBigState]);

    const navigate = useNavigate();
    const handleAttempt = () => {
        navigate("/quiz");
    };
    const handleHome = () => {
        navigate("/");
        localStorage.clear();

    };


    console.log(loaded);
    console.log(getData);

    return (
        <>
            <div className='bg-gray-50 min-h-screen flex flex-col justify-center items-center'>
                <div className='flex flex-col items-start bg-slate-50 p-4 border border-slate-400 text-black rounded w-4/5 h-2/5 md:w-500 '>
                    <h6 className="text-3xl my-3 text-gray-800 font-bold">Your Quiz Detail is Here</h6>
                    <h1 className="text-x text-gray-600 my-3 font-mono">Topic:<span className="text-black" > {topic}</span></h1>
                    <h1 className="text-x text-gray-600 my-3 font-mono">Difficulty:<span className="text-black" > {difficulty} </span> </h1>
                    <h1 className="text-x text-gray-600 my-3 font-mono">Total Questions:<span className="text-black" > {questionCount} </span> </h1>
                    <h1 className="text-x text-gray-600 my-3 font-mono">Total Marks:<span className="text-black" > {questionCount} </span> </h1>
                    <h1 className="text-x text-gray-600 my-3 font-mono">Time Allowed:<span className="text-black" > {questionCount} minutes </span> </h1>

                    <div className="md:flex gap-x-48">
                        <button className="bg-green-600 text-white py-2 px-4 m-2 rounded" onClick={handleHome}>Home Page</button>
                        {loaded ? (
                            <button className="bg-green-600 text-white py-2 px-4 m-2 rounded" onClick={handleAttempt}>Start Attempt</button>
                        ) : null}

                    </div>
                </div>
            </div>
        </>
    );
}
