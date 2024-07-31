import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className='bg-gray-50 min-h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center bg-slate-50 p-4 border border-slate-400 text-black rounded w-4/5 h-2/5 md:w-2/5 '>
                <div>404 Not Found</div>
                <Link to="/" className="bg-green-600 text-white py-2 px-4 m-2 rounded" onClick={() => localStorage.clear()}>Home Page</Link>
            </div>

        </div>
    );
}