import React from "react"
import './Loader.css';

export class Loader extends React.Component {
    render() {
        const isLoading = this.state.isLoading;

        return (
            <li>
                <div className="loader"></div>
            </li>
        );
    }
}