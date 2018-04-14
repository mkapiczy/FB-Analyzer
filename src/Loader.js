import React from "react"
import './Loader.css';

export class Loader extends React.Component {
    render() {
        return (
            <div>
                <div className="loader"></div>
                <div>Brace yourself! Your data is being processed!</div>
            </div>
        );
    }
}