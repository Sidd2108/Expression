import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function Header() {
    const { user } = useContext(UserContext);

    function linkClasses() {
        let classes = 'py-2 px-5 flex bg-primary justify-between pb-5 border-b border-black';
        if (!!user) {
            classes += ' bg-white ';
        }
        return classes;

    }

    return (
        <header className={linkClasses()}>
            <Link to={'/'} className="flex gap-1 pt-2 items-center " >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-10 h-10" viewBox="0 0 16 16">
                    <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
                </svg>
                <h1 className="invisible overflow-hidden lg:visible text-black font-serif bold text-3xl pb-1 ">Expression</h1>
            </Link>

            <div className="flex items-center rounded-3xl bg-teal-50 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input className="flex bg-teal-50 focus:outline-none" name="search" id="" placeholder="Search expression" autoComplete="off" />

            </div>

            <div className="flex gap-2">

                <Link to={'/about'}>
                    <h2 className="mt-3 text-md text-gray-500 hover:text-black hover:underline ease-in duration-150">Our Story</h2>
                </Link>
                {!!user ?
                    <Link to={'/account'} className="flex px-0.5 items-center text-white bg-black  border border-teal-800 rounded-full hover:p-1.5 hover:ease-in-out duration-150">
                        <div className='m-1 text-white bg-black border border-gray-700 rounded-full overflow-hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-sm">
                            {user.name}
                        </div>
                    </Link>
                    : <Link to={'/register'} className='flex pt-3 items-center gap-2 rounded-full px-3 h-11'>
                        <button className="bg-gray-900 hover:bg-black ease-in duration-200 text-white px-4 py-1 max-w-fit rounded-2xl text-md">Register</button>
                    </Link>}

            </div>


        </header>
    );
}