import React from "react";

export class Organizer extends React.Component {
    render() {
        const name = this.props.name;
        const votes = this.props.votes;

        return (
            <li>
                <div className="votes">{votes}</div>
                <div className="name">{name}</div>
                <button className="upvote-btn" onClick={() => alert("hello auhack")}>
                    Upvote
                </button>
            </li>
        );
    }
}
