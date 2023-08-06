import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
const PhotosUploader = lazy(() => import('../PhotosUploader'));
import axios from 'axios';

const PostsForm = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/expressions/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setContent(data.content);
            setAddedPhotos(data.photos);
        })
    }, [id])

    async function savePost(ev) {
        ev.preventDefault();
        const postData = {
            title, content, addedPhotos
        }
        if (id) {
            //update post
            await axios.put('/expressions', {
                id, ...postData
            })
            setRedirect('/account');
        }
        else {
            //new post
            await axios.post('/expressions', postData);
            setRedirect('/');

        }
        setTitle('');
        setContent('');
        setAddedPhotos([]);

    }
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className=' m-12 flex gap-2 flex-col'>
            <form onSubmit={savePost}>
                <input className="text-xl font-serif" value={title} onChange={ev => setTitle(ev.target.value)}
                    type="text" name="title" id="" placeholder='Title' />
                <textarea className='focus:outline-none text-md font-serif' value={content} onChange={ev => setContent(ev.target.value)}
                    type="text" name="" id="" rows={10} placeholder='Add your Expression...' />
                <Suspense fallback={<div>Loading...</div>}>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                </Suspense>
                <button className='bg-primary w-full mt-2 font-serif text-lg rounded-2xl p-2'>Submit</button>

            </form>
        </div>
    )
}

export default PostsForm;