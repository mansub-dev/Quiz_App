const DifficultySelector = ({ setDifficulty }) => {
    const difficulties = ['Easy', 'Medium', 'Hard', 'Difficult'];

    return (
        <div className=" my-4 flex justify-center items-center" >
            <h2 className="text-2xl font-bold mb-2 text-white">Select Difficulty: </h2>
            {
                difficulties.map((level) => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className=" bg-gray-800 text-white py-2 px-4 m-2 rounded "
                    >
                        {level}
                    </button>
                ))
            }
        </div >
    );
};

export default DifficultySelector;
