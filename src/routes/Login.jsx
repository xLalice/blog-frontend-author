import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://blog-backend-api-production-2c23.up.railway.app/api/users/login", {
                username,
                password
            });

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", response.data.user);
            alert("Login Successful");
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-400 rounded-md px-3 py-2 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-400 rounded-md px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
}

export default Login;
