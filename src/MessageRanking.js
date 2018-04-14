import React from "react";

export class MessageRanking extends React.Component {
    render() {
        const name = this.props.name;
        const messageCount = this.props.messageCount;

        return (
            <li>
                <div className="messageCount">{messageCount}</div>
                <div className="name">{name}</div>
            </li>
        );
    }
}
