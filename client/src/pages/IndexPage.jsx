import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';


const IndexPage = () => {
    const { user } = useContext(UserContext);

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
        </>
    )
}

export default IndexPage