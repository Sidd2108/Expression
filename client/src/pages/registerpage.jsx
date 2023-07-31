import React, { useState } from 'react'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-3xl text-center mb-4">Register</h1>
                <form className="max-w-sm mx-auto" >
                    <input type="text" placeholder="Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="Email ID"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="bg-primary text-black text-xl mt-1 p-2 rounded-xl w-full  border border-black">Register</button>

                </form>
            </div>
        </div>
    );
}

export default RegisterPage;