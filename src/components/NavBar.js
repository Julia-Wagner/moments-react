import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import {useCurrentUser} from "../contexts/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons = (
        <>
            <NavLink to="/signin" exact  className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-sign-in-alt"></i> Sign in</NavLink>
            <NavLink to="/signup" exact  className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-user-plus"></i> Sign up</NavLink>
        </>
    )

    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-left">
                        <NavLink to="/" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-home"></i> Home</NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar