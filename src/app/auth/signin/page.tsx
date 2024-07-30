"use client"

import { signIn } from 'next-auth/react';
import { FC, useRef } from 'react'

interface pageProps {

}

const LoginPage: FC<pageProps> = ({ }) => {
    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        console.log(userName.current, pass.current);

        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/dashboard"
        })
    }

    return <div className="flex flex-col space-y-2">
        <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => (userName.current = e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => (pass.current = e.target.value)}
        />
        <button type="button" onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow">
            Login
        </button>
    </div>

}

export default LoginPage