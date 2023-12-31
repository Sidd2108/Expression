import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function handleLogin(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data);
            setRedirect(true);

        } catch (err) {
            alert('Login failed');
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email ID"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="bg-primary border border-black text-black text-xl mt-1 p-2 rounded-xl w-full">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet ? <Link className="underline text-black" to="/register">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;