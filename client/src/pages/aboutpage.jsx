import React from 'react'

const AboutPage = () => {
    return (
        <>
            <div className=' py-36 mx-10 font-serif text-5xl text-center'>
                Every idea needs a <span className='font-bold'>Expression</span>
            </div>
            <div className='flex flex-col sm:flex-row border border-black'>

                <div className='flex-initial flex-col gap-2 border-black border-r-2'>
                    <h2>The best ideas can change who we are. Medium is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where over 100 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.
                    </h2>
                    <h2>We’re creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising. It’s an environment that’s open to everyone but promotes substance and authenticity. And it’s where deeper connections forged between readers and writers can lead to discovery and growth. Together with millions of collaborators, we’re building a trusted and vibrant ecosystem fueled by important ideas and the people who think about them.</h2>
                </div>
                <img loading="lazy" className='w-auto max-h-fit object-contain' src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="" />

            </div>
        </>

    )
}

export default AboutPage;