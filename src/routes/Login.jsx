import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {AuthContext} from "../provider/AuthProvider";
import Modal from "../components/Modal";

function Login() {
    const { login, loginErr, userAuth } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        setShowModal(userAuth);
    }, [userAuth]);

    const onSubmit = async (data) => {
        await login(data);
        console.log(userAuth);
        setShowModal(userAuth);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigateTo("/posts", {replace: true});
    };

    if (userAuth) {
        return navigateTo("/posts", {replace: true});
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-400 rounded-md px-3 py-2 w-full"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-400 rounded-md px-3 py-2 w-full"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                {loginErr && <p className="text-red-500 mb-4">{loginErr}</p>}
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
            </form>

            {showModal && <Modal closeModal={handleCloseModal} />}
        </div>
    );
}

export default Login;
