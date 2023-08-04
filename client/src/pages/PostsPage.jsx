import React from 'react'
import { Link } from 'react-router-dom';

const PostsPage = ({ post }) => {
    return (
        <>
            <h2 className='font-serif px-2'> Posted by : <span className='font-semibold'>{post.owner.name}</span></h2>
            <div className=' flex items-start gap-1' >

                <div className='flex items-center flex-col md:flex-row gap-2'>

                    <div className='flex flex-col gap-2 p-2 '>
                        <Link to={'/expression/' + post._id} className='rounded-xl font-serif text-xl font-semibold hover:underline'>{post.title}</Link>
                        <div className='w-auto font-serif text-lg font-medium overflow-hidden cursor-default'>{post.content.substr(0, 280)} ...</div>

                    </div>
                    <div className="flex flex-col gap-4 items-end">
                        {post.photos?.[0] && (
                            <img className="p-2 object-contain overflow-hidden rounded-3xl" src={'http://localhost:3000/uploads/' + post.photos?.[0]} alt="" />
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostsPage;