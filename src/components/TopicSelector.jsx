const TopicSelector = ({ setTopic }) => {
    const questionCounts = ['C++', 'JavaScript', 'Python', 'JAVA'];

    return (
        <div className=" my-4 flex justify-center items-center" >
            <h2 className="text-2xl font-bold mb-2 text-white">Select Topics: </h2>
            {
                questionCounts.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => setTopic(topic)}
                        className="bg-gray-800 text-white py-2 px-4 m-2 rounded"
                    >
                        {topic}
                    </button>
                ))
            }
        </div >
    );
};

export default TopicSelector;
