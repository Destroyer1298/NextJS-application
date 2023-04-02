/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Akezhan Kaliyev Student ID: 1255988212 Date: 19.03.2023
*
*
********************************************************************************/ 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData.js";
import { readToken, removeToken } from '@/lib/authenticate';

function MainNav() {
    const router = useRouter();
    let token = readToken();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [search, setSearch] = useState("");
    const [isExpanded, setIsExpanded] = useState(false)

    const handleChanges = (e) => {
        setSearch(e.target.value);
    }
    async function handleSubmit(e){
        e.preventDefault();
        setIsExpanded(false)
        let queryString =`/artwork?title=true&q=${search}`;
        router.push(queryString);
        setSearchHistory(await addToHistory(`title=true&q=${search}`));
    }
    function logout() {
		setIsExpanded(false);
		removeToken();
		router.push('/login');
	}
    return(
        <>
            <Navbar className="fixed-top navbar-dark" bg="dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Akezhan Kaliyev</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => setIsExpanded(!isExpanded)}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link onClick={(e)=>setIsExpanded(false)}>Home</Nav.Link></Link>
                            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={(e)=>setIsExpanded(false)}>Advanced Search</Nav.Link></Link>                                                     
                        </Nav>
                        {
                        !token &&
                        <Nav>
                            <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={()=>setIsExpanded(false)}>Register</Nav.Link></Link>
                            <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={()=>setIsExpanded(false)}>Login</Nav.Link></Link>
                        </Nav>
                        }  
                        {
                        token &&    
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={handleChanges}
                            />
                            <Button type="submit" variant="btn btn-success">Search</Button>
                        </Form>
                        }
                        {
                        token &&
                        <Nav>
                            <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={(e)=>setIsExpanded(false)}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={(e)=>setIsExpanded(false)}>History</NavDropdown.Item>
                                </Link> 
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}

export default MainNav;