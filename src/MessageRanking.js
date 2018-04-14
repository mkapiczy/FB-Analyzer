import React from "react";
import { Badge } from 'reactstrap'

export class MessageRanking extends React.Component {
    render() {
        const messagePartner = this.props.messagePartner;
        const totalMessageCount = this.props.totalMessageCount;
        const messageCountByYears = JSON.stringify(this.props.messageCountByYears)



        return (
            <li>
                <div className="messagePartner"><h4>{messagePartner}</h4></div>
                <div className="totalMessageCount"><Badge color="secondary"><h4>{totalMessageCount}</h4></Badge></div>
                <div className="messageCountByYears">{messageCountByYears}</div>
            </li>
        );
    }
}
