import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from 'axios';


const IndexPage = () => {

    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/expressions').then(response => {
            setPosts(response.data);
        })
    }, [])

    return (
        <>
            {!user && (
                <div className="pt-16 pb-32 px-5 bg-primary">
                    <div className="flex flex-col gap-8">
                        <h1 className='text-7xl font-serif'>Stay Curious</h1>
                        <h2 className='text-2xl text-gray-800'>Discover stories, thinking, and<br />
                            expertise from writers on any topic.</h2>

                        <Link to={'/login'} className="bg-gray-900 hover:bg-black ease-in duration-200 text-white px-20 py-2 max-w-fit rounded-3xl text-xl">Start Reading</Link>

                    </div>
                </div>
            )}
            <div className='m-16 flex flex-col gap-7 lg:m-24 xl:m-32'>
                {!!user && (

                    <Link to={'/createPost'} className='flex gap-2 p-3 bg-teal-50 text-gray-600 rounded-full w-80'>
                        <h2 className="text-xl font-serif S" >Write a Post</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Link>
                )}

                {posts.length > 0 && posts.map(post => (
                    <div key={post._id} className='p-1 rounded-3xl bg-teal-50'>
                        <h2 className='font-serif px-2'> Posted by : <span className='font-semibold'>{post.owner.name}</span></h2>
                        <div className=' flex items-start gap-1' >

                            <div className='flex items-center flex-col md:flex-row gap-2'>

                                <div className='flex flex-col gap-2 p-2 '>
                                    <Link to={'/expression/' + post._id} className='rounded-xl font-serif text-xl font-semibold hover:underline'>{post.title}</Link>
                                    <div className='w-auto font-serif text-lg font-medium overflow-hidden cursor-default'>{post.content.substr(0, 280)} ...</div>

                                </div>

                                {post.photos?.[0] && (
                                    <img className="hidden md:block overflow-hidden rounded-2xl max-h-96 " src={'http://localhost:3000/uploads/' + post.photos?.[0]} alt="" loading='lazy' />
                                )}


                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default IndexPage