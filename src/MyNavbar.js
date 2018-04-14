import React from "react";
import {Nav, Navbar} from 'react-bootstrap'
import './MyNavbar.css'

export class MyNavbar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">FB-Data-Analyzer</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                </Nav>
            </Navbar>
        )
    }
}

