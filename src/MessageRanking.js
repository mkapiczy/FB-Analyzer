import React from "react";
import { Badge } from 'reactstrap';

export class MessageRanking extends React.Component {
    render() {
        const name = this.props.name;
        const messageCount = this.props.messageCount;

        return (
            <li>
                <div className="messageCount"><Badge color="secondary"><h4>{messageCount}</h4></Badge></div>
                <div className="name"><h4>{name}</h4></div>
            </li>
        );
    }
}
