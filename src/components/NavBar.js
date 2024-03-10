import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import {useCurrentUser, useSetCurrentUser} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    }

    const addPostIcon = (
        <NavLink to="/posts/create" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-plus-square"></i>Add post</NavLink>
    )

    const loggedInIcons =
        <>
            <NavLink to="/feed" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-stream"></i>Feed</NavLink>
            <NavLink to="/liked" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-heart"></i>Liked</NavLink>
            <NavLink to="/" exact className={styles.NavLink} onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i>Sign out</NavLink>
            <NavLink to={`/profiles/${currentUser?.profile_id}`} exact className={styles.NavLink}>
                <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>
    const loggedOutIcons = (
        <>
            <NavLink to="/signin" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-sign-in-alt"></i> Sign in</NavLink>
            <NavLink to="/signup" exact className={({ isActive }) => isActive ? styles.Active : styles.NavLink}><i className="fas fa-user-plus"></i> Sign up</NavLink>
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
                {currentUser && addPostIcon}
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