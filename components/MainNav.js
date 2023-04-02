import {Container, Nav, Navbar, Form, Button, NavDropdown} from "react-bootstrap/";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

function MainNav() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [search, setSearch] = useState("");
    const [isExpanded, setIsExpanded] = useState(false)
    const handleChanges = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsExpanded(false)
        let queryString =`/artwork?title=true&q=${search}`;
        router.push(queryString);
        setSearchHistory(current => [...current, queryString]);
    }
    return(
        <>
            <Navbar className="navbar-main" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Akezhan Kaliyev</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={(e) => setIsExpanded(!isExpanded)}/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link onClick={(e)=>setIsExpanded(false)}>Home</Nav.Link>
                            </Link>
                            &nbsp;
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link onClick={(e)=>setIsExpanded(false)}>Advanced Search</Nav.Link>    
                            </Link>                                                     
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={handleChanges}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav className="me-auto">
                        <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item onClick={(e)=>setIsExpanded(false)}>Favourites</NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item onClick={(e)=>setIsExpanded(false)}>History</NavDropdown.Item>
                            </Link> 
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}

export default MainNav;