import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import PhotosUploader from '../PhotosUploader';

const PostsForm = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);

    function savePost() {

    }

    return (
        <div className=' m-12 flex gap-2 flex-col'>
            <form onSubmit={savePost}>
                <input className="text-xl font-serif" value={title} onChange={ev => setTitle(ev.target.value)}
                    type="text" name="title" id="" placeholder='Title' />
                <textarea className='focus:outline-none text-md font-serif' value={content} onChange={ev => setContent(ev.target.value)}
                    type="text" name="" id="" rows={10} placeholder='Add your Expression...' />
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <button type='submit' className='bg-primary w-full mt-2 font-serif text-lg rounded-2xl p-2'>Submit</button>

            </form>
        </div>
    )
}

export default PostsForm;