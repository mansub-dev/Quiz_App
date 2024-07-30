import { useState } from "react";

export default function Selector({ setBigState }) {
    const questionArry = ["C++", "JavaScript", "Python", "SQL"];
    const difficulties = ["Easy", "Medium", "Hard", "Expert"];
    const counts = [5, 10, 15, 20];

    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
    const [isCountOpen, setIsCountOpen] = useState(false);

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedCount, setSelectedCount] = useState(null);

    return (
        <div className="bg-slate-50 w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-4/5">
                <div className="relative">
                    <button
                        onClick={() => setIsTopicOpen((prev) => !prev)}
                        className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
                    >
                        {selectedTopic ? `${selectedTopic}` : "Select Topic"}
                    </button>
                    {isTopicOpen && (
                        <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
                            {questionArry.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setSelectedTopic(item);
                                        setBigState((a) => ({
                                            ...structuredClone(a),
                                            topic: item,
                                        }));
                                        setIsTopicOpen(false);
                                    }}
                                    className="block text-left py-2 px-4 w-full hover:bg-gray-200"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsDifficultyOpen((prev) => !prev)}
                        className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
                    >
                        {selectedDifficulty ? `${selectedDifficulty}` : "Select Difficulty"}
                    </button>
                    {isDifficultyOpen && (
                        <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
                            {difficulties.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setSelectedDifficulty(item);
                                        setBigState((a) => ({
                                            ...structuredClone(a),
                                            difficulty: item,
                                        }));
                                        setIsDifficultyOpen(false);
                                    }}
                                    className="block text-left py-2 px-4 w-full hover:bg-gray-200"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsCountOpen((prev) => !prev)}
                        className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
                    >
                        {selectedCount ? `${selectedCount}` : "Total Questions"}
                    </button>
                    {isCountOpen && (
                        <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
                            {counts.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setSelectedCount(item);
                                        setBigState((a) => ({
                                            ...structuredClone(a),
                                            questionCount: item,
                                        }));
                                        setIsCountOpen(false);
                                    }}
                                    className="block text-left py-2 px-4 w-full hover:bg-gray-200"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}