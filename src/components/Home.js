import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container bg-green-400 h-screen pt-10">
            <p className="text-center text-white text-xl mb-8">HOME PAGE</p>
            <div className="flex justify-center">
                <Link className="px-6 py-4 border border-white radius shadow-xl hover:bg-green-300" to="/login">Login</Link>
                <Link className="px-6 py-4 border border-white radius shadow-xl hover:bg-green-300" to="/register">Register</Link>
            </div>

        </div>
    )
}

export default Home;