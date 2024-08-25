import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/ipl-logo.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} style={{height: '50px', padding: '0', margin: '0'}} alt='logo' /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/addplayer'>Add Player</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/matches'>Matches</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/filtermatches'>Filter Matches</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/playerstats'>Stats</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        // <nav className='nav-bar'>
        //     <ul className='nav-ul'>
        //         <li>Home</li>
        //         <li>Add Player</li>
        //         <li>Matches</li>
        //         <li>Filter Matches</li>
        //         <li>Stats</li>
        //     </ul>
        // </nav>
    )
}

export default Navbar
