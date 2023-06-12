import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className='navbar navbar-dark bg-dark fixed-top'>
                <div className="container-fluid">
                    <NavLink to={"/"} className='text-white text-decoration-none'
                        style={{ 'fontSize': '32px', 'fontFamily': 'Verdana', 'fontWeight': 'bold' }}>CarZone</NavLink>
                </div>
            </nav>
        </>
    )
}

export default Navbar