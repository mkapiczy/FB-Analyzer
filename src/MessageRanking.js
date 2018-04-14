import React from "react";

export class MessageRanking extends React.Component {
    render() {
        const messagePartner = this.props.messagePartner;
        const totalMessageCount = this.props.totalMessageCount;
        const messageCountByYears = JSON.stringify(this.props.messageCountByYears)



        return (
            <li>
                <div className="messagePartner">{messagePartner}</div>
                <div className="totalMessageCount">{totalMessageCount}</div>
                <div className="messageCountByYears">{messageCountByYears}</div>
            </li>
        );
    }
}
