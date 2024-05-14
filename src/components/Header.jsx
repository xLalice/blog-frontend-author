import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header className="py-4">
            <div className="container mx-auto flex">
                <Link to="/" className="font-bold text-3xl">
                    DPS - Admin
                </Link>
                <Link to="/create-post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded">
                    Create Post
                </Link>
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto rounded">
                    Login
                </Link>
            </div>
        </header>
    )
}