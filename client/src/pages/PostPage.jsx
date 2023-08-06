import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`/expressions/${id}`).then(response => {
            setPost(response.data);
        })

    }, [id])


    if (!post) return '';

    function breakStringWithSpaces(longString) {
        var words = longString.split(" ");

        var stringChunks = [];
        for (var i = 0; i < words.length; i += 50) {
            var stringChunk = "";
            for (var j = i; j < i + 50 && j < words.length; j++) {
                stringChunk += words[j] + " ";
            }
            stringChunks.push(stringChunk);
        }
        return stringChunks;
    }

    const listofWords = breakStringWithSpaces(post.content);


    async function handleClick() {
        await axios.post(`/add-to-favourites/${id}`);
        setClicked(true);
    }

    return (
        <div className='mx-16 py-16 px-3 lg:mx-32 xl:mx-56 flex flex-col gap-8 bg-gray-50'>
            <div className='flex flex-col gap-4'>
                <h1 className='font-serif underline text-3xl font-semibold'>{post.title}</h1>
                <div className='flex justify-between'>
                    <h2 className='text-xl'> Posted by <span className='font-bold'>{post.owner.name}</span></h2>
                    <button onClick={handleClick}>
                        {clicked ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>

                        }

                    </button>
                </div>
            </div>
            {listofWords.length > 0 && listofWords.map((list, index) => (
                <div className='flex flex-col gap-3 items-center' key={list}>
                    <div className='font-serif font-medium text-xl'>{listofWords[index]}</div>
                    <img loading="lazy" className='sm:max-w-md lg:max-w-xl m-8 rounded-3xl ' src={'http://localhost:3000/uploads/' + post.photos?.[index]} alt="" />
                </div>
            ))}

        </div>
    )
}

export default PostPage