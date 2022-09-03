import { useState } from "react";
import AuthService from "../utils/AuthService";

const Welcome = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await AuthService.login(email, setError);
        if (result.success) window.location.reload();
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <img src="/star-icon.png" width="150" height="150" alt="gambar bintang" />
            <h1 className="mt-1 text-3xl font-extrabold text-gray-700 tracking-wider">AWARD</h1>
            <p className="mt-4 text-gray-700 font-normal leading-tight">Enter your email address</p>
            <p className="mb-4 text-gray-700 font-normal leading-tight">to sign in and continue</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="w-72">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address"
                        value={email}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-600 mt-1">{error}</p>}
                <button 
                    type="submit" 
                    className="mt-6 py-2 px-12 rounded self-center bg-gray-600 text-gray-100 hover:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Welcome;