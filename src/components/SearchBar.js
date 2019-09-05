import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import './searchbar.css';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <Navbar className="widthfix" sticky="top" bg="danger" variant="dark">
                <Navbar.Brand href="#home">PokeAPI</Navbar.Brand>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="dark">Search</Button>
                    </Form>
                </Navbar>
            </div>
        );
    }
}

export default SearchBar;