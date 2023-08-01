import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";


const ProfilePage = () => {
    const { ready, setUser, user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!ready) {
        return ("Loading....");
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (

        <div className="m-24 flex flex-col gap-3 ">
            <div className="flex justify-between">
                <h1 className="text-4xl font-serif ">{user.name}</h1>
                <button onClick={logout} className="bg-primary px-10 py-2 text-lg rounded-2xl hover:bg-teal-500 hover:px-11 ease-in-out duration-150">Logout</button>
            </div>
            <div className="flex gap-8 pb-2 text-lg ">
                <Link className="focus:border-black focus:border-b-2 font-medium ">My Posts</Link>
                <Link className="focus:border-black focus:border-b-2 font-medium " >Favourite Posts</Link>
            </div>
        </div>

    )
}

export default ProfilePage