
import mindImage from '/mind.svg'; // Adjust the path to your image accordingly

const Header = () => {
    return (
        <div className="flex items-start mb-4 fixed  p-4">
            <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-3" />
            <h2 className="text-2xl font-bold text-black">Quizzie</h2>
        </div>
    );
};

export default Header;
