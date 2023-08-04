import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import PostsPage from "./PostsPage";


const ProfilePage = () => {
    const { ready, setUser, user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    const [posts, setPosts] = useState([]);

    async function handleClick() {
        await axios.get('/user-posts').then(response => {
            setPosts(response.data);
        })
    }

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

        <div className="m-16 lg:mx-32 xl:mx-56 flex flex-col gap-3 ">
            <div className="flex justify-between">
                <h1 className="text-4xl font-serif ">{user.name}</h1>
                <button onClick={logout} className="bg-primary px-10 py-2 text-lg rounded-2xl hover:bg-teal-500 hover:px-11 ease-in-out duration-150">Logout</button>
            </div>
            <div className="flex gap-8 pb-2 text-lg ">
                <button onClick={handleClick} className="focus:border-black focus:border-b-2 font-medium ">My Posts</button>
                <button className="focus:border-black focus:border-b-2 font-medium " >Favourite Posts</button>
            </div>
            <div className="mt-3 flex flex-col gap-4">
                {posts.length > 0 && posts.map(post => (
                    <div key={post._id} className='p-1 rounded-3xl bg-teal-50'>
                        <PostsPage post={post} id={post._id} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ProfilePage