import React, { useContext, useEffect, useState } from 'react';
import './NavHeader.scss';
import { NavLink, Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg';
import { logoutUser } from '../../services/userservice';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation()
    const history = useHistory()

    const handleLogOut = async () => {
        let data = await logoutUser(); // clear cookie
        localStorage.removeItem('jwt'); // clear LocalStorage
        logoutContext(); // clear user context
        if (data && +data.EC === 0) {
            toast.success('Log out success!')
            history.push('/login')
        }
        else {
            toast.error(data.EM)
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/' || location.pathname === '/about') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                <span className='brand-name'>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/roles" className='nav-link'>Roles</NavLink>
                                    <NavLink to="/group-role" className='nav-link'>Group-Role</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Projects</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                </Nav>
                                <Nav>
                                    {
                                        user && user.isAuthenticated === true
                                            ?
                                            <>
                                                <Nav.Item className='nav-link'>
                                                    Welcome {user.account.username}!
                                                </Nav.Item>
                                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                    <NavDropdown.Item>Change Password</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item >
                                                        <span onClick={() => handleLogOut()}>Log out</span>
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                            :
                                            <Link className='nav-link' to='/login'>
                                                Login
                                            </Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    }
    else {
        return <></>
    }
}

export default NavHeader;