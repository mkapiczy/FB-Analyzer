import React from "react";
import { Badge } from 'reactstrap'
import { ListGroupItem } from 'react-bootstrap'
import "./MessageRankingItem.css";

export class MessageRankingItem extends React.Component {
    render() {
        const messagePartner = this.props.messagePartner;
        const totalMessageCount = this.props.totalMessageCount;

        return (
            <ListGroupItem>
                <h4><div className="messageRankingItem-partner">{messagePartner}
                    </div><Badge className="messageRankingItem-badge">{totalMessageCount}</Badge></h4>
            </ListGroupItem>
        );
    }
}
