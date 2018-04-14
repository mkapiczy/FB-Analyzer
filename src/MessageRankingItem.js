import React from "react";
import { Badge } from 'reactstrap'
import { ListGroupItem } from 'react-bootstrap'

export class MessageRankingItem extends React.Component {
    render() {
        const messagePartner = this.props.messagePartner;
        const totalMessageCount = this.props.totalMessageCount;
        const messageCountByYears = JSON.stringify(this.props.messageCountByYears)


        return (
            <ListGroupItem>
                <h4>{messagePartner} - <Badge>{totalMessageCount}</Badge></h4>
            </ListGroupItem>
        );
    }
}
