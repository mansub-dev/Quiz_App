
const QuestionCountSelector = ({ setQuestionCount }) => {
    const counts = [5, 10, 15, 20, 25];

    return (
        <div className="my-4 flex justify-center items-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Number of Questions:</h2>
            {counts.map((count) => (
                <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className=" bg-gray-800 text-white py-2 px-4 m-2 rounded"
                >
                    {count}
                </button>
            ))}
        </div>
    );
};

export default QuestionCountSelector;
