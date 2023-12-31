import axios from 'axios';
import React, { useState } from 'react'

const PhotosUploader = ({ addedPhotos, onChange }) => {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename];
        })
        setPhotoLink('');
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            })
        })

    }
    function removePhoto(ev, filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }


    return (
        <>
            <div className="flex gap-2 font-serif">
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                    placeholder="Upload photos via Link .....jpg" />
                <button onClick={addPhotoByLink} className=" bg-primary px-4 rounded-full">Add&nbsp;photos</button>
            </div>
            <div className='mt-2 w-auto grid items-center gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-7'>
                {addedPhotos?.length > 0 && addedPhotos.map(link => (
                    <div className="h-24 w-auto flex relative" key={link}>
                        <img loading="lazy" className="rounded-2xl w-auto object-cover" src={"http://localhost:3000/uploads/" + link} alt="" />
                        <button onClick={ev => removePhoto(ev, link)} className=" cursor-pointer absolute bottom-1 right-1 py-1 px-2 rounded-2xl text-white bg-black bg-opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                ))}
                <label className=" h-24 cursor-pointer flex font-serif items-center gap-2 mt-2 justify-center border bg-transparent p-2 rounded-2xl text-xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotosUploader