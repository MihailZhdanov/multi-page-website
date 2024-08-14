import { Link } from 'react-router-dom';
import './Header.css'
import { useState } from 'react';

export const Header = () => {
    const[isOpen,setIsOpen] = useState(false)
    return (
        <header className="header">
            <span className="header-logo">Logo</span>
            <nav className={`header-nav ${isOpen?"active" : ""}`}>
                <div className='header-nav-list'>
                    <Link to="/">Home</Link>
                    <Link to="/posts">Posts</Link>
                    <Link to="/comments">Comments</Link>
                    <Link to="/photos">Photos</Link>
                    <Link to="/albums">Albums</Link>
                    <Link to="/todos">Todos</Link>
                    <Link to="/users">Users</Link>
                </div>
            </nav>
            <button className='header-menu-btn' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ?(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) :(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>)}
            </button>
        </header>
    )
}