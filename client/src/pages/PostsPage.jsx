import React from 'react'
import { Link } from 'react-router-dom';

const PostsPage = ({ post, id, postRedirect }) => {

    return (
        <>


            <div className='flex items-center flex-col md:flex-row gap-2'>

                <div className='flex flex-col gap-2 p-2 '>
                    <Link to={postRedirect === "myPosts" ? `/account/expressions/${id}` : `/expression/${id}`} className='rounded-xl font-serif text-xl font-semibold hover:underline'>{post.title}</Link>
                    <div className='w-auto font-serif text-lg font-medium overflow-hidden cursor-default'>{post.content.substr(0, 280)} ...</div>

                </div>

                {post.photos?.[0] && (
                    <img loading="lazy" className="hidden md:block overflow-hidden rounded-2xl" src={'http://localhost:3000/uploads/' + post.photos?.[0]} alt="" />
                )}


            </div>


        </>
    )
}

export default PostsPage;